export default class Person {
  constructor({ id, vehicles, kmTraveled, from, to }) {
    this.id = id
    this.vehicles = vehicles
    this.kmTraveled = kmTraveled
    this.from = from
    this.to = to
  }

  formatted(language) {
    const mapDate = date => {
      const [year, month, day] = date.split('-').map(Number)

      // Datas no JS começam do zero!
      return new Date(year, month - 1, day)
    }
    return {
      id: Number(this.id),
      vehicles: new Intl.ListFormat(language, { style: 'long', type: 'conjunction' }).format(this.vehicles),
      kmTraveled: new Intl.NumberFormat(language, { style: 'unit', unit: 'kilometer' }).format(this.kmTraveled),
      from: new Intl.DateTimeFormat(language, { month: 'long', day: '2-digit' }).format(mapDate(this.from)),
      to: new Intl.DateTimeFormat(language, { month: 'long', day: '2-digit' }).format(mapDate(this.to))
    }
  }

  static generateInstanceFromString(text) {
    const SEPARATOR = ' '
    const [id, vehicles, kmTraveled, from, to] = text.split(SEPARATOR)

    const person = new Person({
      id,
      kmTraveled,
      from,
      to,
      vehicles: vehicles.split(',')
    })

    return person
  }
}