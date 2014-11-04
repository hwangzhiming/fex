describe "unit:{moduleName}",()->
    scope=null
    controller=null
    beforeEach ()->
        module "{moduleName}"
        return

    describe "{FEXComponentFormatName}",()->
        beforeEach inject ($rootScope, $controller)->
            scope =$rootScope.$new()
            controller=$controller '{FEXComponentFormatName}','$scope':scope
            return
        it "# description here#",()->
            # TODO
        return
    return