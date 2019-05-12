require('@babel/polyfill');

import { expect } from 'chai';
import { debounce, parseSemver, checkVersion } from '../../src/utils';
import { sleep } from './helpers';

describe('utils', function() {

  describe('#debounce', () => {
    it('suppresses repeated function calls until a certain delay has passed', async () => {
      let changed = false;
      const delay = 400;
      const cb = debounce(() => changed = true, delay);

      expect(changed).to.equal(false);

      cb();
      expect(changed).to.equal(false);

      await sleep(delay * 0.25);
      expect(changed).to.equal(false);

      await sleep(delay * 0.5);
      expect(changed).to.equal(false);

      await sleep(delay);
      expect(changed).to.equal(true);
    });
  });

  describe('#parseSemver', () => {
    it('parses semver strings', () => {
      let parsed;

      parsed = parseSemver('0.1.0');
      expect(parsed.major).to.equal(0);
      expect(parsed.minor).to.equal(1);
      expect(parsed.patch).to.equal(0);

      parsed = parseSemver('1.0.0');
      expect(parsed.major).to.equal(1);
      expect(parsed.minor).to.equal(0);
      expect(parsed.patch).to.equal(0);

      parsed = parseSemver('2');
      expect(parsed.major).to.equal(2);
      expect(parsed.minor).to.equal(0);
      expect(parsed.patch).to.equal(0);

      parsed = parseSemver('1.4');
      expect(parsed.major).to.equal(1);
      expect(parsed.minor).to.equal(4);
      expect(parsed.patch).to.equal(0);
    });
  });

  describe('#checkVersion', () => {
    it('checks that a semver is greater than or equal of another', () => {
      expect(checkVersion('1.0.0', '0.0.0')).to.equal(true);
      expect(checkVersion('1.0.0', '1.0.0')).to.equal(true);
      expect(checkVersion('0.1.0', '1.0.0')).to.equal(false);
      expect(checkVersion('2.1.4', '2.1.6')).to.equal(false);
      expect(checkVersion('4.3.1', '4.3.0')).to.equal(true);
    });
  });

});
