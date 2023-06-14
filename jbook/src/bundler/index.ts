import { useRef } from "react";
import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugins";

let isEsbuildRunning = false; // closure's state

const bundle = async (userCode: string) => {

  // esbuild can only be initialize once
  if (!isEsbuildRunning){
    await esbuild.initialize({
      worker: true,
      wasmURL: "/esbuild.wasm",
      // wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
      // wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
    });
    isEsbuildRunning = true;
  }

  try {
    const result = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(userCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });
    return {
      code: result.outputFiles[0].text,
      err: ''
    }

  } catch (err: any) { 
    return {
      code: '',
      err: err.message
    }
  }

};

export default bundle;



