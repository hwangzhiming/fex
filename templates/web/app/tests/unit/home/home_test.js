describe("{moduleName}", function() {
	var scope,
	controller;

	beforeEach(function () {
        module('{moduleName}');
    });

	describe("homeController", function() {
		
		beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('homeController', {
                '$scope': scope
            });
        }));

		it(" $scope.demo should be FEX ", function() {
 			expect(scope.demo).toBe('FEX');
		});
	  
	});
});