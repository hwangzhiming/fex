/*
Data description:

NOTE: if res is defined, fn will not fired.

{
	"<API_URL>":
	{
		"<Method>":{
			"[header]":[Header dictionary,eg. {token:'123467890abcd'}],
			"[res]":[Header dictionary,eg. {msg:'Hello!',errors:[]}],
			"[fn]":function (params) {
				return  { 
					"errors":['NULL FOUNT'] 
				};
			}
		},
		"[Method2]":[Object]
	}
}

exsample:

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
			"fn":function (params) {
				return  { 
					"errors":['NULL FOUNT'] 
				};
			}
		}
	}
}

*/

module.exports={}