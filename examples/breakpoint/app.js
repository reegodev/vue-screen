import Vue from 'vue';
import VueScreen from 'vue-screen';

Vue.use(VueScreen, {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
});

const Test = {
  template: `
  <div>
    <div class="breakpoint">Breakpoint: <span>{{ $screen.breakpoint }}</span></div>
  </div>
  `,
};

new Vue({
  components: {
    Test,
  },
  template: '<div id="#app"><Test></Test></div>',
}).$mount('#app');
