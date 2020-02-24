import Vue from 'vue';
import VueScreen from 'vue-screen';

export default function({ app }) {
  let options = <%= serialize(options) %>;
  if (typeof options === 'object' && Object.keys(options).length === 0) {
    options = '';
  }

  Vue.use(VueScreen, options);
  app.$screen = Vue.prototype.$screen;
};
