import { program } from "commander";
import { serveCommand } from "./commands/serve.js";

program.addCommand(serveCommand);

program.parse(process.argv);