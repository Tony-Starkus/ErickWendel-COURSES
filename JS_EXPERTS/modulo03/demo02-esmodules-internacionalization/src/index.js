
import database from '../database.json' assert {type: "json"}
import TerminalController from './terminalController.js'
import { save } from './repository.js'
import Person from './person.js'


const DEFAULT_LANG = 'pt-br'
const STOP_TERMINAL = ":q"

const terminalControler = new TerminalController()
terminalControler.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalControler.question()
    // 2 Bike,Aviao,Navio 2000000 2000-01-01 2001-01-01
    if (answer === STOP_TERMINAL) {
      terminalControler.closeTerminal()
      console.log('process finished!')
    }

    const person = Person.generateInstanceFromString(answer)
    terminalControler.updateTable(person.formatted(DEFAULT_LANG))
    save(person)
    return mainLoop()
  } catch (error) {
    console.log('DEU RUIM**', error)
    mainLoop()
  }
}

await mainLoop()