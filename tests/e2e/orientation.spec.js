const { expect } = require('chai');
const { loadExample } = require('./helpers');

describe('orientation', () => {

  it('reacts to orientation changes', async () => {
    const page = await loadExample('orientation');
    await page.resize({
      width: 400,
      height: 700,
    });
    let orientation = await page.evaluate(() => {
      return {
        portrait: document.querySelector('.portrait span').textContent,
        landscape: document.querySelector('.landscape span').textContent,
      };
    });
    expect(orientation.portrait).to.equal('true');
    expect(orientation.landscape).to.equal('false');

    await page.resize({
      width: 1200,
      height: 800,
    });
    orientation = await page.evaluate(() => {
      return {
        portrait: document.querySelector('.portrait span').textContent,
        landscape: document.querySelector('.landscape span').textContent,
      };
    });
    expect(orientation.portrait).to.equal('false');
    expect(orientation.landscape).to.equal('true');
  });

});
