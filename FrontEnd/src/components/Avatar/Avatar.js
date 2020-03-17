import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import SFbear from "./sfbear.jpeg";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(15)
  }
}));

export default function ImageAvatars() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div>
        <Avatar
          variant='square'
          alt='Profile Pic'
          src={SFbear}
          className={classes.large}
        />
      </div>
    </div>
  );
}
