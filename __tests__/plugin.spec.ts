import { DEFAULT_FRAMEWORK, RESERVED_KEYS } from '../src/constants';
import grids from '../src/grids';
import { breakpointsOnly, createPlugin } from './helpers';
import { FrameworkLiteral, VueScreenConfigObject } from '../src/interfaces/config';

describe('plugin', function() {

  it('provides breakpoints for supported frameworks', () => {
    for (const framework in grids) {
      const screen = breakpointsOnly(createPlugin(framework as FrameworkLiteral));
      expect(
        Object.keys(screen).sort()
      ).toEqual(
        Object.keys(grids[framework as FrameworkLiteral]).sort()
      );
    }
  });

  it('does not allow using protected keys as breakpoint names', () => {
    for (const key of RESERVED_KEYS) {
      expect(createPlugin.bind(null, { [key]: 400 })).toThrow();
    }
  });

  it(`uses ${DEFAULT_FRAMEWORK} as default framework`, () => {
    const screen = breakpointsOnly(createPlugin());
    expect(
      Object.keys(screen)
    ).toEqual(
      Object.keys(grids[DEFAULT_FRAMEWORK])
    );
  });

  it('accepts custom breakpoints', () => {
    const breakpoints = {
      small: 500,
      medium: 800,
      large: 1400,
    } as VueScreenConfigObject;
    
    const screen = breakpointsOnly(createPlugin(breakpoints));
    expect(
      Object.keys(screen)
    ).toEqual(
      Object.keys(breakpoints)
    );
  });

  it('extends default frameworks with custom callbacks', () => {
    const config = {
      extend: 'bootstrap',
      test() {return false},
    } as VueScreenConfigObject

    const screen = breakpointsOnly(createPlugin(config));

    expect(
      Object.keys(screen)
    ).toEqual([
      ...Object.keys(grids['bootstrap']),
      'test',
    ]);
  });

});
