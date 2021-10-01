import Vue from 'vue';
import VueScreen from 'vue-screen';

Vue.use(VueScreen, {
  md: 768,
  lg: 992,
  xl: 1200,
  tablet(screen) {
    return screen.md && !screen.xl && screen.touch;
  },
  desktop(screen) {
    return screen.xl && !screen.touch;
  },
});

const Test = {
  template: `
  <div>
    <div class="tablet">Tablet: <span>{{ $screen.tablet }}</span></div>
    <div class="desktop">Desktop: <span>{{ $screen.desktop }}</span></div>
  </div>
  `,
};

new Vue({
  components: {
    Test,
  },
  template: '<div id="#app"><Test></Test></div>',
}).$mount('#app');
