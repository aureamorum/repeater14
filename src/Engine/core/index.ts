import { Emitter } from './Events'

import { Assets, AssetType } from './Assets'

export interface PluginScript {
  run(engine: Engine): Promise<void>
}

export interface EventsList {
  'load:assetTypes': AssetType[]
}

export class Engine {
  private minInterval = 5
  private emitter = new Emitter()
  private intervalTimeout: NodeJS.Timeout | undefined

  public modules: PluginScript[] = []
  public readonly assets = new Assets()

  public on<Event extends keyof EventsList>(
    event: Event,
    callback: (arg: EventsList[Event]) => void
  ) {
    return this.emitter.on(event, callback)
  }

  private emit<Event extends keyof EventsList>(event: Event, arg: EventsList[Event]) {
    return this.emitter.emit(event, arg)
  }

  public async runScript(script: PluginScript) {
    return script.run(this)
  }

  public async loadPlugins() {
    for(const script)
  }

  /**
   * Start the engine cycle
   */
  public async start() {

    this.emit('load:assetTypes', this.assets.assetTypes)

    let last = Date.now()

    this.intervalTimeout = setInterval(() => {
      this.tick(last)

      last = Date.now()
    }, this.minInterval)
  }

  /**
   * Stop the engine cycle, if started
   */
  public async stop() {
    if (this.intervalTimeout !== undefined) {
      clearInterval(this.intervalTimeout)
    }
  }

  private async tick(timestamp: number) {
    this.emitter.emit('tick', timestamp)
  }
}

export class Debug {
  public static log(message: any) {
    console.log(message)
  }

  public static object(o: any) {
    Debug.log(JSON.stringify(o, null, 2))
  }

  public static error(message: any) {
    console.error(message)
  }
}
