'use strict'

/**
 * Добавление элемента в хеш-таблицу O(1)
 * @param {number} key
 * @param {*} value
 */

function find(list, key) {
   for (let i = 0; i < list.length; i++) {
     if (list[i] === key) return true
   }
 }

function erase(list, key) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === key) {
      list[i] = ''
      return true
    }
  }
}

class Map {
  constructor(arr) {
    this._array = arr
  }

  _hashFn(string) {
    let result = 0;
    for (let i = 0; i < string.length; i++) {
        result += string.charCodeAt(i);
    }
    return result % 5;
  }

  add(key) {
      // Вычисление хеш-кода O(1)
      const hashCode = this._hashFn(key)

      // Доступ к списку по индексу, либо создание нового O(1)
      this._array[hashCode] = this._array[hashCode] || new Array();

      // Добавление элемента в конец списка O(1)
      this._array[hashCode].push(key);
  }

  /**
   * Поиск элемента по ключу
   * В лучшем случае -- O(1)
   * В худшем случае -- O(n)
   * @returns {boolean}
   */
  find(key) {
      // Вычисление хеш-кода O(1)
      const hashCode = this._hashFn(key);

      // Доступ к списку по индексу O(1)
      const list = this._array[hashCode];
      console.log({ list })

      // Если списка нет -- возврат false O(1)
      if (!list) {
          return false;
      }

      // Поиск в списке по ключу
      // В лучшем случае -- O(1)
      // В худшем случае -- O(n)
      return find(this._array[hashCode], key);
  }

  /**
   * Удаление элемента по ключу
   * В лучшем случае -- O(1)
   * В худшем случае -- O(n)
   */
  remove(key) {
      // Вычисление хеш-кода O(1)
      const hashCode = this._hashFn(key);

      // Доступ к списку по индексу O(1)
      const list = this._array[hashCode];

      // Если списка нет -- ничего делать не надо O(1)
      if (!list) {
          return;
      }

      // Удаление из списка по ключу
      // В лучшем случае -- O(1)
      // В худшем случае -- O(n)
      return erase(list, key);
  }
}

const map = new Map([
  ['first name'],
  ['second name']
])

map.add('hello world')
console.log(map.find('hello world'))
map.remove('hello world')

console.dir({ map }, { depth: 20 })
