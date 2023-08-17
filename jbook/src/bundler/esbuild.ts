import * as esbuild from "esbuild-wasm";
import { useMemo } from "react";

type BR = esbuild.BuildResult;

// Global variable
let startService: any = null;

// Function that returns a Promise that resolves when the global value is set
async function waitForGlobalValue() {
  const result = await new Promise((resolve) => {
    if (startService !== null) {
      resolve(startService);
    } else {
      // Set up an interval to check periodically
      const interval = setInterval(() => {
        if (startService !== null) {
          clearInterval(interval);
          resolve(startService);
        }
      }, 100);  // Adjust the interval time as needed
    }
  })
  return result
}

// Function to set the global value (simulated asynchronous process)
async function setStartService() {
    if(startService) return;
    try {
      await esbuild.initialize({
          worker: true,
          wasmURL: "./esbuild.wasm"
      });
      startService = esbuild;
    } catch (error) {
      if (error instanceof Error && error.message.includes('initialize')) {
        startService = esbuild;
      } else {
            throw error;
      }
    }  
}

// Async function that uses async/await to wait for the global value to be set
async function loadStartService() {
  await setStartService();
  const temp = await waitForGlobalValue();
  return startService
}

export default await loadStartService();