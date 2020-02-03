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
import Table from '../../components/Table/Table';
import Header from '../../components/Header/AdminHeader';
import moment from 'moment';


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
    display: 'flex',
    minHeight: '100vh'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
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

  const [table_data] = React.useState({
    columns: [
      { field: 'username', title: 'Username', editable: 'false' },
      { field: 'email', title: 'Email', editable: 'false' },
      { field: 'name', title: 'Full Name', editable: 'false' },
      {
        field: 'roles',
        title: 'Roles',
        lookup: { 0: 'Admin', 1: 'Coach', 2: 'User' }
      },
      { field: 'createdOn', title: 'Created On', editable: 'false' },
      { field: 'lastActivity', title: 'Last Activity', editable: 'false' },
      { field: 'active', title: 'Active', lookup: { 1: 'true', 0: 'false' } }
    ],
    data: [
      {
        username: 'msrober3',
        email: 'msrober3@asu.edu',
        name: 'Mitchell Roberts',
        roles: 0,
        createdOn: moment().format(),
        lastActivity: moment().format(),
        active: 1
      },
      {
        username: 'gdeshpa',
        email: 'gdeshpa@asu.edu',
        name: 'Garuav Deshpande',
        roles: 1,
        createdOn: moment().format(),
        lastActivity: moment().format(),
        active: 1
      },
      {
        username: 'dmaitha',
        email: 'dmaitha@asu.edu',
        name: 'David Maitha',
        roles: 2,
        createdOn: moment().format(),
        lastActivity: moment().format(),
        active: 1
      },
      {
        username: 'rtonthat',
        email: 'rtonthat@asu.edu',
        name: 'Ryan Tonthat',
        roles: 2,
        createdOn: moment().format(),
        lastActivity: moment().format(),
        active: 0
      }
    ]
  });

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
            title='User Management'
            admin={true}
          />
          <main className={classes.main}>
            <Table title={'User Management'} table_data={table_data}/>
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
