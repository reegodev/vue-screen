import { VueConstructor } from 'vue';
import { VueScreen } from './screen';
declare module 'vue/types/vue' {
    interface Vue {
        $screen: VueScreen;
    }
}
declare global {
    interface Window {
        Vue: VueConstructor;
    }
}
