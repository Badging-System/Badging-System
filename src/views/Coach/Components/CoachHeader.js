import React, { useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import HelpIcon from "@material-ui/icons/Help";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component='div'
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function Header(props) {
  const { classes, onDrawerToggle } = props;
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onDrawerToggle(newValue);
  };

  return (
    <React.Fragment>
      <AppBar color='primary' position='sticky' elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems='center'>
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color='inherit'
                  aria-label='open drawer'
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Tooltip title='Alerts • No alerts'>
                <IconButton color='inherit'>
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color='inherit' className={classes.iconButtonAvatar}>
                <Avatar src='/static/images/avatar/1.jpg' alt='My Avatar' />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
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
                Team Name - Badging System
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component='div'
        className={classes.secondaryBar}
        color='primary'
        position='static'
        elevation={0}
      >
        <Tabs value={value} onChange={handleChange} textColor='inherit'>
          <Tab textColor='inherit' label='Home' />
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

// import React from "react";
// import PropTypes from "prop-types";
// import AppBar from "@material-ui/core/AppBar";
// import Grid from "@material-ui/core/Grid";
// import Tabs from "@material-ui/core/Tabs";
// import Tab from "@material-ui/core/Tab";
// import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import { withStyles } from "@material-ui/core/styles";
// import ProfileAvatar from "../Avatar/Avatar";

// const lightColor = "rgba(255, 255, 255, 0.7)";

// const styles = theme => ({
//   secondaryBar: {
//     zIndex: 0
//   },
//   menuButton: {
//     marginLeft: -theme.spacing(1)
//   },
//   iconButtonAvatar: {
//     padding: 4
//   },
//   link: {
//     textDecoration: "none",
//     color: lightColor,
//     "&:hover": {
//       color: theme.palette.common.white
//     }
//   },
//   button: {
//     borderColor: lightColor
//   }
// });

// function Header(props) {
//   const { classes, onDrawerToggle } = props;
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     onDrawerToggle(newValue);
//   };

//   return (
//     <React.Fragment>
//       <AppBar
//         component='div'
//         className={classes.secondaryBar}
//         color='primary'
//         position='static'
//         elevation={0}
//       >
//         <Toolbar>
//           <Grid container alignItems='center' spacing={1}>
//             <Grid item xs>
//               <Typography color='inherit' variant='h5' component='h1'>
//                 Our Super Sweet Name
//               </Typography>
//             </Grid>
//             <Grid item>
//               <ProfileAvatar />
//             </Grid>
//             <Grid></Grid>
//           </Grid>
//         </Toolbar>
//       </AppBar>
//       <AppBar
//         component='div'
//         className={classes.secondaryBar}
//         color='secondary'
//         position='static'
//         elevation={0}
//       >
//         <Tabs value={value} onChange={handleChange} textColor='inherit'>
//           <Tab textColor='inherit' label='Home' />
//           <Tab textColor='inherit' label='Manage Team' />
//           <Tab textColor='inherit' label='Manage Awards' />
//         </Tabs>
//       </AppBar>
//     </React.Fragment>
//   );
// }

// Header.propTypes = {
//   classes: PropTypes.object.isRequired,
//   onDrawerToggle: PropTypes.func.isRequired
// };

// export default withStyles(styles)(Header);
