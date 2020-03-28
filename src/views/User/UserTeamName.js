import React from 'react';

import {
    getUserTeamName
} from "../../helpers/users";

export default function TeamName(props) {
    const {fetch} = props;
    const userID = '5e73f58f111ae80bfceaa35e';
    const [teamname, setTeamName] = React.useState('');

    React.useEffect(() => {
        if (fetch) {
            const fetchData = async () => {
                const result = await getUserTeamName(userID);
                setTeamName(result);
            };
            fetchData();
        }
    }, [fetch, userID]);
    return (
        <React.Fragment>
            {teamname}
        </React.Fragment>

    );
}