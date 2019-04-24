require('@babel/polyfill');

import plugin, { DEFAULT_FRAMEWORK, DEBOUNCE_MS } from '../src/plugin';
import grids from '../src/grids';
import { expect } from 'chai';
import { createPage, delay } from './utils';

describe('plugin', function() {

  it('provides breakpoints for supported frameworks', () => {
    for (const framework in grids) {
      const screen = new plugin(framework).screen;
      delete screen.width;
      delete screen.height;
      delete screen.touch;
      expect(
        Object.keys(screen).sort()
      ).to.have.members(
        Object.keys(grids[framework]).sort()
      );
    }
  });

  it(`uses ${DEFAULT_FRAMEWORK} as default framework`, () => {
    const screen = new plugin().screen;
    delete screen.width;
    delete screen.height;
    delete screen.touch;
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

  it(`has reactive and debounced window size`, async () => {
    const page = await createPage();
    const currentViewport = page.viewport();
    const nextViewport = {
      width: 1200,
      height: 768
    };

    await page.setViewport(nextViewport);
    const immediate = await page.evaluate(() => {
      return {
        width: window.vm.$screen.width,
        height: window.vm.$screen.height,
      }
    });
    expect(immediate.width).to.equal(currentViewport.width);
    expect(immediate.height).to.equal(currentViewport.height);

    await new Promise(resolve => setTimeout(resolve, DEBOUNCE_MS * 2));

    const delayed = await page.evaluate(() => {
      return {
        width: window.vm.$screen.width,
        height: window.vm.$screen.height,
      }
    });
    expect(delayed.width).to.equal(nextViewport.width);
    expect(delayed.height).to.equal(nextViewport.height);
  });

});
