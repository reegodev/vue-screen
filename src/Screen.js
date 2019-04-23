import { debounce, inBrowser } from './utils';
import Vue from 'vue';
import grids from './grids';

// GoogleBot default screen size
const DEFAULT_WIDTH = 410;
const DEFAULT_HEIGHT = 730;

export default class Screen {

  /**
   * Screen reactive properties
   */
  _screen = Vue.observable({
    height: DEFAULT_HEIGHT,
    touch: true,
    width: DEFAULT_WIDTH,
  });

  /**
   * Class constructor
   *
   * @param {object | string} breakpoints
   */
  constructor(breakpoints = '') {
    this.createScreen(
      this.parseBreakpoints(breakpoints),
    );
    this.init();
  }

  /**
   * Get the reactive screen property
   */
  get() {
    return this._screen;
  }

  /**
   * Parse the breakpoints parameter and return a Breakpoint object
   *
   * @param {object | string} breakpoints
   * @returns {object}
   */
  parseBreakpoints(breakpoints) {
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
  init() {
    this.attachResize();
    this.setScreenSize();
    this.checkTouch();
  }

  /**
   * Attach a listener to the window resize event
   */
  attachResize() {
    if (inBrowser) {
      window.addEventListener(
        'resize',
        debounce(this.setScreenSize.bind(this), 100),
      );
    }
  }

  /**
   * Set the screen size
   */
  setScreenSize() {
    this._screen.width = window.innerWidth;
    this._screen.height = window.innerHeight;
  }

  /**
   * Check touch screen capability
   */
  checkTouch() {
    if (inBrowser) {
      this._screen.touch = 'ontouchstart' in window;
    }
  }

  /**
   * Create the reactive object
   *
   * @param {object} breakpoints
   */
  createScreen(breakpoints) {
    for (const name in breakpoints) {
      if (breakpoints.hasOwnProperty(name)) {
        Vue.set(this._screen, name, false);
      }
    }

    if (inBrowser) {
      this.initMediaQueries(breakpoints);
    }
  }

  /**
   * Initialize the media queries to test
   *
   * @param {object} breakpoints
   */
  initMediaQueries(breakpoints) {
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
  mediaStateChanged(name, matches) {
    Vue.set(this._screen, name, matches);
  }

}
