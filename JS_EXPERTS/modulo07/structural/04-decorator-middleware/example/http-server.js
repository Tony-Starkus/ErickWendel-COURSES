InjectHttpInterceptor()

import Http from 'http'
import { InjectHttpInterceptor } from '../index.js'

function handleRequest(request, response) {
  response.end('Hello world!')
}

const server = Http.createServer(handleRequest)
const port = 3000
server.listen(port, () => console.log('server runing at', server.address().port))
