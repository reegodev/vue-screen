import { Breakpoint, FrameworkBreakpoint, FrameworkLiteral } from "./interfaces/config"
import { VueScreen, VueScreenBreakpointsValues } from "./interfaces/screen"

export const CUSTOM_FRAMEWORK_NAME = '__CUSTOM__'
export const DEFAULT_FRAMEWORK: FrameworkLiteral = 'tailwind'

export const DEFAULT_DEBOUNCE_DELAY = 100

export const MIN_VUE_VERSION = '2.6.0'

export const DEFAULT_BREAKPOINTS_ORDER = {
  bootstrap: ['xs', 'sm', 'md', 'lg', 'xl'],
  bulma: ['mobile', 'tablet', 'desktop', 'widescreen', 'fullhd'],
  foundation: ['small', 'medium', 'large'],
  materialize: ['s', 'm', 'l', 'xl'],
  'semantic-ui': ['mobile', 'tablet', 'computer', 'large'],
  tailwind: ['xs', 'sm', 'md', 'lg', 'xl'],
} as Record<FrameworkLiteral, FrameworkBreakpoint[]>

export const RESERVED_KEYS = [
  'width',
  'height',
  'touch',
  'portrait',
  'landscape',
]

export const DEFAULT_BREAKPOINT_FN = (screen: VueScreen): string => {
  return screen.breakpointsOrder.reduce(
    (activeBreakpoint: Breakpoint, currentBreakpoint: Breakpoint) => {
      if ((screen as VueScreenBreakpointsValues)[currentBreakpoint]) {
        return currentBreakpoint;
      }

      return activeBreakpoint;
    },
    screen.breakpointsOrder[0]
  );
}
