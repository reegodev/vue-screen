export interface Breakpoints {
    [key: string]: number;
}
export interface BreakpointsState {
    [key: string]: boolean;
}
export interface ScreenProps {
    touch: boolean;
    width: number;
    height: number;
}
export declare type Screen = BreakpointsState & ScreenProps;
