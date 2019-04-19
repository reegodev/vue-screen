import { ScreenController } from '../src/Screen';
import grids from '../src/grids';

it('contains initial window values', () => {
  const screen = new ScreenController().getScreen();
  expect(screen.width).toBe(window.innerWidth);
  expect(screen.height).toBe(window.innerHeight);
  expect(screen.touch).toBe('ontouchstart' in window);
});

it('initializes breakpoints with default frameworks', () => {
  for (const framework in grids) {
    const screen = new ScreenController(framework).getScreen();
    delete screen.width;
    delete screen.height;
    delete screen.touch;
    expect(
      Object.keys(screen).sort()
    ).toEqual(
      Object.keys(grids[framework]).sort()
    );
  }
});

it('uses tailwind as default grid framework', () => {
  const screen = new ScreenController().getScreen();
  delete screen.width;
  delete screen.height;
  delete screen.touch;
  expect(
    Object.keys(screen).sort()
  ).toEqual(
    Object.keys(grids['tailwind']).sort()
  );
});

it('sets initial media query state', () => {
  /* for (const framework in grids) {
    const screen = new ScreenController(framework).getScreen();
    const breakpoints = grids[framework];

    for (const name in breakpoints) {
      const width = parseInt(<string> <unknown> breakpoints[name]);
      expect(screen[name]).toBe(window.innerWidth >= width)
    }
  } */
});
