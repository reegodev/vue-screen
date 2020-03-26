[![npm version](https://badge.fury.io/js/vue-screen.svg)](https://badge.fury.io/js/vue-screen)
[![Build Status](https://travis-ci.org/matteo-rigon/vue-screen.svg?branch=master)](https://travis-ci.org/matteo-rigon/vue-screen)
[![Build Status](https://img.shields.io/badge/vue-2.6.x-brightgreen.svg)](https://img.shields.io/badge/vue-2.x-brightgreen.svg)

# VueScreen
Reactive window size and media query states for VueJS. Supports your favourite UI framework grid breakpoints out of the box, and can be configured with any custom breakpoints.

[Demo](https://reegodev.github.io/vue-screen/)

## Features
✔ Reactive and debounced window innerWidth and innerHeight ↔ 🕐 <br>
✔ Reactive media query states and device orientation 💻📲<br>
✔ Detect touch screen capability 👆🖱<br>
✔ breakpoints for most common ui frameworks provided out of the box: Tailwind, Bootstrap, Bulma, Foundation, Materialize, Semantic UI ⚙ 📦<br>
✔ SSR compatible 🚀 📟 (Nuxt module included) <br>

## Requirements

As the library uses Vue.Observable API internally, Vue 2.6+ is required.

## Installation

Embed directly as a script:
```js
<script src="https://unpkg.com/vue-screen/dist/vue-screen.min.js"></script>
```

> When embedding, the script automatically registers itself as a Vue plugin. 

Via npm: 
```bash
npm i vue-screen
```

Via yarn:
```bash
yarn add vue-screen
```

## Setup
```js
import Vue from 'vue';
import VueScreen from 'vue-screen';

Vue.use(VueScreen);
```

## Configuration

Use default breakpoints from one of the supported UI frameworks:

#### Tailwind (default)
```js
Vue.use(VueScreen); 
```
```js
Vue.use(VueScreen, 'tailwind'); 
```

#### Bootstrap
```js
Vue.use(VueScreen, 'bootstrap'); 
```

#### Bulma
```js
Vue.use(VueScreen, 'bulma'); 
```

#### Foundation
```js
Vue.use(VueScreen, 'foundation'); 
```

#### Materialize
```js
Vue.use(VueScreen, 'materialize'); 
```

#### Semantic UI
```js
Vue.use(VueScreen, 'semantic-ui'); 
```

#### Custom breakpoints:

```js
Vue.use(VueScreen, {
    sm: 480, // will be converted to 480px
    md: '47em',
    lg: '1200px',
}); 
```

You can find default UI framework breakpoints [here](https://github.com/matteo-rigon/vue-screen/tree/develop/src/grids)

#### Callbacks
You can provide custom callbacks that will be run every time the debounced window resize event is triggered:
```js
Vue.use(VueScreen, {
    md: 768,
    lg: 992,
    xl: 1200,
    tablet: screen => screen.md && !screen.xl && screen.touch,
});
```

To use callbacks together with breakpoints from one of the supported UI frameworks you can specify the `extend` property:

```js
Vue.use(VueScreen, {
    extend: 'bootstrap',
    tablet: screen => screen.md && !screen.xl && screen.touch,
});
```

## Basic usage

After registering, the property `$screen` will be injected on the Vue prototype. You can access it in a component using `this.$screen`.

#### In a template
```html
<template>
    <div>
        <p>Page width is {{ $screen.width }} px</p>
        <p>Page height is {{ $screen.height }} px</p>
        <p>Current breakpoint is {{ $screen.breakpoint }} px</p>
    </div>
</template>
```

#### As computed properties
```html
<template>
    <div :class="media">
        <p>VueScreen</p>
    </div>
</template>
<script>
export default {
    computed: {
        media() {
            return {
                'is-phone': this.$screen.sm,
                'is-tablet': this.$screen.md,
                'is-desktop': this.$screen.lg,
                'can-touch': this.$screen.touch,
                'breakpoint': this.$screen.breakpoint,
            };
        }
    }
}
</script>
```

#### As watchers
```js
export default {
    watch: {
        '$screen.width'() {
            alert('Width changed');
        }
    }
}
```

Check out [demo source code](https://github.com/matteo-rigon/vue-screen/tree/develop/demo/src) for more examples.

## API
Available properties on the `$screen` object:

#### width
*Number*<br>
Alias of window.innerWidth
<br><br>
#### height
*Number*<br>
Alias of window.innerHeight
<br><br>
#### touch 
*Boolean*<br>
Tells if touch events are supported
<br><br>
#### portrait 
*Boolean*<br>
Tells if the device is in portrait mode
<br><br>
#### landscape 
*Boolean*<br>
Tells if the device is in landscape mode
<br><br>
#### breakpoint 
*String*<br>
Returns the currently active breakpoint. If you use custom breakpoint names, you must also provide the `breakpointsOrder` property (see below).
<br><br>
#### breakpointsOrder 
*Array*<br>
Contains the order of the custom breakpoints provided in the configuration. This is required for the `breakpoint` property to work with custom breakpoint names.
<br>
Example:
```js
Vue.use(VueScreen, {
    phonePortrait: 0,
    phoneLandscape: 520,
    tabletPortrait: 768,
    tabletLandscape: 1024,
    desktop: 1200,
    breakpointsOrder: ['phonePortrait', 'phoneLandscape', 'tabletPortrait', 'tabletLandscape', 'desktop']
});
```
> If you extend one of the default frameworks, `breakpointsOrder` is provided automatically.

<br><br>
#### &lt;breakpoint key&gt;
*Boolean*<br>
Every breakpoint key specified in the configuration will be available as a boolean value indicating if the corresponding media query matches.
<br><br>
To view default breakpoint keys and values for each framework, [click here](https://github.com/matteo-rigon/vue-screen/tree/master/src/grids). 
<br><br>
#### &lt;callback name&gt;
*Any*<br>
Every callback specified in the configuration will have a corresponding property indicating the result of the callback. Callbacks will be called on every debounced resize event.

## Nuxt module
The library can be used directly as a Nuxt module, just add it to the module section in `nuxt.config.js`:

```js
export default {
    ...
    ...
    modules: [
        'vue-screen/nuxt',
    ],

    screen: {
        extend: 'bootstrap',
    },
    ...
    ...
}
```


## Browser support

All browsers that support matchMedia API

<p class="ciu_embed" data-feature="matchmedia" data-periods="current,past_1,past_2" data-accessible-colours="false">
<a href="http://caniuse.com/#feat=matchmedia" target="_blank">
<picture>
<source type="image/webp" srcset="https://res.cloudinary.com/ireaderinokun/image/upload/v1557132257/caniuse-embed/matchmedia-2019-5-6.webp">
<source type="image/png" srcset="https://res.cloudinary.com/ireaderinokun/image/upload/v1557132257/caniuse-embed/matchmedia-2019-5-6.png">
<source type="image/jpeg" srcset="https://res.cloudinary.com/ireaderinokun/image/upload/v1557132257/caniuse-embed/matchmedia-2019-5-6.jpg">
<img src="https://res.cloudinary.com/ireaderinokun/image/upload/v1557132257/caniuse-embed/matchmedia-2019-5-6.png" alt="Data on support for the matchmedia feature across the major browsers from caniuse.com">
</picture>
</a>
</p>
