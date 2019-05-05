export const inBrowser = typeof window !== 'undefined';

export const debounce = (callback, wait) => {
  let timeout;
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
    timeout = setTimeout(later, wait);
  };
};

export const parseSemver = (version) => {
  const fragments = version.split('.');
  const major = parseInt(fragments[0], 10);
  return {
    major: typeof major === 'number' ? major : 1,
    minor: parseInt(fragments[1], 10) || 0,
    patch: parseInt(fragments[2], 10) || 0,
  };
};

export const checkVersion = (current, required) => {
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
