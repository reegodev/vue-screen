import { PluginFunction } from 'vue'
import { VueScreenOptions } from './options'

export declare class VueScreen {
  static install: PluginFunction<VueScreenOptions>
}

export interface DefaultProperties {
  width: number;
  height: number;
  landscape: boolean;
  portrait: boolean;
  touch: boolean;
  breakpoint?: string;
  config: Record<string, any>;
}
export interface CustomProperties {
  [key: string]: any;
}

export declare type VueScreenObject = DefaultProperties & CustomProperties;