const { deepStrictEqual } = require('assert')
let counter = 0
let counter2 = counter

counter2++

console.log('counter', counter)
console.log('counter2', counter2)

// Tipo primitivo gera uma cópia em memória
deepStrictEqual(counter, 0)
deepStrictEqual(counter2, 1)

const item = { counter: 0 }
const item2 = item

item2.counter++

console.log('item', item)
console.log('item2', item2)

// Tipo de referência copia o endereço de memória e aponta para o mesmo lugar
deepStrictEqual(item, { counter: 1 })
item.counter++
deepStrictEqual(item, { counter: 2 })
