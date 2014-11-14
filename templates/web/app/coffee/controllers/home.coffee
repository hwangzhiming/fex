'use strict'

app.controller '<%- componentPrefix ? componentPrefix+"HomeController":"homeController" %>',['$scope',
    ($scope)->
        $scope.demo= "FEX"    
]