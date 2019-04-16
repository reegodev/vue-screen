import Vue from 'vue';
import { debounce } from 'lodash';

export interface Breakpoints {
  [key: string]: Number,
};

export interface BreakpointsState {
  [key: string]: Boolean,
};

export interface ScreenProps {
  touch: Boolean,
  width: Number,
  height: Number,
}

export type Screen = BreakpointsState & ScreenProps;

const DEFAULT_WIDTH = 410;
const DEFAULT_HEIGHT = 730;

export class ScreenController {

  /**
   * Screen reactive properties
   */
  protected screen!: Screen;

  /**
   * Class constructor
   * 
   * @param breakpoints 
   */
  public constructor(breakpoints: Breakpoints = {}) {
    this.createScreen(breakpoints);
    this.attachResize();
  }

  /**
   * Attach a listener to the window resize event
   */
  protected attachResize() {
    if (typeof window !== 'undefined') {
      window.addEventListener(
        'resize',
        debounce(() => {
          this.screen.width = window.innerWidth;
          this.screen.height = window.innerHeight;
        }, 100)
      )
    }
  }

  /**
   * Create the reactive object
   * 
   * @param breakpoints 
   */
  protected createScreen(breakpoints: Breakpoints) {
    this.screen = Vue.observable({
      touch: true,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    });
  }
}
