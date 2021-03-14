---
editLink: true
---

# Materialize

To use Materialize as your UI framework, simply pass it to the configuration

```js
import { useGrid } from 'vue-screen'
const grid = useGrid('materialize')
```

```js
import VueScreen from 'vue-screen'
createApp().use(VueScreen, 'materialize')
```

Your grid object will contain the following properties:

```ts
{
  s: boolean,
  m: boolean,
  l: boolean,
  xl: boolean,
  breakpoint: string | null // the current breakpoint
}
```

::: warning
The actual values of the properties depend on the screen size.
:::