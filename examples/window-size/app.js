import Vue from 'vue';
import VueScreen from 'vue-screen';

Vue.use(VueScreen);

const Test = {
  template: `
  <div>
    <div class="width">Width: <span>{{ $screen.width }}</span></div>
    <div class="height">Height: <span>{{ $screen.height }}</span></div>
  </div>
  `,
};

new Vue({
  components: {
    Test,
  },
  template: '<div id="#app"><Test></Test></div>',
}).$mount('#app');
