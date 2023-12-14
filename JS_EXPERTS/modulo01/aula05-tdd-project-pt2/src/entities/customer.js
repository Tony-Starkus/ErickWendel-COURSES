const Base = require('./base/base')

class Customer extends Base {
  /**
   * 
   * @param {Object} param0
   * @param {String} param0.id
   * @param {String} param0.name
   * @param {Number} param0.age 
   */
  constructor({ id, name, age }) {
    super({ id, name })

    this.age = age
  }
}

module.exports = Customer