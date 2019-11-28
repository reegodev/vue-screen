import { Breakpoint } from './config'

export type BreakpointQueries = Record<Breakpoint, MediaQueryList>

export interface VueScreenProperties {
  width: number,
  height: number,
  landscape: boolean,
  portrait: boolean,
  touch: boolean,
  breakpoint?: string,
  breakpointsOrder?: string[],
}

export interface VueScreenCallbacks {
  [key: string]: any
}

export type VueScreenBreakpointsValues = Record<Breakpoint, boolean>

export type VueScreen = VueScreenProperties | VueScreenBreakpointsValues | VueScreenCallbacks
