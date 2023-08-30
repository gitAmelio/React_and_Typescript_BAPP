// import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugins";
import startService from './esbuild';

// wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
// wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',

export class BundleService {
  private static _instance: BundleService | null = null;
  private static isLoading: boolean = false;

  public static build = async (userCode: string) => {

    try {
      // console.log('startService::', startService )
      const result = await startService.build({
        entryPoints: ["index.js"],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(userCode)],
        define: {
          "process.env.NODE_ENV": '"production"',
          global: "window",
        },
        // to allow users to do their own React imports 
        // replace React's default functions with the follow:
        jsxFactory: '_React.createElement',
        jsxFragment: '_React.Fragment'
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
  }
  

}
