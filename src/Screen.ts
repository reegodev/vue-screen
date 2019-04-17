import { debounce } from 'lodash';
import Vue from 'vue';

const DEFAULT_WIDTH = 410;
const DEFAULT_HEIGHT = 730;

export interface Breakpoints {
  [key: string]: number;
}

export interface BreakpointsState {
  [key: string]: boolean;
}

export interface ScreenProps {
  touch: boolean;
  width: number;
  height: number;
}

export type Screen = BreakpointsState & ScreenProps;

export class ScreenController {

  /**
   * Screen reactive properties
   */
  protected screen!: Screen;

  /**
   * Class constructor
   *
   * @param {Breakpoints} breakpoints
   */
  public constructor(breakpoints: Breakpoints = {}) {
    this.createScreen(breakpoints);
    this.attachResize();
  }

  /**
   * Get the reactive screen object
   */
  public getScreen(): Screen {
    return this.screen;
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
        }, 100),
      );
    }
  }

  /**
   * Create the reactive object
   *
   * @param {Breakpoints} breakpoints
   */
  protected createScreen(breakpoints: Breakpoints) {
    this.screen = Vue.observable({
      height: DEFAULT_HEIGHT,
      touch: true,
      width: DEFAULT_WIDTH,
    }) as Screen;

    for (const label in breakpoints) {
      if (breakpoints.hasOwnProperty(label)) {
        Vue.set(this.screen, label, false);
      }
    }
  }

}
