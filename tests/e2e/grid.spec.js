const { expect } = require('chai');
const { loadExample } = require('./helpers');

describe('grid', () => {

  it('reacts to media query state changes', async () => {
    const page = await loadExample('grid');
    await testBreakpoint(page, 400, 700, 'XS');
    await testBreakpoint(page, 600, 700, 'SM');
    await testBreakpoint(page, 800, 700, 'MD');
    await testBreakpoint(page, 1000, 700, 'LG');
    await testBreakpoint(page, 1300, 700, 'XL');
  });

});

const testBreakpoint = async (page, width, height, label) => {
  await page.resize({
    width,
    height,
  });
  let breakpoint = await page.evaluate(() => {
    return document.querySelector('.breakpoint span').textContent;
  });
  expect(breakpoint).to.equal(label);
}
