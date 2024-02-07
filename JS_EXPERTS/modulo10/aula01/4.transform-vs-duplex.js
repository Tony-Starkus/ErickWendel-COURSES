import { Duplex, Transform } from 'stream'

let count = 0;

const server = new Duplex({
  objectMode: true, // Faz não precisar trabalhar com buffer => gasta mais memória
  encoding: 'utf-8',

  read() {
    const everySecond = (intervalContext) => {
      if (count++ <= 5) {
        this.push(`My name is Thalisson[${count}]`)
        return
      }
      clearInterval(intervalContext)
      this.push(null)
    }

    setInterval(function () { everySecond(this) })
  },

  // É como se fosse um objeto completamente diferente
  write(chunck, enconding, callback) {
    console.log(`[writable] saving`, chunck)

  }
})

// Provar que são canais de comunicação diferentes!
// write aciona o writable do Duplex
server.write('[duple] hey this is a writable\n')
// server.on('data', msg => console.log(`[readable]${msg}`))

// o push deixa você enviar mais dados
server.push(`[duplex] hey this is also a readable`)

const transformToUpperCase = Transform({
  objectMode: true,
  transform(chunk, enc, cb) {
    cb(null, chunk.toUpperCase())
  }
})

// O transform é também um duplex, mas não possue comunicação independente
transformToUpperCase.write('[transform] hello from write')
// O push vai ignorar o que você tem na função transform
transformToUpperCase.push('[transform] hello from push\n')

server
  .pipe(transformToUpperCase)
  // Redireciona todos os dados de readable para a writable da duplex
  .pipe(server)
