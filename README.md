# VueScreen

Reactive window dimensions and media query states for Vue components that integrates with most UI frameworks breakpoints.

## Features

- Debounced and reactive resize events
- Reactive, mobile-first media states,
- Integrates with your favourite UI framework grid system or with custom breakpoints
- Detects touch screen capabilities (based on actual browser support for touch events)

## Installation

### As a module:

`npm i vue-screen`

### Via CDN

`<script src="..."></script>`

## Quick start

```js
import Vue from 'vue';
import VueScreen from 'vue-screen';

Vue.use(VueScreen);

Vue.component('screen-test', {
  template: `
    <div>
      <div v-if="$screen.xl">XL size</div>
      <div v-else-if="$screen.lg">LG size</div>
      <div v-else-if="$screen.md">MD size</div>
      <div v-else-if="$screen.sm">SM size</div>
      <div v-else="$screen.sm">XS size</div>
    </div>
  `
})

new Vue({
  el: '#app',
})
```

### Defining breakpoints

