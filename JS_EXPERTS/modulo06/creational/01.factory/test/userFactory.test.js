const rewiremock = require('rewiremock/node');
const { deepStrictEqual } = require('assert');

// Poderia estar em outro arquivo
const dbData = [{ name: 'Mariazinha' }, { name: 'Joaozin' }]
class MockDatabase {
  async connect() {
    return this
  }

  async find(query) {
    return dbData
  }
}
// Poderia estar em outro arquivo

rewiremock(() => require('../src/utils/database.js')).with(MockDatabase)

  ; (async () => {

    {
      const expected = [{ name: 'MARIAZINHA' }, { name: 'JOAOZIN' }]
      rewiremock.enable()
      const UserFactory = require('../src/factory/userFactory');

      const userFactory = await UserFactory.createInstance()
      const result = await userFactory.find()
      deepStrictEqual(result, expected)
      rewiremock.disable()
    }


    {
      const expected = [{ name: 'ERICKWENDEL' }]
      const UserFactory = require('../src/factory/userFactory');

      const userFactory = await UserFactory.createInstance()
      const result = await userFactory.find()
      deepStrictEqual(result, expected)
    }

  })()
