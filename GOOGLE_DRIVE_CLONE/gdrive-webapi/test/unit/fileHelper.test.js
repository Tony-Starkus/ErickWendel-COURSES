import { describe, test, expect, jest } from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'

describe('#FileHelper', () => {

  describe('getFileStatus', () => {
    test('it should return files statuses in correct format', async () => {
      const statMock = {
        dev: 66311,
        mode: 33261,
        nlink: 1,
        uid: 1000,
        gid: 1000,
        rdev: 0,
        blksize: 4096,
        ino: 4886232,
        size: 32068479,
        blocks: 62640,
        atimeMs: 1708369021937.335,
        mtimeMs: 1643206876230,
        ctimeMs: 1708369022009.335,
        birthtimeMs: 1708369021937.3354,
        atime: '2024-02-19T18:57:01.937Z',
        mtime: '2022-01-26T14:21:16.230Z',
        ctime: '2024-02-19T18:57:02.009Z',
        birthtime: '2024-02-19T18:57:01.937Z'
      }

      const mockUser = 'thalisson'
      const filename = 'image.jpg'
      process.env.USER = mockUser

      jest.spyOn(fs.promises, fs.promises.stat.name).mockResolvedValue(statMock)
      jest.spyOn(fs.promises, fs.promises.readdir.name).mockResolvedValue([filename])

      const result = await FileHelper.getFilesStatus("/tmp")

      const expectedResult = [
        {
          size: "32.1 MB",
          lastModified: statMock.birthtime,
          owner: mockUser,
          file: filename
        }
      ]

      expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
      expect(result).toMatchObject(expectedResult)
    })
  })
})