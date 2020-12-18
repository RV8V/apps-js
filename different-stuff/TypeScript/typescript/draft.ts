'use strict'

//const num: object = {}
//const b: any = 2
//let f: (a: number, b: number) => number
//const g = <T>(a: T, b: T): T => a + b

/*
const num: number = 10
const str: string = <string><any>num
const s: string = num as any as string
// это ковариантность и контвариантность
// потому что мы не может привести 1 узкий тип к другому узкому типу потому что они друг друга не включают
// то есть нет пересечения в них string and number these types are not intersects -> because they are difference totally

// должно один тип данных включать (содержать в себе другой тип данных) и не нужно будет приводит их к any
const any: any = 'hello world'
const string: number = (<string>any).length

const data: number | string = 10
const boolean: boolean = <boolean><any>data

type One = 1 | 2 | 3 | number | boolean
let one: One = 1
one = 2
one = 3
//one = 4

type Two = 'a' | 'b' | 'c' | true | {}
let two: Two = 'a'
//two = 'v'

type Unit = { a: string } | { b: string }
let unit: Unit = { a: '' }
unit = { b: '' }
//unit = { a: '', b: '', c: '' }
//unit = {}

type O = { a: string, b: string }
//const o: O = { a: '', b: '', c: '' }

/*-- the same --*/

/*interface U { a: string, b: string }
//const u: U = { a: '', b: '', c: '' }

const arr: (number | string)[] = ['1', 2]
const a: (Partial<O>)[] = [{ a: '' }]

type B = Readonly<keyof U> // 'a' | 'b'
const b: B = 'a'

enum A { a, b, c }
const enum C { c, d, e }

// the same -> interfaces and types //

interface Hotel {
  readonly name: string
  readonly location: string
}

interface InternalHotel extends Hotel {
  readonly city: string
}

type H = {
  readonly name: string
  readonly location: string
}

type InternalH = H & {
  readonly city: string
}

// the same -> interfaces and types //

type I<T> = T
const i: I<string> = 'hello world'

type F = I<10>
const f: F = 10 // 11 -> only 10
// потому что тип - это множесто значений над которыми отпределены действия
// здесь у нас множество (тип F) состоит из единственно значения 10
// на самом деле это тоже самое что и переменной типа number присваивать значение типа string
// будет ошибка потому что значения множества string не входит во множесто number

const echo: <T>(x:T) => T = <T>(x: T): T => x
// description and realization of function 'echo'

interface P {
  readonly name: string
}

type J = {
  readonly name: string
}
// the same J and P
const func = <T extends J/*P*//*>(o: T): T => o

func({ name: '' })
func({ name: '2' })

interface K {
  readonly a: boolean
  readonly b: boolean
}

type M = keyof K // 'a' | 'b'

// check for correct key in object
const checkKey = <O, K extends keyof O>(o: O, key: K) => o[key]

//checkKey({ name: '' }, hello)

const initialState = { name: '', password: '' }
type State = Readonly<typeof initialState>

type T = keyof { name: '1' }

// utilies

// 1. Partial
type Persone = { name: '', password: '' }
type Register = Partial<Persone>

type MyPartial<T> = { [P in keyof T]?: T[P] }
type Persone1 = MyPartial<Persone>

// 2. Required
type Animal1 = { name?: string, age?: number }
type Animal2 = Required<Animal1>

type MyRequired<T> = { [P in keyof T]-?: T[P] }
type Animal3 = MyRequired<Animal1>

// 3. NonNullable
type Color1 = string | null | undefined | unknown | number
type Color2 = NonNullable<Color1>

type MyNonNullable<T> = T extends null | undefined ? never : T
type Color3 = MyNonNullable<Color1>

// 4. Record
type Dimention1 = { weigth: number, length: number, height: number }
type Dimention2 = Record<'weigth' | 'height' | 'length', number>

type MyRecord<K extends keyof any, T> = { [P in K]: T }
type Dimention3 = MyRecord<'weigth' | 'height' | 'length', number>

// 5. Readonly
type Article = { name: string, title: string }
type Article1 = Readonly<Article>

const article1 = { name: '', title: '' } as const
const article2 = <const>{ name: '', title: '' }

type MyReadonly<T> = { readonly [P in keyof T]: T[P] }
type Article2 = MyReadonly<Article>

// 6. ReadonlyArray
type Articles = ReadonlyArray<Article1>

const articles1: Articles = [{ name: '', title: '' }]
//articles1.push({ name: '', title: '' })

const articles2 = <const>[{ name: '', title: '' }]

// 7.
type Vector1 = { x: number, y: number, z: number }
type Vector2 = Pick<Vector1, 'x' | 'y'>

type MyPick<T, K extends keyof T> = { [P in K]: T[K] }
type Vector3 = MyPick<Vector1, 'x'>

// 8. Extract (take what they have in common)
type V = number | string | boolean
type G = number | string

type W = Extract<V, G>

type MyExtruct<T, U> = T extends U ? T : never
type Q = MyExtruct<V, G>

// 9. Exclude
type E = Exclude<V, G>
type MyExclude<T, U> = T extends U ? never: T
type Ta= MyExclude<V, G>

// 10. Omit
type User = { name: string, age: number }
type User1 = Omit<User, 'name'>
type MyOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>
type User2 = MyOmit<User, 'name'>

// Bigint

console.log(Number.MAX_VALUE)
console.log(Number.MAX_SAFE_INTEGER)

// ?? ?.

const abc: number | undefined = undefined
const st: number = abc ?? 10

function test(a: number, b: number, c?: (d: number) => void) {
  const d: number = a + b
  c?.(d)
  return d
}

const g: null | undefined | number = void 0
const ag: number = 10

const su = g! + ag
*/
/*
interface Hotel {
  readonly name: string
  readonly location: string
}

const hotel1: Hotel = {
  name: "test",
  location: "test"
}

const hotel2: Hotel = {
  name: "test",
  location: "test"
}

const hotels: Hotel[] = [hotel1, hotel2]

const fn = (): (number | Hotel[])[] => [hotels, 2]

console.log({ result: fn() })

interface Photo {
  readonly type: string
  readonly url: string
}

interface Video {
  id: number
  type: string
  preview_url: string
  url: string
  name: string
  pos_seconds?: number
  hotelId: string;
  isMain: boolean
}
/*
const photo1: Photo = { type: "1", url: "1" }
const photo2: Photo = { type: "2", url: "2" }
const photo3: Photo = { type: "3", url: "3" }
*/
interface Video {
  readonly id: number,
  readonly type: string,
  readonly preview_url: string,
  readonly url: string,
  readonly name: string,
  readonly pos_seconds: number,
  readonly hotelId: string,
  readonly isMain: boolean
}

