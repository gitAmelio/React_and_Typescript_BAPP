import express from 'express';
import fs from 'fs';
import path from 'path';

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

// ?: had to commented out declaration in tsconfig.json
export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router();
  router.use(express.json()) // to get access body


  const { promises: fsp } = fs;

  const fullPath = path.join(dir, filename); 

  router.get('/cells', async (req, res) => {
  
    try {
      // Read the file
      const result = await fsp.readFile(fullPath, { encoding: 'utf-8'});
      
      res.send(JSON.parse(result));
    } catch (err: any) {
      // if file does not exist
      if (err.code === 'ENOENT') { 
        // check if dir exist, if not create it recursively
        fs.mkdirSync(dir, { recursive: true });
        // Add code to create a file and add default cells
        console.log('writing to file', fullPath)
        await fsp.writeFile(fullPath, '[]', 'utf-8');
        console.log('done writing')
        res.send([]);
      } else {
        //  rethrow error
        throw err;
      }

    }
  });

  router.post('/cells', async (req, res) => {
    // File will be created if it does not exist

    // Take the list of cells from the request obj
    // serialize them
    // note: the body can only acces if it has parsed
    const { cells }: { cells: Cell[] } = req.body;

    // Write the cells into the file
    await fsp.writeFile(fullPath, JSON.stringify(cells), 'utf-8');

    res.send({ status: 'OK'})
  });

  return router;
}
