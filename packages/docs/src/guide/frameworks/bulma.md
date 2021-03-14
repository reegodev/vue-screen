---
editLink: true
---

# Bulma

To use Bulma as your UI framework, simply pass it to the configuration

```js
import { useGrid } from 'vue-screen'
const grid = useGrid('bulma')
```

```js
import VueScreen from 'vue-screen'
createApp().use(VueScreen, 'bulma')
```

Your grid object will contain the following properties:

```ts
{
  mobile: boolean,
  tablet: boolean,
  desktop: boolean,
  widescreen: boolean,
  fullhd: boolean,
  breakpoint: string | null // the current breakpoint
}
```

::: warning
The actual values of the properties depend on the screen size.
:::