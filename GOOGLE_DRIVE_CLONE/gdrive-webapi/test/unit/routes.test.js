import { describe, test, expect, jest } from '@jest/globals'
import Routes from '../../src/routes.js'
import TestUtil from '../_util/testUtil.js'
import UploadHandler from '../../src/uploadHandler.js'


describe('#Routes test suite', () => {
  const request = TestUtil.generateReadableStream(['some file bytes'])
  const response = TestUtil.generateWritableStream(() => { })
  const defaultParams = {
    request: Object.assign(request, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      method: '',
      body: {}
    }),
    response: Object.assign(response, {
      setHeader: jest.fn(),
      writeHead: jest.fn(),
      end: jest.fn(),
    }),

    values: () => Object.values(defaultParams)
  }

  describe('#setSocketInstance', () => {
    test('setSocket should store io instance', () => {
      const routes = new Routes()
      const ioObj = {
        to: id => ioObj,
        emit: (event, message) => { }
      }

      routes.setSocketInstance(ioObj)
      expect(routes.io).toStrictEqual(ioObj)

    })
  })

  describe('#handler', () => {

    test('given an inexistent route it should choose default route', async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams
      }

      params.request.method = 'inexistent'

      await routes.handler(...params.values())
      expect(params.response.end).toHaveBeenCalledWith('hello world')
    })

    test('it should set any request with CORS enabled', async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams
      }

      params.request.method = 'inexistent'

      routes.handler(...params.values())
      expect(params.response.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*')
    })

    test('given method OPTIONS it should choose options route', () => {
      const routes = new Routes();
      const params = {
        ...defaultParams
      }

      params.request.method = 'OPTIONS'

      routes.handler(...params.values())
      expect(params.response.writeHead).toHaveBeenCalledWith(204)
      expect(params.response.end).toHaveBeenCalled()
    })

    test('given method POST it should choose post route', async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams
      }
      jest.spyOn(routes, 'post').mockResolvedValue()

      params.request.method = 'POST'

      await routes.handler(...params.values())
      expect(params.response.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*')
    })

    test('given method GET it should choose get route', async () => {
      const routes = new Routes();
      const params = {
        ...defaultParams
      }
      jest.spyOn(routes, 'get').mockResolvedValue()

      params.request.method = 'GET'

      await routes.handler(...params.values())
      expect(params.response.setHeader).toHaveBeenCalledWith('Access-Control-Allow-Origin', '*')
    })
  })

  describe('#get', () => {
    test('given method GET it should list all files downloaded', async () => {
      const routes = new Routes()
      const params = { ...defaultParams }
      const filesStatusesMock = [
        {
          size: "32.1 MB",
          lastModified: '2024-02-19T18:57:01.937Z',
          owner: 'thalisson',
          file: 'image.png'
        }
      ]

      jest.spyOn(routes.fileHelper, 'getFilesStatus').mockResolvedValue(filesStatusesMock)

      params.request.method = 'GET'
      await routes.handler(...params.values())

      expect(params.response.writeHead).toHaveBeenCalledWith(200)
      expect(params.response.end).toHaveBeenCalledWith(JSON.stringify(filesStatusesMock))

    })
  })

  describe('#post', () => {
    test('it should validate post route workflow', async () => {
      const routes = new Routes('/tmp')
      const options = { ...defaultParams }
      options.request.method = 'POST'
      options.request.url = '?socketId=10'

      jest.spyOn(UploadHandler.prototype, 'registerEvents').mockImplementation((headers, onFinish) => {
        const writable = TestUtil.generateWritableStream(() => { })
        writable.on("finish", onFinish)

        return writable
      })

      await routes.handler(...options.values())

      expect(UploadHandler.prototype.registerEvents).toHaveBeenCalled()
      expect(options.response.writeHead).toHaveBeenCalledWith(200)
      const expectedResult = { result: 'Files uploaded with success!' }
      expect(options.response.end).toHaveBeenCalledWith(JSON.stringify(expectedResult))
    })
  })
})
