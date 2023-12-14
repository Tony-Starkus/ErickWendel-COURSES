const http = require('http')
const { once } = require('events')
const DEFAULT_USER = {
  username: 'ErickWendel',
  password: '123'
}

const routes = {
  '/contact:get': (request, response) => {
    response.write('contact us page')
    response.end()
  },
  '/login:post': async (request, response) => {
    /**
     * curl localhost:3000/login -X POST --data '{"username": "Erickwendel", "password": "123"}
     */
    const user = JSON.parse(await once(request, "data"))
    const toLower = (text) => text.toLowerCase()
    if (toLower(user.username) !== toLower(DEFAULT_USER.username) || user.password !== DEFAULT_USER.password) {
      response.writeHead(401)
      response.end("Log ing failed!")
      return
    }

    return response.end("Login in succeeded!")
  },
  default(request, response) {
    response.writeHead(404)
    return response.end('not found!')
  }
}

function handler(request, response) {
  const { url, method } = request

  const routeKey = `${url}:${method.toLowerCase()}`
  console.log({ url, method, routeKey })
  const chosen = routes[routeKey] || routes.default

  return chosen(request, response)
}

const app = http.createServer(handler).listen(3000, () => console.log('running at 3000'))


module.exports = app