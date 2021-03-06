'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.runSql(`
    CREATE TABLE IF NOT EXISTS teams
    (
        id SERIAL PRIMARY KEY,
        name VARCHAR (255) UNIQUE NOT NULL,
        created_at TIMESTAMP default NOW()
    )
  `)
};

exports.down = function(db) {
  return db.runSql(`DROP TABLE IF EXISTS teams`)
};

exports._meta = {
  "version": 1
};
