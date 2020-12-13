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

export const createConfigFromLiteral = (literal: GridDefinitionLiteral): GridTypeLiteral<GridDefinitionLiteral> => {
  if (!grids[literal]) {
    throw new Error(`Invalid grid type "${literal}"`)
  }

  return grids[literal]
}

export const createMediaQueries = (config: Custom, object: CustomObject): void => {
  Object.keys(config).forEach((breakpoint) => {
    let width = config[breakpoint]

    if (typeof width === 'number') {
      width = `${width}px`
    } else {
      width = width.toString()
    }

    const query = window.matchMedia(`(min-width: ${width})`)
    if ('addEventListener' in query) {
      query.addEventListener('change', (e: MediaQueryListEvent) => object[breakpoint] = e.matches);
    } else {
      // query.addListener is not deprecated for iOS 12
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (query as any).addListener((e: MediaQueryListEvent) => object[breakpoint] = e.matches)
    }
    object[breakpoint] = query.matches
  })
}

export function useGrid<T extends GridDefinitionLiteral> (gridConfig: T): GridObjectLiteral<T>
export function useGrid<T extends GridDefinitionCustomObject> (gridConfig: T): GridObject<T>
export function useGrid (gridConfig: GridDefinitionLiteral | GridType<Custom>): GridObject<GridTypes> {
  let config: Custom | SupportedGridType

  if (typeof gridConfig === 'string') {
    config = createConfigFromLiteral(gridConfig as GridDefinitionLiteral) as SupportedGridType 
  } else {
    config = Object.assign(gridConfig as Custom) as GridType<Custom>
  }

  const gridObject = reactive(createGridObject(config))

  if (inBrowser) {
    createMediaQueries(config as Custom, gridObject)
  }

  return gridObject
}
