import { Breakpoint } from './config'
import Vue, { VueConstructor } from 'vue'

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

declare module 'vue/types/vue' {
  interface Vue {
    $screen: VueScreen
  }
}

declare global {
  interface Window {
    Vue: VueConstructor
  }
}
