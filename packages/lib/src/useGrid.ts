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
  CustomObject,
  ComputedBreakpoint,
} from './types/grid'
import grids from './grids'
import { reactive, onUnmounted, getCurrentInstance } from 'vue'
import { inBrowser, debounce, remAndEmToPixels } from './utils'

export const DEFAULT_GRID_FRAMEWORK = 'tailwind'

export const createGridObject = <T extends GridTypes>(config: GridType<T>): GridObject<T> => {
  return Object.keys(config).reduce(
    (accumulator, key) => {
      accumulator[key] = false
      return accumulator
    },
    {
      breakpoint: '',
    } as GridObject<T>
  )
}

export const createConfigFromLiteral = (
  literal: GridDefinitionLiteral
): GridTypeLiteral<GridDefinitionLiteral> => {
  if (!grids[literal]) {
    throw new Error(`Invalid grid type "${literal}"`)
  }

  return grids[literal]
}

export const getCurrentBreakpoint = (
  config: Custom,
  object: CustomObject
): string => {
  const current = Object.keys(object)
    .filter((key) => {
      return !['breakpoint'].includes(key) && typeof config[key] !== 'function'
    })
    .sort((a, b) => parseInt(`${config[b]}`) - parseInt(`${config[a]}`))
    .find((key) => object[key])
  return current || ''
}

/* istanbul ignore next */
export const updateComputedProperties = (
  config: Custom,
  object: CustomObject & { breakpoint: keyof CustomObject }
): void => {
  Object.keys(config)
    .filter((breakpoint) => {
      return typeof config[breakpoint] === 'function'
    })
    .forEach((breakpoint) => {
      const fn = config[breakpoint] as ComputedBreakpoint
      object[breakpoint] = fn.call(null, object)
      if (object[breakpoint] && !object.breakpoint) {
        object.breakpoint = breakpoint
      }
    })
}

const debouncedUpdateComputedProperties = debounce(updateComputedProperties, 100)

/* istanbul ignore next */
export const createMediaQueries = (
  config: Custom,
  object: CustomObject & { breakpoint: keyof CustomObject }
): void => {
  Object.keys(config)
    .filter((breakpoint) => {
      return typeof config[breakpoint] !== 'function'
    })
    .forEach((breakpoint) => {
      let width = config[breakpoint]

      if (typeof width === 'number') {
        width = `${width}px`
      } else {
        width = width.toString()
      }

      const onChange = (event: MediaQueryListEvent) => {
        object[breakpoint] = event.matches
        object.breakpoint = getCurrentBreakpoint(config, object)
        debouncedUpdateComputedProperties(config, object)
      }

      const query = window.matchMedia(`(min-width: ${width})`)
      if ('addEventListener' in query) {
        query.addEventListener('change', onChange)
      } else {
        // https://github.com/reegodev/vue-screen/issues/30
        // query.addListener is not deprecated for iOS 12
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (query as any).addListener(onChange)
      }
      object[breakpoint] = query.matches
      object.breakpoint = getCurrentBreakpoint(config, object)

      // Do not leak memory by keeping event listeners active.
      // This appears to work as expected, using useGrid() inside components
      // triggers this hook when they are destroyed.
      if (getCurrentInstance()) {
        onUnmounted(() => {
          if ('removeEventListener' in query) {
            query.removeEventListener('change', onChange)
          } else {
            // https://github.com/reegodev/vue-screen/issues/30
            // query.removeListener is not deprecated for iOS 12
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (query as any).removeListener(onChange)
          }
        })
      }
    })

  updateComputedProperties(config, object)
}

export function useGrid<T extends GridDefinitionLiteral>(gridConfig: T): GridObjectLiteral<T>
export function useGrid<T extends GridDefinitionCustomObject>(gridConfig: T): GridObject<T>
export function useGrid(
  gridConfig: GridDefinitionLiteral | GridDefinitionCustomObject = DEFAULT_GRID_FRAMEWORK
): Readonly<GridObjectLiteral<GridDefinitionLiteral>> | Readonly<GridObject<any>> {
  let config: Custom | SupportedGridType

  if (typeof gridConfig === 'string') {
    config = createConfigFromLiteral(gridConfig as GridDefinitionLiteral)
  } else {
    // convert rem / em to pixels so we can sort breakpoints correctly
    config = Object.keys(gridConfig).reduce((acc, curr) => {
      const unitValue = gridConfig[curr]
      if (
        typeof unitValue === 'string' &&
        (unitValue.includes('rem') || unitValue.includes('em'))
      ) {
        acc[curr] = remAndEmToPixels(parseInt(unitValue))
        return acc
      }

      acc[curr] = gridConfig[curr]
      return acc
    }, {})
  }

  const gridObject = reactive(createGridObject(config))

  /* istanbul ignore if */
  if (inBrowser) {
    createMediaQueries(config as Custom, gridObject)
  }

  return gridObject
}

export const extendGrid = <T extends GridDefinitionLiteral>(
  literalConfig: T,
  extraProperties: GridDefinitionCustomObject
): GridDefinitionCustomObject => {
  return Object.assign(
    {},
    createConfigFromLiteral(literalConfig),
    extraProperties
  )
}