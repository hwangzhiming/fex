/*

vendor configuration

Support *.{ttf,woff,eof,svg} and /**\/*.js etc.

{
	"<bower package name>":
	{
		//main script files
		"scripts":['script file name','will be compile into js/vendor.min.js'],
		"stylesheets":['stylesheet file,will be compile into css/vendor.css'],
		//other resource files, font, images etc.
		"others":{
			"name of the file which need to be copied":"destination(relative to public/ folder)"
		}
	}

}

*/

module.exports=
{
	"angular":
	{
		"scripts":['angular.min.js'],
		"others":{
			"angular.min.js.map":"js"
		}
	},

	"angular-route":
	{
		"scripts":['angular-route.min.js'],
		"others":{
			"angular-route.min.js.map":"js"
		}
	},

	"angular-resource":
	{
		"scripts":['angular-resource.min.js'],
		"others":{
			"angular-resource.min.js.map":"js"
		}
	}

	/*,"cui":{
		"scripts":['bin/js/cui-vendor.js','bin/js/cui.js'],
		"stylesheets":["bin/css/cui.css"],
		"others":{
			"bin/css/fonts/*.{ttf,woff,eof,svg}":"css/fonts"
		}	
	}*/		
}