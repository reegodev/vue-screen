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
} from './types/grid'
import grids from './grids'
import { reactive } from 'vue'
import { inBrowser } from './utils'

export const DEFAULT_GRID_FRAMEWORK = 'tailwind'

export const createGridObject = <T extends GridTypes>(config: GridType<T>): GridObject<T> => {
  return Object.keys(config).reduce((accumulator, key) => {
    accumulator[key] = false
    return accumulator
  }, {
    breakpoint: '',
  } as GridObject<T>)
}

export const createConfigFromLiteral = (literal: GridDefinitionLiteral): GridTypeLiteral<GridDefinitionLiteral> => {
  if (!grids[literal]) {
    throw new Error(`Invalid grid type "${literal}"`)
  }

  return grids[literal]
}

export const getCurrentBreakpoint = (object: CustomObject): string => {
  const current = Object.keys(object).filter(key => !['breakpoint'].includes(key)).reverse().find(key => object[key])
  return current || ''
}

export const createMediaQueries = (config: Custom, object: CustomObject & { breakpoint: keyof CustomObject }): void => {
  Object.keys(config).forEach((breakpoint) => {
    let width = config[breakpoint]

    if (typeof width === 'number') {
      width = `${width}px`
    } else {
      width = width.toString()
    }

    const onChange = (event: MediaQueryListEvent) => {
      object[breakpoint] = event.matches
      object.breakpoint = getCurrentBreakpoint(object)
    }

    const query = window.matchMedia(`(min-width: ${width})`)
    if ('addEventListener' in query) {
      query.addEventListener('change', onChange);
    } else {
      // query.addListener is not deprecated for iOS 12
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (query as any).addListener(onChange)
    }
    object[breakpoint] = query.matches
    object.breakpoint = getCurrentBreakpoint(object)
  })
}

export function useGrid<T extends GridDefinitionLiteral> (gridConfig: T): GridObjectLiteral<T>
export function useGrid<T extends GridDefinitionCustomObject> (gridConfig: T): GridObject<T>
export function useGrid (
  gridConfig: GridDefinitionLiteral | GridDefinitionCustomObject = DEFAULT_GRID_FRAMEWORK
): Readonly<GridObjectLiteral<GridDefinitionLiteral>> | Readonly<GridObject<any>> {
  let config: Custom | SupportedGridType

  if (typeof gridConfig === 'string') {
    config = createConfigFromLiteral(gridConfig as GridDefinitionLiteral)
  } else {
    config = Object.assign(gridConfig as GridDefinitionCustomObject)
  }

  const gridObject = reactive(createGridObject(config))

  if (inBrowser) {
    createMediaQueries(config as Custom, gridObject)
  }

  return gridObject
}
