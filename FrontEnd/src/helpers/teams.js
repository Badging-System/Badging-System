const axios = require('axios');

/**
 * This function returns teams
 */
export const getTeams = (table_data = false) => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/teams', { params: {
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

/**
 * This function returns teams
 */
export const getTopTeams = (table_data = false, id) => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/teams/topperforming', { params: {
            table_data: table_data, admin_id: id}
        })
        .then((response) => {            
            const results = {
                data: response.data.payload.data,
                columns: [
                    { field: 'rank', title: 'Rank', editable:'false'},
                    { field: 'name', title: 'Team', editable:'false'},
                    { field: 'coach', title: 'Coach', editable:'false'},
                    { field: 'playerCount', title: 'Active Memebers', editable:'false'},
                    { field: 'badgesCompleted', title: 'Badges Awarded', editable:'false'}
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

export const getTeamCount = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:4000/api/teams/count', {})
        .then((response) => {
            resolve(response.data.payload.data);
        })
        .catch((error) => {
            console.log(error)
            reject(error);
        })
    });
}