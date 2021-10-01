require('@babel/polyfill');

const puppeteer = require('puppeteer');

const loadExample = async (example, device = '') => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  if (device) {
    await page.emulate(puppeteer.devices[device]);
  } else {
    await page.setViewport({
      width: 1200,
      height: 800,
    });
    await sleep(300);
  }

  await page.goto(`http://localhost:8080/${example}`);

  // Define a resize method to get around puppeteer's resize issues
  // https://github.com/GoogleChrome/puppeteer/issues/1183
  page.resize = async (viewport) => {
    await page.setViewport(viewport);
    await sleep(300);
  }

  return page;
}

const sleep = (ms) => {
  return new Promise(
    (resolve) => {
      setTimeout(() => resolve(), ms)
    }
  );
};

module.exports = {
  loadExample,
  sleep,
};
