import { reactive, onUnmounted } from 'vue'
import { inBrowser, debounce } from './utils'
import { ScreenObject, ScreenConfig } from './types'

// GoogleBot default screen properties
export const DEFAULT_WIDTH = 410
export const DEFAULT_HEIGHT = 730
export const DEFAULT_ORIENTATION = 'portrait'
export const DEFAULT_TOUCH_SUPPORT = true

export const DEFAULT_DEBOUNCE_DELAY = 100

export const useScreen = (config: ScreenConfig = {}, debounceDelay = DEFAULT_DEBOUNCE_DELAY): Readonly<ScreenObject> => {
  const width = config.width || DEFAULT_WIDTH
  const height = config.height || DEFAULT_HEIGHT
  const orientation = config.orientation || DEFAULT_ORIENTATION
  const touch = config.touch === undefined ? DEFAULT_TOUCH_SUPPORT : config.touch

  const screen = reactive({
    resolution: `${width}x${height}`,
    width: width,
    height: height,
    orientation: orientation,
    portrait: orientation === 'portrait',
    landscape: orientation !== 'portrait',
    touch: touch,
  } as ScreenObject)

  const updateWindowProperties = () => {
    screen.width = window.innerWidth
    screen.height = window.innerHeight
    screen.resolution = `${screen.width}x${screen.height}`
  }
  
  const updateOrientationPropperties = (e: MediaQueryListEvent | MediaQueryList) => {
    screen.portrait = e.matches
    screen.landscape = !e.matches
    screen.orientation = e.matches ? 'portrait' : 'landscape'
  }
  
  if (inBrowser) {
    const resizeListener = debounce(updateWindowProperties, debounceDelay)
    window.addEventListener('resize', resizeListener)
    updateWindowProperties()
  
    const query = window.matchMedia('(orientation: portrait)')
    if ('addEventListener' in query) {
      query.addEventListener('change', updateOrientationPropperties);
    } else {
      // https://github.com/reegodev/vue-screen/issues/30
      // query.addListener is not deprecated for iOS 12
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (query as any).addListener(updateOrientationPropperties)
    }

    updateOrientationPropperties(query)

    // This does not react to resize events.
    // You always need to reload the browser to add/remove touch support,
    // even when using DevTools device simulation
    screen.touch = 'ontouchstart' in window

    // Do not leak memory by keeping event listeners active.
    // This appears to work as expected, using useScreen() inside components
    // triggers this hook when they are destroyed.
    // If useScreen() is used outside a component, this hook is never executed.
    onUnmounted(() => {
      window.removeEventListener('resize', resizeListener)

      if ('removeEventListener' in query) {
        query.removeEventListener('change', updateOrientationPropperties);
      } else {
        // https://github.com/reegodev/vue-screen/issues/30
        // query.removeListener is not deprecated for iOS 12
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (query as any).removeListener(updateOrientationPropperties)
      }
    })
  }

  return screen as Readonly<ScreenObject>
}
