import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
    name: 'filecache' // DB name
});

// const esbluildOnloadResult = (contents: string , request): esbuild.OnLoadResult =>{
//     return {
//         loader: 'jsx',
//         contents,
//         resolveDir: new URL('./', request.responseURL).pathname
//     };
// } 

export const fetchPlugin = (inputCode: string) => {
    
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild){
            // then on load, load your input code
            // if the input code have imports,exports or requires, 
            // respective onResolves will trigger and repeat the cycle. 
            build.onLoad({filter: /(^index\.js$)/}, () => {
                return {
                    loader: 'jsx',
                    contents: inputCode,
                };
            })

            // Check to see if we have already fetch this file
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                // and if it is in the cache
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);

                // if it is, return it immediately
                if (cachedResult) return cachedResult;
            });

            build.onLoad({filter: /.css$/}, async (args: any) => {
                
                const { data, request } = await axios.get(args.path)

                console.log('request: ',request)
            
                const escaped = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");
                
                const contents = `
                    const style = document.createElement('style');
                    style.innerText  = '${escaped}';
                    document.head.appendChild(style);
                    ` ;

                const newFileData: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents,
                    resolveDir: new URL('./', request.responseURL).pathname
                };

                // store response in cache
                await fileCache.setItem(args.path, newFileData)

                return newFileData;
            })

            build.onLoad({ filter: /.*/ }, async (args: any) => {
               
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
        }

    }
}