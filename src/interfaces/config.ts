export type FrameworkLiteral = 'bootstrap' | 'bulma' | 'foundation' | 'materialize' | 'semantic-ui' | 'tailwind' | '__CUSTOM__'

export type BootstrapBreakpoint =    'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type BulmaBreakpoint =        'mobile' | 'tablet' | 'desktop' | 'widescreen' | 'fullhd'
export type FoundationBreakpoint =   'small' | 'medium' | 'large'
export type MaterializeBreakpoint =  's' | 'm' | 'l' | 'xl'
export type SemanticUIBreakpoint =   'mobile' | 'tablet' | 'computer' | 'large'
export type TailwindBreakpoint =     'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type FrameworkBreakpoint = 
  BootstrapBreakpoint 
  | BulmaBreakpoint 
  | FoundationBreakpoint 
  | MaterializeBreakpoint 
  | SemanticUIBreakpoint 
  | TailwindBreakpoint

 export type CustomBreakpoint = string

 export type Breakpoint = FrameworkBreakpoint | CustomBreakpoint

export interface VueScreenConfigCustom {
  [key: string]: number | string,
}

export interface VueScreenConfigCallbacks {
  [key: string]: () => any,
}

export interface VueScreenConfigParams {
  breakpointsOrder?: string[],
  extend?: FrameworkLiteral,
}

export type VueScreenConfigBreakpoints = Record<Breakpoint, number | string>

export type VueScreenConfigObject = 
  VueScreenConfigBreakpoints 
  & VueScreenConfigParams 
  & VueScreenConfigCallbacks

export type VueScreenConfig = FrameworkLiteral | VueScreenConfigObject

export interface ParsedConfig {
  framework: FrameworkLiteral,
  breakpoints: VueScreenConfigBreakpoints,
  callbacks: VueScreenConfigCallbacks,
  params: VueScreenConfigParams,
}
