'use strict'

app.service "{FEXComponentFormatName}",["REST_URL","$http",'$q',(REST_URL,$http,$q)->
	__demo:->
		deferred = $q.defer()
		$http
		.get REST_URL
		.success (data)->
			deferred.resolve data
		.error (msg,status)->
			deferred.reject msg,status
		deferred.promise
]