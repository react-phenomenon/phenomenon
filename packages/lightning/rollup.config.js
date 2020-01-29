import resolve from 'rollup-plugin-node-resolve'
import ts from '@wessberg/rollup-plugin-ts'
import pkg from './package.json'

export default {
    input: './src/index.ts',
    external: [],

    plugins: [
        resolve({
            extensions: ['.ts'],
        }),
        ts({
            transpiler: 'babel',
        }),
    ],

    output: {
        file: pkg.module,
        format: 'es',
    },
}
