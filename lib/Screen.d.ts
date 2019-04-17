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
export declare class ScreenController {
    /**
     * Screen reactive properties
     */
    protected screen: Screen;
    /**
     * Class constructor
     *
     * @param {Breakpoints} breakpoints
     */
    constructor(breakpoints?: Breakpoints);
    /**
     * Get the reactive screen object
     */
    getScreen(): Screen;
    /**
     * Attach a listener to the window resize event
     */
    protected attachResize(): void;
    /**
     * Create the reactive object
     *
     * @param {Breakpoints} breakpoints
     */
    protected createScreen(breakpoints: Breakpoints): void;
}
