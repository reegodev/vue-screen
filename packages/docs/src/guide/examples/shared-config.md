# Shared config between components

If you use the Composition API and have a custom configuration it can be tedius to always pass the config everytime you create a new component.

Think about the following 2 components:

```vue
<!--> Component 1 <!-->
<script>
import { useGrid } from 'vue-screen'

export default {
  setup() {
    const grid = useGrid({
      a: 300,
      b: 500,
      c: 700,
      d: 900,
      e: 1200,
      f: 1500,
    })

    return {
      grid
    }
  }
}
</script>
```

```vue
<!--> Component 2 <!-->
<script>
import { useGrid } from 'vue-screen'

export default {
  setup() {
    const grid = useGrid({
      a: 300,
      b: 500,
      c: 700,
      d: 900,
      e: 1200,
      f: 1500,
    })

    return {
      grid
    }
  }
}
</script>
```

If you need to add another breakpoint, you have to change it in every component you used `useGrid`. While 2 components are not that much, think about when you app grows and you start having 30 components to edit!<br>
To share the config between multiple components, you can create a composable that exports your screen and grid object:

```js
// ~/composables/vue-screen
import { useScreen, useGrid } from 'vue-screen'

export const screen = useScreen()
export const grid = useGrid({
  a: 300,
  b: 500,
  c: 700,
  d: 900,
  e: 1200,
  f: 1500,
})
```
Now your components can import the grid object from the helper we just created, and all future updates to the config will propagate to the components automatically:

```vue
<!--> Component 1 <!-->
<script>
import { grid } from '~/composables/vue-screen'

export default {
  setup() {
    return {
      grid
    }
  }
}
</script>
```

```vue
<!--> Component 2 <!-->
<script>
import { grid } from '~/composables/vue-screen'

export default {
  setup() {
    return {
      grid
    }
  }
}
</script>
```