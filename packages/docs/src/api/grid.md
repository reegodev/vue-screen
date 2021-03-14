---
editLink: true
---

# Grid properties

The grid object is very dynamic, and depends on the breakpoints passed by the configuration object.
Every breakpoint name has a corresponding property telling if that breakpoint is active.
The only fixed property every grid object has is the `breakpoint` key, which contains the name of the current breakpoint.

For example, when using tailwind your grid object will contain the following properties:

```js
{
  sm: true,
  md: false,
  lg: false,
  xl: false,
  '2xl': false,
  breakpoint: 'sm',
}
```

::: warning
The actual values of the properties depend on the screen size.
:::

Please refer to specific frameworks for all properties.