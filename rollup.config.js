import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  external: ['vue'],
  output: [
    {
      file: 'dist/vue-screen.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/vue-screen.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/vue-screen.min.js',
      name: 'VueScreen',
      format: 'iife',
      globals: {
        vue: 'Vue',
      },
    },
  ],
  plugins: [
    typescript({
      useTsconfigDeclarationDir: true,
    }),
    terser({
      include: [/^.+\.min\.js$/],
    }),
  ],
};
