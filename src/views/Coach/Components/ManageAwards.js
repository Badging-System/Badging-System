import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import ProgressStepper from "./ProgressStepper";
import { Typography } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper
  }
}));

export default function FolderList() {
  const classes = useStyles();

  return (
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
  );
}
