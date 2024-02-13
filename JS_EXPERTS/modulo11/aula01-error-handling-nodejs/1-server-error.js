import Http from 'http'

let counter = 1;

async function handler(request, response) {
  counter++
  try {

    if (counter % 2 === 0) {
      await Promise.reject('error dentro do for!')
    }

    for await (const data of request) {
      try {
        if (counter % 2 === 0) {
          await Promise.reject('error dentro do for!')
        }

      } catch (error) {
        console.log('a request error has happened', error)
        response.writeHead(500)
        response.write(JSON.stringify({ message: 'internal server error' }))
      } finally {
        response.end()
      }
    }
  } catch (error) {
    console.log('a server error has happened', error)
    response.writeHead(500)
    response.write(JSON.stringify({ message: 'internal server error' }))
    response.end()
  }
}

Http.createServer(handler).listen(3000, () => console.log('running at 3000'))

