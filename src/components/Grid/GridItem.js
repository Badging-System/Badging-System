import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  grid: {
    padding: "0 15px !important"
  }
});

export default function GridItem(props) {
  const classes = useStyles({});
  const { children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}
