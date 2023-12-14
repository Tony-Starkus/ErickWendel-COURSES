const { evaluateRegex } = require('../src/util.js')

class Person {

  constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado
  ]) {

    // ^ -> começo da string
    // + -> um ou mais recorrencias
    // (\w{1}) -> Pega só a primeira letra e deixa em um grupo
    // ([a-zA-Z]+$) -> encontra letras
    const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/)

    const formatFirstLetter = (prop) => {
      return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
        return `${group1.toUpperCase()}${group2.toLowerCase()}`
      })
    }

    this.nome = nome
    this.nacionalidade = formatFirstLetter(nacionalidade)
    this.estadoCivil = formatFirstLetter(estadoCivil)
    // Tudo o que não for dígito é removido
    this.documento = documento.replace(evaluateRegex(/\D/g), "")
    this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
    this.numero = numero
    console.log(bairro)
    this.bairro = bairro.match(evaluateRegex(/(?<=\s).*$/gm)).join()
    this.estado = estado.replace(evaluateRegex(/\.$/), "")
  }
}

module.exports = Person