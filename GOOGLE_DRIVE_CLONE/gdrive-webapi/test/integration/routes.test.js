import { describe, test, expect, beforeEach, beforeAll, afterAll, jest } from '@jest/globals'
import fs from 'fs'
import { resolve } from 'path'
import { pipeline } from 'stream/promises'
import { tmpdir } from 'os'
import FormData from 'form-data'
import { join } from 'path'
import UploadHandler from '../../src/uploadHandler.js'
import TestUtil from '../_util/testUtil.js'
import { logger } from '../../src/logger.js'
import Routes from '../../src/routes.js'


describe('#Routes Integration Test', () => {
  let defaultDownloadsFolder = ''

  beforeAll(async () => {
    defaultDownloadsFolder = await fs.promises.mkdtemp(join(tmpdir(), 'downloads-'))
  })

  afterAll(async () => {
    await fs.promises.rm(defaultDownloadsFolder, { recursive: true })
  })

  beforeEach(() => {
    jest.spyOn(logger, 'info').mockImplementation()
  })

  describe('#getFileStatus', () => {
    const ioObj = {
      to: (id) => ioObj,
      emit: (event, message) => { }
    }


    test.only('should upload file to the folder', async () => {
      const filename = 'image.jpg'
      const fileStream = fs.createReadStream(`./test/integration/mocks/${filename}`)
      const response = TestUtil.generateWritableStream(() => { })

      const form = new FormData()
      form.append('photo', fileStream)

      const defaultParams = {
        request: Object.assign(form, {
          headers: form.getHeaders(),
          method: 'POST',
          url: '?socketId=01'
        }),
        response: Object.assign(response, {
          setHeader: jest.fn(),
          writeHead: jest.fn(),
          end: jest.fn()
        }),
        values: () => Object.values(defaultParams)
      }

      const routes = new Routes(defaultDownloadsFolder)
      routes.setSocketInstance(ioObj)

      let dirBeforeRun = await fs.promises.readdir(defaultDownloadsFolder)
      expect(dirBeforeRun).toEqual([])

      routes.handler(...defaultParams.values())

      await new Promise((r) => setTimeout(r, 10));
      const dirAfter = await fs.promises.readdir(defaultDownloadsFolder)

      expect(dirAfter).toEqual([filename])
      expect(defaultParams.response.writeHead).toHaveBeenCalledWith(200)

      const expectedResult = { result: 'Files uploaded with success!' }
      expect(defaultParams.response.end).toHaveBeenCalledWith(JSON.stringify(expectedResult))
    })
  })
})
