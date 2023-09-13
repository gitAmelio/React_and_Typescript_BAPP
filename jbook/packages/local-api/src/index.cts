import express from 'express';
import { createCellsRouter, setDynamicPath } from './routes/cells.cjs';

export const serve = (
    port: number, 
    filename: string, 
    dir: string, 
    useProxy: boolean
  ) => {
  const app= express();

  app.use(createCellsRouter(filename, dir));

  setDynamicPath(app)

  // returning a Promise will help catch errors on app.listen
  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on('error', reject);
  });
  
};

