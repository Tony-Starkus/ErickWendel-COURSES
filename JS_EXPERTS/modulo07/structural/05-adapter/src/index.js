import RickAndMortyBRLAdapter from './business/adapters/rickAndMortyBRLAdapater.js'
import RickAndMortyUSAAdapter from './business/adapters/rickAndMortyUSAAdapater.js'

const data = [RickAndMortyBRLAdapter, RickAndMortyUSAAdapter].map(integration => integration.getCharacters())

const all = await Promise.allSettled(data)

const successes = all.filter(({ status }) => status === 'fulfilled')
  .map(({ value }) => value)
  .reduce((prev, next) => prev.concat(next), [])

const errors = all.filter(({ status }) => status === 'rejected')

console.table(successes)
console.table(errors)