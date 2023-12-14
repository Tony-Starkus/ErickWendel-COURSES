const { evaluateRegex } = require('./util')
const Person = require('./person.js')
/**
 * O objetivo do Fluent API é executar tarefas com um pipeline, step by step,
 * e no fim chama o build.
 * 
 * Muito similitar ao padrão Builder, a diferença é que aqui é sobre processos,
 *  no Builder é sobre construção de objetos.
 */
class TextProcessorFluentAPI {
  // Propriedade privada!
  #content

  constructor(content) {
    this.#content = content
  }

  extractPeopleData() {
    /**
     * ?<= fala que vai extrair os dados que virão depois desse grupo
     * [contratante|contrada] ou um ou outro, (e tem a flag no fim da expressão para pegar maiusculo e minusculo)
     * :\s{1} vai procurar o caracter literal do dois pontos seguido de um espaço
     * tudo acima fica dentro de um parenteses para falar "vamos pegar daí para frente"
     * 
     * (?!\s) negative look around, vai ignorar os contratantes do fim do documento (que tem só espaço a frente deles)
     * .*\n pega qualquer coisa até o primeiro \n
     * .*? non greenty, esse ? faz com ele pare na primeira recorrencia, assim ele evitar ficar em loop
     * 
     * $ informar que acaba no fim da linha
     * 
     * g -> global
     * m -> multiline
     * i -> insensitive
     */
    const matchPerson = /(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi
    const onlyPerson = this.#content.match(matchPerson)
    // console.log(onlyPerson)

    this.#content = onlyPerson
    return this
  }

  divideTextInColumns() {
    const splitRegex = evaluateRegex(/,/)

    this.#content = this.#content.map(line => line.split(","))

    return this
  }

  removeEmptyCharacters() {
    const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
    this.#content = this.#content.map(line => line.map(item => item.replace(trimSpaces, "")))

    return this
  }

  mapPerson() {
    this.#content = this.#content.map(line => new Person(line))
    return this
  }

  build() {
    return this.#content
  }

}

module.exports = TextProcessorFluentAPI