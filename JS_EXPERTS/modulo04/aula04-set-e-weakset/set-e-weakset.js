const assert = require('assert')

// Usado na maioria das vezes para Listas de itens únicos

const arr1 = ["0", "1", "2"]
const arr2 = ["2", "0", "3"]
const arr3 = arr1.concat(arr2)

assert.deepStrictEqual(arr3.sort(), ['0', '0', '1', '2', '2', '3'])

const set = new Set()
arr1.map(item => set.add(item))
arr2.map(item => set.add(item))

// console.log(set)
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3'])
assert.deepStrictEqual(Array.from(new Set([...arr1, ...arr2])), ['0', '1', '2', '3'])

console.log('set.keys', set.keys())
console.log('set.values', set.values()) // Só existe por conta do Map

// No array comum, para saber se um item existe
// [].indexOf('1) !== -1 ou [0].includes(0)
assert.ok(set.has('3'))

// Mesma teoria do Map, mas você sempre trabalha com a lista toda
// não tem get,então você pode saber se o item está no array ou não e é isso.
// na documentação tem exemplo sobre como fazer uma interceção, saber o que tem em uma lista e não tem na outra

// Tem nos dois arrays

const user01 = new Set([
  'erick',
  'maria',
  'joão'
])

const user02 = new Set([
  'joãozinho',
  'erick',
  'julio'
])

const intersection = new Set([...user01].filter(user => user02.has(user)))
assert.deepStrictEqual(Array.from(intersection), ['erick'])

const difference = new Set([...user01].filter(user => !user02.has(user)))
assert.deepStrictEqual(Array.from(difference), ['maria', 'joão'])

// WeakSet
// Mesma ideia do WeakMap
// Não é enumerável (iterável)
// Só trabalha com chaves como referência
// Só tem métodos simples

const user = { id: 123 }
const user2 = { id: 321 }

const weakSet = new WeakSet([user])
weakSet.add(user2)
weakSet.delete(user)
weakSet.has(user)
