'use strict'

app.filter '<%- FEXComponentFormatName %>', ->
    (input) ->
        'FEX_' + input