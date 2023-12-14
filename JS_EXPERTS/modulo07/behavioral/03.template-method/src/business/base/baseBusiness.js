import { NotImplementedException } from "../../util/exceptions.js"

export default class BaseBusiness {
  _validateRequiredFields(data) {
    throw new NotImplementedException(this._validateRequiredFields.name)
  }

  _create(data) {
    throw new NotImplementedException(this._create.name)
  }

  /**
   * Padrão do MartinFowler
   * A proposta do padrão é garantir um fluxo de métodos, definindo uma sequência a ser executadqa.
   * Esse create é a implementação efetiva do Template Method
   * @param {} data 
   */
  create(data) {
    // validar campos
    // salvar no banco
    const isValid = this._validateRequiredFields(data)

    if (!isValid) throw new Error('invalid data!')

    return this._create(data)
  }
}