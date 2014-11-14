'use strict'

app.directive '<%- FEXComponentFormatName %>', ->
    template: '<div></div>'
    restrict: 'EA'
    link:(scope, element, attrs) ->
      element.text '<%- FEXComponentFormatName %> directive'