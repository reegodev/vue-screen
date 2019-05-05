require('@babel/polyfill');

import puppeteer from 'puppeteer';
import { join } from 'path';

export const createPage = async (content = '') => {
  if (!content) {
    content = `
      window.vm = new Vue({
        el: '#app',
      })
    `;
  }

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(`
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="app"></div>
      </body>
      </html>
    `);

  await page.addScriptTag({
    url: 'https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js',
  });

  await page.addScriptTag({
    path: join(__dirname, '..', 'dist', 'vue-screen.min.js'),
  });

  await page.addScriptTag({
    content,
  });
  
  // Define a resize method to get around puppeteer's resize issues
  // https://github.com/GoogleChrome/puppeteer/issues/1183
  page.resize = async (viewport) => {
    await page.setViewport(viewport);
    await sleep(300);
  }

  return page;
}

export const sleep = (ms) => {
  return new Promise(
    (resolve) => {
      setTimeout(() => resolve(), ms)
    }
  );
};
