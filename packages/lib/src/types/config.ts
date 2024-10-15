import { GridDefinitionLiteral, GridDefinition } from './grid'
import { ScreenConfig, ScreenObject } from './screen'

export type GettersDefinition = Record<string, (screen: ScreenObject) => unknown>

export type VueScreenConfigLiteral = GridDefinitionLiteral

export interface VueScreenConfigObject {
  grid?: GridDefinition
  ssr?: ScreenConfig,
  // getters?: GettersDefinition
  debounceDelay?: number
}

export type VueScreenConfig = VueScreenConfigLiteral | VueScreenConfigObject
