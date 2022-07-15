import 'dotenv/config'
import {ModuleFacadeDto} from "./modules/index.dto";
const AppProvider = require('./core/appProvider')

require('./modules').ready((facades: Map<string, ModuleFacadeDto>) => {
  AppProvider.facades = facades;
  console.log('Application is ready');
});
