import { loadExample } from './helpers';

describe('size', () => {

  it('reacts to resize events', async () => {
    const page = await loadExample('window-size');
    const { 
      expectedWidth, 
      expectedHeight, 
      actualWidth, 
      actualHeight 
    } = await page.evaluate(function() {
      return {
        expectedWidth: parseInt(document.querySelector('.width span').textContent),
        expectedHeight: parseInt(document.querySelector('.height span').textContent),
        actualWidth: window.innerWidth,
        actualHeight: window.innerHeight,
      };
    });
    expect(expectedWidth).toEqual(actualWidth);
    expect(expectedHeight).toEqual(actualHeight);

    const nextViewport = {
      width: 1300,
      height: 800,
    };
    await page['resize'](nextViewport);
    const newViewport = await page.evaluate(() => {
      return {
        width: parseInt(document.querySelector('.width span').textContent),
        height: parseInt(document.querySelector('.height span').textContent),
      }
    });
    expect(newViewport.width).toEqual(nextViewport.width);
    expect(newViewport.height).toEqual(nextViewport.height);
  });

});

