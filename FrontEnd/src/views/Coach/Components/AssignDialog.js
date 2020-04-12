import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import AlertDialog from "./Alert";
import AssigneeList from "./AssigneeList";
import API from "../../../utils/API";

/**
 * Opens a dialog that lists the members and progress they have made
 * @param {*} props
 */
export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [openDialog, setDialog] = React.useState(false);
  const [assignees, setAssignees] = React.useState([]);
  const assigned = [];
  const handleClose = () => {
    onClose(selectedValue);
  };

  useEffect(() => {
    async function fetchData() {
      let res = await API.get("/users/coach/5e924aea0732230011c755e1");
      setAssignees(res.data.payload.data.Members);
    }
    fetchData();
  }, []);

  const handleAlert = (event) => {
    if (event) {
      setDialog(false);
      onClose(selectedValue, true);
    } else {
      setDialog(false);
    }
  };

  const handleAssign = async () => {
    let request = {
      Badge: props.selectedBadge._id,
      Users: assigned,
      Team: assigned[0].Team,
    };
    let res = await API.post("/badges/assign", request);
    handleClose();
  };

  const addAssignees = (user) => {
    assigned.push(user);
  };

  return (
    <div>
      <AlertDialog
        onClose={handleAlert}
        open={openDialog}
        message={
          "By deleting this badge all players will also lose any progress made towards the badge. Are you sure you want to do this?"
        }
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby='Badge Details'
        scroll={"body"}
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
      >
        <DialogTitle id='simple-dialog-title'>Assign Badge</DialogTitle>
        <DialogContent>
          <AssigneeList assignees={assignees} addAssignees={addAssignees} />
        </DialogContent>

        <DialogActions>
          <Button
            variant='contained'
            autoFocus
            onClick={handleAssign}
            color='secondary'
          >
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object.isRequired,
};
