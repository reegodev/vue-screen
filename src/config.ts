import { VueScreenConfig, ParsedConfig, FrameworkLiteral, VueScreenConfigParams, VueScreenConfigBreakpoints } from './interfaces/config'
import grid from './grids/index'
import { DEFAULT_BREAKPOINTS_ORDER, CUSTOM_FRAMEWORK_NAME, RESERVED_KEYS, DEFAULT_FRAMEWORK, DEFAULT_BREAKPOINT_FN, DEFAULT_DEBOUNCE_DELAY } from './constants'

/**
 * Check if the framework is supported
 * @param name 
 */
export const validateFrameworkName = (name: FrameworkLiteral) => {
  if (Object.keys(grid).indexOf(name) < 0) {
    throw new Error(`Cannot find breakpoints for framework "${name}"`);
  }
}

/**
 * Parse the plugin configuration and separate the different type of options
 * @param options 
 */
export const parseConfig = (rawConfig: VueScreenConfig): ParsedConfig => {
  const config: ParsedConfig = {
    framework: DEFAULT_FRAMEWORK,
    breakpoints: grid[DEFAULT_FRAMEWORK],
    callbacks: {},
    params: {
      breakpointsOrder: DEFAULT_BREAKPOINTS_ORDER[DEFAULT_FRAMEWORK],
      breakpointFn: DEFAULT_BREAKPOINT_FN,
      debounceDelay: DEFAULT_DEBOUNCE_DELAY,
    },
  }

  if (typeof rawConfig === 'object') {
    if ('extend' in rawConfig) {
      config.framework = rawConfig.extend as FrameworkLiteral
      validateFrameworkName(config.framework)
      delete rawConfig.extend
    } else {
      config.framework = CUSTOM_FRAMEWORK_NAME
    }

    if ('breakpointsOrder' in rawConfig) {
      config.params.breakpointsOrder = rawConfig.breakpointsOrder as string[]
      delete rawConfig.breakpointsOrder
    } else {
      if (config.framework === CUSTOM_FRAMEWORK_NAME) {
        config.params.breakpointsOrder = []
      } else {
        config.params.breakpointsOrder = DEFAULT_BREAKPOINTS_ORDER[config.framework]
      }
    }

    if ('breakpoint' in rawConfig) {
      if (typeof rawConfig.breakpoint !== 'function') {
        throw new Error(`The "breakpoint" option must be a function`)
      }

      config.params.breakpointFn = rawConfig.breakpoint
      delete rawConfig.breakpoint
    }

    if ('debounceDelay' in rawConfig) {
      config.params.debounceDelay = parseInt('' + rawConfig.debounceDelay, 10)
      delete rawConfig.debounceDelay
    }

    const breakpoints: VueScreenConfigBreakpoints = {}
    Object.entries(rawConfig).forEach(([key, value]) => {
      const isCallback = typeof value === 'function'
      if (RESERVED_KEYS.indexOf(key) >= 0) {
        throw new Error(`Invalid ${isCallback ? 'callback' : 'breakpoint'} name "${name}". This key is reserved.`)
      }

      if (isCallback) {
        config.callbacks[key] = value
      } else {
        breakpoints[key] = value
      }
    })

    if (Object.keys(breakpoints).length > 0) {
      config.breakpoints = breakpoints
    }
  } else {
    config.framework = rawConfig || DEFAULT_FRAMEWORK
    validateFrameworkName(config.framework)
    config.breakpoints = grid[config.framework]
    config.params.breakpointsOrder = DEFAULT_BREAKPOINTS_ORDER[config.framework]
  }

  return config
}
