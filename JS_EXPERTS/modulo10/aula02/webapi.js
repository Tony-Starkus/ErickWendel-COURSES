import http from 'http'
import { Readable } from 'stream'

function api1(req, res) {

  // res.write('test01\n')
  // res.write('test02\n')
  // res.write('test03\n')

  // req.pipe(res)

  let count = 0;
  const maxItems = 99;

  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(JSON.stringify({ id: Date.now() + count, name: `Thalisson-${count}` }) + "\n")
          return
        }
        clearInterval(intervalContext)
        this.push(null)
      }

      setInterval(function () { everySecond(this) })
    },
  })

  readable.pipe(res)
}

function api2(req, res) {

  let count = 0;
  const maxItems = 99;

  const readable = Readable({
    read() {
      const everySecond = (intervalContext) => {
        if (count++ <= maxItems) {
          this.push(JSON.stringify({ id: Date.now() + count, name: `Zézin-${count}` }) + "\n")
          return
        }
        clearInterval(intervalContext)
        this.push(null)
      }

      setInterval(function () { everySecond(this) })
    },
  })

  readable.pipe(res)
}

http.createServer(api1).listen(3000, () => console.log('Server runing ata 3000'))
http.createServer(api2).listen(4000, () => console.log('Server runing ata 3000'))
