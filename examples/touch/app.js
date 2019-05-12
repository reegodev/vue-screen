import Vue from 'vue';
import VueScreen from 'vue-screen';

Vue.use(VueScreen);

const Test = {
  template: `
  <div>
    <div class="touch">Supports touch: <span>{{ $screen.touch }}</span></div>
  </div>
  `,
};

new Vue({
  components: {
    Test,
  },
  template: '<div id="#app"><Test></Test></div>',
}).$mount('#app');
