import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugins';
import CodeEditor from './components/code-editor';

const root  = createRoot(document.getElementById('root')!);

const App = () => {
    const ref = useRef<any>();
    const iframe = useRef<any>()
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
 
    const startService = async () => {
        await esbuild.initialize({
            worker: true,
            wasmURL: '/esbuild.wasm'
            // wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
            // wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
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

        // reset iframe
        iframe.current.srcdoc = html;

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

        // setCode(result.outputFiles[0].text);
        iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');

    };

    const html = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener('message', (event) => {
                    try {
                        eval(event.data);
                    } catch (err) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>'+ err + '</div>';
                        // rethrow error to console
                        console.error(err);
                    }
                }, false);
            </script>
        </body>
    </html>
    `;

    return (
     <div>
        <CodeEditor  
            initialValue='const a = 1;' 
            onChange={ (value) =>setInput(value) }
        />
        <textarea 
            value={input} 
            onChange={e =>setInput(e.target.value)}
        ></textarea>
        <div>
            <button onClick={onClick}>Submit</button>
        </div>
        <iframe title="code preview" ref={iframe} sandbox="allow-scripts" srcDoc={html} />
    </div>
    )

};

// const html = `
// <h1>Local HTML doc</h1>
// `;

root.render( 
<div>
    <App />
</div>
)