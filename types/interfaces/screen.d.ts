import { Breakpoint } from './config';
export declare type BreakpointQueries = Record<Breakpoint, MediaQueryList>;
export interface VueScreenProperties {
    width: number;
    height: number;
    landscape: boolean;
    portrait: boolean;
    touch: boolean;
    breakpoint?: string;
    breakpointsOrder?: string[];
}
export interface VueScreenCallbacks {
    [key: string]: any;
}
export declare type VueScreenBreakpointsValues = Record<Breakpoint, boolean>;
export declare type VueScreen = VueScreenProperties | VueScreenBreakpointsValues | VueScreenCallbacks;
