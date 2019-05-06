import Vue from 'vue'
import VueScreen from 'vue-screen'

Vue.use(VueScreen)

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
