import {ModuleDto} from "../index.dto";
const facade = require('./facade')

module.exports = {
  async initialize() {
    return facade();
  }
} as ModuleDto
