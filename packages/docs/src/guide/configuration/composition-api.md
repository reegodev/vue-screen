---
editLink: true
---

# Configuration with Composition API


## useScreen

```js
useScreen(ssrConfig?, debounceDelay? = 100)
```

```ts
export interface SsrConfig {
    width?: number;
    height?: number;
    orientation?: 'portrait' | 'landscape';
    touch?: boolean;
}
```

- **ssrConfig**: an optional SsrConfig object for server-side rendering
- **debounceDelay**: an optional delay in milliseconds to debounce the resize event on the window object. Defaults to 100ms.


**ssrConfig** is used on the initial screen configuration, and is mostly used for server-side rendering where there is no window object to obtain screen information from.
The default value is taken from the Google Bot mobile crawler to force a mobile-first approach:

```js
{
  width: 430,
  height: 730
  orientation: 'portrait',
  touch: true
}
```

<br>
If you are not performing server-side rendering in your app, this config has no impact.


## useGrid

```ts
useGrid(config: string)
```

- **config**: a grid config.

The value can either be a string literal, with one of the supported UI frameworks:

```ts
'tailwind' | 'bootstrap' | 'bulma' | 'foundation' | 'materialize' | 'semanticUi'
```

or an object that specifies a custom grid:

```ts
Record<string, number | string>
```

For example:
```js
useGrid({
  phone: '340px',
  tablet: 768,
  desktop: '32em',
})
```


