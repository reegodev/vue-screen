import { Breakpoint, FrameworkBreakpoint, FrameworkLiteral } from "./interfaces/config"

export const CUSTOM_FRAMEWORK_NAME = '__CUSTOM__'
export const DEFAULT_FRAMEWORK: FrameworkLiteral = 'tailwind'

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
