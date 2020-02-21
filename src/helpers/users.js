const axios = require('axios');
const moment = require('moment');

/**
 * This function returns users
 */
export const getUsers = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8080/api/users', {})
        .then((response) => {
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
                    { field: 'username', title: 'Username', editable: 'false' },
                    { field: 'email', title: 'Email', editable: 'false' },
                    { field: 'name', title: 'Full Name', editable: 'false' },
                    {
                      field: 'roles',
                      title: 'Roles',
                      lookup: { Admin: 'Admin', Coach: 'Coach', User: 'User' }
                    },
                    { field: 'createdOn', title: 'Created On', editable: 'false' },
                    { field: 'lastActivity', title: 'Last Activity', editable: 'false' },
                    { field: 'active', title: 'Active', lookup: { true: 'true', false: 'false' } }
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