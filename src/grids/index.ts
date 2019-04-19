import { Breakpoints } from '../types';

import bootstrap from './bootstrap';
import bulma from './bulma';
import foundation from './foundation';
import semantic from './semantic-ui';
import tailwind from './tailwind';

export default {
  bootstrap,
  bulma,
  foundation,
  'semantic-ui': semantic,
  tailwind,
} as {
  [key: string]: Breakpoints,
};
