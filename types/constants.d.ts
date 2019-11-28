import { FrameworkBreakpoint, FrameworkLiteral } from "./interfaces/config";
import { VueScreen } from "./interfaces/screen";
export declare const CUSTOM_FRAMEWORK_NAME = "__CUSTOM__";
export declare const DEFAULT_FRAMEWORK: FrameworkLiteral;
export declare const DEFAULT_DEBOUNCE_DELAY = 100;
export declare const MIN_VUE_VERSION = "2.6.0";
export declare const DEFAULT_BREAKPOINTS_ORDER: Record<FrameworkLiteral, FrameworkBreakpoint[]>;
export declare const RESERVED_KEYS: string[];
export declare const DEFAULT_BREAKPOINT_FN: (screen: VueScreen) => string;
