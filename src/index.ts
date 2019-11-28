import { VueConstructor } from 'vue'
import { inBrowser, checkVersion } from './utils'
import { createScreenObject } from './screen'
import { VueScreenConfig } from './interfaces/config'
import { MIN_VUE_VERSION } from './constants'

const plugin = {
  install(Vue: VueConstructor, options: VueScreenConfig) {
    if (!checkVersion(Vue.version, MIN_VUE_VERSION)) {
      throw Error(`VueScreen requires at least Vue ${MIN_VUE_VERSION}`);
    }

    Vue.prototype.$screen = createScreenObject(options)
  }
}

if (inBrowser && window.Vue) {
  window.Vue.use(plugin);
}

export default plugin
