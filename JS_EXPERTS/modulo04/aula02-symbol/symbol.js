const assert = require('assert')

// --- keys
const uniqueKey = Symbol("userName")
const user = {}

user["userName"] = 'value for normal Objects'
user[uniqueKey] = 'value for symbol'

// console.log('getting normal', user.userName)
// console.log('getting symbol', user[Symbol("userName")])
// console.log(user[uniqueKey])

assert.deepStrictEqual(user.userName, "value for normal Objects")
// Sempre único em nível de endereço de memória
assert.deepStrictEqual(user[Symbol("userName")], undefined)
assert.deepStrictEqual(user[uniqueKey], "value for symbol")

// É dificil de pegar, mas não é secreto!
console.log('symbols', Object.getOwnPropertySymbols(user))
console.log('symbols', Object.getOwnPropertySymbols(user)[0])

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey)

// byPass - má prática (nem tem no codebase do node)
user[Symbol.for('password')] = 123
assert.deepStrictEqual(user[Symbol.for('password')], 123)

// Well Know Symbols
const obj = {
  // iterators
  [Symbol.iterator]: () => ({
    items: ['c', 'b', 'a'],
    next() {
      return {
        done: this.items.length === 0,
        // Remove o último item e retorna
        value: this.items.pop()
      }
    }
  })
}

// for (const item of obj) {
//   console.log('item', item)
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c'])

const kItems = Symbol('kItems')

class MyDate {
  constructor(...args) {
    this[kItems] = args.map(arg => new Date(...arg))
  }

  [Symbol.toPrimitive](coercionType) {
    if (coercionType !== 'string') throw new TypeError()

    const itens = this[kItems].map(item => new Intl.DateTimeFormat("pt-BR", { month: 'long', day: '2-digit', year: 'numeric' }).format(item))

    return new Intl.ListFormat("pt-BR", { style: "long", type: "conjunction" }).format(itens)
  }

  get [Symbol.toStringTag]() {
    return 'WHAT?'
  }

  *[Symbol.iterator]() {
    for (const item of this[kItems]) {
      yield item
    }
  }

  async *[Symbol.asyncIterator]() {
    const timeout = ms => new Promise(r => setTimeout(r, ms))

    for (const item of this[kItems]) {
      await timeout(100)
      yield item.toISOString()
    }
  }
}

const myDate = new MyDate(
  [2020, 3, 1],
  [2018, 2, 2]
)

const expectedDates = [new Date(2020, 3, 1), new Date(2018, 2, 2)]

console.log('myDate', myDate)

assert.deepStrictEqual(Object.prototype.toString.call(myDate), '[object WHAT?]')
// console.log('myDate + 1', myDate + 1)
assert.throws(() => myDate + 1, TypeError)
// coerção explícita para chamar o toPrimitive
assert.deepStrictEqual(String(myDate), '01 de abril de 2020 e 02 de março de 2018')

// implementar o interator!
assert.deepStrictEqual([...myDate], expectedDates)

  // ; (async () => {
  //   for await (const item of myDate) {
  //     console.log('asyncIterator', item)
  //   }
  // })()

  ; (async () => {
    for await (const item of myDate) {
      const dates = await Promise.all([...myDate])
      assert.deepStrictEqual(dates, expectedDates)
    }
  })()