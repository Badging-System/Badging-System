import React from 'react';
import Typography from '@material-ui/core/Typography';

import {
    getUserTeamName
} from "../../helpers/users";

export default function TeamName(props) {
    const {fetch} = props;
    const userID = '5e49b1a973dbc009478a861c';
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
        <Typography color="inherit" variant="h5" component="h1">
            Team Name - {teamname}
        </Typography>
    );
}