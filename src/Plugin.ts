import Vue from 'vue';
import { ScreenController, Breakpoints } from './Screen';

export default {
  install(vue: any, breakpoints: Breakpoints = {}) {
    vue.prototype.$screen = new ScreenController(breakpoints);
  }
}
