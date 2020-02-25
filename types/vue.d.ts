import Vue from 'vue'
import { VueScreenObject } from './index'

declare module 'vue/types/vue' {
  interface Vue {
    readonly $screen: VueScreenObject
  }
}
