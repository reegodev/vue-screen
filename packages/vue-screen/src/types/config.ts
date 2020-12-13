import { GridDefinitionLiteral, GridDefinition } from './grid'
import { ScreenConfig, ScreenObject } from './screen'

export type ComputedDefinition = Record<string, (screen: ScreenObject) => unknown>

export type VueScreenConfigLiteral = GridDefinitionLiteral

export interface VueScreenConfigObject {
  grid: GridDefinition
  screen?: ScreenConfig
  computed?: ComputedDefinition
  debounceDelay?: number
}

export type VueScreenConfig = VueScreenConfigLiteral | VueScreenConfigObject
