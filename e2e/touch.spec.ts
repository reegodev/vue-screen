import { loadExample } from './helpers';

describe('touch', () => {

  it('detects touch support', async () => {
    let page = await loadExample('touch', 'iPhone 6');
    let touch = await page.evaluate(() => {
      return document.querySelector('.touch span').textContent;
    });
    expect(touch).toEqual('true');

    page = await loadExample('touch');
    touch = await page.evaluate(() => {
      return document.querySelector('.touch span').textContent;
    });
    expect(touch).toEqual('false');
  });

});

