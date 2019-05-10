require('@babel/polyfill');

import { Plugin, DEFAULT_FRAMEWORK, RESERVED_KEYS } from '../src/plugin';
import grids from '../src/grids';
import { expect } from 'chai';
import { createPage, breakpointsOnly } from './helpers';

describe('plugin', function() {

  it('provides breakpoints for supported frameworks', () => {
    for (const framework in grids) {
      const screen = breakpointsOnly(new Plugin(framework).screen);
      expect(
        Object.keys(screen).sort()
      ).to.have.members(
        Object.keys(grids[framework]).sort()
      );
    }
  });

  it('does not allow using protected keys as breakpoint names', () => {
    const init = key => new Plugin({[key]: 400});

    for (const key of RESERVED_KEYS) {
      expect(init.bind(null, key)).to.throw();
    }
  });

  it(`uses ${DEFAULT_FRAMEWORK} as default framework`, () => {
    const screen = breakpointsOnly(new Plugin().screen);
    expect(
      Object.keys(screen)
    ).to.have.members(
      Object.keys(grids[DEFAULT_FRAMEWORK])
    );
  });

  it('contains initial window size', async () => {
    const page = await createPage();
    const values = await page.evaluate(() => {
      return {
        actualWidth: window.innerWidth,
        expectedWidth: window.vm.$screen.width,
        actualHeight: window.innerHeight,
        expectedHeight: window.vm.$screen.height,
      };
    });

    expect(values.actualWidth).to.equal(values.expectedWidth);
    expect(values.actualHeight).to.equal(values.expectedHeight);
  });

  it('contains initial media query state', async () => {
    const page = await createPage();
    const breakpoints = grids[DEFAULT_FRAMEWORK];
    const values = await page.evaluate((breakpoints) => {
      const matches = {};

      for (const name in breakpoints) {
        let w = breakpoints[name];
        if (typeof w === 'number') {
          w = `${w}px`;
        }

        matches[name] = window.matchMedia(`(min-width: ${w})`).matches;
      }

      return {
        screen: window.vm.$screen,
        matches,
      };
    }, breakpoints);

    for (const name in breakpoints) {
      expect(values.screen[name]).to.equal(values.matches[name]);
    }
  });

  it(`has reactive window size`, async () => {
    const page = await createPage();
    const currentViewport = page.viewport();
    const nextViewport = {
      width: 1200,
      height: 768
    };

    expect(currentViewport.width).not.to.equal(nextViewport.width);
    expect(currentViewport.height).not.to.equal(nextViewport.height);

    await page.resize(nextViewport);
    const viewport1 = await page.evaluate(() => {
      return {
        width: window.vm.$screen.width,
        height: window.vm.$screen.height,
      }
    });
    expect(viewport1.width).to.equal(nextViewport.width);
    expect(viewport1.height).to.equal(nextViewport.height);

    nextViewport.width = 1400;
    nextViewport.height = 1120;
    await page.resize(nextViewport);
    const viewport2 = await page.evaluate(() => {
      return {
        width: window.vm.$screen.width,
        height: window.vm.$screen.height,
      }
    });
    expect(viewport2.width).to.equal(nextViewport.width);
    expect(viewport2.height).to.equal(nextViewport.height);
  });

  it('reacts to mediaQuery state changes', async () => {
    const page = await createPage();
    const breakpoints = grids[DEFAULT_FRAMEWORK];
    const lowestWidth = 1;

    await page.resize({ width: lowestWidth, height: 700 });
    expect(await page.evaluate(() => window.innerWidth)).to.equal(lowestWidth);

    for (const breakpointName in breakpoints) {
      const matches = await page.evaluate((breakpointName) => {
        return window.vm.$screen[breakpointName];
      }, breakpointName);
      expect(matches).to.equal(false);
    }

    for (const breakpointName in breakpoints) {
      await page.resize({ width: breakpoints[breakpointName], height: 700 });

      for (const bpName in breakpoints) {
        const matches = await page.evaluate((bpName) => {
          return window.vm.$screen[bpName];
        }, bpName);

        expect(matches).to.equal(breakpoints[bpName] <= breakpoints[breakpointName]);
      }
    }
  });

  it('contains initial orientation state', async () => {
    const page = await createPage();
    expect(await page.evaluate(() => window.vm.$screen.portrait)).to.equal(false);
    expect(await page.evaluate(() => window.vm.$screen.landscape)).to.equal(true);
  });

  it('runs callbacks on resize', async () => {
    
  });
});
