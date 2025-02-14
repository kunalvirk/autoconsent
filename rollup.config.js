import json from '@rollup/plugin-json';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

export default [{
  input: './playwright/content.ts',
  output: [{
    file: 'dist/autoconsent.playwright.js',
    format: 'iife'
  }],
  plugins: [
    json(),
    typescript(),
    terser(),
  ]
}, {
  input: './lib/web.ts',
  output: [{
    file: pkg.module,
    format: 'es',
    globals: ['browser'],
  }, {
    file: pkg.main,
    format: 'cjs',
  }],
  plugins: [
    typescript(),
    terser(),
  ],
}, {
  input: './addon/background.ts',
  output: [{
    file: './dist/addon-mv3/background.bundle.js',
    format: 'iife',
  }, {
    file: './dist/addon-firefox/background.bundle.js',
    format: 'iife',
  }],
  plugins: [
    typescript(),
    copy({
      targets: [
        {
          src: [
            './addon/icons', 
            './rules/rules.json'
          ],
          dest: ['./dist/addon-firefox/', './dist/addon-mv3/']
        },
        {
          src: ['./addon/popup.html', './addon/devtools'],
          dest: ['./dist/addon-mv3/']
        },
        {
          src: './addon/manifest.mv3.json',
          dest: './dist/addon-mv3',
          rename: 'manifest.json',
        },
        {
          src: './addon/manifest.firefox.json',
          dest: './dist/addon-firefox',
          rename: 'manifest.json',
        },
        {
          src: './node_modules/bulma/css/bulma.min.css',
          dest: './dist/addon-mv3/devtools/'
        }
      ]
    })
  ]
}, {
  input: './addon/content.ts',
  output: [{
    file: './dist/addon-mv3/content.bundle.js',
    format: 'iife',
  }, {
    file: './dist/addon-firefox/content.bundle.js',
    format: 'iife',
  }],
  plugins: [
    typescript(),
  ],
}, {
  input: './addon/popup.ts',
  output: [{
    file: './dist/addon-mv3/popup.bundle.js',
    format: 'iife',
  }],
  plugins: [
    typescript(),
  ],
}, {
  input: './addon/devtools/panel.ts',
  output: [{
    file: './dist/addon-mv3/devtools/panel.js',
    format: 'iife',
  }],
  plugins: [
    typescript(),
  ],
}];
