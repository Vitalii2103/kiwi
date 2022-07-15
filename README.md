# Installation
Run `npm i` inside project folder. Project created and tested with `npm v8.13.2` and `node v18.6.0`.

# Database
Create Postgress DB and set up connection data on `.env`. Default DB name is `kiwi`.

# Migrations
Before start project and after DB connection configured, please run script `npm run migrate`. Please check two tables (`users`, `teams`) are exists on specified database.

# Runtime
To run application please use script `npm run start`. Please check log, `Application is ready` inform that app running correctly.
For test `graphql` requests, open `http://localhost:4000/api` (port `4000` is default port from `.env`. You can specify your own port and use instead of default).
To import data from `CSV` to database go to `http://localhost:4000/csv` and use form. You can find `CSV` example file on `/__mocks__/users.csv`. After the form sended, alert communicator will inform you about status. If all work fine you will see `DONE!` message.

# Examples
GraphQL example query:
```
{
  teams {
    id,
    name,
    users {
      id,
      last_name,
    }
  },
  users {
    email,
    team {
      name
    }
  }
}
```

# Tests
Use script `npm run test` for testing application with Jest package.

# Questions
If you have questions please contact me `khovit@gmail.com`.
