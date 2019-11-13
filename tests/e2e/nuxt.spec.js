const { expect } = require('chai');
const { Nuxt, Builder } = require('nuxt');
const { resolve, basename } = require('path');

describe('nuxt module', () => {
  let nuxt

  before(async () => {
    nuxt = new Nuxt({
      mode: 'universal',
      modules: [
        resolve('.', 'nuxt.js'),
      ],
      screen: {
        extend: 'tailwind',
      },
      build: {
        extend (config) {
          config.resolve.alias['vue-screen'] = resolve('.', 'dist', 'vue-screen.esm.js')
        }
      }
    })
    await new Builder(nuxt).build()
    await nuxt.listen(3000)
  }, )

  after(async () => {
    await nuxt.close()
  })

  it('adds a custom plugin', () => {
    expect(
      basename(nuxt.options.plugins[0].src)
    ).to.equal('vue-screen.js');
  })

});
