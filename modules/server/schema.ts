const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type Query {
    teams: [Team!],
    users: [User!]
  }

  type Team {
    id: ID!,
    name: String!
    users: [User!]
  }

  type User {
    id: ID!,
    first_name: String,
    last_name: String,
    role_description: String,
    email: String,
    team: Team!
  }
`);
