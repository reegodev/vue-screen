import { loadExample } from './helpers';

describe('orientation', () => {

  it('reacts to orientation changes', async () => {
    const page = await loadExample('orientation');
    await page['resize']({
      width: 400,
      height: 700,
    });
    let orientation = await page.evaluate(() => {
      return {
        portrait: document.querySelector('.portrait span').textContent,
        landscape: document.querySelector('.landscape span').textContent,
      };
    });
    expect(orientation.portrait).toEqual('true');
    expect(orientation.landscape).toEqual('false');

    await page['resize']({
      width: 1200,
      height: 800,
    });
    orientation = await page.evaluate(() => {
      return {
        portrait: document.querySelector('.portrait span').textContent,
        landscape: document.querySelector('.landscape span').textContent,
      };
    });
    expect(orientation.portrait).toEqual('false');
    expect(orientation.landscape).toEqual('true');
  });

});
