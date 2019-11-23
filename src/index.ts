import { VueConstructor } from 'vue'
import { inBrowser } from './utils'
import { createScreenObject } from './screen'
import { VueScreenConfig } from './interfaces/config'

const plugin = {
  install(Vue: VueConstructor, options: VueScreenConfig) {
    Vue.prototype.$screen = createScreenObject(options)
  }
}

if (inBrowser && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin
