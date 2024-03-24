---
editLink: true
---

# Configuration as a plugin

When used as a plugin, the library can be configured through the second parameter of the Vue `use` method.
```js
import { createApp } from 'vue'
import VueScreen from 'vue-screen'

createApp()
  .use(VueScreen, config? = 'tailwind')
  .mount('#app')
```

Config can be either:

- a string, with one of the supported UI frameworks:

```ts
'tailwind' | 'bootstrap' | 'bootstrap4' | 'bootstrap5' | 'bulma' | 'foundation' | 'materialize' | 'semanticUi'
```

- an object, with the following signature:

```ts
{
  grid?: string | object = 'tailwind',
  ssr?: object,
  debounceDelay?: number = 100
}
```

Please refer to [Composition API configuration](/guide/configuration/composition-api) for the signatures of each property.

## Using `screen` and `grid` properties in your components

### With composition API

```vue
<script setup>
import { inject } from 'vue'

const grid = inject('grid');
const screen = inject('screen')
</script>
```

### With options API

```vue
<script>
export default {
  onMounted() {
    console.log({
      screen: this.$screen,
      grid: this.$grid,
    })
  }
}
</script>
```