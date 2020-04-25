import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import API from "../../../utils/API";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});
export default function DenseTable(props) {
  const classes = useStyles();
  let [userDataArr, setUserDataArr] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      let request = {
        params: {
          user_ids: props.recipients
        }
      };
      let res = await API.get(`/users/recipients`, request);
      setUserDataArr(res.data.payload.data);
    }
    fetchData();
  }, [props.recipients]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align='right'>First Name</TableCell>
            <TableCell align='right'>Last Name</TableCell>
            <TableCell align='right'>Email</TableCell>
            <TableCell align='right'>Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userDataArr.map((user, index) => {
            return (
              <TableRow key={index}>
                <TableCell component='th' scope='row'>
                  {user.Username}
                </TableCell>
                <TableCell align='right'>
                  <div>{user.First_name}</div>
                </TableCell>
                <TableCell align='right'>
                  <div>{user.Last_name}</div>
                </TableCell>
                <TableCell align='right'>
                  <div>{user.Email}</div>
                </TableCell>
                {user.Active ? (
                  <TableCell align='right'>
                    <div>True</div>
                  </TableCell>
                ) : (
                  <TableCell align='right'>
                    <div>False</div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
