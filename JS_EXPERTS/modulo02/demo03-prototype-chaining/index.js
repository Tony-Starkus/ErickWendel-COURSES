const assert = require('assert')
const obj = {}
const arr = []
const fn = () => { }

// Internamente, objetos literais viram funções explicitas
console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__)
assert.deepStrictEqual(new Object().__proto__, {}.__proto__)

// __proto__ é a referência do objeto que possui as propriedades nele
console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype)
assert.deepStrictEqual(obj.__proto__, Object.prototype)

console.log('arr.__proto__ === Array.prototype', arr.__proto__ === Array.prototype)
assert.deepStrictEqual(arr.__proto__, Array.prototype)

console.log('fn.__proto__ === Function.prototype', fn.__proto__ === Function.prototype)
assert.deepStrictEqual(fn.__proto__, Function.prototype)

// O __proto__ de Object.prototype é null
console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null)
assert.deepStrictEqual(obj.__proto__.__proto__, null)

console.log('-----------')

function Employee() { }
Employee.prototype.salary = () => "salary**"
console.log(Employee.prototype.salary())

function Supervisor() { }
// Herança. Herda a instância de employee
Supervisor.prototype = Object.create(Employee.prototype)
Supervisor.prototype.profitShare = () => "profitShare**"

function Manager() { }
Manager.prototype = Object.create(Supervisor.prototype)
Manager.prototype.monthlyBonuses = () => 'monthlyBonuses**'

// Podemos chamar via prototype, mas se tentar chamar direto da erro!
console.log(Manager.prototype.salary())
// console.log(Manager.salary())  // Não funciona

// Se não chamar o 'new', o primeiro __proto__ vai ser sempre a instância de Function, sem herdar
// Para acessar as classes sem o new, pode acessar direto via prototype
console.log('Manager.prototype.__proto__ === Supervisor.prototype', Manager.prototype.__proto__ === Supervisor.prototype)
assert.deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype)

console.log('-----------')

// Quando chamamos o 'new', o __proto__ recebe o prototype
console.log('manager.__proto__', new Manager().__proto__, 'manager.salary()', new Manager().salary())
console.log('Supervisor.prototype === new Manager().__proto__.__proto__', Supervisor.prototype === new Manager().__proto__.__proto__)
assert.deepStrictEqual(Supervisor.prototype, new Manager().__proto__.__proto__)

const manager = new Manager()
console.log('manager.salary()', manager.salary())
console.log('manager.profitShare()', manager.profitShare())
console.log('manager.monthlyBonuses()', manager.monthlyBonuses())

console.log('manager.__proto__', manager.__proto__)
assert.deepStrictEqual(manager.__proto__, Manager.prototype)

console.log('manager.__proto__.__proto__', manager.__proto__.__proto__)
assert.deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype)

console.log('manager.__proto__.__proto__.__proto__', manager.__proto__.__proto__.__proto__)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype)

console.log('manager.__proto__.__proto__.__proto__.__proto__', manager.__proto__.__proto__.__proto__.__proto__)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype)

console.log('manager.__proto__.__proto__.__proto__.__proto__.__proto__', manager.__proto__.__proto__.__proto__.__proto__.__proto__)
assert.deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null)

console.log('-----------')

class T1 {
  ping() { return 'ping' }
}

class T2 extends T1 {
  pong() { return 'pong' }
}

class T3 extends T2 {
  shoot() { return 'shoot' }
}

const t3 = new T3()

console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null)
console.log('t3.ping()', t3.ping())
console.log('t3.pong()', t3.pong())
console.log('t3.shoot()', t3.shoot())

assert.deepStrictEqual(t3.__proto__, T3.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__, T2.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype)
assert.deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null)
