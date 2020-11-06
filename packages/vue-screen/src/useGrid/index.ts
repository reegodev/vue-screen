import {
  GridType,
  Custom,
  GridObject,
  GridTypes,
  GridTypeLiteral,
  GridDefinitionLiteral,
  GridDefinitionCustomObject,
  GridObjectLiteral,
  SupportedGridType,
  CustomObject
} from '../types/grid'
import grids from '../grids'
import { reactive } from 'vue'
import { inBrowser } from '../utils'

export const createGridObject = <T extends GridTypes>(config: GridType<T>): GridObject<T> => {
  return Object.keys(config).reduce((accumulator, key) => {
    accumulator[key] = false
    return accumulator
  }, {} as GridObject<T>)
}

export const createConfigFromLiteral = <T extends GridDefinitionLiteral>(literal: T): GridTypeLiteral<T> => {
  if (!grids[literal]) {
    throw new Error(`Invalid grid type ${literal}`)
  }

  return grids[literal] as any
}

export const createMediaQueries = (config: Custom, object: CustomObject) => {
  Object.keys(config).forEach((breakpoint) => {
    let width = config[breakpoint]

    if (typeof width === 'number') {
      width = `${width}px`
    } else {
      width = width.toString()
    }

    const query = window.matchMedia(`(min-width: ${width})`)
    query.addEventListener('change', (e: MediaQueryListEvent) => object[breakpoint] = e.matches)
    object[breakpoint] = query.matches
  })
}

export function useGrid<T extends GridDefinitionLiteral> (gridConfig: T): GridObjectLiteral<T>
export function useGrid<T extends GridDefinitionCustomObject> (gridConfig: T): GridObject<T>
export function useGrid (gridConfig: any): GridObject<any> {
  let config: any

  if (typeof gridConfig === 'string') {
    config = createConfigFromLiteral(gridConfig as GridDefinitionLiteral) as SupportedGridType 
  } else {
    config = Object.assign(gridConfig) as GridType<Custom>
  }

  const gridObject = reactive(createGridObject(config))

  if (inBrowser) {
    createMediaQueries(config, gridObject)
  }

  return gridObject
}
