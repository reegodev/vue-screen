import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/vue-screen.min.js',
    name: 'VueScreen',
    format: 'iife',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
    uglify(),
  ],
};
