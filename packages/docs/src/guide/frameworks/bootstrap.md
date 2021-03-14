---
editLink: true
---

# Bootstrap

To use Bootstrap as your UI framework, simply pass it to the configuration

```js
import { useGrid } from 'vue-screen'
const grid = useGrid('bootstrap')
```

```js
import VueScreen from 'vue-screen'
createApp().use(VueScreen, 'bootstrap')
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