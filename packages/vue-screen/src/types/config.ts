import { GridDefinitionLiteral, GridDefinition } from './grid'
import { ScreenConfig, ScreenObject } from './screen'

export type ComputedDefinition = Record<string, (screen: ScreenObject) => any>

export type VueScreenConfigLiteral = GridDefinitionLiteral

export interface VueScreenConfigObject {
  grid: GridDefinition
  screen?: ScreenConfig
  computed?: ComputedDefinition
  debounceDelay?: number
}
