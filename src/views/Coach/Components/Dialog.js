import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";
import ProgressStepper from "./ProgressStepper";

const members = [{ name: "Mitchell Roberts" }];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  badgeName: {
    color: "#000",
    margin: "10px",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px !important",
    marginBottom: "0",
    wordWrap: "normal"
  }
});
/**
 * Opens a dialog that lists the members and progress they have made
 * @param {*} props
 */
export default function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;
  console.log("selectedValue");

  console.log(selectedValue);

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="Badge Details"
      scroll={"body"}
      fullWidth={true}
      maxWidth={"lg"}
      open={open}
    >
      <DialogTitle id="simple-dialog-title">
        {selectedValue.badge_name}
      </DialogTitle>

      <List>
        {members.map((member, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <Typography>{member.name}</Typography>
            <ProgressStepper tasks={selectedValue.tasks} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.object.isRequired
};
