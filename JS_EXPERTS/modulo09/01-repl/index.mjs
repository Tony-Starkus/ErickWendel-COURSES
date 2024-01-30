import http from 'http'

// curl "localhost:3000?salary=3000&discount=15"

function netSalary({ discount, salary }) {
  const percent = (discount / 100)
  const cost = salary * percent
  const result = salary - cost

  return result
}

http.createServer((req, res) => {
  const url = req.url.replace('/', '')
  console.log(url)
  const params = new URLSearchParams(url)
  console.log(params)
  const data = Object.fromEntries(params)
  console.log(data)
  const result = netSalary(data)


  res.end(result)
}).listen(3000, () => console.log('app runing at 3000'))