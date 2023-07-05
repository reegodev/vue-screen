---
editLink: true
---

# TailwindCSS

Tailwind is used as the default UI framework, so you dont need to specify anything to use it:


```js
import { useGrid } from 'vue-screen'

const grid = useGrid()
```

```js
import VueScreen from 'vue-screen'

createApp().use(VueScreen)
```

However, you can also be explicit if you want to

```js
import { useGrid } from 'vue-screen'

const grid = useGrid('tailwind')
```

```js
import VueScreen from 'vue-screen'

createApp().use(VueScreen, 'tailwind')
```

Your grid object will contain the following properties:

```ts
{
  sm: boolean,
  md: boolean,
  lg: boolean,
  xl: boolean,
  '2xl': boolean,
  breakpoint: string | null // the current breakpoint
}
```

::: warning
The actual values of the properties depend on the screen size.
:::