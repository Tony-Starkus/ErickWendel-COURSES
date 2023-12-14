'use strict';

const { watch, promises: { readFile } } = require('fs')

class File {
  watch(event, filename) {
    console.log('this', this)
    console.log('arguments', arguments)
    console.log('arguments', Array.prototype.slice.call(arguments))
    this.showContent(filename)
  }

  async showContent(filename) {
    console.log(((await readFile(filename)).toString()))
  }
}

const file = new File();

// Dessa forma ele ignora o 'this' da classe File e herda o 'this' do watch
// watch(__filename, file.watch)

// Alternativa para não herdar o this da função (jeito "feio")
// watch(__filename, (event, filename) => file.watch(event, filename))

// Podemos deixar explicito qual é o contexto que a função deve seguir
// O bind retorna uma função com o 'this' que se mantém sendo o de File, ignorando o watch
// watch(__filename, file.watch.bind(file))

// A diferença entre um e outro é que em um você passa os argumentos como array, e o outro como uma lista de argumentos
file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename)
file.watch.apply({ showContent: () => console.log('call: hey sinon!') }, [null, __filename])
