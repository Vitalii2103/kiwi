import { ModuleFacadeDto } from "../index.dto";
const { Client } = require('pg')

module.exports = (db: typeof Client) => {
  return {
    async createEntries(bulkData: Array<any>) {
      for (let entry of bulkData) {
        const team = await (async () => {
          let q = `SELECT * FROM teams WHERE name = '${entry.team}' LIMIT 1`;
          let r = await db.query(q);

          if (r.rows.length === 0) {
            r = await db.query(`INSERT INTO teams (name) VALUES ($1)`, [entry.team]);

            if (r.rowCount !== 1) {
              throw new Error('Somethings wrong...')
            }

            r = await db.query(q);
          }

          return r.rows[0];
        })();

        const fn: string = entry['first name'];
        const ln: string = entry['last name'];
        const email: string = entry['email'];
        const desc: string = entry['role description'];
        const user = await db.query(`SELECT * FROM users WHERE email = '${email}' LIMIT 1`);

        if (!email) {
          continue;
        }

        if (!user.rows.length) {
          const q = `
            INSERT INTO users (team_id, first_name, last_name, role_description, email)
            VALUES ($1, $2, $3, $4, $5)
          `;
          const userAdded = await db.query(q, [team.id, fn, ln, desc, email ]);

          if (userAdded.rowCount !== 1) {
            throw new Error('Something went wrong while inserting new user')
          }
        }
      }
    },

    async execute(sql, params: Array<string|number> = []) {
      return await db.query(sql, params)
    }
  } as ModuleFacadeDto;
}
