export const inBrowser = typeof window !== 'undefined'

export const debounce = (callback: (...params: unknown[]) => unknown, wait: number): (...params: unknown[]) => unknown => {
  let timeout;
  // eslint-disable-next-line func-names
  return function () {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    // eslint-disable-next-line func-names
    const later = function () {
      timeout = null;
      callback.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const remAndEmToPixels = (value: number): number => {
  return value * 16
}
