describe("{moduleName}", function() {
	var $httpBackend,
    service;

	beforeEach(function () {
        module('{moduleName}');
        inject(function ({componentName}, _$httpBackend_) {
            service = {componentName};
            $httpBackend = _$httpBackend_;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

	/*
    it('# description here #', function(){

		var promise,

        successCallback = jasmine.createSpy(),

        errorCallback = jasmine.createSpy()

        rsData='[expect data]'

        ;

		$httpBackend.expectGET('[url]').respond(200, rsData);

        promise=null;// Service function, eg: service.get();

        promise.then(successCallback, errorCallback);

        $httpBackend.flush();

        expect(successCallback).toHaveBeenCalledWith(angular.fromJson(rsData));

        expect(errorCallback).not.toHaveBeenCalled();

    });
    */
	  
});