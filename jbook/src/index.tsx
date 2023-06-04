import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugins';

const root  = createRoot(document.getElementById('root')!);

const App = () => {
    const ref = useRef<any>();
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
 
    const startService = async () => {
        await esbuild.initialize({
            worker: true,
            // wasmURL: '/esbuild.wasm'
            // wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
            wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
        });
        ref.current = esbuild;
    }

    useEffect(() => {
        startService();
    }, []);

    const onClick = async () => {
       if(!ref.current){
        return;
       }

    //    const result = await ref.current.transform(input, {
    //         loader: 'jsx',
    //         target: 'es2015'
    //    });

    const result = await ref.current.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [
            unpkgPathPlugin(),
            fetchPlugin(input)
        ],
        define: {
            'process.env.NODE_ENV': '"production"',
            global: "window"
        }
    });

    // console.log(result);

    setCode(result.outputFiles[0].text);
    }

    return (
     <div>
        <textarea value={input} onChange={e => setInput(e.target.value)}></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <pre>{code}</pre>
    </div>
    )

}

root.render( 
<div>
    <App />
</div>
)