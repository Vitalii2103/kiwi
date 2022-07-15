import {ModuleFacadeDto} from "../index.dto";
import { Response } from 'express';
import {VIEW_COMMANDS, VIEW_TEMPLATES} from './view.dto'

function renderView(templatesDir: string, template?: VIEW_TEMPLATES): string {
  const fullPath = `${templatesDir}/${template}.tpl`;
  const fs = require('fs')

  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath).toString();
  }

  return '';
}

module.exports = (templatesDir: string) => {
  return {
    async execute(command: VIEW_COMMANDS, res: Response, tpl?: VIEW_TEMPLATES) {
      switch (command) {
        case VIEW_COMMANDS.RENDER:
          const template = renderView(templatesDir, tpl);
          res.send(template);
          break;
        default: return null;
      }
    }
  } as ModuleFacadeDto;
}
