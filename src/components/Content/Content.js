import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import { Switch, Route } from "react-router-dom";

import Overview from './../Overview/Overview'

const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function Content(props) {
  
  return (
    <Switch>
          <Route path="admin/overview">
            <Overview />
          </Route>
          <Route path="/users">
            <Overview />
          </Route>
          <Route path="/teams">
            <Overview />
          </Route>
    </Switch>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);