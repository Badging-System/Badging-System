import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ProfileAvatar from "../Avatar/Avatar";

const lightColor = "rgba(255, 255, 255, 0.7)";

const styles = theme => ({
  secondaryBar: {
    zIndex: 0
  },
  menuButton: {
    marginLeft: -theme.spacing(1)
  },
  iconButtonAvatar: {
    padding: 4
  },
  link: {
    textDecoration: "none",
    color: lightColor,
    "&:hover": {
      color: theme.palette.common.white
    }
  },
  button: {
    borderColor: lightColor
  }
});

function Header(props) {
  const { classes, onDrawerToggle } = props;

  return (
    <React.Fragment>
      <AppBar
        component='div'
        className={classes.secondaryBar}
        color='primary'
        position='static'
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems='center' spacing={1}>
            <Grid item xs>
              <Typography color='inherit' variant='h5' component='h1'>
                Our Super Sweet Name
              </Typography>
            </Grid>
            <Grid item>
              <ProfileAvatar />
              <Typography>test</Typography>
            </Grid>
            <Grid></Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component='div'
        className={classes.secondaryBar}
        color='secondary'
        position='static'
        elevation={0}
      >
        <Tabs value={0} textColor='inherit'>
          <Tab textColor='inherit' label='Manage Team' />
          <Tab textColor='inherit' label='Manage Awards' />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  onDrawerToggle: PropTypes.func.isRequired
};

export default withStyles(styles)(Header);
