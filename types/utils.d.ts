export declare const inBrowser: boolean;
export declare const debounce: (callback: () => any, delay: number) => () => void;
export declare const parseSemver: (version: string) => {
    major: number;
    minor: number;
    patch: number;
};
export declare const checkVersion: (current: string, required: string) => boolean;
