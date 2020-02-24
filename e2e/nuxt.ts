import { resolve, basename } from 'path';
import { Nuxt, Builder } from 'nuxt';

describe('nuxt module', () => {
  let nuxt

  beforeAll(async () => {
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

  afterAll(async () => {
    await nuxt.close()
  })

  it('adds a custom plugin', () => {
    expect(
      basename(nuxt.options.plugins[0].src)
    ).toEqual('vue-screen.js');
  })

});
