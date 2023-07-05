export * from './tailwind'
export * from './bootstrap'
export * from './bootstrap4'
export * from './bootstrap5'
export * from './bulma'
export * from './materialize'
export * from './foundation'
export * from './semanticUi'

import { default as tailwind } from './tailwind'
import { default as bootstrap } from './bootstrap'
import { default as bootstrap4 } from './bootstrap4'
import { default as bootstrap5 } from './bootstrap5'
import { default as bulma } from './bulma'
import { default as materialize } from './materialize'
import { default as foundation } from './foundation'
import { default as semanticUi } from './semanticUi'

export default {
  tailwind,
  bootstrap,
  bootstrap3: bootstrap,
  bootstrap4,
  bootstrap5,
  bulma,
  materialize,
  foundation,
  semanticUi,
}
