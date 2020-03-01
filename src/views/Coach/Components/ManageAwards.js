import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Button} from "@material-ui/core"
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ProgressStepper from "./ProgressStepper";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import SpringModal from "./Modal";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper
  }, 
  buttonStyle: {
    margin: "1em"
  }
}));

export default function FolderList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.buttonStyle} variant="contained" color="primary" onClick={handleOpen}>
      Create Badge
    </Button>
    <SpringModal open={open} handleClose={handleClose}/>
    <List className={classes.root}>
      <ListItem>
        <Typography>Member 1</Typography>
        <ProgressStepper />
      </ListItem>
      <Divider />
      <ListItem>
        <Typography>Member 2</Typography>
        <ProgressStepper />
      </ListItem>
    </List>
    </div>
  );
}
