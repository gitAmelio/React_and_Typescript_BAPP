import path from 'path';
import { Command } from "commander";
import { serve } from "local-api";

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4005')
  .action(async (inputFilename = 'notebook.js', options: {port: string}) => {
    try {
      const directory = path.join(process.cwd(), path.dirname(inputFilename));
      const filename = path.basename(inputFilename);
      const port = parseInt(options.port)
      await serve(port, filename, directory, !isProduction);
      console.log(
        `Opened ${filename}. Navigate to http://localhost:${port} to edit the file.`
      )
    } catch (err: any) {
      if (err.code === 'EADDRINUSE') {
        console.error('Port is in use. Try running on a different port.')
      } else {
        console.log('Here is the problem', err.message);
      }
      process.exit(1);
    }
  })