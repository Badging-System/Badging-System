const axios = require('axios');
const moment = require('moment');

/**
 * This function returns teams
 */
export const getTeams = (table_data = false) => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8080/api/teams', { params: {
            table_data: table_data}
        })
        .then((response) => {
            const results = {
                data: response.data.payload.data,
                columns: [
                    { field: 'name', title: 'Team', editable:'false'},
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