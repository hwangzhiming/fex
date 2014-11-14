
var 
  express = require('express')
, app = express()
, bodyParser = require('body-parser')
, colors=require("colors/safe")
, port=<%- appPort %>
, fs=require('fs-extra')
, path=require('path')
, getApiDataConfig=function(){
	var module = './api_data';
	if(fs.existsSync(module+'.js')){

		// remove cached module
		delete require.cache[require.resolve(module)];
		//reload module
		return require(module);
	}
	return null;
}
,setSingleRouter=function(appInstance,method,routerUrl){

	appInstance[method](routerUrl,function(req,res){
		console.log(colors.gray(' '+method+" "+routerUrl));
		var configs = getApiDataConfig();
		if(configs){
			var methodsArr=configs[routerUrl];
			if(methodsArr){
				var conf=methodsArr[method];
				if(conf){
					//set headers
					if(conf.header){
						for(var hk in conf.header){
							res.setHeader(hk,conf.header[hk]);
						}
					}			

					if(conf.res){
						res.send(conf.res);
					}
					else if(conf.fn){
						var rs=conf.fn(req,res);
						if(rs){
							res.send(rs);
						}
					}
				}

			}
		}
		res.end();
	});
}
, router= function(appInstance){
	var configs = getApiDataConfig();

	if(configs){
		
		for(var routerUrl in configs){
			
			var methodsArr=configs[routerUrl];
			for(var method in methodsArr){

				var conf=methodsArr[method];

				if(!(conf.res || conf.fn)){
					continue;
				}

				setSingleRouter(appInstance,method,routerUrl);
				
			}
		}

	}
}
, getFiles=function(dir,bdir) {

    var results = [];
    var baseDir=dir;
    if(bdir){
    	baseDir=bdir;
    }

    fs.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = fs.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file,baseDir))
        } else if(path.extname(file)=='.html'){
        	results.push(file.replace(baseDir,''));
        }

    });

    return results;

};

/* Setup
------------------------------------*/

app.use('/public',express.static(__dirname + '/public'));
app.use('/tests',express.static(__dirname + '/tests'));
app.use('/bower_components',express.static(__dirname + '/bower_components'));
app.use('/compiled_js',express.static(__dirname + '/compiled_js'));

/* Moddileware, mock api request
------------------------------------*/
//support application/json
app.use(bodyParser.json())
//support application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(function(req, res, next) {
	router(app);
	next();
});


/* load tests
------------------------------------*/

app.get('/tests/',function(req,res){
	var files=getFiles(__dirname +'/tests');
	var content=[];
	var title="Test List";
	content.push('<!DOCTYPE html>');
	content.push('<html>');
	content.push('	<head>');
	content.push('		<title>');
	content.push(title);
	content.push('		</title>');
	content.push('	<style>');
	content.push('		body{background-color: #eeeeee; padding: 12px; margin: 0; font-size: 11px; font-family: Monaco, "Lucida Console", monospace; line-height: 14px; color: #333;}');
	content.push('		li{padding:5px 0;}');
	content.push('	</style>');
	content.push('	</head>');
	content.push('<body>');
	content.push('	<h3>'+title+'</h3>');
	content.push('	<ol>');
	for(var i in files){
		var file=files[i];
		content.push('<li>');
		content.push('<a href=".'+file+'" target="_blank">'+file+'</a>');
		content.push('</li>');
	}	
	content.push('	</ol>');
	content.push('</body>');
	content.push('</html>');
	res.send(content.join(''));
});


app.get('/',function (req,res) {
	res.redirect('/public');
});

app.listen(port);

console.log(colors.green('- Server is listening on %s\r\n- Press ctrl + c to exit'),port);