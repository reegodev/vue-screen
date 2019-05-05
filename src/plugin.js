import Vue from 'vue';
import { debounce, inBrowser, checkVersion } from './utils';
import grids from './grids';

const MIN_VUE_VERSION = '2.6.0';

// GoogleBot default screen size
const DEFAULT_WIDTH = 410;
const DEFAULT_HEIGHT = 730;

export const DEFAULT_FRAMEWORK = 'tailwind';

export const DEBOUNCE_MS = 100;

export class Plugin {
  /**
   * Class constructor
   *
   * @param {object | string} breakpoints
   */
  constructor(breakpoints = '') {
    this.createScreen(
      Plugin.parseBreakpoints(breakpoints),
    );
    this.init();
  }

  /**
   * Parse the breakpoints parameter and return a Breakpoint object
   *
   * @param {object | string} breakpoints
   * @returns {object}
   */
  static parseBreakpoints(breakpoints) {
    if (typeof breakpoints === 'object') {
      return breakpoints;
    }

    const key = breakpoints.toString() || DEFAULT_FRAMEWORK;
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
        debounce(this.setScreenSize.bind(this), DEBOUNCE_MS),
      );
    }
  }

  /**
   * Set the screen size
   */
  setScreenSize() {
    if (inBrowser) {
      this.screen.width = window.innerWidth;
      this.screen.height = window.innerHeight;
    }
  }

  /**
   * Check touch screen capability
   */
  checkTouch() {
    if (inBrowser) {
      this.screen.touch = 'ontouchstart' in window;
    }
  }

  /**
   * Create the reactive object
   *
   * @param {object} breakpoints
   */
  createScreen(breakpoints) {
    this.screen = Vue.observable({
      height: DEFAULT_HEIGHT,
      touch: true,
      width: DEFAULT_WIDTH,
    });

    Object.keys(breakpoints).forEach(name => Vue.set(this.screen, name, false));

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
    Object.keys(breakpoints).forEach((name) => {
      const width = breakpoints[name];
      let w;
      if (typeof width === 'number') {
        w = `${width}px`;
      } else {
        w = width;
      }

      const query = window.matchMedia(`(min-width: ${w})`);
      query.addListener(e => this.mediaStateChanged(name, e.matches));
      this.mediaStateChanged(name, query.matches);
    });
  }

  /**
   * Set the media query state on the reactive object
   *
   * @param {string} name
   * @param {boolean} matches
   */
  mediaStateChanged(name, matches) {
    Vue.set(this.screen, name, matches);
  }

  /**
   * Install the plugin
   *
   * @param {Vue} vue
   * @param {object} options
   */
  static install(vue, options) {
    if (!checkVersion(vue.version, MIN_VUE_VERSION)) {
      throw Error(`vue-screen requires at least Vue ${MIN_VUE_VERSION}`);
    }

    // eslint-disable-next-line no-param-reassign
    vue.prototype.$screen = new Plugin(options).screen;
  }
}
