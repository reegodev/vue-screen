import { loadExample } from './helpers';

describe('callbacks', () => {

  it('runs callbacks on load', async () => {
    await testTablet('iPhone 6', false);
    await testTablet('iPhone 6 landscape', false);
    await testTablet('iPad', true);
    await testTablet('iPad landscape', true);
    await testTablet('', false);
    await testTablet('', false);
  });

  it('recalculates callbacks on resize', async () => {
    const page = await loadExample('callbacks', 'iPad');
    let tablet = await page.evaluate(() => {
      return document.querySelector('.tablet span').textContent;
    });
    expect(tablet).toEqual('true');

    await page['resize']({
      width: 1200,
      height: 800,
    });
    tablet = await page.evaluate(() => {
      return document.querySelector('.tablet span').textContent;
    });
    expect(tablet).toEqual('false');
  });

});

const testTablet = async (device, expected) => {
  const page = await loadExample('callbacks', device);
  if (!device) {
    await page['resize']({
      width: 1200,
      height: 800,
    });
  }

  const tablet = await page.evaluate(() => {
    return document.querySelector('.tablet span').textContent;
  });
  expect(tablet).toEqual(expected ? 'true' : 'false');
}
