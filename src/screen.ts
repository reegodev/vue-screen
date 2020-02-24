// @ts-ignore
import Vue from 'vue'
import { VueScreenConfig, ParsedConfig } from './interfaces/config'
import { VueScreen, VueScreenCallbacks, VueScreenBreakpointsValues, BreakpointQueries } from './interfaces/screen'
import { inBrowser, debounce } from './utils'
import { parseConfig } from './config'

/**
 * Create a screen object from the plugin configuration
 * @param options 
 */
export const createScreenObject = (rawConfig: VueScreenConfig): VueScreen => {
  const config = parseConfig(rawConfig)
  const mediaQueries = createMediaQueries(config)
  const screen = Vue.observable(initScreenObject(config))

  if (inBrowser) {
    const resizeCb = onResize.bind(null, screen, config, mediaQueries)
    window.addEventListener('resize', debounce(resizeCb, config.params.debounceDelay));

    resizeCb()
  }

  return screen
}

export const initScreenObject = (config: ParsedConfig): VueScreen => {
  const initialScreen: VueScreen = {
    width: 0,
    height: 0,
    landscape: false,
    portrait: true,
    touch: inBrowser ? 'ontouchstart' in window : true,
    breakpointsOrder: config.params.breakpointsOrder,
    breakpoint: config.params.breakpointsOrder[0],
  }

  // Create breakpoints
  Object.keys(config.breakpoints).forEach((breakpoint) => {
    (initialScreen as VueScreenBreakpointsValues)[breakpoint] = false
  });

  // Create callbacks results
  Object.keys(config.callbacks).forEach((callbackName) => {
    (initialScreen as VueScreenCallbacks)[callbackName] = undefined
  });

  return initialScreen
}

export const createMediaQueries = (config: ParsedConfig): BreakpointQueries => {
  const queries: BreakpointQueries = {}

  if (!inBrowser) {
    return queries
  }

  // Breakpoints
  Object.keys(config.breakpoints).forEach((breakpoint) => {
    let width = config.breakpoints[breakpoint]
    if (typeof width === 'number') {
      width = `${width}px`
    }

    queries[breakpoint] = window.matchMedia(`(min-width: ${width})`)
  })

  // Orientation
  queries.portrait = window.matchMedia('(orientation: portrait)')
  queries.landscape = window.matchMedia('(orientation: landscape)')

  return queries
}

/**
 * Callback run on Window resize event
 * @param screen 
 * @param config 
 * @param mediaQueries 
 */
export const onResize = (screen: VueScreen, config: ParsedConfig, mediaQueries: BreakpointQueries) => {
  if (!inBrowser) {
    return
  }

  // Width and height
  screen.width = window.innerWidth
  screen.height = window.innerHeight

  // Breakpoints
  Object.keys(mediaQueries).forEach((breakpoint) => {
    (screen as VueScreenBreakpointsValues)[breakpoint] = mediaQueries[breakpoint].matches
  });

  // Current breakpoint
  screen.breakpoint = config.params.breakpointFn.call(null, screen);

  // Callbacks
  Object.keys(config.callbacks).forEach((key) => {
    (screen as VueScreenCallbacks)[key] = config.callbacks[key].call(null, screen)
  });
}
