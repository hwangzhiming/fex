/*
Data description:

NOTE: if res is defined, fn will not fired.

{
	"<API_URL>":
	{
		"<Method>":{
			"[header]":[Header dictionary,eg. {token:'123467890abcd'}],
			"[res]":[Response dictionary,eg. {msg:'Hello!',errors:[]}],
			"[fn]":function (req,res) {
				return  { 
					"errors":['NULL FOUNT'] 
				};
			}
		},
		"[Method2]":[Object]
	}
}

Sample:

{
	"/api/version_info/":
	{
		"get":{
			"header":{"token":"123467890abcd"},
			"res":{ 
				"version":"1.0.0", 
				"errors":[] 
			}
			
		},
		"post":{
			"fn":function (req,res) {
				res.setHeader('header-key','header-value');
				return  { 
					"errors":['NULL FOUNT'] 
				};
			}
		}
	}
}

*/

module.exports=
{}