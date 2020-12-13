import {
  createGridObject,
  createConfigFromLiteral,
  useGrid
} from '../src/useGrid'

import { GridDefinitionLiteral } from '../src/types/grid'
import grids from '../src/grids'

import { watchEffect } from 'vue'

describe('useGrid', () => {

  it('creates a config from a framework literal', () => {
    Object.keys(grids).forEach((framework: GridDefinitionLiteral) => {
      const expectedGrid = grids[framework]
      const config = createConfigFromLiteral(framework)

      expect(config).toStrictEqual(expectedGrid)
    })

    expect(() => {
      createConfigFromLiteral('bad framework' as GridDefinitionLiteral)
    }).toThrowError(`Invalid grid type "bad framework"`)
  })

  it('creates a grid object from a grid config', () => {
    const config = {
      a: 0,
      b: 1,
      c: 2
    }

    const gridObject = createGridObject(config)

    expect(Object.keys(gridObject)).toStrictEqual(Object.keys(config))
    expect(Object.values(gridObject).every(value => value === false)).toBe(true)
  })

  it('creates a reactive grid object', async () => {
    const grid = useGrid('bulma')

    expect(grid.tablet).toBe(false)

    await new Promise((resolve) => {
      grid.tablet = true
      watchEffect(() => resolve(grid))
    })

    expect(grid.tablet).toBe(true)
  })

})
