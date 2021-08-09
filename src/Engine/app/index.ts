import path from 'path'
import fs from 'fs'
import { Debug, Engine } from '../core'

type ModuleConfig = Array<{ name: string; options: any } | string>

interface EngineConfig {
  paths: {
    modules: string
  }
  modules: ModuleConfig[]
}

export class App {
  public engine = new Engine()

  constructor(private gamePath: string) {
    this.engine.on('load:assetTypes', assetTypes => {
      assetTypes.push({
        name: 'PlainText',
        extension: 'txt',
        load: async raw => {
          return raw as string
        }
      })
    })
  }

  public async init() {
    this.engine.assets.loadDir(this.gamePath)

    const configPath = path.join(this.gamePath, 'engineConfig')

    Debug.log(`\nloading engine config from "${configPath}.ts"...`)
    const engineConfig = (await import(configPath)).default as EngineConfig
    Debug.log('\nloaded engine config:')
    Debug.object(engineConfig)

    const modulesPath = path.join(this.gamePath, engineConfig.paths.modules)
    const modulesDir = fs.readdirSync(modulesPath)
    Debug.log('\navailable modules:')
    Debug.object(modulesDir)

    const pluginsListPath = path.join(this.gamePath, 'plugins_list')
    const pluginsList = fs
      .readFileSync(pluginsListPath, { encoding: 'utf-8' })
      .split(/(\n|\r|(\/\/.*)| )/gm)
      .filter(v => v !== '')
    Debug.log('\nplugins list:')
    Debug.object(pluginsList)
  }
}
