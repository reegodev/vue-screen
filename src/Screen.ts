import debounce from 'lodash.debounce';
import Vue from 'vue';
import grids from './grids';
import { Breakpoints, Screen } from './types';

const DEFAULT_WIDTH = 410;
const DEFAULT_HEIGHT = 730;

export class ScreenController {

  /**
   * Screen reactive properties
   */
  protected screen!: Screen;

  /**
   * Class constructor
   *
   * @param {Breakpoints} breakpoints
   */
  public constructor(breakpoints: Breakpoints | string = '') {
    this.createScreen(
      this.parseBreakpoints(breakpoints),
    );
    this.init();
  }

  /**
   * Get the reactive screen object
   */
  public getScreen(): Screen {
    return this.screen;
  }

  /**
   * Parse the breakpoints parameter and return a Breakpoint object
   *
   * @param {Breakpoints | string} breakpoints
   */
  protected parseBreakpoints(breakpoints: Breakpoints | string): Breakpoints {
    if (typeof breakpoints === 'object') {
      return breakpoints;
    }

    const key = breakpoints.toString() || 'tailwind';
    if (!grids[key]) {
      throw new Error(`Cannot find grid breakpoints for framework "${key}"`);
    }

    return grids[key];
  }

  /**
   * Init the reactive object
   */
  protected init() {
    this.attachResize();
    this.setScreenSize();
    this.checkTouch();
  }

  /**
   * Attach a listener to the window resize event
   */
  protected attachResize() {
    if (typeof window !== 'undefined') {
      window.addEventListener(
        'resize',
        debounce(this.setScreenSize.bind(this), 100),
      );
    }
  }

  /**
   * Set the screen size
   */
  protected setScreenSize() {
    this.screen.width = window.innerWidth;
    this.screen.height = window.innerHeight;
  }

  /**
   * Check touch screen capability
   */
  protected checkTouch() {
    if (typeof window !== 'undefined') {
      this.screen.touch = 'ontouchstart' in window;
    }
  }

  /**
   * Create the reactive object
   *
   * @param {Breakpoints} breakpoints
   */
  protected createScreen(breakpoints: Breakpoints) {
    this.screen = Vue.observable({
      height: DEFAULT_HEIGHT,
      touch: true,
      width: DEFAULT_WIDTH,
    }) as Screen;

    for (const name in breakpoints) {
      if (breakpoints.hasOwnProperty(name)) {
        Vue.set(this.screen, name, false);
      }
    }

    if (typeof window !== 'undefined') {
      this.initMediaQueries(breakpoints);
    }
  }

  /**
   * Initialize the media queries to test
   *
   * @param {Breakpoints} breakpoints
   */
  protected initMediaQueries(breakpoints: Breakpoints) {
    for (const name in breakpoints) {
      if (breakpoints.hasOwnProperty(name)) {
        const width = breakpoints[name];
        let w;
        if (typeof width === 'number') {
          w = `${width}px`;
        } else {
          w = width;
        }

        const query = window.matchMedia(`(min-width: ${w})`);
        query.addListener((e) => this.mediaStateChanged(name, e.matches));
        this.mediaStateChanged(name, query.matches);
      }
    }
  }

  /**
   * Set the media query state on the reactive object
   *
   * @param {string} name
   * @param {boolean} matches
   */
  protected mediaStateChanged(name: string, matches: boolean) {
    Vue.set(this.screen, name, matches);
  }

}
