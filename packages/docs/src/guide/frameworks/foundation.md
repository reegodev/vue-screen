---
editLink: true
---

# Foundation

To use Foundation as your UI framework, simply pass it to the configuration

```js
import { useGrid } from 'vue-screen'

const grid = useGrid('foundation')
```

```js
import VueScreen from 'vue-screen'

createApp().use(VueScreen, 'foundation')
```

Your grid object will contain the following properties:

```ts
{
  small: boolean,
  medium: boolean,
  large: boolean,
  breakpoint: string | null // the current breakpoint
}
```

::: warning
The actual values of the properties depend on the screen size.
:::