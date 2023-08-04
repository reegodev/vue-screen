[![Build Status](https://img.shields.io/badge/vue-3.x-brightgreen.svg)](https://img.shields.io/badge/vue-3.x.x-brightgreen.svg)
[![Build Status](https://github.com/reegodev/vue-screen/workflows/Node.js%20CI/badge.svg)](https://github.com/reegodev/vue-screen/actions)
[![npm version](https://img.shields.io/npm/v/vue-screen)](https://www.npmjs.com/package/vue-screen)
[![npm downloads](https://img.shields.io/npm/dm/vue-screen)](https://www.npmjs.com/package/vue-screen)
[![codecov](https://codecov.io/gh/reegodev/vue-screen/branch/master/graph/badge.svg?token=KTHOOUSHFJ)](https://codecov.io/gh/reegodev/vue-screen)

<br>

> Warning: Version 2.x only supports Vue 3.<br> v1 docs are available [here](https://github.com/reegodev/vue-screen/tree/v1.5.3#vuescreen)

<br>

<img src="/packages/docs/src/public/logo.svg" alt="VueScreen logo" width="300" style="margin-top: 40px" />

# VueScreen
Reactive screen size and media query states for Vue. Supports your favourite UI framework out of the box, and can be configured with any custom breakpoints.

# Docs

[https://reegodev.github.io/vue-screen](https://reegodev.github.io/vue-screen)

# Features
- Reactive and debounced screen size<br>
- Reactive media query states and device orientation<br>
- Detect touch screen capability<br>
- Breakpoints for most common ui frameworks provided out of the box: Tailwind, Bootstrap, Bulma, Foundation, Materialize, Semantic UI<br>
- SSR compatible<br>

# Installation

```bash
npm i vue-screen
```

```bash
yarn add vue-screen
```

# Quick start

### Use with composition API
```js
import { useScreen, useGrid } from 'vue-screen'

export default {
    setup() {
        const screen = useScreen()
        const grid = useGrid('bulma')

        return {
            screen,
            grid
        }
    }
}
```
For advanced configurations, check out the [docs website](https://reegodev.github.io/vue-screen/).

### Use as a plugin
```js
import { createApp } from 'vue'
import VueScreen from 'vue-screen'

// In App.vue
createApp()
  .use(VueScreen, 'bootstrap')
  .mount('#app')

// In MyComponent.vue
<template>
    <ul>
        <li>Current breakpoint is: {{ $grid.breakpoint }}</li>
        <li>Window width is: {{ $screen.width }}</li>
        <li>Window height is: {{ $screen.height }}</li>
    </ul>
</template>
```

# Upgrading from v1

v2 introduces a few breaking changes both in the configuration and in the API.
Read more about them in the [docs section](https://reegodev.github.io/vue-screen/guide/upgrading).

# License

[MIT](/LICENSE)

