import Vue from 'vue';
import { debounce, inBrowser, checkVersion } from './utils';
import grids from './grids';

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

export class Plugin {
  /**
   * Class constructor
   *
   * @param {object | string} breakpoints
   */
  constructor(breakpoints = '') {
    this.callbacks = {};

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

      this.runCallbacks();
    }
  }

  /**
   * Run callbacks
   */
  runCallbacks() {
    Object.keys(this.callbacks).forEach((key) => {
      this.screen[key] = this.callbacks[key].call(this.screen);
    });
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
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      touch: true,
      portrait: true,
      landscape: false,
    });

    Object.keys(breakpoints).forEach((name) => {
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
      } else {
        w = width;
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
    if (!checkVersion(vue.version, MIN_VUE_VERSION)) {
      throw Error(`vue-screen requires at least Vue ${MIN_VUE_VERSION}`);
    }

    // eslint-disable-next-line no-param-reassign
    vue.prototype.$screen = new Plugin(options).screen;
  }
}