const video1 = {
  id: 1,
  type: "type 1",
  preview_url: "string",
  url: "string",
  name: "string",
  pos_seconds: 21,
  hotelId: "id for test",
  isMain: true,
  test: "hello world"
}

const video2 = {
  id: 2,
  type: "type 2",
  preview_url: "string 2",
  url: "string 2",
  name: "string 2",
  pos_seconds: 12,
  hotelId: "id for test 2",
  isMain: false,

  test: "hello world"
}

interface ListHotel extends Video {
  readonly test: string
}

const videos: ListHotel[] = [video1, video2]

interface MediaItem {
  readonly type: string
  readonly url: string
}

const photos: MediaItem[] = [
  { type: "test", url: "test" },
  { type: "test21", url: "test21" }
]

interface VideoItem {
  id: number
  type: string
  preview_url: string
  url: string
  name: string
  pos_seconds?: number
  hotelId: string
  isMain: boolean
}

const videoItem1: VideoItem = {
  id: 1,
  type: "type 1",
  preview_url: "string",
  url: "string",
  name: "string",
  pos_seconds: 21,
  hotelId: "id for test",
  isMain: true,
}

const videoItem2: VideoItem = {
  id: 2,
  type: "type 2",
  preview_url: "string 2",
  url: "string 2",
  name: "string 2",
  pos_seconds: 12,
  hotelId: "id for test 2",
  isMain: false,
}

const videoItems = [videoItem1, videoItem2]


const mediaItems: (VideoItem | MediaItem)[] = [ /*...(videoItems || []),*/ ...photos ]
console.log({ mediaItems })














//
