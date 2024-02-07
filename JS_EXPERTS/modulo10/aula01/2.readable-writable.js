import { Readable, Writable } from 'stream';

// fonte de dados
const readable = Readable({
  read() {
    this.push('Hello world 1')
    this.push('Hello world 2')
    this.push('Hello world 3')

    // Informa que os dados acabaram
    this.push(null)
  }
})

// saída de dados
const writable = Writable({
  write(chunck, enconding, callback) {
    console.log('msg', chunck.toString())
    callback()
  }
})

// writable é sempre a saída -> imprimir, salvar ou ignorar
readable.pipe(writable)