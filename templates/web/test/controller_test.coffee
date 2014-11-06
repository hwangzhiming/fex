'use strict'

describe "unit:{moduleName}:{FEXComponentType}:{FEXComponentFormatName}",()->
    scope={}
    controller={}
    beforeEach module "{moduleName}"

    describe "{FEXComponentFormatName}",()->
        beforeEach inject ($rootScope, $controller)->
            scope =$rootScope.$new()
            controller=$controller '{FEXComponentFormatName}','$scope':scope
            return
        it "# description here#",()->
            # TODO
        return
    return