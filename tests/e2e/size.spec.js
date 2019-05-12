const { expect } = require('chai');
const { loadExample } = require('./helpers');

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
    expect(expectedWidth).to.equal(actualWidth);
    expect(expectedHeight).to.equal(actualHeight);

    const nextViewport = {
      width: 1300,
      height: 800,
    };
    await page.resize(nextViewport);
    const newViewport = await page.evaluate(() => {
      return {
        width: parseInt(document.querySelector('.width span').textContent),
        height: parseInt(document.querySelector('.height span').textContent),
      }
    });
    expect(newViewport.width).to.equal(nextViewport.width);
    expect(newViewport.height).to.equal(nextViewport.height);
  });

});

