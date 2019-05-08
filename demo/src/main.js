import Vue from 'vue';
import VueScreen from 'vue-screen';
import App from './App.vue';

Vue.use(VueScreen);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
