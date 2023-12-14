'use strict';

const assert = require('assert')

// Garantir a semântica e segurança em objetos

// ----- apply
const myObj = {
  add(myValue) {
    return this.arg1 + this.arg2 + myValue
  }
}

// Function.prototype.apply = () => { throw new TypeError('Eita!') }
// myObj.add.apply = function () { throw new Error('Vixi') }

assert.deepStrictEqual(myObj.add.apply({ arg1: 10, arg2: 20 }, [100]), 130)

// Um problema que pode acontecer (raro)
// Function.prototype.apply = () => {throw new TypeError('Eita!')}

// Esse aqui pode acontecer!
myObj.add.apply = function () { throw new TypeError('Vixi') }
assert.throws(
  () => myObj.add.apply({}, []),
  {
    name: 'TypeError',
    message: "Vixi"
  }
)

// Usando reflect:
const result = Reflect.apply(myObj.add, { arg1: 40, arg2: 20 }, [200])
assert.deepStrictEqual(result, 260)
// ----- apply


// Questões semânticas
// ----- defineProperty
function MyDate() { }

// Feio, tudo é object, mas object adicionando props a uma function?
Object.defineProperty(MyDate, 'withObject', { value: () => 'Hey there' })

Reflect.defineProperty(MyDate, 'withReflection', { value: () => 'Hey dude' })

assert.deepStrictEqual(MyDate.withObject(), 'Hey there')
assert.deepStrictEqual(MyDate.withReflection(), 'Hey dude')
// ----- defineProperty



// ----- deleteProperty
const withDelete = { user: 'ErickWendel' }
// Não é performático, evitar ao máximo
delete withDelete.user
assert.deepStrictEqual(withDelete.hasOwnProperty('user'), false)

const withReflection = { user: 'Erick' }
Reflect.deleteProperty(withReflection, 'user')
assert.deepStrictEqual(withReflection.hasOwnProperty('user'), false)
// ----- deleteProperty


// ----- get
// Deveriamos fazer um get somente e instâncias de referência
assert.deepStrictEqual(1['userName'], undefined)

// Com reflection, uma exceção é lançada
assert.throws(() => Reflect.get(1, "userName"), TypeError)
// ----- get



// ----- has
assert.ok('superman' in { superman: '' })
assert.ok(Reflect.has({ batman: '' }, 'batman'))
// ----- has



// ----- ownKeys
const user = Symbol('user')
const databaseUsers = {
  id: 1,
  [Symbol.for('password')]: 123,
  [user]: 'erickwendel'
}

// Com os métodos de object, temos que fazer 2 requisições
const objectKeys = [...Object.getOwnPropertyNames(databaseUsers)]
console.log(databaseUsers)