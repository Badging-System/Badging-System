import React from "react";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import SimpleStepper from "./SimpleStepper";


/**
 * Opens a dialog that lists the members and progress they have made
 * @param {*} props
 */
export default function SimpleDialog(props) {
  const {onClose, selectedValue, open} = props;
  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <div>
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
          <SimpleStepper details={selectedValue} tasks_completed={selectedValue.completed} />
        </DialogContent>

      </Dialog>
    </div>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object.isRequired
};
