import { Emitter } from '../../../Engine/core/Events'
import { GameWorld } from './GameWorld'
import { Transform } from './Math'

export class GameObject extends Emitter {
  readonly world: GameWorld
  readonly id: symbol

  public name: string
  public transform: Transform = new Transform()

  constructor(
    world: GameWorld,
    base: {
      name?: string
    }
  ) {
    super()

    this.id = Symbol('id')
    this.name = base.name || `GameObject ${this.id.toString()}`
    this.world = world
  }

  public init() {
    return this.emit('init')
  }

  public step(delta: number) {
    return this.emit('step', delta)
  }

  public onDestroy(callback: (...args: any[]) => void) {
    return this.once('destroy', callback)
  }

  public destroy() {
    return this.emit('destroy')
  }
}
