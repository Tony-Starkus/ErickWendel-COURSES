import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import RickAndMortyUSA from '../../src/business/integrations/rickAndMortyUSA'
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapater.js'

describe('#RickAndMortyUSA', () => {

  beforeEach(() => jest.clearAllMocks())

  test('#getCharacters should be an adapter for RickAndMortyUSA.getCharactersFromJSON', async () => {
    const usaIntegration = jest.spyOn(
      RickAndMortyUSA,
      RickAndMortyUSA.getCharactersFromXML.name
    ).mockResolvedValue([])

    const result = await RickAndMortyUSAAdapter.getCharacters()
    expect(usaIntegration).toHaveBeenCalled()
  })

})
