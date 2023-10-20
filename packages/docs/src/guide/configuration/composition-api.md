---
editLink: true
---

# Configuration with Composition API


## useScreen

```js
useScreen(ssrConfig?, debounceDelay? = 100)
```

```ts
export interface SsrConfig {
    width?: number;
    height?: number;
    orientation?: 'portrait' | 'landscape';
    touch?: boolean;
}
```

- **ssrConfig**: an optional SsrConfig object for server-side rendering
- **debounceDelay**: an optional delay in milliseconds to debounce the resize event on the window object. Defaults to 100ms.


**ssrConfig** is used on the initial screen configuration, and is mostly used for server-side rendering where there is no window object to obtain screen information from.
The default value is taken from the Google Bot mobile crawler to force a mobile-first approach:

```js
{
  width: 430,
  height: 730
  orientation: 'portrait',
  touch: true
}
```

<br>
If you are not performing server-side rendering in your app, this config has no impact.


## useGrid

```ts
useGrid(config: string)
```

- **config**: a grid config.

The value can either be a string literal, with one of the supported UI frameworks:

```ts
'tailwind' | 'bootstrap' | 'bootstrap4' | 'bootstrap5' | 'bulma' | 'foundation' | 'materialize' | 'semanticUi'
```

or an object that specifies a custom grid:

```ts
Record<string, number | string | ComputedBreakpoint>
```

For example:
```js
import { useGrid } from 'vue-screen'

useGrid({
  phone: '340px',
  tablet: 768,
  desktop: '32em',
})
```
<br>

#### Computed breakpoints

Aside from using direct breakpoint values, you can also specify breakpoints that depend on other breakpoints, for example:

```js
import { useGrid } from 'vue-screen'

useGrid({
  phone: '340px',
  tablet: 768,
  desktop: '32em',
  tabletAndDown: grid => !grid.desktop,
})
```

In this example, the breakpoint `tabletAndDown` will be recalculated everytime `desktop` breakpoint changes.

<br>

#### Extending default UI frameworks breakpoints

Sometimes it's useful to add new breakpoints to the default configuration of one of the supported UI frameworks.<br>
You can do that by using the `extendGrid` helper:

```js
import { useGrid, extendGrid } from 'vue-screen'

useGrid(extendGrid('tailwind', {
  mdAndDown: grid => !grid.lg
}))
```

