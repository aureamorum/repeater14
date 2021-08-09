import fs from 'fs'

export interface AssetTypes {
  'image': string
}

export type AssetLoader<T extends keyof AssetTypes> = (path: string) => Promise<AssetTypes[T]>

type Loaders = {
  [T in keyof AssetTypes]: AssetLoader<T>
}

export class Assets {
  public loaded: Record<string, any> = {}

  public loaders: Loaders = {
    image: async path => {
      return (await import(path)).default as string
    }
  }

  public async load(name: string) {

  }

  public get<T extends keyof AssetTypes>(name: string) {
    if(this.loaded[name]) return this.loaded[name] as AssetTypes[T]
    else return null
  }
}
