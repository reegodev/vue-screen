import Vue from 'vue'

import VueScreen from '../index'
import { VueScreenObject } from '../screen'

Vue.use(VueScreen)
Vue.use(VueScreen, 'tailwind')
Vue.use(VueScreen, {
  xs: 0,
  sm: 1024,
  md: 1200,
})
Vue.use(VueScreen, {
  extend: 'tailwind',
  tablet: (screen: VueScreenObject) => screen.md && !screen.ld && screen.touch,
})

const vm = new Vue()

vm.$screen.width
vm.$screen.height
vm.$screen.breakpoint
vm.$screen.breakpointsOrder
vm.$screen.landscape
vm.$screen.portrait
vm.$screen.touch
vm.$screen.xl
vm.$screen.tablet
vm.$screen.config