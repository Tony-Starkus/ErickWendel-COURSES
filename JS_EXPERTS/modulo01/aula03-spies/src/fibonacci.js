class Fibonacci {
  /**
   * O asterisco indica que a função é executada sob demanda e não acumula em memória
   */
  * execute(input, current = 0, next = 1) {

    // Processou todas as sequências e para!
    if (input === 0) {
      return
    }

    // Retorna o valor
    yield current

    // Delega a função mas não retorna valor!
    yield* this.execute(input - 1, next, current + next)

    // yield 0
    // yield 1
    // yield 2
    // yield 3
  }
}

module.exports = Fibonacci
