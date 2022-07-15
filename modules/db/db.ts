import {ModuleDto} from "../index.dto";

const { Client } = require('pg')
const facade = require('./facade')

module.exports = {
  async initialize() {
    const client = new Client({
      host: 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'kiwi',
      port: Number(process.env.DB_PORT) || 5432
    });

    await client.connect();
    return  facade(client);
  }
} as ModuleDto
