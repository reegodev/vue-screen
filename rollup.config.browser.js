import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/vue-screen.min.js',
    name: 'VueScreen',
    format: 'iife',
  },
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
    uglify(),
  ],
};
