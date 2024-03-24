import { App, Plugin } from 'vue'
import { useScreen } from './useScreen'
import { VueScreenConfig } from './types/config'
import { useGrid } from './useGrid'

export const install = (app: App, options: VueScreenConfig): void => {
  let screen
  let grid

  if (typeof options === 'string') {
    screen = useScreen()
    grid = useGrid(options)
  } else {
    options = options || { grid: undefined, ssr: undefined, debounceDelay: undefined }

    screen = useScreen(options.ssr, options.debounceDelay)

    // ts cant figure out the type of arguments when union types are
    // passed to an overloaded function, so we need to use "any" or do a typeof check
    // on the arguments, which would ship 5 lines of js instead of one.

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    grid = useGrid(options.grid as any)
  }

  app.config.globalProperties.$screen = screen
  app.config.globalProperties.$grid = grid
  app.provide('screen', screen);
  app.provide('grid', grid);
}

export const plugin: Plugin = {
  install
}
