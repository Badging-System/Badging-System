const axios = require('axios');
const moment = require('moment');

/**
 * This function returns users
 */
export const getUsers = (id) => {
    return new Promise((resolve, reject) => {
        axios.get('/api/users', {admin_id:id})
            .then(response => {
                const results = {
                    data: response.data.payload.data.map(user => ({
                        username: user.Username,
                        email: user.Email,
                        name: user.First_name + " " + user.Last_name,
                        roles: user.Role,
                        createdOn: moment(user.createdOn).format(),
                        lastActivity: moment().format(),
                        active: user.Active
                    })),
                    columns: [
                        {field: 'username', title: 'Username', editable: 'false'},
                        {field: 'email', title: 'Email', editable: 'false'},
                        {field: 'name', title: 'Full Name', editable: 'false'},
                        {
                            field: 'roles',
                            title: 'Roles',
                            lookup: {Admin: 'Admin', Coach: 'Coach', User: 'User'}
                        },
                        {field: 'createdOn', title: 'Created On', editable: 'false'},
                        {field: 'lastActivity', title: 'Last Activity', editable: 'false'},
                        {field: 'active', title: 'Active', lookup: {true: 'true', false: 'false'}}
                    ]
                };
                resolve(results);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

export const getTopUsers = (table_data = false, id) => {
    return new Promise((resolve, reject) => {
        axios.get('/api/users/topperforming', { params: {
            table_data: table_data, team_id: id}
        })
        .then((response) => {
            const results = {
                data: response.data.payload.data,
                columns: [
                    { field: 'rank', title: 'Rank', editable:'false'},
                    { field: 'username', title: 'Username', editable:'false'},
                    { field: 'teamname', title: 'Team Name', editable:'false'},
                    { field: 'coach', title: 'Coach', editable:'false'},
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


export const getUserCount = () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/users/count', {})
            .then(response => {
                resolve(response.data.payload.data);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};


export const getCoachCount = () => {
    return new Promise((resolve, reject) => {
        axios.get('/api/coaches/count', {})
            .then(response => {
                resolve(response.data.payload.data);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

export const getUserTeamName = username => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/users/getUserTeamName/${username}`, {
        })
            .then((response) => {
                resolve(response.data.payload.message);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
};

export const getUserTeamMembers = username => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/users/getUserTeamMembers/${username}`, {
        })
            .then(response => {
                resolve(response.data.payload.message);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
};

export const getUserName = user_name => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/users/${user_name}`, {
        })
            .then(response => {
                resolve(response.data.payload.data);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });

    });
};
export const getUserBadges = username => {
    return new Promise((resolve, reject) => {
        axios.get(`/api/users/getUserBadges/${username}`, {
        })
            .then(response => {
                resolve(response.data.payload.data);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });

};
