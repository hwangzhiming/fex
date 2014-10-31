describe("{moduleName}", function() {
	var scope,
	controller;

	beforeEach(function () {
        module('{moduleName}');
    });

	describe("{FEXComponentFormatName}", function() {
		
		beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('{FEXComponentFormatName}', {
                '$scope': scope
            });
        }));

		it("# description here# ", function() {
 			//TODO
		});
	  
	});
});