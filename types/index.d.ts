import { VueConstructor } from 'vue';
import { VueScreenConfig } from './interfaces/config';
declare const plugin: {
    install(Vue: VueConstructor<import("vue").default>, options: VueScreenConfig): void;
};
export default plugin;
