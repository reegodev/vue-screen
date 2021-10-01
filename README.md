[![npm version](https://badge.fury.io/js/vue-screen.svg)](https://badge.fury.io/js/vue-screen)
[![Build Status](https://travis-ci.org/reegodev/vue-screen.svg?branch=master)](https://travis-ci.org/matteo-rigon/vue-screen)
[![Build Status](https://img.shields.io/badge/vue-2.6.x-brightgreen.svg)](https://img.shields.io/badge/vue-2.x-brightgreen.svg)

# VueScreen
Reactive window size and media query states for VueJS. Supports your favourite UI framework grid breakpoints out of the box, and can be configured with any custom breakpoints.

> Version 1 only supports Vue 2. Vue 3 is supported in the [v2 branch](https://github.com/reegodev/vue-screen)

Table of contents
=================

<!--ts-->
   * [Features](#features)
   * [Requirements](#requirements)
   * [Installation](#installation)
   * [Setup](#setup)
   * [Basic usage](#basic-usage)
       * [In a template](#in-a-template)
       * [As computed properties](#as-computed-properties)
       * [As watchers](#as-watchers)
   * [Configuration](#configuration)
       * [Breakpoints](#breakpoints)
         * [Default breakpoints](#default-breakpoints)
             * [Tailwind \(default\)](#tailwind-default)
             * [Bootstrap](#bootstrap)
             * [Bulma](#bulma)
             * [Foundation](#foundation)
             * [Materialize](#materialize)
             * [Semantic UI](#semantic-ui)
         * [Custom breakpoints](#custom-breakpoints)
       * [Callbacks](#callbacks)
       * [Breakpoints order](#breakpoints-order)
   * [API](#api)
       * [Width](#width)
       * [Height](#height)
       * [Touch](#touch)
       * [Portrait](#portrait)
       * [Landscape](#landscape)
       * [Breakpoint](#breakpoint)
       * [Config](#config)
       * [&lt;breakpoint key&gt;](#breakpoint-key)
       * [&lt;callback key&gt;](#callback-key)
   * [Nuxt module](#nuxt-module)
   * [SSR Caveats](#ssr-caveats)
   * [Browser support](#browser-support)
   * [License](#license)

<!--te-->
 

# Features
✅ - Reactive and debounced window innerWidth and innerHeight<br>
✅ - Reactive media query states and device orientation<br>
✅ - Detect touch screen capability<br>
✅ - Breakpoints for most common ui frameworks provided out of the box: Tailwind, Bootstrap, Bulma, Foundation, Materialize, Semantic UI<br>
✅ - SSR compatible with Nuxt module included <br>

# Installation

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

# Setup
```js
import Vue from 'vue';
import VueScreen from 'vue-screen';

Vue.use(VueScreen);
```
# Basic usage

After registering, the property `$screen` will be injected on the Vue prototype. You can access it in a component using `this.$screen`.

## In a template
```html
<template>
    <div>
        <p>Page width is {{ $screen.width }} px</p>
        <p>Page height is {{ $screen.height }} px</p>
        <p>Current breakpoint is {{ $screen.breakpoint }} px</p>
    </div>
</template>
```

## As computed properties
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

## As watchers
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

# Configuration

## Breakpoints

### Default breakpoints
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

### Custom breakpoints:

```js
Vue.use(VueScreen, {
    sm: 480, // will be converted to 480px
    md: '47em',
    lg: '1200px',
}); 
```

You can find default UI framework breakpoints [here](https://github.com/matteo-rigon/vue-screen/tree/develop/src/grids)

## Callbacks
You can provide callbacks to decorate the `$screen` object with custom properties.
They are similar to Vue computed properties, but they can only depend on the properties of the `$screen` object will be run every time the debounced window resize event is triggered
```js
Vue.use(VueScreen, {
    md: 768,
    lg: 992,
    xl: 1200,
    tablet: screen => screen.md && !screen.xl && screen.touch,
});
```
Callbacks results will be included in the `$screen` object along with other breakpoint properties.
```js
console.log(this.$screen)
/*
Output on an iPad in portrait mode:
{
    md: true,
    lg: true,
    xl: false
    tablet: true,
}
*/
```

To use callbacks together with breakpoints from one of the supported UI frameworks you can specify the `extend` property:

```js
Vue.use(VueScreen, {
    extend: 'bootstrap',
    tablet: screen => screen.md && !screen.xl && screen.touch,
});
```

## Breakpoints order
This property is required in order to make `$object.breakpoint` property work with custom breakpoint names.
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


# API
Available properties on the `$screen` object:

## width
*Number*<br>
Alias of window.innerWidth
<br><br>
## height
*Number*<br>
Alias of window.innerHeight
<br><br>
## touch 
*Boolean*<br>
Tells if touch events are supported
<br><br>
## portrait 
*Boolean*<br>
Tells if the device is in portrait mode
<br><br>
## landscape 
*Boolean*<br>
Tells if the device is in landscape mode
<br><br>
## breakpoint 
*String*<br>
Returns the currently active breakpoint. If you use custom breakpoint names, you must provide the [`breakpointsOrder` property](#breakpoints-order).
<br><br>
## config 
*Object*<br>
Access the configuration passed when registering the plugin.
<br><br>
## &lt;breakpoint key&gt;
*Boolean*<br>
Every breakpoint key specified in the configuration will be available as a boolean value indicating if the corresponding media query matches.
<br><br>
To view default breakpoint keys and values for each framework, [click here](https://github.com/matteo-rigon/vue-screen/tree/master/src/grids). 
<br><br>
## &lt;callback key&gt;
*Any*<br>
Every callback specified in the configuration will have a corresponding property indicating the result of the callback. Callbacks will be called on every debounced resize event.

# Nuxt module
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

# SSR caveats

While this library has no problems with SSR, there are some caveats related to the fact that when performing SSR the server does not have a screen size.
Due to this, when performing SSR this library will always have a `$screen` object with the following properties:

```js
{
    width: 410,
    height: 730,
    touch: true,
    portrait: true,
    landscape: false,
    breakpoint: '<first breakpoint returned by breakpointsOrder>',
}
```
These values are some sensible defaults to promote a mobile-first approach.<br><br><br>
This behavior however can lead to hydration errors if you wanna conditionally render a component based on one of the `$screen` properties:

```html
<template>
    <div>
        <MyComponent v-if="$screen.lg" />
    </div>
</template>
```
When performing SSR, the template will be compiled into `<div><!----></div>`.<br>
When rendering the component on a browser with a width that matches the `$screen.lg` condition, the template will be compiled into `<div><MyComponent /></div>`.<br>
This will make Vue generate a warning in the console.<br><br>

To read more about this topic you can check out [this issue](https://github.com/reegodev/vue-screen/issues/14).

# Browser support

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

# License

[MIT](blob/master/LICENSE)