const Base = require('./base/base')

class CarCategory extends Base {
  /**
   * 
   * @param {Object} param0
   * @param {String} param0.id 
   * @param {String} param0.name
   * @param {Array<String>} param0.carIds
   */
  constructor({ id, name, carIds, price }) {
    super({ id, name })

    this.carIds = carIds
    this.price = price
  }
}

module.exports = CarCategory