module.exports = {
	"init":{

		"source":"app/",

		"mkdir":[
			"tests/unit"
		],

		"vars":[
			{
			    "name": "appName",
			    "description": "App name:",
			    "type": "string",
			    "pattern": /^[a-zA-Z0-9_]+$/,
			    "default": "fexapp",
			    "required": true
			},
			{
			    "name": "moduleName",
			    "description": "Angular module name:",
			    "type": "string",
			    "pattern": /^[a-zA-Z0-9_.]+$/,
			    "required": true
			},
			{
			    "name": "componentPrefix",
			    "description": "Angular component Prefix:",
			    "type": "string",
			    "pattern": /^[a-zA-Z0-9_.]+$/,
			     "default": ""
			},
			{
			    "name": "appDescription",
			    "description": "Description:",
			    "pattern": /^(?!.*\\.*$)/,
			    "type": "string",
			    "required": true
			},
			{
			    "name": "appPort",
			    "description": "Development Port:",
			    "type": "number",
			    "default":8000,
			    "required": true
			},
			{
			    "name": "appVersion",
			    "description": "Version:",
			    "type": "string",
			    "pattern":/\d.\d.\d/,
			    "default":"0.0.1",
			    "required": true
			},
			{
			    "name": "authorName",
			    "description": "Author name:",
			    "pattern": /^(?!.*\\.*$)/,
			    "type": "string"
			},
			{
			    "name": "authorEmail",
			    "format": "email",
			    "description": "Author email:",
			    "type": "string"
			},
			{
			    "name": "appLicense",
			    "description": "App license:",
			    "pattern": /^(?!.*\\.*$)/,
			    "type": "string"
			}
		],
		"compile":{
			"string":[
				"coffee/app.coffee",
				"bower.json",
				"gulpfile.js",
				"package.json",
				"README.md",
				"server.js",
				"tests/unit/controllers/home/home_test.coffee"
			],
			"html":[
				"src/index.html",
				"tests/unit/controllers/home/index.html"
			]
		}
	},

	"components":{
		"default":{
			"nameFormat":"[PREFIX]%s",
			"template":"component/default.coffee",
			"test":{
				"script":"test/default_test.coffee",
				"view":"test/index.html"
			}
		},
		"controller":{
			"nameFormat":"[PREFIX]%sController",
			"template":"component/controller.coffee",
			"test":{
				"script":"test/controller_test.coffee",
				"view":"test/index.html"
			}
		},
		"service":{
			"nameFormat":"[PREFIX]%sService",
			"template":"component/service.coffee",
			"test":{
				"script":"test/service_test.coffee",
				"view":"test/index.html"
			}
		},
		"directive":{
			"nameFormat":"[PREFIX]%s",
			"template":"component/directive.coffee",
			"test":{
				"script":"test/directive_test.coffee",
				"view":"test/index.html"
			}
		},
		"filter":{
			"nameFormat":"[PREFIX]%s",
			"template":"component/filter.coffee",
			"test":{
				"script":"test/filter_test.coffee",
				"view":"test/index.html"
			}
		},
		"factory":{
			"nameFormat":"[PREFIX]%sFactory",
			"template":"component/factory.coffee",
			"test":{
				"script":"test/service_test.coffee",
				"view":"test/index.html"
			}
		},
		"provider":{
			"nameFormat":"[PREFIX]%sProvider",
			"template":"component/provider.coffee",
			"test":{
				"script":"test/service_test.coffee",
				"view":"test/index.html"
			}
		}
	}
}