import axios from 'axios'
import { pipeline } from 'stream/promises'
import { Writable, Stream } from 'stream'

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

// writable stream
async function* output(stream) {
  for await (const chunk of stream) {
    const name = chunk.match(/:"(?<name>.*)(?=-)/).groups.name
    console.log(`[${name.toLowerCase()}] ${chunk}`)
  }
}

// passthrough stream
async function* merge(streams) {
  for (const readable of streams) {
    // Faz trabalhar com objectMode (ao invés de buffer)
    readable.setEncoding('utf-8')

    for await (const chunk of readable) {
      for (const line of chunk.trim().split('/\n/')) {
        yield line
      }
    }
  }
}

await pipeline(
  merge(results),
  output
)
