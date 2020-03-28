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
    getUserTeamMembersByID,
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
    const teamID = '5e73f58f111ae80bfceaa35c';
    const [team_members, setTeamMembers] = React.useState([]);
    const rows = [];

    React.useEffect(() => {
        const fetchData = async () => {
            const result = await getUserTeamMembersByID(teamID);
            setTeamMembers(result);
        };
        fetchData();
    }, [teamID]);


    if (team_members[0] !== undefined || team_members.length !== 0) {
        rows.push(createData(`${team_members[0][0].First_name} ${team_members[0][0].Last_name}`, team_members[0][0].Username, team_members[0][0].Role, team_members[0][0].Email));
        rows.push(createData(`${team_members[1][0].First_name} ${team_members[1][0].Last_name}`, team_members[1][0].Username, team_members[1][0].Role, team_members[1][0].Email));

        for (let j = 0; j < team_members[2].Members.length; j++) {
            rows.push(createData(`${team_members[2].Members[j].First_name} ${team_members[2].Members[j].Last_name}`, team_members[2].Members[j].Username, team_members[2].Members[j].Role, team_members[2].Members[j].Email));
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