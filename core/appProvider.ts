import {ModuleFacadeDto} from "../modules/index.dto";

class AppProvider {
  private _facades: Map<string, ModuleFacadeDto> = new Map;

  get facades(): Map<string, ModuleFacadeDto> {
    return this._facades;
  }

  set facades(facades: Map<string, ModuleFacadeDto>) {
    this._facades = facades;
  }

  facade(name: string) {
    return this.facades.get(name);
  }
}

module.exports = new AppProvider;
