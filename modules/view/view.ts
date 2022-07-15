import {ModuleDto} from "../index.dto";
const facade = require('./facade')

module.exports = {
  async initialize() {
    const templatesDir = `${__dirname}/templates`
    return facade(templatesDir);
  }
} as ModuleDto;
