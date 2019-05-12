import Vue from 'vue';
import VueScreen from 'vue-screen';

Vue.use(VueScreen);

const Test = {
  template: `
  <div>
    <div class="portrait">Portrait: <span>{{ $screen.portrait }}</span></div>
    <div class="landscape">Landscape: <span>{{ $screen.landscape }}</span></div>
  </div>
  `,
};

new Vue({
  components: {
    Test,
  },
  template: '<div id="#app"><Test></Test></div>',
}).$mount('#app');
