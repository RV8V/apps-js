console.log 'hello, coffee'
# comment
###
 long comment
###
a = 10
b = 20
bool = true
number = 2912
double = 42.23
bool = on
bool = off
bool = yes
bool = no
on_line = no
is_ready = on
string = 'some string'
string =
  'some
  very
  long
  string'
heredoc_string = """

lorem ipsum dolor sit amet,
consectetur adipsicinp elit,
magnam, debitis, veritatis,
vero, maxine numquem ipsan nostrum
"""
heredoc_string = '''
my text:
'''
name = 'name'
greeting = "hello, #{name.toLowerCase()}"
array = [
  1, 2, 3
  4, 5, 6
  7, 8, 9
]
array = [1..9]
array = [1..0]
range = [0..25]
range[0..10]
range[..]
range[0..8]
copy = range[..]
user =
  name: 'name'
  age: 32
  status: 'developer'
  skills:
    js:
      coffee: 0
      ts: 0
visa = ///
  ^4
  [0-9]
  {12}
///

first && second
true || false
first and second
on or no
not is_ready or not on_line
a == b
a != b
a is b
a isnt b
a is not b
update a if 10 < z < m < i < 20
[a, b] = [b, a]
[book, author, page] = ["test", "auth", 42]
{model, make, engine: {type}} =
  make: 'porsche'
  model: '911 turbo'
  engine:
    type: 'v8'
user =
  name: 'name'
  age: 90
  last_visit: do Date.now
'age' of user
range = [21..42]
32 in range
country in ['ukraine', 'uk']
book = 3421
open? book if book?
open book if book isnt null
open book if book is not null
object = {}
object.speed ?= 100
this.age = config.age || 10
this.age = do config.age ? 10
object = {}
object.speed ?= 100
object.speed = object.speed || 100
object.speed ||= 100
object.speed or= 100
object.speed and= 20
###
var greet;
greet = function(name) {
  return "hello, " + name;
}
function greet() {
}
###
greet = (name) -> 'hello, ' + name
no_arg = -> 'no arg'
some_fn = (name) ->
  # do update
  # do change
  # 'hello, ' + name
  # do process_something
  return do here args
  if name
    name
  else
    'name'
undef = (name = 'undefined', greeting = 'bonjour') ->
  'undefined returned'
  return
normalize = (length, vectors...) ->
outer = 10
func = ->
  outer = 20
  inner = 10
  return
update object(smth, 10, 20), 'false'
show()
do show
do do update()
a +   b
a +b
-> do something
do (name) -> something name
if ready
  activate something
  if not is_full
    append something
    if ready isnt 0
      do some_fn
      do so like that
  unless is_liked
    do so like is not ten
  else
    insert some_fn name
    do prepate some_fn
if is_full then activate something
activate something if is_full
unless is_liked then do so something wrong
do so something wrong unless is_liked
do prepare unless is_ready
action = if mode is 'ready for test' then 'sleep' else 'done'
show if message then message else warning
switch state
  when 0 then message = 'request is not initialized'
  when 1 then message = 'server connection established'
  when 2 then message = 'request received'
  when 3 then message = 'processing request'
  when 4 then message = 'request finished and response is ready'
  else message = 'unknown state'
message = switch state
  when 0 then 'request is not initialized'
  when 1 then 'server connection established'
  when 2 then 'request received'
  when 3 then 'processing request'
  when 4 then 'request finished and response is ready'
  else message = 'unknown state'
console.log "message -> [#{state}] #{switch state
  when 0 then 'request is not initialized'
  when 1 then 'server connection established'
  when 2 then 'request received'
  when 3 then 'processing request'
  when 4 then 'request finished and response is ready'
  else message = 'unknown state'}"
while is_ready then so done
do something while is_ready
while not is_ready then do prepare
until is_ready then do prepare
do prepare until is_ready
for i in [0..10]
  update i
for i in [0...10] then update i
update i for i in [0...10] by 4
console.log i for i in [0...100] when isPrime i by 2
prime_numbers = (i for i in [0..10] when isPrime)
show element for element in array when element in right_elements
show index for element, index in array when element in right_elements
remove_index for element, index in array when element in left_elements
console.log property for property of object
console.log object[property] for property of object
console.log value for own property, value of object
for event in ['click', 'mouseover', 'mouseout', 'focus']
  do (event) ->
    my_super_library::["on#{event}"] = (callback) ->
      my_super_library::on event, callback
      return
    return
###
Person = (function() {
  function Person(name, age) {
    this.name = name
    this.age = age
  }
  Person.prototype.get_info = function() {
    return 'name ' + this.name + ', age ' + this.age
  }
  Person.my_static_function = function() {
    return something()
  }
  Person.my_static_number = 9317
  return Person
})
###
class Person
  constructor: (@name, @age) ->
  get_info: ->
    "name #{@name}, age #{@age}"
  @my_static_function: ->
    do something
  @my_static_number: 9317
class Another extends Person
  constructor: ->
    super 10, 20, 30
    do something
  get_info: ->
    super arg1, arg2
    call this method
  my_method: ->
    _this = this
    some_function ->
      process_data _this.age
  normal: ->
    call_this =>
      process_data @age    
Person::my_method = -> say 'hello, '
###
var that = this
var self = this
var _this = this
###
