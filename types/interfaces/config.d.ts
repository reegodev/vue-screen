import { VueScreen } from "./screen";
export declare type FrameworkLiteral = 'bootstrap' | 'bulma' | 'foundation' | 'materialize' | 'semantic-ui' | 'tailwind' | '__CUSTOM__';
export declare type BootstrapBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export declare type BulmaBreakpoint = 'mobile' | 'tablet' | 'desktop' | 'widescreen' | 'fullhd';
export declare type FoundationBreakpoint = 'small' | 'medium' | 'large';
export declare type MaterializeBreakpoint = 's' | 'm' | 'l' | 'xl';
export declare type SemanticUIBreakpoint = 'mobile' | 'tablet' | 'computer' | 'large';
export declare type TailwindBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export declare type FrameworkBreakpoint = BootstrapBreakpoint | BulmaBreakpoint | FoundationBreakpoint | MaterializeBreakpoint | SemanticUIBreakpoint | TailwindBreakpoint;
export declare type CustomBreakpoint = string;
export declare type Breakpoint = FrameworkBreakpoint | CustomBreakpoint;
export interface VueScreenConfigCustom {
    [key: string]: number | string;
}
export interface VueScreenConfigCallbacks {
    [key: string]: () => any;
}
export interface VueScreenConfigParams {
    breakpointsOrder?: string[];
    breakpointFn?: (screen: VueScreen) => string;
    extend?: FrameworkLiteral;
    debounceDelay?: number;
}
export declare type VueScreenConfigBreakpoints = Record<Breakpoint, number | string>;
export declare type VueScreenConfigObject = VueScreenConfigBreakpoints & VueScreenConfigParams & VueScreenConfigCallbacks;
export declare type VueScreenConfig = FrameworkLiteral | VueScreenConfigObject;
export interface ParsedConfig {
    framework: FrameworkLiteral;
    breakpoints: VueScreenConfigBreakpoints;
    callbacks: VueScreenConfigCallbacks;
    params: VueScreenConfigParams;
}
