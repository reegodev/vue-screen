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

const parseSemver = (version) => {
  const fragments = version.split('.');
  return {
    major: parseInt(fragments[0], 10) || 1,
    minor: parseInt(fragments[1], 10) || 0,
    patch: parseInt(fragments[2], 10) || 0,
  };
};

export const checkVersion = (current, expected) => {
  const currentVersion = parseSemver(current);
  const expectedVersion = parseSemver(expected);
  return (
    currentVersion.major > expectedVersion.major
    || (
      currentVersion.major === expectedVersion.major
      && currentVersion.minor >= expectedVersion.minor
    )
  );
};
