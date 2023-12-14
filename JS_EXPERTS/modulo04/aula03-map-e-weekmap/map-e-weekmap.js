const assert = require('assert')

const myMap = new Map()

// Podem ter qualquer coisa como chave
myMap.set(1, 'one').set('Erick', { text: 'two' }).set(true, () => 'hello')

// Usando um construtor
const myMapWithConstructor = new Map([
  ['1', 'str1'],
  [1, 'num1'],
  [true, 'bool1']
])

console.log('myMap', myMap)
// console.log('myMap.get(1)', myMap.get(1))
assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('Erick'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// Em objetos, a chave só pode ser string ou symbol (number é coergido a string)
const onlyReferenceWorks = { id: 1 }
myMap.set(onlyReferenceWorks, { name: 'ErickWendel' })
// console.log('get', myMap.get({ id: 1 }))
// console.log('get', myMap.get(onlyReferenceWorks))
assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'ErickWendel' })

// Utilitários
// - No object seria Object.keys({a: 1}).length
assert.deepStrictEqual(myMap.size, 4)

// Para verificar se um item existe
// item.key => se não existir retorna undefined
assert.ok(myMap.has(onlyReferenceWorks))

// para remover um item do objeto
// delete item.id (não é performático)

assert.ok(myMap.delete(onlyReferenceWorks))

// Não dá pra iterar em Objects diretamente
// Tem que transformar com o Object(item)
assert.deepStrictEqual(JSON.stringify([...myMap]), JSON.stringify([[1, "one"], ["Erick", { "text": "two" }], [true, () => { }]]))

// Object é inseguro, pois dependendo do nome da chave, pode substituir algum comportamento
// ({}).toString() => '[object Object]'
// ({soString: () => 'Hey}).toString() => 'Hey
// Qualquer chave pode colidir com as propriedades herdadas do objecto, como
// constructor, toString, valueOf, etc.

const actor = {
  name: 'João',
  toString: 'João Hey'
}

// Não tem restrição de chave
myMap.set(actor)

assert.deepStrictEqual(myMap.has(actor), true)
assert.throws(() => myMap.get(actor).toString(), TypeError)

// Não dá para limpar um objeto sem reassina-lo
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// ---- WeakMap
// Pode ser coletado após perder as referências
// Usado em casos bem específicos

// Tem a maioria dos benefícios do Map, MAS NÃO É ITERÁVEL
// Só chaves de referência e que você já conheça
// Mais leve e prevê leak de memória, porque depois que as instâncias saem da memória, tudo é limpo

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)
