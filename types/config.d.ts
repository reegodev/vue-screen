import { VueScreenConfig, ParsedConfig, FrameworkLiteral } from './interfaces/config';
export declare const validateFrameworkName: (name: FrameworkLiteral) => void;
export declare const parseConfig: (rawConfig: VueScreenConfig) => ParsedConfig;
