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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  Group,
  AccessTime,
  PersonOutline,
  SupervisedUserCircle,
  TurnedIn,
  GroupWork
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
        backgroundColor: '#002C40'
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
    minHeight: '100vh',
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
  dataList: {
    maxHeight: '250px',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1'
  }
};

function Paperbase(props) {
  const { classes } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const teamData = {
    header: '',
    body: {
      columns: ['Rank', 'Team Name', 'Coach', 'Active Memebers', 'Badges Awarded'],
      rowdata: [{
        rank: '1', 
        team: 'Paw Patrol', 
        coach: 'Alex',
        active_user: 5,
        badges_awarded: 23 
      },
        {
          rank: '2', 
          team: 'Power Puff Girls', 
          coach: 'Gaurav',
          active_user: 2,
          badges_awarded: 15 
        },
      ]
    },
    footer: ''
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const getColumns = (table) => {
    let returnCells = null;
    if(table.body.columns) {
        returnCells = teamData.body.columns.map((val,index) =>
            <TableCell key={index}> {val} </TableCell>
        )
    }


    if(table.body.columns) {
        return (
            returnCells
        );
    } else {
        return;
    }
}

const getDataRow = (table) => {
  if(table.body.rowdata) {
      return (
        table.body.rowdata.map((elm, index)=> 
              <TableRow key={index}> 
              {
                Object.keys(elm).map((key,index) => 
                  <TableCell key={index}> {elm[key]} </TableCell>
                )
              } 
              </TableRow>
          )
      );
  } else {
      return;
  }
}

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
                    <PersonOutline />
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
                    <SupervisedUserCircle />
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
                    <GroupWork />
                    </CardIcon>
                    <CardTitle color={'admin'} title={'Top Performing Teams'}/>
                </CardHeader>
                <CardBody>
                <TableContainer className={classes.dataList} component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                {getColumns(teamData)}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {getDataRow(teamData)}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
                    <TurnedIn />
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
