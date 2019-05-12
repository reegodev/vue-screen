import Vue from 'vue';
import VueScreen from 'vue-screen';

Vue.use(VueScreen);

const Test = {
  template: `
  <div>
    <div class="width">Width: <span>{{ $screen.width }}</span></div>
    <div class="breakpoint">Breakpoint: <span>{{ breakpoint }}</span></div>
  </div>
  `,
  computed: {
    breakpoint() {
      if (this.$screen.xl) {
        return 'XL';
      }

      if (this.$screen.lg) {
        return 'LG';
      }

      if (this.$screen.md) {
        return 'MD';
      }

      if (this.$screen.sm) {
        return 'SM';
      }

      return 'XS';
    }
  },
};

new Vue({
  components: {
    Test,
  },
  template: '<div id="#app"><Test></Test></div>',
}).$mount('#app');
