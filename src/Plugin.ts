import { VueConstructor } from 'vue';
import { Breakpoints, ScreenController  } from './Screen';

export default {
  install(Vue: VueConstructor, breakpoints: Breakpoints = {}) {
    console.log(new ScreenController(breakpoints).getScreen());
    Vue.prototype.$screen = new ScreenController(breakpoints).getScreen();
  },
};
