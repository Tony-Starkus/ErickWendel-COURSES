const BaseRepository = require('../repository/base/baseRepository')
const Tax = require('../entities/tax')
const Customer = require('../entities/customer')
const CarCategory = require('../entities/carCategory')
const Transaction = require('../entities/transaction')

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars })
    this.taxesBasedOnAge = Tax.taxesBasedOnAge
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  /**
   * 
   * @param {Array} list 
   */
  getRandomPositionFromArray(list) {
    const listLength = list.length;

    return Math.floor(Math.random() * listLength)
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomCarIndex]

    return carId
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory)
    const car = await this.carRepository.find(carId)
    return car
  }

  /**
   * 
   * @param {Customer} customer 
   * @param {CarCategory} carCategory 
   * @param {Number} numberOfDays 
   */
  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer
    const price = carCategory.price
    const { then: tax } = this.taxesBasedOnAge.find(tax => age >= tax.from && age <= tax.to)

    const finalPrice = ((tax * price) * (numberOfDays))
    const formattedPrice = this.currencyFormat.format(finalPrice)
    return formattedPrice
  }

  /**
   * 
   * @param {Customer} customer 
   * @param {CarCategory} carCategory 
   * @param {Number} numberOfDays 
   */
  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = await this.calculateFinalPrice(customer, carCategory, numberOfDays)

    const today = new Date()
    today.setDate(today.getDate() + numberOfDays);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
    const dueDate = today.toLocaleDateString("pt-br", options)

    const transation = new Transaction({ customer, car, amount: finalPrice, dueDate })

    return transation
  }
}

module.exports = CarService