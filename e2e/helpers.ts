import puppeteer, { Page, Viewport } from 'puppeteer';

export const loadExample = async (example: string, device = '') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  if (device) {
    await page.emulate(puppeteer.devices[device]);
  }

  await page.goto(`http://localhost:8080/${example}`);

  return page;
}

export const resize = async (page: Page, viewport: Viewport) => {
  await page.setViewport(viewport);
  await sleep(300);
}

export const sleep = (ms: number) => {
  return new Promise(
    (resolve) => {
      setTimeout(() => resolve(), ms)
    }
  );
};
