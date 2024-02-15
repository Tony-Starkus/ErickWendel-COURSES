import Benchmark from "benchmark";
import CartIdNew from "./cart-id-new.js";
import CartIdOld from "./cart-id-old.js";

import CartRmPropOld from './cart-rm-prop-old.js'
import CartRmPropNew from './cart-rm-prop-new.js'

import CartPriceOld from './cart-price.old.js'
import CartPriceNew from './cart-id-new.js'

import database from '../database.js'

const data = {
  products: [
    {
      id: 'ae',
      n: undefined,
      abc: undefined,
      a: null,
      b: 123
    },
    {
      id: 'ae',
      n: undefined,
      abc: undefined,
      a: null,
      b: 123
    },
    {
      id: 'ae',
      n: undefined,
      abc: undefined,
      a: null,
      b: 123
    }
  ]
}

const suit = new Benchmark.Suite;

// suit.
//   add('Cart#cartIdUUID', function () {
//     new CartIdOld()
//   })
//   .add('Cart#cartIdCrypto', function () {
//     new CartIdNew()
//   })
//   .on('cycle', (event) => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//   })
//   .run()


// suit
//   .add('Cart#rmEmptyPropsMapReduce', function () {
//     new CartRmPropOld(data)
//   })
//   .add('Cart#rmEmptyPropsFor', function () {
//     new CartRmPropNew(data)
//   })
//   .on('cycle', (event) => console.log(String(event.target)))
//   .on('complete', function () {
//     console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//   })
//   .run({ async: true })


suit
  .add('Cart#calcPriceMapReduce', function () {
    new CartPriceOld(database)
  })
  .add('Cart#calcPriceFor', function () {
    new CartPriceNew(database)
  })
  .on('cycle', (event) => console.log(String(event.target)))
  .on('complete', function () {
    console.log(`Fastest is ${this.filter('fastest').map('name')}`)
  })
  .run({ async: true })