import { createApp } from 'vue'
import {
  install
} from '../src/plugin'
import {
  DEFAULT_WIDTH
} from '../src/useScreen'


describe('plugin', () => {

  it('adds global properties to the app', () => {
    const app = createApp({})
    app.use({install}, 'bootstrap')

    expect(app.config.globalProperties.$screen).toBeTruthy()
    expect(app.config.globalProperties.$grid).toBeTruthy()
  })

  it('initializes with default properties', () => {
    const app = createApp({})
    app.use({install})

    expect(app.config.globalProperties.$grid).toHaveProperty('2xl')
    expect(app.config.globalProperties.$screen.width).toBe(DEFAULT_WIDTH)
  })

  it('initializes screen with custom properties', () => {
    const app = createApp({})
    app.use({install}, {
      ssr: {
        width: 1200,
        height: 800,
      }
    })

    expect(app.config.globalProperties.$screen.width).toBe(1200)
    expect(app.config.globalProperties.$screen.height).toBe(800)
  })

  it('initializes grid with a supported framework', () => {
    const app = createApp({})
    app.use({install}, {
      grid: 'foundation'
    })

    expect(app.config.globalProperties.$grid).toHaveProperty('small')
  })

})
