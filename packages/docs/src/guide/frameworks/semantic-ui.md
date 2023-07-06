---
editLink: true
---

# Semantic UI

To use Semantic UI as your UI framework, simply pass it to the configuration

```js
import { useGrid } from 'vue-screen'

const grid = useGrid('semanticUi')
```

```js
import VueScreen from 'vue-screen'

createApp().use(VueScreen, 'semanticUi')
```

Your grid object will contain the following properties:

```ts
{
  mobile: boolean,
  tablet: boolean,
  computer: boolean,
  large: boolean,
  breakpoint: string | null // the current breakpoint
}
```

::: warning
The actual values of the properties depend on the screen size.
:::