import React from "react";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PersonIcon from "@material-ui/icons/Person";
import Typography from "@material-ui/core/Typography";
import {blue} from "@material-ui/core/colors";
import ProgressStepper from "./ProgressStepper";
import AlertDialog from "../Coach/Components/Alert";

const members = [{name: "Mitchell Roberts"}];
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
  const {onClose, selectedValue, open} = props;
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

  return (
    <div>
      <AlertDialog
        onClose={handleAlert}
        open={openDialog}
        message={"By deleting this badge all players will also lose any progress made towards the badge. Are you sure you want to do this?"}
        title={"Delete " + selectedValue.badge_name + "?"}
      />
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
        <DialogContent>

          <List>
            {members.map((member, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <PersonIcon />
                  </Avatar>
                </ListItemAvatar>
                <Typography>{member.name}</Typography>
                <ProgressStepper badgeID={selectedValue.id} tasks={selectedValue.tasks} tasks_completed={selectedValue.completed} />
              </ListItem>
            ))}
          </List>
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
