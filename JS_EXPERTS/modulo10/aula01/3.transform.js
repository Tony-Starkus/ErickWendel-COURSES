import { Readable, Transform, Writable } from 'stream';
import { WriteStream, createWriteStream } from 'fs'

// Fonte de dados
const readable = Readable({
  read() {

    for (let index = 0; index < 1000000; index++) {
      const person = { id: Date.now() + index, name: `Thalisson-${index}` }
      const data = JSON.stringify(person)
      this.push(data)
    }

    // Informa que os dados acabaram
    this.push(null)
  }
})


// Processamento dos dados
const mapFields = Transform({
  transform(chunk, enconding, callback) {
    const data = JSON.parse(chunk)
    const result = `${data.id},${data.name.toUpperCase()}\n`

    callback(null, result)
  }
})

const mapHeaders = Transform({
  transform(chunk, enconding, callback) {
    this.counter = this.counter ?? 0;

    if (this.counter) {
      return callback(null, chunk)
    }

    this.counter += 1
    callback(null, "id, name\n".concat(chunk))
  }
})


const pipeline = readable
  .pipe(mapFields)
  .pipe(mapHeaders)
  // .pipe(process.stdout)
  .pipe(createWriteStream('my.csv'))

pipeline.on('end', () => console.log('acabou!'))
