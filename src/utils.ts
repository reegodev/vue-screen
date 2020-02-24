export const inBrowser = typeof window !== 'undefined';

/**
 * Debounce a function call at most every x milliseconds
 * @param callback 
 * @param delay 
 */
export const debounce = (callback: () => any, delay: number) => {
  let timeout: ReturnType<typeof setTimeout>;
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
    timeout = setTimeout(later, delay);
  };
};

/**
 * Parse a semVer string into separate fragments
 * @param version 
 */
export const parseSemver = (version: string) => {
  const [major, minor, patch] = version.split('.').map((fragment) => parseInt(fragment) || 0);
  return {
    major: major || 0,
    minor: minor || 0,
    patch: patch || 0,
  };
};

/**
 * Check if a semVer is lower or equal of another
 * @param current 
 * @param required 
 */
export const checkVersion = (current: string, required: string): boolean => {
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
