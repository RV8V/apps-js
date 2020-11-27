'use strict';


//        ==============        Valid Parentheses
function validParentheses(str){
  const open = ['(', '{', '['];
  const close = [')', '}', ']'];
  const stack = []

  for (let i = 0; i < str.length; i++) {
    if (open.includes(str[i])) {
      stack.push(str[i]);
      //console.log(open.indexOf(str[i]))
    }
    else {
      if (close.indexOf(str[i]) === open.indexOf(stack[stack.length - 1])) {
        stack.pop()
      } else { return false }
    }
  }
  return stack.length === 0
}

//console.log(validParentheses('(})'))

const a = '(hello){john}'
//console.log(a.replace(/[(){}]/g, 4))


//======     ditctict
function distinct(a) {
  const res = []
  const items = {}

  for (let i = 0; i < a.length; i++) {
    if (!res[a[i]]) res.push(a[i]); items[a[i]] = 0
  }
  return res
}

console.log(distinct([1,2,3,4,4,4,5,5,6,7,7]))


//      =================      sponse
function spongeMeme1(s) {
let res = ''
for (let i = 0; i < str.length; i++) {
  res += i % 2 ? str[i].toLowerCase() : str[i].toUpperCase()
}
return res
}


//(s = 'hello') => s = s.substring(0, i++) + s[i] + ['to' + (i % 2? 'Lower': 'Upper' )+ 'Case']()

const spongeMeme2 = (s, i = 0) => {
  return i >= s.length ? s : (s = s.substring(0, i) + s[i] + (()=>['to' + (i % 2? 'Lower' : 'Upper') + 'Case'])() + s.substring(i+1), spongeMeme(s, ++i))
}
//console.log(spongeMeme('hello'))

const spongeMeme3 = ([...sentence]) => sentence.map((e, i) => e['to'+(i%2?'Lower':'Upper')+ 'Case']()).join('')
//console.log(sponge('hello'))

const spongeMeme4 = ([...sentence], i = 0) => {
  return i === sentence.length? s: (s[i] = s[i]['to'])
}

const toUpperCase = (e, i) => e['to'+(i++%2?'Lower':'Upper')+ 'Case']()
//console.log(d('hello', 0))

const test = (d='function')=> d['toUpperCase']()
//console.log(s())


const spongeMeme5 = ([...s], i=0) => {
  return i === s.length? s.join(''): (s[i] = s[i]['to'+(i++%2? 'Lower':'Upper')+'Case'](), sponge2(s, ++i))
}

//console.log(spongeMeme5('huyj'))
const t = (o='joik')=>[...o]
//console.log(t())


/*
let fs = 'hool'
fs[0]=fs[0]['toUpperCase']()
console.log(fs)
*/


const spongeMeme6 = (s, i=0) => {
  return i === s.length? s: (s = s.substring(0, i) + s[i]['to'+(i++%2? 'Lower':'Upper')+'Case']() + substring(0, i+1), sponge3(s, ++i))
}
//console.log(sponge3('jujuj'))


//  ===========    currentMin
class SmallestIntegerFinder {
  findSmallestInt(args) {
    let currentMin = args[0]
    for (let i = 1; i < args.length; i++) {
      if (args[i] < currentMin) currentMin = args[i]
    }
    return currentMin
  }
}


// ===  getMin
const getAverage = (marks,{length}=marks) => Math.floor(marks.reduce((_, p) => _ + p)/length)
// ==  examen
const finalGrade=(e,p)=> e > 90 || p > 10 ? 100 : e > 90 && p >= 5 ? 90 : e > 50 && p >= 2 ? 75 : 0



//  =====   draw rectangle
function getRectangleString(w, h) {
  const rn = '\r\n'
  const TOP = '*'.repeat(w)+rn
  const CENTER = w > 1? ('*' + ' '.repeat(w - 2) + '*'+ rn).repeat(h - 2) : ''

  return h > 1? TOP + CENTER + TOP : TOP.repeat(h)
}

