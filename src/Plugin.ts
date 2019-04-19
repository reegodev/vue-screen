import { VueConstructor } from 'vue';
import { ScreenController } from './Screen';
import { Breakpoints } from './types';

export default {
  install(Vue: VueConstructor, breakpoints: Breakpoints | string = '') {
    Vue.prototype.$screen = new ScreenController(breakpoints).getScreen();
  },
};
