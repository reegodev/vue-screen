import { VueScreenConfig, ParsedConfig } from './interfaces/config';
import { VueScreen } from './interfaces/screen';
export declare const createScreenObject: (rawConfig: VueScreenConfig) => VueScreen;
export declare const initScreenObject: (config: ParsedConfig) => VueScreen;
export declare const createMediaQueries: (config: ParsedConfig) => Record<string, MediaQueryList>;
export declare const onResize: (screen: VueScreen, config: ParsedConfig, mediaQueries: Record<string, MediaQueryList>) => void;
