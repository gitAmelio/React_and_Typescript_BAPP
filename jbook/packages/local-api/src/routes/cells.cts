import express, { Router, Express } from 'express';
import path from 'path';
import { createProxyMiddleware } from 'http-proxy-middleware';
import axios from 'axios';

import { notebookReader, notebookWriter } from './notebook-io.cjs';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

// ?: had to commented out declaration in tsconfig.json
export const createCellsRouter = (filename: string, dir: string): Router => {
  const router = Router();
  router.use(express.json()) // to get access body

  router.get('/cells', async (req, res) => {

    notebookReader(res, dir, filename, (err, data) => {
      if (err) {
        console.log('Read Error on Notebook.js')
      } else {
        console.log('Data from notebook', data);
        res.send(data);
      }
    })

  });

  router.post('/cells', async (req, res) => {
    notebookWriter(req, res, dir, filename);
  });

  return router;
}

export async function setDynamicPath (app: Express) {

  let isLive: boolean = false;

  try {
    const response = await axios.get('http://localhost:3000/is-live.json');
 
    isLive = response.data.reply || false;
    
    if (isLive) {
      console.log('Serving from development');
      app.use('/static', express.static(path.join(__dirname, 'build')));
      app.use(createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent'
      }))
      return;
    }

  }  catch (error) {
    console.log('');
  }

  console.log('Serving from production');
  const packagePath = require.resolve('local-client/build/index.html');
  app.use(express.static(path.dirname(packagePath)));
}
