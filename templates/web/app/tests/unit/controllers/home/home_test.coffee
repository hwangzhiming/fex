'use strict'

describe "unit:<%- moduleName %>",()->
    scope= null
    controller= null
    beforeEach ()->
        module "<%- moduleName %>"
        return

    describe '<%- componentPrefix ? componentPrefix+"HomeController":"homeController" %>',()->
        beforeEach inject ($rootScope, $controller)->
            scope = $rootScope.$new()
            controller= $controller '<%- componentPrefix ? componentPrefix+"HomeController":"homeController" %>','$scope':scope
        it " $scope.demo should be FEX ",()->
            expect(scope.demo).toBe 'FEX'