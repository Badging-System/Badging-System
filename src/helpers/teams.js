const axios = require('axios');
const moment = require('moment');

/**
 * This function returns teams
 */
export const getTeams = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8080/api/teams', {})
        .then((response) => {
            console.log(response);
            const results = {
                data: response.data.payload.data.map(team => ({
                    teamname: team.name,
                    coach: team.Coach,
                    playerCount: team.playerCount,
                    createdOn: moment().format(),
                    approved: team.Active
                })),
                columns: [
                    { field: 'team', title: 'Team', editable:'false'},
                    { field: 'coach', title: 'Coach', editable:'false'},
                    { field: 'playerCount', title: '# of Players', editable:'false'},
                    { field: 'createdOn', title: 'Created On', editable:'false'},
                    { field: 'approved', title: 'Approved', lookup: { true: 'true', false: 'false' }}
                  ]
            };
            resolve(results);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
    });
}