export const inBrowser = typeof window !== 'undefined'

export const debounce = (callback: () => unknown, wait: number): () => void => {
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
