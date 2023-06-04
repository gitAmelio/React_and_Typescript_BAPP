import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache' // DB name
});

// just for testing
(async () => {
  await fileCache.setItem('color', 'red');

  const color = await fileCache.getItem('color');

  console.log(color)
})();


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
              import React, {useState} from 'react-select';
              console.log(React)
            `,
          };
        }

        // Check to see if we have already fetch this file
        // and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

        // if it is, return it immediately
        if (cachedResult) {
          return cachedResult;
        }

        const { data, request } = await axios.get(args.path)
       
        const newFileData: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname
        };
        // store response in cache
        await fileCache.setItem(args.path, newFileData)

        return newFileData;
      });
    },
  };
};
