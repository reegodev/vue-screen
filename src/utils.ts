export const inBrowser = typeof window !== 'undefined';

export const debounce = (callback: () => any, delay: number) => {
  let timeout: number;
  // eslint-disable-next-line func-names
  return function () {
    const context = this;
    // eslint-disable-next-line prefer-rest-params
    const args = arguments;
    // eslint-disable-next-line func-names
    const later = function () {
      timeout = null;
      callback.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = window.setTimeout(later, delay);
  };
};

export const parseSemver = (version: string) => {
  const [major, minor, patch] = version.split('.').map((fragment) => parseInt(fragment) || 0);
  return {
    major: major || 1,
    minor,
    patch,
  };
};

export const checkVersion = (current: string, required: string) => {
  const currentVersion = parseSemver(current);
  const requiredVersion = parseSemver(required);
  return (
    currentVersion.major > requiredVersion.major
    || (
      currentVersion.major === requiredVersion.major
      && currentVersion.minor > requiredVersion.minor
    )
    || (
      currentVersion.major === requiredVersion.major
      && currentVersion.minor === requiredVersion.minor
      && currentVersion.patch >= requiredVersion.patch
    )
  );
};
