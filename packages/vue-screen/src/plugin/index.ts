import { App } from 'vue'
import { useScreen } from '../useScreen'
import { VueScreenConfig } from '../types/config'
import { useGrid } from '../useGrid'

export const install = (app: App, options: VueScreenConfig = 'tailwind'): void => {
  let screen
  let grid

  if (typeof options === 'string') {
    screen = useScreen()
    grid = useGrid(options)
  } else {
    screen = useScreen(options.screen)

    // ts cant figure out the type of arguments when union types are
    // passed to an overloaded function, so we need to use "any" or do a typeof check
    // on the arguments, which would ship 5 lines of js instead of one.

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    grid = useGrid(options.grid as any || 'tailwind')
  }

  app.config.globalProperties.$screen = screen
  app.config.globalProperties.$grid = grid
}
