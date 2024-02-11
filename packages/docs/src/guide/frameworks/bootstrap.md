---
editLink: true
---

# Bootstrap

To use Bootstrap as your UI framework, simply pass it to the configuration

## Bootstrap 3
```js
import { useGrid } from 'vue-screen'

const grid = useGrid('bootstrap3')
```

```js
import VueScreen from 'vue-screen'

createApp().use(VueScreen, 'bootstrap3')
```

For backwards compatibility reasons, bootstrap 3 is also aliased as just `bootstrap`
```js
import { useGrid } from 'vue-screen'

const grid = useGrid('bootstrap') // Will use Bootstrap 3 grid
```

```js
import VueScreen from 'vue-screen'

createApp().use(VueScreen, 'bootstrap') // Will use Bootstrap 3 grid
```

Your grid object will contain the following properties:

```ts
{
  xs: boolean,
  sm: boolean,
  md: boolean,
  lg: boolean,
  breakpoint: string | null // the current breakpoint
}
```

## Bootstrap 4
```js
import { useGrid } from 'vue-screen'

const grid = useGrid('bootstrap4')
```

```js
import VueScreen from 'vue-screen'

createApp().use(VueScreen, 'bootstrap4')
```

Your grid object will contain the following properties:

```ts
{
  xs: boolean,
  sm: boolean,
  md: boolean,
  lg: boolean,
  xl: boolean
  breakpoint: string | null // the current breakpoint
}
```

## Bootstrap 5
```js
import { useGrid } from 'vue-screen'

const grid = useGrid('bootstrap5')
```

```js
import VueScreen from 'vue-screen'

createApp().use(VueScreen, 'bootstrap5')
```

Your grid object will contain the following properties:

```ts
{
  xs: boolean,
  sm: boolean,
  md: boolean,
  lg: boolean,
  xl: boolean,
  xxl: boolean,
  breakpoint: string | null // the current breakpoint
}
```

::: warning
The actual values of the properties depend on the screen size.
:::