
var 
  express = require('express')
, app = express()
, colors=require("colors/safe")
, port={appPort}
, fs=require('fs-extra')
, path=require('path')
, router= function(req,res){
	var method=req.method.toLowerCase()
	, url=req.url.toLowerCase()

	, module = './api_data';

	if(fs.existsSync(module+'.js')){

		// remove cached module
		delete require.cache[require.resolve(module)];
		//reload module
		var configs=require(module);
		
		var urlConfig=configs[url];

		if(urlConfig){
			var methodConfig=urlConfig[method];
			if(methodConfig){
				if(methodConfig.header){
					for(var key in methodConfig.header){
						res.setHeader(key,methodConfig.header[key]);
					}
				}
				//check if res exists
				if(methodConfig.res){
					res.send(methodConfig.res);
				}
				//check if fn exists
				else if(methodConfig.fn){
					var rs = methodConfig.fn(req,res);
					if(rs){
						res.send(rs);
					}
				}
			}
		}

	}
	
	res.status(404).end();
}
,getFiles=function(dir,bdir) {

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
var api_url_reg=/^\/api\//i;

app.use(function(req, res, next) {

	if(req.url.match(api_url_reg)){
		// log request url
		console.log(colors.gray('%s %s'),req.method,req.url);
		router(req,res);
	}
	else{
		next();
	}
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

console.log(colors.green('- Server is listening at %s\r\n- Press ctrl + c to exit'),port);
