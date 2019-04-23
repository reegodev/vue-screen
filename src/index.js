import Screen from './Screen';
import { inBrowser, checkVersion } from './utils';

const MIN_VUE_VERSION = '2.6.0';

export default VueScreen = {
  install(Vue, breakpoints) {
    if (!checkVersion(Vue.version, MIN_VUE_VERSION)) {
      throw Error(`vue-screen requires at least Vue ${MIN_VUE_VERSION}`)
    }

    Vue.prototype.$screen = new Screen(breakpoints).get();
  }
}

if (inBrowser && window.Vue) {
  window.Vue.use(VueScreen)
}
