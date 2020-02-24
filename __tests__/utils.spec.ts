import { debounce, parseSemver, checkVersion } from '../src/utils';
import { sleep } from './helpers';

describe('utils', function() {

  describe('#debounce', () => {
    it('suppresses repeated function calls until a certain delay has passed', async () => {
      let changed = false;
      const delay = 400;
      const cb = debounce(() => changed = true, delay);

      expect(changed).toEqual(false);

      cb();
      expect(changed).toEqual(false);

      await sleep(delay * 0.25);
      expect(changed).toEqual(false);

      await sleep(delay * 0.5);
      expect(changed).toEqual(false);

      await sleep(delay);
      expect(changed).toEqual(true);
    });
  });

  describe('#parseSemver', () => {
    it('parses semver strings', () => {
      let parsed;

      parsed = parseSemver('0.1.0');
      expect(parsed.major).toEqual(0);
      expect(parsed.minor).toEqual(1);
      expect(parsed.patch).toEqual(0);

      parsed = parseSemver('1.0.0');
      expect(parsed.major).toEqual(1);
      expect(parsed.minor).toEqual(0);
      expect(parsed.patch).toEqual(0);

      parsed = parseSemver('2');
      expect(parsed.major).toEqual(2);
      expect(parsed.minor).toEqual(0);
      expect(parsed.patch).toEqual(0);

      parsed = parseSemver('1.4');
      expect(parsed.major).toEqual(1);
      expect(parsed.minor).toEqual(4);
      expect(parsed.patch).toEqual(0);
    });
  });

  describe('#checkVersion', () => {
    it('checks that a semver is greater than or equal of another', () => {
      expect(checkVersion('1.0.0', '0.0.0')).toEqual(true);
      expect(checkVersion('1.0.0', '1.0.0')).toEqual(true);
      expect(checkVersion('0.1.0', '1.0.0')).toEqual(false);
      expect(checkVersion('2.1.4', '2.1.6')).toEqual(false);
      expect(checkVersion('4.3.1', '4.3.0')).toEqual(true);
    });
  });

});
