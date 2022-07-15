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
    CREATE TABLE IF NOT EXISTS users
    (
        id SERIAL PRIMARY KEY,
        team_id INT NOT NULL,
        first_name VARCHAR (100),
        last_name VARCHAR (100),
        role_description text,
        email VARCHAR (100) UNIQUE NOT NULL,
        created_at TIMESTAMP default NOW(),
        FOREIGN KEY (team_id) REFERENCES teams (id) ON UPDATE CASCADE ON DELETE CASCADE
    )
  `)
};

exports.down = function(db) {
  return db.runSql('DROP TABLE IF EXISTS users');
};

exports._meta = {
  "version": 1
};
