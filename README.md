[![Build Status](https://travis-ci.org/matteo-rigon/vue-screen.svg?branch=master)](https://travis-ci.org/matteo-rigon/vue-screen)
[![Build Status](https://img.shields.io/badge/vue-2.6.x-brightgreen.svg)](https://img.shields.io/badge/vue-2.x-brightgreen.svg)

# VueScreen
A Vue plugin that provides reactive window size and media query states. Supports your favourite UI framework grid breakpoints out of the box, and can be configured with any custom breakpoints.

## Features
- reactive and debounced window innerWidth and innerHeight
- reactive media query states
- detect touch screen capability 
- breakpoints for most common ui frameworks provided out of the box: Tailwind, Bootstrap, Bulma, Foundation, Materialize, Semantic UI
- SSR compatible

## Requirements

Vue 2.6+

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

```js
import Vue from 'vue';
import VueScreen from 'vue-screen' ;

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

Provide custom breakpoints:

```js
Vue.use(VueScreen, {
    sm: 480, // will be converted to 480px
    md: '47em',
    lg: '1200px',
}); 
```

## Usage

After registering, the new property `$screen` will be injected on the Vue prototype. You can access it in every component using `this.$screen`

Available properties on the $screen object:

#### width
*Number*<br>
Equivalent to window.innerWidth
<br><br>
#### height
*Number*<br>
Equivalent to window.innerHeight
<br><br>
#### touch 
*Boolean*<br>
Tells if touch events are supported
<br><br>
#### &lt;breakpoint key&gt;
*Boolean*<br>
Every breakpoint key specified in the configuration will be available as a boolean value indicating if the corresponding media query matches.
<br><br>
To view default breakpoint keys and values for each framework, [click here](https://github.com/matteo-rigon/vue-screen/tree/master/src/grids). 





