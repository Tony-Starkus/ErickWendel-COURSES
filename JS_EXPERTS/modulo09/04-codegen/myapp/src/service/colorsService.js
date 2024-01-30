
export default class ColorsService {
  constructor({repository: colorsRepository}) {
    this.colorsRepository = colorsRepository
  }

  create(data) {
    return this.colorsRepository.create(data)
  }

  read(query) {
    return this.colorsRepository.read(query)
  }

  update(id, data) {
    return this.colorsRepository.update(id, data)
  }

  delete(id) {
    return this.colorsRepository.delete(id)
  }
}
