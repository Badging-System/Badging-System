import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TeamName from '../../views/User/UserTeamName';
import {
    getUserTeamMembers,
} from "../../helpers/users";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
});

function createData(name, username, role, email) {
    return {name, username, role, email};
}



export default function SimpleTable() {
    const classes = useStyles();
    const username = 'gdeshpande';
    const [team_members, setTeamMembers] = React.useState([]);
    const rows = [];

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getUserTeamMembers(username);
            setTeamMembers(result);
        };
        fetchData();
    }, [username]);

    if (team_members[0] !== undefined || team_members.length !== 0) {
        for (let i = 0; i < team_members.length; i++) {
            rows.push(createData(`${team_members[i].First_name} ${team_members[i].Last_name}`, team_members[i].Username, team_members[i].Role, team_members[i].Email));
        }
    }


    return (
        <React.Fragment>
            <Typography><TeamName fetch={true} /></Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Username</TableCell>
                            <TableCell align="center">Role</TableCell>
                            <TableCell align="center">Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.name} >
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.username}</TableCell>
                                <TableCell align="center">{row.role}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    );
}