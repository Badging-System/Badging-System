import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import SimpleStepper from "./SimpleStepper";
import AlertDialog from "./Alert";

/**
 * Opens a dialog that lists the members and progress they have made
 * @param {*} props
 */
export default function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [openDialog, setDialog] = React.useState(false);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleAlert = (event) => {
    if (event) {
      setDialog(false);
      onClose(selectedValue, true);
    } else {
      setDialog(false);
    }
  };

  const openAlert = () => {
    setDialog(true);
  };

  return (
    <div>
      <AlertDialog
        onClose={handleAlert}
        open={openDialog}
        message={
          "By deleting this badge all players will also lose any progress made towards the badge. Are you sure you want to do this?"
        }
        title={"Delete " + selectedValue.Name + "?"}
      />
      <Dialog
        onClose={handleClose}
        aria-labelledby='Badge Details'
        scroll={"body"}
        fullWidth={true}
        maxWidth={"lg"}
        open={open}
      >
        <DialogTitle id='simple-dialog-title'>Badge Details</DialogTitle>
        <DialogContent>
          <SimpleStepper details={selectedValue} />
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={openAlert} color='secondary'>
            Delete Badge
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
