import { expect, describe, test, jest, beforeEach } from '@jest/globals'
import fs from 'fs/promises'
import axios from 'axios'
import Character from '../../src/entities/character.js'
import RickAndMortyBRL from '../../src/business/integrations/rickAndMortyBRL'

describe('#RickAndMortyBRL', () => {

  beforeEach(() => jest.clearAllMocks())

  test('#getCharactersJSON should return a list of character entity', async () => {
    const response = JSON.parse(await fs.readFile('./test/mocks/characters.json'))
    const expected = response.results.map(char => new Character(char))

    jest.spyOn(axios, 'get').mockResolvedValue({ data: response })

    const result = await RickAndMortyBRL.getCharactersFromJSON()

    expect(result).toStrictEqual(expected)

  })

  test('#getCharactersJSON should return an empty list if the API returns nothing', async () => {
    const response = JSON.parse(await fs.readFile('./test/mocks/characters-empty.json'))
    const expected = response.results;
    jest.spyOn(axios, 'get').mockResolvedValue({ data: expected })

    const result = await RickAndMortyBRL.getCharactersFromJSON()

    expect(result).toStrictEqual(expected)
  })
})
