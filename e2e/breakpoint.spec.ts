import { loadExample, resize } from './helpers';

describe('breakpoint', () => {

  it('prints current breakpoint on load', async () => {
    await testBreakpoint('iPhone 6', 'xs');
    await testBreakpoint('iPhone 6 landscape', 'sm');
    await testBreakpoint('iPad', 'md');
    await testBreakpoint('iPad landscape', 'lg');
    await testBreakpoint('', 'xl');
  });

  it('recalculates current breakpoint on resize', async () => {
    const page = await loadExample('breakpoint', 'iPad');
    let breakpoint = await page.evaluate(() => {
      return document.querySelector('.breakpoint span').textContent;
    });
    expect(breakpoint).toEqual('md');

    await resize(page, {
      width: 1200,
      height: 800,
    });
    breakpoint = await page.evaluate(() => {
      return document.querySelector('.breakpoint span').textContent;
    });
    expect(breakpoint).toEqual('xl');
  });

});

const testBreakpoint = async (device: string, expected: string) => {
  const page = await loadExample('breakpoint', device);
  if (!device) {
    await resize(page, {
      width: 1200,
      height: 800,
    });
  }

  const breakpoint = await page.evaluate(() => {
    return document.querySelector('.breakpoint span').textContent;
  });
  expect(breakpoint).toEqual(expected);
}
