import { VueScreenObject } from './screen'

export type VueScreenOptionsFrameworkLiteral = 
  'tailwind' 
  | 'bootstrap' 
  | 'bulma' 
  | 'foundation' 
  | 'materialize' 
  | 'semantic-ui'

export interface VueScreenOptionsBreakpoints {
  [key: string]: number | string;
}

export interface VueScreenOptionsCallbacks {
  [key: string]: (screen: VueScreenObject) => any;
}

export interface VueScreenOptionsProperties {
  extend?: VueScreenOptionsFrameworkLiteral;
  breakpointsOrder?: string[];
}

export type VueScreenOptions = 
  VueScreenOptionsFrameworkLiteral 
  | ( 
      VueScreenOptionsProperties 
      & VueScreenOptionsCallbacks 
      & VueScreenOptionsBreakpoints 
    )