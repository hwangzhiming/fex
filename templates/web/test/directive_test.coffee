'use strict'

describe 'unit:<%- moduleName %>:<%- FEXComponentType %>:<%- FEXComponentFormatName %>', ->

    # load the directive's module
    beforeEach module "<%- moduleName %>"

    scope = {}

    beforeEach inject ($rootScope) ->
        scope = $rootScope.$new()

    it 'should make hidden element visible', inject ($compile) ->
        element = angular.element '<# Your Element Tag#></#Your Element Tag#>'
        element = $compile(element) scope
        expect(element.text()).toBe '<%- FEXComponentFormatName %> directive'