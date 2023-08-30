import path from 'path';
import { Command } from "commander";
import { serve } from "local-api";

/**
 * TODO:
 */

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (inputFilename = 'notebook.js', options: {port: string}) => {
    try {
      const director = path.join(process.cwd(), path.dirname(inputFilename));
      const filename = path.basename(inputFilename);
      const port = parseInt(options.port)
      await serve(port, filename, director);
    } catch (err: any) {
      console.log('Here is the problem', err.message);
    }
  })