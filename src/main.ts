import path from 'path'
import { App } from './Engine/app'

const gamePath = path.join(__dirname, 'Game')
const app = new App(gamePath)

app.init()

/*

const engine = new Engine()
Engine.instance = engine
const game = new GameComponent(path.join(__dirname, 'assets'))

engine.addComponent('game', game)

engine.init(async () => {
  await game.init()

  await engine.start()

  const m = new StateMachine({
    a: {
      transitions: ['b', 'c']
    },
    b: {
      transitions: {
        c: async () => {
          console.log('aaaaaaaaaa')
        }
      }
    },
    c: {
      transitions: ['a', 'b']
    }
  }, 'a')

  console.log(m.state)
  await m.transition('b')
  console.log(m.state)
  await m.transition('c')
  console.log(m.state)

  setTimeout(() => {
    //engine.stop()
  }, 5000)
})
*/
