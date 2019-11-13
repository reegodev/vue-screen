import { debounce, inBrowser, checkVersion } from './utils';
import grids from './grids/index';

let Vue;

const MIN_VUE_VERSION = '2.6.0';

// GoogleBot default screen size
const DEFAULT_WIDTH = 410;
const DEFAULT_HEIGHT = 730;

export const DEFAULT_FRAMEWORK = 'tailwind';

export const DEBOUNCE_MS = 100;

export const RESERVED_KEYS = [
  'width',
  'height',
  'touch',
  'portrait',
  'landscape',
];

const CUSTOM_FRAMEWORK_NAME = '__CUSTOM__';

export const DEFAULT_ORDERS = {
  bootstrap: ['xs', 'sm', 'md', 'lg', 'xl'],
  bulma: ['mobile', 'tablet', 'desktop', 'widescreen', 'fullhd'],
  foundation: ['small', 'medium', 'large'],
  materialize: ['s', 'm', 'l', 'xl'],
  'semantic-ui': ['mobile', 'tablet', 'computer', 'large'],
  tailwind: ['xs', 'sm', 'md', 'lg', 'xl'],
};

export class Plugin {
  /**
   * Class constructor
   *
   * @param {object | string} breakpoints
   */
  constructor(breakpoints = '') {
    this.callbacks = {};
    this.framework = '';
    this.customBreakpointFn = false;
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
      if (breakpoints.extend) {
        this.framework = breakpoints.extend.toString();
        // eslint-disable-next-line no-param-reassign
        delete breakpoints.extend;

        return Object.assign(
          {},
          breakpoints,
          Plugin.getBreakpoints()
        );
      }

      this.framework = CUSTOM_FRAMEWORK_NAME;

      return breakpoints;
    }

    this.framework = breakpoints.toString();

    return Plugin.getBreakpoints();
  }

  /**
   * Get the breakpoints of one of the supported frameworks
   *
   * @param {string} framework
   * @returns {object}
   */
  static getBreakpoints() {
    if (!this.framework) {
      // eslint-disable-next-line no-param-reassign
      this.framework = DEFAULT_FRAMEWORK;
    }

    if (!grids[this.framework]) {
      throw new Error(`Cannot find grid breakpoints for framework "${this.framework}"`);
    }

    return grids[this.framework];
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

      this.runCallbacks();
      this.findCurrentBreakpoint();
    }
  }

  /**
   * Run callbacks
   */
  runCallbacks() {
    Object.keys(this.callbacks).forEach((key) => {
      this.screen[key] = this.callbacks[key].call(null, this.screen);
    });
  }

  /**
   * Calculate the current breakpoint name based on "order" property
   */
  findCurrentBreakpoint() {
    if (this.customBreakpointFn) {
      return;
    }

    this.screen.breakpoint = this.screen.breakpointsOrder.reduce(
      (activeBreakpoint, currentBreakpoint) => {
        if (this.screen[currentBreakpoint]) {
          return currentBreakpoint;
        }

        return activeBreakpoint;
      },
      this.screen.breakpointsOrder[0]
    );
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
    const breakpointKeys = Object.keys(breakpoints);
    const breakpointsOrder = DEFAULT_ORDERS[this.framework] || breakpointKeys;

    this.screen = Vue.observable({
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      touch: true,
      portrait: true,
      landscape: false,
      breakpointsOrder,
      breakpoint: breakpointsOrder[0],
    });

    if (breakpointKeys.includes('breakpoint')) {
      this.customBreakpointFn = true;
    }

    this.findCurrentBreakpoint();

    breakpointKeys.forEach((name) => {
      if (RESERVED_KEYS.indexOf(name) >= 0) {
        throw new Error(`Invalid breakpoint name: "${name}". This key is reserved.`);
      }

      Vue.set(this.screen, name, false);
    });

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
      let w = null;

      if (typeof width === 'function') {
        this.callbacks[name] = width;
      } else if (typeof width === 'number') {
        w = `${width}px`;
      } else if (typeof width === 'string') {
        w = width;
      } else {
        this.screen[name] = width;
      }

      if (w) {
        const query = window.matchMedia(`(min-width: ${w})`);
        query.addListener(e => this.mediaStateChanged(name, e.matches));
        this.mediaStateChanged(name, query.matches);
      }
    });

    const query = window.matchMedia('(orientation: portrait)');
    query.addListener((e) => {
      this.mediaStateChanged('portrait', e.matches);
      this.mediaStateChanged('landscape', !e.matches);
    });

    this.mediaStateChanged('portrait', query.matches);
    this.mediaStateChanged('landscape', !query.matches);
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
    Vue = vue;

    if (!checkVersion(Vue.version, MIN_VUE_VERSION)) {
      throw Error(`VueScreen requires at least Vue ${MIN_VUE_VERSION}`);
    }

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$screen = new Plugin(options).screen;
  }
}
