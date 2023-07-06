---
editLink: true
---

# Getting Started

## Installation

```bash
yarn add vue-screen
```
```bash
npm i vue-screen
```

The library can be used in two ways: with Composition API or as a global plugin.

## Composition API

This is the recommended way if you only use Composition API.<br>

The library exposes two composables:
- `useScreen`: returns an object containing information about the screen size, resolution, device orientation, etc.<br>[View all properties of the screen object](/api/screen)<br><br>
- `useGrid`: returns an object containing information about the breakpoints state of your chosen UI framework<br> [View all properties of the grid object](/api/grid)


```vue
<script>
import { useScreen, useGrid } from 'vue-screen'
export default {
  setup() {
    const screen = useScreen()
    const grid = useGrid('tailwind')

    return {
      screen
      grid,
    }
  }
}
</script>
<template>
  <div>
    <p>Screen width is {{ screen.width }}</p>
    <p>Screen height is {{ screen.height }}</p>
    <p>Current breakpoint is {{ grid.breakpoint }}</p>
  </div>
</template>
```

If you need to share the same config between multiple components, check out [this example](/guide/examples/shared-config).

<br>

::: tip
This is also the most efficient method as you can tree shake away one of the two composable functions if you dont use them.
:::

<br>

## Plugin
This is the recommended way if you plan to use Options API.
```js
import { createApp } from 'vue'
import VueScreen from 'vue-screen'

createApp()
  .use(VueScreen, 'tailwind')
  .mount('#app')
```

After installing the plugin, 2 global properties will be injected in every component:
- `$screen`: contains information about the screen size, resolution, etc. 
- `$grid`: contains information about the breakpoints of your selected UI framework.

```vue
<template>
  <div>
    <p>Screen width is {{ $screen.width }}</p>
    <p>Screen height is {{ $screen.height }}</p>
    <p>Current breakpoint is {{ $grid.breakpoint }}</p>
  </div>
</template>
```