'use strict'

# comment

###
long comment here
###

a = 10; b = 20; c = 30

online = on; isReady = no

str =
  'very
  long
  string'

arr = [1,2,3,4,5]

first_range = [1..5] # not more than 25 elements

range = [1...25]

range[..10]
range[2..]
range[...]

newRange = range[...]

#

regExp = /^4[0-9]/

long_regExp = ///
  [0-9]
  ^5[1-5]?{7}
  (?:[0-9]{3})?$
///

# operators

first && second
true || false

first and second
on or no

not isReady or not isOnline

a == b # a === b

a isnt b
a is not b

update a if 10 < a < 20

if a < 10 then update a, b

[a, b] = [b, a] # paralel assigment

[c, d] = [10, 20]

car =
  make: 'Porsche'
  model: '911 Turbo'
  engine:
    type: 'v8'
    hp: 478
  cost: 60000

{ model, engine: {type} } = car

class Person
  constructor: (name, age, lastVisit) ->
    @name = name
    @age = age
    @lastVisit = do Date.now

person = new Person 'John', 20, '2020'

'age' of person

range = [10...20]

14 in range

country in ['Russian', 'Ukraine'] # array literal

#

book = 0 # false in if statement => 0 is false in if
open book if book

# null and undefined

page = 0
open? page if page?
open page if page isnt null

# operator ?

object = {}
# some operations that change object fields
object.speed ?= 100

# because config.age may be 0 or empty string ('') and we will choose 10 instead
this.age = config.age || 10
this.age = config.age ? 10

@value = do config.value ? 10

#

object.value = object.value || 100 # unnessuccery calculations of value (see compiled javascript)
object.value ||= 100 # if object.value returns its value => rigth part will be passed
object.value and= 100

# Functions

### function instruction
var greet

greet = function(name) {
  return 'Hello, ' + name + '!'
}
Always like that
In CoffeeScript we will always assign anonymous functions to some variables

###

greet = (name) ->
  # return always last stament
  do updateSomething
  return do changeSomthing
  console.log "Hello, #{name}"
  do processSomething

normalize = (length, vectors...) ->

outer = 10

func = ->
  outer = 10
  inner = 20
  return

# call functions - we can pass () parentases

show update object, 10, 20
show update(object, 10, 20), true

show()
do show

-> do something
do -> do something

# Conditions

if isReady
  activate something
  if not isFull
    append something
else
  do prepare

if isReady then activate something
activate something if isReady

unless isReady then append something
append something unless isReady

do prepare unless isFull

# analogy of ternary operator

action = if mode is 'idle' then 'sleep' else 'wander'

show if message then mesage else warning

# switch

switch state
  when 0 then message = 'request not initialized'
  when 1 then message = 'server connection established'
  when 2 then message = 'request received'
  when 3 then message = 'processing request'
  when 4 then message = 'request finished and response is ready'
  else message = 'unknown state'

message = switch state
  when 0 then 'request not initialized'
  when 1 then 'server connection established'
  when 2 then 'request received'
  when 3 then 'processing request'
  when 4 then 'request finished and response is ready'
  else 'unknown state'

console.log "Message: [#{state}] #{switch state
  when 0 then 'request not initialized'
  when 1 then 'server connection established'
  when 2 then 'request received'
  when 3 then 'processing request'
  when 4 then 'request finished and response is ready'
  else 'unknown state'}"

# Loops
# for is instruction
while isReady then do something
do something while isReady

while not isReady
  do append

until isReady
  do append

do prepare until isReady

for i in [10..20] by 4
  update i

for i in [10..20] then update i
update i for i in [10..20]

for i in [10..20] when isPrime i then console.log i

console.log for i in [10..20] when isPrime i by 2

# for is a виражение

primeNumbers = i for i in [10..20] when isPrime i by 2
primeNumbers = (i for i in [10..20] when isPrime i by 2)

primeNumbers = i if i # тело условия до самого условия
# i здесь єто тело условия

# array passing to function

show element for element in array when element in rightElements

remove_byIndex index for element, index in array when element in rightElements

# for of

console.log value for own property, value of object
console.log object[property] for property of object

# self-called Functions

for event in ['click', 'mouseover', 'mouseout', 'focus']
  do (event) ->
    mySuperLibrary::["on#{event}"] = (callback) ->
      mySuperLibrary::on event, callback
      return
    return

# Classes in CoffeeScript

class Person
  constructor: (@name, @age) -> # body of constructor is допустимим
  getInfo: ->
    "Name: #{@name}, age: #{@age}"
  @myStaticFunc: ->
    do something
  @myStaticValue: 20

class WebDeveloper extends Person
  constructor: ->
    super 10, 20, 30
    do something
  getInfo: ->
    super arg1, arg2
    console.log 'getInfo'
  myMethod: ->
    _this = this # внутри данной ананомной функции this уже не будет ссилаться на обьект метод которого ми визвали
    someFunc -> # поскольку this вляеться ключевим словом а не переменной - поєтому нужно this сохранить в переменную
      process _this.age

  myMehodThatAddThisAutomaticaly: ->
    someFunc =>
      process @age # after compiling we add the same code

Person::myCoolMethod = -> say 'hi'

###
  Practical Example CoffeeScript
###
