import { Breakpoints, Screen } from './types';
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
    constructor(breakpoints?: Breakpoints | string);
    /**
     * Get the reactive screen object
     */
    getScreen(): Screen;
    /**
     * Parse the breakpoints parameter and return a Breakpoint object
     *
     * @param {Breakpoints | string} breakpoints
     */
    protected parseBreakpoints(breakpoints: Breakpoints | string): Breakpoints;
    /**
     * Init the reactive object
     */
    protected init(): void;
    /**
     * Attach a listener to the window resize event
     */
    protected attachResize(): void;
    /**
     * Set the screen size
     */
    protected setScreenSize(): void;
    /**
     * Check touch screen capability
     */
    protected checkTouch(): void;
    /**
     * Create the reactive object
     *
     * @param {Breakpoints} breakpoints
     */
    protected createScreen(breakpoints: Breakpoints): void;
    /**
     * Initialize the media queries to test
     *
     * @param {Breakpoints} breakpoints
     */
    protected initMediaQueries(breakpoints: Breakpoints): void;
    /**
     * Set the media query state on the reactive object
     *
     * @param {string} name
     * @param {boolean} matches
     */
    protected mediaStateChanged(name: string, matches: boolean): void;
}
