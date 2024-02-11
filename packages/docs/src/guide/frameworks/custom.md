---
editLink: true
---

# Custom

To use a custom framework, simply pass your custom grid configuration


```js
import { useGrid } from 'vue-screen'

const grid = useGrid({
  a: 340,
  b: 768,
  c: 1024,
})
```

```js
import VueScreen from 'vue-screen'

createApp().use(VueScreen, {
  grid: {
    a: 340,
    b: 768,
    c: 1024,
  }
})
```
::: danger
Always specify your breakpoints in ascending order, otherwise the library won't be able to calculate the current breakpoint.
:::

Your grid object will contain the names of the breakpoints you specified, in the above example they would be:

```ts
{
  a: boolean,
  b: boolean,
  c: boolean,
  breakpoint: string | null // the current breakpoint
}
```

::: warning
The actual values of the properties depend on the screen size.
:::

Using a custom grid can also be useful if you need to extend one of the supported frameworks with more breakpoints, for example:

```js
import { useGrid } from 'vue-screen'
import tailwindConfig from './tailwind.config.js'

const grid = useGrid({
  ...tailwindConfig.theme.screens,
  '3xl': '1940px',
})
```

```js
import VueScreen from 'vue-screen'
import tailwindConfig from './tailwind.config.js'

createApp().use(VueScreen, {
  grid: {
    ...tailwindConfig.theme.screens,
    '3xl': '1940px',
  }
})
```

::: danger
Remember that your breakpoints must be in ascending order. If you need to add a breakpoint between two existing ones, you have to be explicit:

```js
import VueScreen from 'vue-screen'
import tailwindConfig from './tailwind.config.js'

createApp().use(VueScreen, {
  grid: {
    sm: tailwindConfig.theme.screens.sm,
    md: tailwindConfig.theme.screens.md,
    lg: tailwindConfig.theme.screens.lg,
    lg-x: '1100px',
    xl: tailwindConfig.theme.screens.xl,
    2xl: tailwindConfig.theme.screens.2xl,
  }
})
```
:::