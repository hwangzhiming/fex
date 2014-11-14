'use strict'

moduleName= '{moduleName}'
app= angular.module moduleName , ["ngRoute"]
app.constant "REST_URL",'/api'
app.config ['$locationProvider','$routeProvider',

    ($locationProvider,$routeProvider)->

        $routeProvider.when '/home', {
            templateUrl: 'views/home/index.html',
            controller: 'homeController'
        }
        
        .otherwise {redirectTo: '/home'}; 
]