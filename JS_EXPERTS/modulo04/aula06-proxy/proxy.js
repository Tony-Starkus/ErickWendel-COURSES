'use strict';

const Event = require('events')

const event = new Event()

const eventName = 'counter'

event.on(eventName, msg => console.log('counter updated', msg))

// event.emit(eventName, 'oi')
// event.emit(eventName, 'tchau')

const myCounter = {
  counter: 0
}

const proxy = new Proxy(myCounter, {
  set: (target, propertyKey, newValue) => {
    event.emit(eventName, { newValue, key: target[propertyKey] })
    target[propertyKey] = newValue
    return true;
  },
  get: (object, prop) => {
    console.log('chamou!', { object, prop })
    return object[prop]
  }
})

setInterval(function () {
  proxy.counter += 1

  if (proxy.counter === 10) {
    clearInterval(this)
  }
}, 1000)

// executa agora, agorinha, mas acaba com o ciclo de vida do node
process.nextTick(() => {
  console.log('[0] nextTick')
})

// Se quer que execute agora
setImmediate(() => {
  console.log('[1]: setImmediate', proxy.counter)
})
