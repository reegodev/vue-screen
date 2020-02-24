const spawn = require('cross-spawn');

const server = require('../examples/server');

const runner = spawn(
  './node_modules/.bin/jest',
  [
    '/e2e/breakpoint.spec.ts',
  ],
  {
    stdio: 'inherit'
  }
)

runner.on('exit', function (code) {
  server && server.close()
  process.exit(code)
});

runner.on('error', function (err) {
  server && server.close()
  throw err
});
