# Typescript library starter

Typescript + Babel + Jest starter template to write libraries

## Features

- Use Typescript to write the logic
- Generate definition files
- Transpile to ES5 by default, configurable.
- Run tests with Jest and show detailed code coverage
- Lint code with TsLint

## Usage

Clone the repo, install dependencies then develop your own library.
You should also install typescript as a global dependency: `npm i -g typescript`.

- Transpile to javascript: `npm run build`
- Transpile to javascript in watch mode `npm run build:watch`
- Run type checks only: `npm run check`
- Run type checks in watch mode: `npm run check:watch`
- Run tests: `npm test`

Remember to update `index.js` and `index.d.ts` with the correct imports/exports.

To see a detailed coverage report open `./coverage/index.html` in your browser.

Jest config is inside the `package.json` file