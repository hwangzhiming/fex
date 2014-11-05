'use strict'

describe 'unit:{FEXComponentType}:{FEXComponentFormatName}', ->

  beforeEach module "{moduleName}"

  # initialize a new instance of the filter before each test
  {FEXComponentFormatName} = {}
  beforeEach inject ($filter) ->
    {FEXComponentFormatName} = $filter '{FEXComponentFormatName}'

  it 'should return the input prefixed with "FEX_', ->
    text = 'filter test'
    expect({FEXComponentFormatName} text).toBe ('FEX_' + text)