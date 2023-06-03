import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

// faking a file system for esbuild
// by overwriting 'onResolve' and 'onLoad'
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      // try to find file at entryPoint 
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResolve', args);
        if (args.path === 'index.js'){
          return { path: args.path, namespace: 'a' };
        } 

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            namespace: 'a',
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href,
          }
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`
        }
      });

      // then on load, load your own script 
      // if your script have imports,exports or requires, 
      // respective onResolves will trigger and repeat the cycle. 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);

        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React from 'react';
              console.log(React)
            `,
          };
        }
        const { data, request } = await axios.get(args.path)
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        }
      });
    },
  };
};
