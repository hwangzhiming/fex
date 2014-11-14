'use strict'

app.factory '<%- FEXComponentFormatName %>', ->
    # logic
    # privative things...

    _fex = 'Hello Fex'

    # Public API here
    {
      someMethod: ->
        _fex
    }