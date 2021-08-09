import { Constructor } from '../../../Engine/types'

export type Vector<Dimensions extends string> = {
  [key in Dimensions]: number
}

export type Vector2 = Vector<'x' | 'y'>
//export type Vector3 = Vector<'x' | 'y' | 'z'>

export class Vector3 implements Vector<'x' | 'y' | 'z'> {
  public x = 0
  public y = 0
  public z = 0
}

export class Quaternion {
  public w = 0
  public x = 0
  public y = 0
  public z = 0
}

export function TransformMixin<TBase extends Constructor>(Base: TBase) {
  return class Transform extends Base {
    position = new Vector3()
  }
}

export class Transform {
  public position = new Vector3()
}

export const multiply = <T>(...factors: T[]) => {
  if (factors.length === 0) return null
}
