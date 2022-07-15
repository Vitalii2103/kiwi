const AppProvider = require('../../core/appProvider')

async function getRows(table: string) {
  const res = await AppProvider.facade('db').execute(`SELECT * FROM ${table}`);
  return res.rows;
}

const getUsers = async () =>  await getRows('users') ;
const getTeams = async () => await getRows('teams');

module.exports = {
  teams: async () => {
    const users = await getUsers();
    const teams = await getTeams();

    const usersMapped = new Map();
    users.forEach((user: any) => {
      const arr = usersMapped.get(user.team_id) || [];
      arr.push(user);
      usersMapped.set(user.team_id, arr);
    });

    return teams.map((team: any) => {
      team.users = usersMapped.get(team.id);
      return team;
    });
  },
  users: async () => {
    const users = await getUsers();
    const teams = await getTeams();

    const teamsMapped = new Map();
    teams.forEach((team: any) => {
      teamsMapped.set(team.id, team);
    });

    return users.map((user: any) => {
      user.team = teamsMapped.get(user.team_id);
      return user;
    })
  },
}
