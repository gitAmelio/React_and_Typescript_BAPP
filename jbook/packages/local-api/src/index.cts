import path from 'path';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
// import { createCellsRouter } from './routes/cells.cjs';
import { createCellsRouter } from './routes/cells.cjs';

export const serve = (
    port: number, 
    filename: string, 
    dir: string, 
    useProxy: boolean
  ) => {
  const app= express();
  
  app.use(createCellsRouter(filename, dir));
  
  if (useProxy) {
    app.use('/static', express.static(path.join(__dirname, 'build')));
    app.use(createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true,
      logLevel: 'silent'
    }))
  } else {
    const packagePath = require.resolve('local-client/build/index.html');
    app.use(express.static(path.dirname(packagePath)));
  }
 

  // returning a Promise will help catch  errors on app.listen
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
};