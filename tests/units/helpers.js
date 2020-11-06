require('@babel/polyfill');

import { Plugin } from '../../src/plugin';

export const sleep = (ms) => {
  return new Promise(
    (resolve) => {
      setTimeout(() => resolve(), ms)
    }
  );
};

export const createPlugin = (config = '') => {
  const Vue = require('vue');
  Vue._installedPlugins = [];
  Vue.use(Plugin, config);
  return Vue.prototype.$screen;
}

export const breakpointsOnly = (screen) => {
  delete screen.width;
  delete screen.height;
  delete screen.touch;
  delete screen.portrait;
  delete screen.landscape;
  delete screen.breakpoint;
  delete screen.breakpointsOrder;
  delete screen.config;

  return screen;
}
