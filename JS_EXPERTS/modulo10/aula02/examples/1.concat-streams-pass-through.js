import axios from 'axios'
import { Writable, PassThrough } from 'stream'

const API_01 = 'http://localhost:3000'
const API_02 = 'http://localhost:4000'

const requests = await Promise.all([
  axios({
    method: 'GET',
    url: API_01,
    responseType: 'stream',
  }),
  axios({
    method: 'GET',
    url: API_02,
    responseType: 'stream',
  })
])

const results = requests.map(({ data }) => data)

const output = Writable({
  write(chunk, enc, callback) {
    const data = chunk.toString().replace(/\n/, "")
    const name = data.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${data}`)
    callback()
  }
})

function merge(streams) {
  return streams.reduce((prev, current, index, items) => {
    // {end:false} impede que a stream feche sozinha
    current.pipe(prev, { end: false })

    // Como colocamos {end: false} nós vamos manipular manualmente quando o current terminar.
    // Quando ele terminar, vamos verificar se todos no pipeline se encerraram, e então ele força a cadeira do anterior
    // a se fechar
    current.on('end', () => items.every(s => s.ended) && prev.end())

    return prev
  }, new PassThrough())
}

const streams = merge(results).pipe(output)

// results[0].pipe(output)
// results[1].pipe(output)
