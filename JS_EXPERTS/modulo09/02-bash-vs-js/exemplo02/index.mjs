import { setTimeout } from 'timers/promises'
import isSafe from 'safe-regex'

$.verbose = false
await $`sudo docker run -p "8080:80" -d nginx`

await setTimeout(500)

const req = await $`curl --silent localhost:8080`
console.log(`req\n`, req.stdout)

const containers = await $`sudo docker ps`
const exp = /(?<containerId>\w+)\W+(?=nginx)/gm

if (!isSafe(exp)) throw new Error('Unsafe refex!!')


const containerId = containers.toString().match(exp)[0].trim()

const logs = await $`sudo docker logs ${containerId}`
console.log('logs\n', logs.stdout)

const rm = await $`sudo docker rm -f ${containerId}`
console.log('logs\n', rm.stdout)
