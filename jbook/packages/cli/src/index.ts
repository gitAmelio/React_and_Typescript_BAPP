// import inquirer from "inquirer";
// import { devConsoleLog } from "local-api";

// devConsoleLog()

// console.log('Hello from cli');

import { program } from "commander";
import { serveCommand } from "./commands/serve";

program.addCommand(serveCommand);

program.parse(process.argv);