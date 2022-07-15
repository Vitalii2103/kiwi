import { readdirSync, existsSync } from "fs";
import {ModuleDto, ModuleFacadeDto} from "./index.dto";

async function ready(clb = (facades: Map<string, ModuleFacadeDto>): void => {}): Promise<void> {
  const moduleNames = readdirSync(__dirname, { withFileTypes: true });
  const facades: Map<string, ModuleFacadeDto> = new Map();

  for (let entry of moduleNames) {
    if (entry.isDirectory()) {
      const { name } = entry;
      const moduleSrc = `${__dirname}/${name}/${name}.ts`;

      if (existsSync(moduleSrc)) {
        const internalModule: ModuleDto = await import(moduleSrc);
        const facade = await internalModule.initialize();

        facades.set(name, facade);
      }
    }
  }

  clb(facades);
}

module.exports = {
  ready
}
