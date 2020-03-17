import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
// import Overview from './../Overview/Overview'

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

// function getComponent(currentComponent){
//   let component;
//   switch (currentComponent){
//       case 'overview' :
//           component = <Overview/>;
//           break;
//       case 'user' :
//           component = <Overview/>;
//           break;
//       case 'team' :
//           component = <Overview/>;
//           break;
//   }
//   return component;
// }

function Content(props) {
  // const { currentComponent } = props;

  return (
    <div>
          Content
    </div>
  );
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);