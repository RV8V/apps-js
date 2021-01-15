process = require "process"
###
a = 10
func = -> b = 20; process.write stdout, 'local var ' + b
do func
f = (a, b, c) -> process.write stdout, a, b, c
f 12, 32, 42
process.write stdout, 'global var ' + a + '\n' + b
str_inter = """
  one #{do func}
     two
        three
"""
str_inter_not = '''
        one
    two
  three #{do func}
'''
###
class string
_string = new string
class rectangle
  constructor: (w, h) ->
    @width = w
    @height = h
  get_area: ->
    @width * @height
  fn_to_test: ->
    do =>
      @.width
_rectangle = new rectangle 10, 20
console.log do _rectangle.get_area
console.log do _rectangle.fn_to_test
