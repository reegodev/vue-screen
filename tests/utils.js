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

  if (content) {
    /* if (typeof content === 'array') {
      for (const part of content) {
        await page.addScriptTag({
          part,
        });
      }
    } else { */
      await page.addScriptTag({
        content,
      });
    //}
  }

  return page;
}

export const delay = (callback, ms) => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      await callback();
      resolve();
    })
  });
}