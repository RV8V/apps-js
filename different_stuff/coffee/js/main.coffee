'use strict'

name = 'John'
age = 26
arr = [1, 2]

func1 = ->
  console.log 'hello'
  #return

func2 = (data = 'hello') -> console.log data
func2()

a == b # a is b
a != b # a isnt b

not d and a or b

true
yes
on

false
no
off

this
@

val of obj

#

age = 15

console.log 'enter' if age > 18

if not age > 18 then console.log 'enter'
unless age > 18 then console.log 'enter'


if age > 18
  console.log 'enter'
else
  console.log 'not enter'

if canRead then canRead = true
if canRead? then canRead = true

name = ''
name ?= 'John'

switch str
  when 'a' then name = 'Alex'
  when 'b' then name = 'Bob'
  when 'c'
    name = 'Con'
  else
    name = 'defa'

x = 0
while x < 5
  x++

until x < 5 then x--

for count in [10...20] by 2 when count % 2 is 0
  console.log count

for name in names
  console.log name

console.log name for name in names when name isnt 'John'

console.log obj[prop] for own prop of obj

#

arr = [-10...20]
colors = ['black', 'green']

person =
  name: 'Bob'
  age: 20
  hello: ->
    console.log 'hello' + @name
  animals:
    cat: true
    dog: on
    mouse: yes
    hello: ->
      console.log this.dog + this.cat

person.hello()

#

class Animal
  constructor: name ->
    @name = name
  @hello: -> console.log "hello, #{@name}"
  hello: -> console.log Animal.hello()

cat = new Animal 'cat'
