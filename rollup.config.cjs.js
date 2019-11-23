import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/vue-screen.cjs.js',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env'],
    }),
  ],
};
