import { Plugin } from './plugin';
import { inBrowser } from './utils';

export default Plugin;

if (inBrowser && window.Vue) {
  window.Vue.use(Plugin);
}
