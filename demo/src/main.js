import Vue from 'vue';
import VueScreen from 'vue-screen';
import App from './App.vue';

Vue.use(VueScreen, {
  extend: 'tailwind',
  mobileLandscape: screen => screen.landscape && screen.touch,
  device(screen) {
    if (screen.xl) {
      return 'Widescreen';
    }

    if (screen.lg && !screen.touch) {
      return 'Desktop';
    }

    if (screen.md) {
      return 'Tablet';
    }

    return 'Phone';
  }
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
