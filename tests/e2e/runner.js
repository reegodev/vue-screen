const spawn = require('cross-spawn');

const server = require('../../examples/server');

const runner = spawn('./node_modules/.bin/mocha', [
  '--require',
  '@babel/register',
  '--timeout',
  '5000',
  '--exit',
  '"tests/e2e/**.spec.js"',
], {
  stdio: 'inherit'
})

runner.on('exit', function (code) {
  server && server.close()
  process.exit(code)
});

runner.on('error', function (err) {
  server && server.close()
  throw err
});