//console.log(getRectangleString(10, 3))

const push = x => xs => xs.concat([x]);
//console.log(push(2)([3, 2, 2]))


// numbers
const digitize = n => [...String(n)].map(Number).reverse()


// reversedvstrings
function solution(str){
  return str.length > 0 ? solution(str.substring(1)) + str.charAt(0) : '';
}            'elloh'


const string = 'hello'
const string1 = string.substring(1)
//console.log({ string, string1 })


const data = "I really don't like reversing strings!"
const regExp = / [a-z]*/g
const data1 = regExp.exec(data);
const value = data.split(/\s+/g)
//console.log(value)

const reverseString1 = str => str.length > 0 ? reverseString1(str.substring(1)) + str.charAt(0) : ''

  /*       'hello'         reverseString1( 'ello' ) + 'h'
                           reverseString1( 'llo' ) + 'e' + 'h'
                           reverseString1( 'lo' ) + 'l' + 'e' + 'h'
                           reverseString1( 'o' ) + 'l' + 'l' + 'e' + 'h'
                           reverseString1( '' ) + 'o' + 'l' + 'l' + 'e' + 'h'
                                           '' + 'o' + 'l' + 'l' + 'e' + 'h'    */

//console.log(reverseString1('hello'))


// ========= difference
function find_difference1([a,b,c], [d,e,f]) {
  return Math.abs(a*b*c-d*e*f)
}

function findDifference2(a, b) {
      return Math.abs(eval(a.join("*"))-eval(b.join("*")))
    }

const concatAll = ([...args]) => (args.join('*'))
//console.log(g([1,2,3,4,5,6]))


//  ==== example
const greetMan = (name ,owner) => `Hello ${name === owner ? 'boss' : 'guest'}`
const greetMan1 = (n,o) => `Hello ${n === o ? 'Boss': 'Bye'}`
//console.log(greet('bob, bob'))


// === multiply
function multiTable(n, i = 1) {
   if (i === 10) {
     return `10 * ${n} = ${n}0`;
   }
   return `${i} * ${n} = ${n * i}\n` + multiTable(n, i + 1);
 }

 function multiTable1(n) {
   let res = ''
   for (let i = 1; i <= 10; i++) {
     res += `${i} * ${n} = ${i * n}${i < 10 ? '\n' : ''}`
   }
   return res
 }

 const j = (n, i = 1) => {
   if (i === 10) return `${i} * ${n} = ${i * n}`
   return `${i} * ${n} = ${i * n}\n` + j(n, ++i)
 }
//console.log(j(20))


// ==== function some
var any = Function.prototype.call.bind(Array.prototype.some);


// ==== arrays
const points = g => g.reduce((a,c) => a + ( c[0] > c[2] ? 3 : c[0] < c[2] ? 0 : 1 ) , 0 )

function points1(g, c=0) {
  g.forEach(item => item[0] > item[2] ? c+=3 : item[0] === item[2] ? c+=1 : 0)
  return c
}


//  divide number by a and b
function isDivideBy(number, a, b) {
  return [a, b].every(i => number % i === 0)
}


//  ==== sumOfStrings
const sumOfStrings = (...strs) => strs.reduce((acc, val) => acc + +val, 0)
//console.log(sumOfStrings('10', '30'))


// ==== paper rock scissors
const rockScissorsPaper = (p1, p2) => {
  if(p1 === p2) {
    return 'Draw!'
  };
  return `Player ${/rockscissors|scissorspaper|paperrock/.test(p1+p2)? 1 : 2} won!`;
}           //   chose all possible variants of true and false and then concat input strings and use regular expression

//console.log(/hello|bye/.test('bye'))


const functionForGame = (s1, s2) => s1 === s2 ? 'Draw!' : `Player ${/scissorspaper|paperrock|rockscissors/.test(s1 + s2) ? 1 : 2} won!`;
//console.log(functionForGame('scissors', 'rock'))


