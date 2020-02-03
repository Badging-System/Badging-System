import React from 'react';
import PropTypes from 'prop-types';
import {
  createMuiTheme,
  ThemeProvider,
  withStyles
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Navigator from '../../components/Navigator/Navigator';
import Grid from '@material-ui/core/Grid';
import GridItem from "../../components/Grid/GridItem";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import CardTitle from "../../components/Card/CardTitle";
import {
  Group,
  AccessTime
} from "@material-ui/icons";


import Header from '../../components/Header/AdminHeader';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' href='https://material-ui.com/'>
        S Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#63ccff',
      main: '#009be5',
      dark: '#006db3'
    }
  },
  typography: {
    h5: {
      fontWeight: 500,
      fontSize: 15,
      letterSpacing: 0.5
    }
  },
  shape: {
    borderRadius: 8
  },
  props: {
    MuiTab: {
      disableRipple: true
    }
  },
  mixins: {
    toolbar: {
      minHeight: 48
    }
  }
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c'
      }
    },
    MuiButton: {
      label: {
        textTransform: 'none'
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none'
        }
      }
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1)
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white
      }
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0
        }
      }
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1)
      }
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4
      }
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854'
      }
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium
      }
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20
        }
      }
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32
      }
    }
  }
};

const drawerWidth = 256;

const styles = {
  root: {
    flexGrow: 1,
    display: 'flex',
    minHeight: '50vh',
    'justify-content': 'center'
  },
  top: {
    flexGrow: 3,
    display: 'flex',
    // minHeight: '30vh',
  },
  bottom: {
    flexGrow: 1,
    display: 'flex',
    'align-items': 'stretch' 
    // minHeight: '50vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  paper: {
    height: "100%",
    width: "100%",
    padding: theme.spacing(2),
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1'
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1'
  }
};

function Paperbase(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation='js'>
            <Navigator
              PaperProps={{ style: { width: drawerWidth } }}
              variant='temporary'
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          </Hidden>
          <Hidden xsDown implementation='css'>
            <Navigator PaperProps={{ style: { width: drawerWidth } }} />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Header
            onDrawerToggle={handleDrawerToggle}
            title='Overview'
            admin={true}
          />
          <main className={classes.main}>
            <Grid container className={classes.top} spacing={4}>
              <GridItem xs={12} sm={4}>
                <Card chart >
                <CardHeader color={'admin'} stats icon>
                    <CardIcon color={'admin'} >
                    <Group />
                    </CardIcon>
                    <CardTitle color={'admin'} title={'Total Users'}/>
                </CardHeader>
                <CardBody>
                
                </CardBody>
                <CardFooter chart>
                <div className={classes.stats}>
                    <AccessTime /> updated 4 minutes ago
                </div>
                </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <Card chart >
                <CardHeader color={'admin'} stats icon>
                    <CardIcon color={'admin'} >
                    <Group />
                    </CardIcon>
                    <CardTitle color={'admin'} title={'Total Coaches'}/>
                </CardHeader>
                <CardBody>
                
                </CardBody>
                <CardFooter chart>
                <div className={classes.stats}>
                    <AccessTime /> updated 4 minutes ago
                </div>
                </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={4}>
                <Card chart >
                <CardHeader color={'admin'} stats icon>
                    <CardIcon color={'admin'} >
                        <Group />
                    </CardIcon>
                    <CardTitle color={'admin'} title={'Total Teams'}/>
                </CardHeader>
                <CardBody>
                
                </CardBody>
                <CardFooter chart>
                <div className={classes.stats}>
                    <AccessTime /> updated 4 minutes ago
                </div>
                </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6}>
                <Card chart >
                <CardHeader color={'admin'} stats icon>
                    <CardIcon color={'admin'}>
                    <Group />
                    </CardIcon>
                    <CardTitle color={'admin'} title={'Top Performing Teams'}/>
                </CardHeader>
                <CardBody>
                
                </CardBody>
                <CardFooter chart>
                <div className={classes.stats}>
                    <AccessTime /> updated 4 minutes ago
                </div>
                </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6}>
                <Card chart >
                <CardHeader color={'admin'} stats icon>
                    <CardIcon color={'admin'}>
                    <Group />
                    </CardIcon>
                    <CardTitle color={'admin'} title={'Top Performing Users'}/>
                </CardHeader>
                <CardBody>
                
                </CardBody>
                <CardFooter chart>
                <div className={classes.stats}>
                    <AccessTime /> updated 4 minutes ago
                </div>
                </CardFooter>
                </Card>
              </GridItem>
            </Grid>
          </main>
          <footer className={classes.footer}>
            <Copyright />
          </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}

Paperbase.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Paperbase);
