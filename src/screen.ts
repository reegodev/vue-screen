import { VueScreenConfig, ParsedConfig, FrameworkLiteral, VueScreenConfigBreakpoints } from './interfaces/config'
import grid from './grids/index'
import { VueScreen, VueScreenCallbacks, VueScreenBreakpointsValues } from './interfaces/screen'
import { DEFAULT_BREAKPOINTS_ORDER, CUSTOM_FRAMEWORK_NAME, RESERVED_KEYS, DEFAULT_FRAMEWORK } from './constants'
import { inBrowser } from './utils'

/**
 * Create a screen object from the plugin configuration
 * @param options 
 */
export const createScreenObject = (options: VueScreenConfig): VueScreen => {
  const { framework, breakpoints, callbacks, params } = parseOptions(options)

  return {
    width: 0,
    height: 0,
    landscape: false,
    portrait: true,
    touch: true,
    xs: true,
  }
}

/**
 * Parse the plugin configuration and separate the different type of options
 * @param options 
 */
export const parseOptions = (options: VueScreenConfig): ParsedConfig => {
  const parsedOptions: ParsedConfig = {
    framework: DEFAULT_FRAMEWORK,
    breakpoints: grid[DEFAULT_FRAMEWORK],
    callbacks: {},
    params: {
      breakpointsOrder: DEFAULT_BREAKPOINTS_ORDER[DEFAULT_FRAMEWORK],
    },
  }

  if (typeof options === 'object') {
    if ('extend' in options) {
      parsedOptions.framework = options.extend
      validateFrameworkName(parsedOptions.framework)
      delete options.extend
    } else {
      parsedOptions.framework = CUSTOM_FRAMEWORK_NAME
    }

    if ('breakpointsOrder' in options) {
      parsedOptions.params.breakpointsOrder = options.breakpointsOrder
      delete options.breakpointsOrder
    } else {
      if (parsedOptions.framework === CUSTOM_FRAMEWORK_NAME) {
        parsedOptions.params.breakpointsOrder = []
      } else {
        parsedOptions.params.breakpointsOrder = DEFAULT_BREAKPOINTS_ORDER[parsedOptions.framework]
      }
    }

    Object.entries(options).forEach(([key, value]) => {
      const isCallback = typeof value === 'function'
      if (RESERVED_KEYS.includes(key)) {
        throw new Error(`Invalid ${isCallback ? 'callback' : 'breakpoint'} name "${name}". This key is reserved.`);
      }

      if (isCallback) {
        parsedOptions.callbacks[key] = value
      } else {
        parsedOptions.breakpoints[key] = value
      }
    })
  } else {
    parsedOptions.framework = options
    validateFrameworkName(parsedOptions.framework)
    parsedOptions.breakpoints = grid[options]
    parsedOptions.params.breakpointsOrder = DEFAULT_BREAKPOINTS_ORDER[parsedOptions.framework]
  }

  return parsedOptions
}

/**
 * Check if the framework is supported
 * @param name 
 */
export const validateFrameworkName = (name: FrameworkLiteral) => {
  if (!Object.keys(grid).includes(name)) {
    throw new Error(`Cannot find breakpoints for framework "${name}"`);
  }
}

export const onResize = (screen: VueScreen, parsedOptions: ParsedConfig, mediaQueryResults: VueScreenBreakpointsValues) => {
  if (!inBrowser) {
    return
  }

  // Width and height
  screen.width = window.innerWidth
  screen.height = window.innerHeight

  // Breakpoints
  Object.entries(mediaQueryResults).forEach(([key, matches]) => {
    (screen as VueScreenBreakpointsValues)[key] = matches
  });

  // Callbacks
  Object.entries(parsedOptions.callbacks).forEach(([key, callback]) => {
    (screen as VueScreenCallbacks)[key] = callback.call(null, screen)
  });
}
