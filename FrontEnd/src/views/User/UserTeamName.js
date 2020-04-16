import React from 'react';

import {
    getUserTeamName
} from "../../helpers/users";

export default function TeamName(props) {
    const {fetch} = props;
    const username = 'bobbo';
    const [teamname, setTeamName] = React.useState('');

    React.useEffect(() => {
        if (fetch) {
            const fetchData = async () => {
                const result = await getUserTeamName(username);
                setTeamName(result);
            };
            fetchData();
        }
    }, [fetch, username]);
    return (
        <React.Fragment>
            {teamname}
        </React.Fragment>

    );
}