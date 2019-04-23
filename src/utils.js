export const inBrowser = typeof window !== 'undefined';

export const debounce = (callback, wait) => {
  let timeout;
  return function () {
    const context = this, args = arguments;
    const later = function () {
      timeout = null;
      callback.apply(context, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export const checkVersion = (current, expected) => {
  current = parseSemver(current);
  expected = parseSemver(expected);
  return current.major > expected.major ||
    (
      current.major === expected.major &&
      current.minor >= expected.minor
    )
}

const parseSemver = version => {
  const fragments = version.split('.');
  return {
    major: parseInt(fragments[0]) || 1,
    minor: parseInt(fragments[1]) || 0,
    patch: parseInt(fragments[2]) || 0,
  }
}
