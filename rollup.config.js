import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import filesize from 'rollup-plugin-filesize';

export default {
  input: './index.ts',
  external: ['react', 'react-dom'],
  output: {
    file: './dist/bundle.js',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
      presets: [
        '@babel/preset-env',
        '@babel/preset-react',
        '@babel/preset-typescript',
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    typescript(),
    filesize(),
  ],
};
