---
editLink: true
---

# Screen properties

The screen object contains the following properties:
- **resolution**: a string with the current screen resolution, ie: `1400x900`
- **width**: a number with the current screen width, ie: `1200`
- **height**: a number with the current screen height, ie: `900`
- **orientation**: a string with the current screen orientation, ie: `landscape`
- **portrait**: a boolean that tells if the orientation is in portrait mode
- **landscape**: a boolean that tells if the orientation is in landscape mode
- **touch**: a boolean that tells if the screen supports touch events.<br> Note that this property is not reactive due to browser limitations, so you need to reload the page to test if this property changes when simulating mobile devices with devtools.
