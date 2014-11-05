'use strict'

app.provider '{FEXComponentFormatName}', ->

    # Private variables
    _fex = 'Hello Fex'

    # Private constructor
    class HelloFex
      @value = ->
        _fex

      # Public API for configuration
      @set = (s) ->
        _fex = s

      # Method for instantiating
      @$get = ->
        new HelloFex()
      
    return