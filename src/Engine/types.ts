import _ from 'lodash'

export interface PrimitiveObject {
  [key: string]: string | number | boolean | null | undefined | symbol | PrimitiveObject
}

export interface SimpleObject {
  [key: string]: any
}

export interface ObjectOf<T> {
  [key: string]: T
}

/**
 * Clone and return a new object recursively
 * @param value The object to be cloned
 * @returns A new object with the same parameters as the original, cloned deeply
 */
export const clone = _.cloneDeep

/**
 * Freeze and return the object
 * @param value Object to be frozen
 * @returns Frozen object
 */
export const freeze = <T>(value: T) => {
  for (const key in value) {
    if (Object(value[key]) === value[key] && !Object.isFrozen(value[key])) freeze(value[key])
  }

  return Object.freeze(value)
}

/**
 * Returns a frozen copy of the original object
 * @param value Original object
 * @returns Cloned replica
 */
export const frozen = <T>(value: T) => {
  return freeze(clone(value))
}

export type Async<T> = Promise<T> | T

export type Constructor<T = any> = new (...args: any[]) => T
