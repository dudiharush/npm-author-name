import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';
import shebang from 'rollup-plugin-add-shebang';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const external = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.peerDependencies || {}))

export default [{
  input: pkg.source,

  external,

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'] }),
  ],
  external,

  output: [{
    file: pkg.main,
    format: 'cjs',
  }, {
    file: pkg.module,
    format: 'es',
   }
],
},
{
  input: 'src/cli.ts',
  external,
  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),
    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),
    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/cli.ts'] }),
    shebang({include: pkg.bin})
  ],
  external,

  output: [{
    file: pkg.bin,
    format: 'cjs',
  }
],
}
];