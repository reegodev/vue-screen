require('@babel/polyfill');

import { expect } from 'chai';
import { DEFAULT_FRAMEWORK, RESERVED_KEYS } from '../../src/plugin';
import grids from '../../src/grids';
import { breakpointsOnly, createPlugin } from './helpers';

describe('plugin', function() {

  it('provides breakpoints for supported frameworks', () => {
    for (const framework in grids) {
      const screen = breakpointsOnly(createPlugin(framework));
      expect(
        Object.keys(screen).sort()
      ).to.have.members(
        Object.keys(grids[framework]).sort()
      );
    }
  });

  it('does not allow using protected keys as breakpoint names', () => {
    for (const key of RESERVED_KEYS) {
      expect(createPlugin.bind(null, { [key]: 400 })).to.throw();
    }
  });

  it(`uses ${DEFAULT_FRAMEWORK} as default framework`, () => {
    const screen = breakpointsOnly(createPlugin());
    expect(
      Object.keys(screen)
    ).to.have.members(
      Object.keys(grids[DEFAULT_FRAMEWORK])
    );
  });

  it('accepts custom breakpoints', () => {
    const breakpoints = {
      small: 500,
      medium: 800,
      large: 1400,
    };
    const screen = breakpointsOnly(createPlugin(breakpoints));
    expect(
      Object.keys(screen)
    ).to.have.members(
      Object.keys(breakpoints)
    );
  });

});
