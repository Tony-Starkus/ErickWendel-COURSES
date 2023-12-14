import { writeFile, readFile } from 'fs'

export const save = async (data) => {
  // Não tem __filename e __dirname
  const { pathname: databaseFile } = new URL('./../database.json', import.meta.url)
  const fileContent = await new Promise((resolve, reject) => {
    return readFile(databaseFile, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        return reject(err);
      }
      return resolve(data);
    });
  });

  const currentData = JSON.parse(fileContent)
  currentData.push(data)

  await writeFile(databaseFile, JSON.stringify(currentData), err => console.log(err))
}