// ===== sumArray
const sumArray1 = a => a ? a.sort((x, y) => x - y).slice(1, -1).reduce((s, e) => s + e, 0) : 0

function sumArray(array) {
  if (!array || array.length < 2) return 0
  let max = array[0], min = array[0]; sum = 0
  array.forEach(el => {
    if (el < min) min = el;
    if (el > max) max = el
    sum += el
  })
  return sum - min - max
}
//console.log([1,2,3,4].slice(0, -2))


// === toUpperCase
/*String.prototype.isUpperCase = function () {
  return !/[a-z]/.test(this);
}; */


// flatten array
function flattenAndSort(array) {
  return [].concat(...array).sort((a,b) => a - b);
}

function flattenAndSort1(array) {
  return flatten(array).sort((a, b) => a - b);
}

function flatten(array) {
  return array.reduce(function(acc, el) {
    return acc.concat(Array.isArray(el) ? flatten(el) : el);
  }, []);
}

const val = [[1, 3, 5], [100], [2, 4, 6], [1, 2, 3, 4, 5, 6, 100]]
/*
console.log(...val)
console.log([].concat(...val))
console.log(flattenAndSort(val))
*/

const flatArrayButNotSort = arr => arr.reduce((acc, arr) => acc.concat(arr instanceof Array ? flatArrayButNotSort(arr) : arr), [])
const sortArray = arr => arr.sort((a, b) => a - b)

const val_0 = flatArrayButNotSort(val)
const end = sortArray(val_0)

const array = [1,2,3,4,5,[6,7]]
const concat = ['r','t'].concat(array)
//console.log({ concat })


// sum of elements of string

function averageString(str) {
  //console.log(str)
  if (!str) return 'n/a'

  const d = {
                'zero': 0,
                'one': 1,
                'two': 2,
                'three': 3,
                'four': 4,
                'five': 5,
                'six': 6,
                'seven': 7,
                'eight': 8,
                'nine': 9
            }

  const n = {
                0: 'zero',
                1: 'one',
                2: 'two',
                3: 'three',
                4: 'four',
                5: 'five',
                6: 'six',
                7: 'seven',
                8: 'eight',
                9: 'nine',
            }
  const da = str.split(' ')
  //console.log(da)
  let sum = 0
  for (let i = 0; i < da.length; i++) {
    if (d[da[i]] !== undefined) {
    //console.log(d[da[i]])
    sum += d[da[i]]
   } else {
     return 'n/a'
    }
  }

  //console.log(sum)
  const avg = Math.floor(sum/da.length)
  //console.log(avg)
  return n[avg]
}

averageString("zero nine five two") // 'four'
averageString("four six two three") // "three"


// sum of something
function SeriesSum(n) {
  for (var s = 0, i = 0; i < n; i++) { // s means sum (inside cycle) not let s = 0
    s += 1 / (1 + i * 3)
  }

  return s.toFixed(2)
}

// other example

function SeriesSum(n)
{
  if (!n) return '0.00'
  let sum = 1, j = 4
  for (let i = 1; i < n; i++) {
    sum += 1/j
    j += 3
  }
  return sum.toFixed(2)
}

// reverse list --- array
const reverseList = ([h, ...t]) => h == undefined ? [] : [...reverseList(t), h]
console.log(reverseList([1,2,3,4,5,6]))

// includes??
function nameInStr(str, name){
  return new RegExp(str.split('').join('.*'), 'i').test(name);
}

//console.log(nameInStr('string', 'd.s.a..string1____jjkh'))

// staff
const v = [...Array(3).keys(), 10].filter(v => 3 % v === 0)
console.log({ v })


// apple
const sc = apple => apple.reduce((r, val, i) => (console.log({ r, val }), val.includes('B')) ? [i, val.indexOf('B')] : r, [])

const apple = [
  ["A","A","A","A","A"],
  ["A","A","A","A","A"],
  ["A","A","A","A","A"],
  ["A","A","A","A","A"],
  ["A","A","A","B","A"]
]

sc(apple)
