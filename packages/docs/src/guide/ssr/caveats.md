---
editLink: true
---

# SSR caveats

Unfortunately, when server-side rendering there is no information about the the screen size of the user who is requesting the page, so this library uses a configuration to decide the screen size on the server.<br>
This behaviour can lead to some issues.

## Hydration errors

You can step into hydration errors if you conditionally render DOM elements or components based on screen or grid properties, because they can be different between the server and the client.

For example, if you create a the following template:
```vue
<template>
  <MyComponent v-if="$grid.lg" />
</template>
```

And open the app with a screen at 1400x900, you will receive hydration errors because the server rendered the template when `$grid.lg` was false, while in the browser the same property is true.

To avoid these problems, use `v-show` instead of `v-if` whenever possible.

```vue
<template>
  <MyComponent v-show="$grid.lg" />
</template>
```

Since `v-show` keeps the element in the DOM, Vue will be able to match the DOM and vDOM correctly.

