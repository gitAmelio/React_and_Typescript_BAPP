import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';

const { promises: fsp } = fs;

interface Cell {
  id: string;
  content: string;
  type: 'text' | 'code';
}

export const notebookReader = (
  res: Response,
  dir: string, 
  filename: string, 
  cb: (err: any, fileData?: string)=>void,
  ) => {

  const filePath = path.join(dir, filename); 

  fs.readFile(filePath, 'utf8',async (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err: any) {
      if (err.code === 'ENOENT') { 
        // check if dir exist, if not create it recursively
        // Add code to create a file and add default cells
        try { 
          fs.mkdirSync(dir, { recursive: true });
          console.log('writing to file', filePath)
          await fsp.writeFile(filePath, '[]', 'utf-8');
          console.log('done writing')
          res.send([]);
        } catch (err) {
          return cb && cb(err);
        }
      } else {
        return cb && cb(err);
      }
    }
  });

}

export const notebookWriter = async (req: Request, res: Response, dir: string, filename: string) => {
  const filePath = path.join(dir, filename); 
  // File will be created if it does not exist

  // Take the list of cells from the request obj
  // serialize them
  // note: the body can only acces if it has parsed
  const { cells }: { cells: Cell[] } = req.body;

  console.log('cells', cells)
  console.log('at post fullPath', filePath);

  // Write the cells into the file
  await fsp.writeFile(filePath, JSON.stringify(cells), 'utf-8');

  // need to let the client know things went smooth.
  res.send({ status: 'OK'})
}