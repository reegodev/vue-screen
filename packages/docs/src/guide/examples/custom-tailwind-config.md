# Custom Tailwind configuration

Sometimes your UI framework breakpoints are not enough, and you need to add extra breakpoints.<br>
For example, if you use a custom Tailwind configuration, you can directly pass the `screens` object in the configuration:

```js
// ~/tailwind.config.js
module.exports = {
  theme: {
    screens: {
      xs: '340px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
  }
}
```

```vue
<script>
import { useGrid } from 'vue-screen'
import tailwindConfig from '~/tailwind.config.js'

export default {
  setup() {
    const grid = useGrid(tailwindConfig.theme.screens)

    return {
      grid
    }
  }
}
</script>
```