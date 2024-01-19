import FluentSQLBuilder from '@tony-starkus/fluentsql'
import database from './database/data.json' with {type: 'json'}

const result = FluentSQLBuilder.for(database).where({ registered: /^(2019|2020)/ }).select(['name']).limit(3).countBy('name').build()
console.log(result)
