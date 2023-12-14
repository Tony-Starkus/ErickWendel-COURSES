const { it, describe } = require('mocha')
const { expect } = require('chai')
const TextProcessorFluentAPI = require('../src/textProcessorFluentAPI.js')
const mock = require('./mock/valid.js')
const { InvalidRegexError, eva, evaluateRegex } = require('../src/util.js')

describe('Util', () => {
  it('#evaluateRegex should throw an error using an unsafe regex', () => {
    const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/

    expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
  })

  it('#evaluateRegex should not throw an error using a safe regex', () => {
    const safeRegex = /^([a-z])$/
    expect(() => evaluateRegex(safeRegex)).to.not.throw
    expect(evaluateRegex(safeRegex)).to.be.ok
  })
})
