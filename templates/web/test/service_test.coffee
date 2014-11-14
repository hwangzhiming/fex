'use strict'

describe "unit:<%- moduleName %>:<%- FEXComponentType %>:<%- FEXComponentFormatName %>",()->
    $httpBackend= {}
    service= {}
    
    beforeEach ()->
        module "<%- moduleName %>"
        inject (<%- FEXComponentFormatName %>,_$httpBackend_)->
            service = <%- FEXComponentFormatName %>
            $httpBackend = _$httpBackend_
            return 

    afterEach ()->
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
        return 
    ###
    it '# description here #',()->
        promise=null
        successCallback = jasmine.createSpy()
        errorCallback= jasmine.createSpy()
        rsData='[expect data]'

        $httpBackend.expectGET('[url]').respond(200, rsData)
        promise=null # Service function, eg: service.get()
        promise.then successCallback, errorCallback
        $httpBackend.flush()
        expect(successCallback).toHaveBeenCalledWith(angular.fromJson(rsData))
        return
    ####
    return