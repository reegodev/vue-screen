import Plugin from '../src';
import { VueScreen, VueScreenBreakpointsValues } from '../src/interfaces/screen';
import { VueScreenConfig } from '../src/interfaces/config';

export const sleep = (ms: number) => {
  return new Promise(
    (resolve) => {
      setTimeout(() => resolve(), ms)
    }
  );
};

export const createPlugin = (config: VueScreenConfig = undefined) => {
  const Vue = require('vue');
  Vue._installedPlugins = [];
  Vue.use(Plugin, config);
  return Vue.prototype.$screen;
}

export const breakpointsOnly = (screen: VueScreen): VueScreenBreakpointsValues => {
  delete screen.width;
  delete screen.height;
  delete screen.touch;
  delete screen.portrait;
  delete screen.landscape;
  delete screen.breakpoint;
  delete screen.breakpointsOrder;

  return screen as VueScreenBreakpointsValues;
}
