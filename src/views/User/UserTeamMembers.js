import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(name, username, status, email) {
    return {name, username, status, email};
}

const rows = [
    createData('Gaurav Deshpande', 'gdeshpande', 'User', 'gdeshpande@asu.edu'),
    createData('Mitchell Roberts', 'mroberts', 'User', 'mroberts@asu.edu'),
    createData('David Maitha', 'dmaitha', 'User', 'dmaitha@asu.edu'),
    createData('Ryan Tonthat', 'rtonthat', 'User', 'rtonthat@asu.edu'),
    createData('Hongyuan Zhou', 'hzhou', 'User', 'hzhou@asu.edu'),
];

export default function SimpleTable() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow >
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Username</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.name} >
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}