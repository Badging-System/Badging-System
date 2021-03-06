import React from "react";
import Home from "./home/Home";
import Login from "./Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Coach from "./views/Coach/Coach";
import User from "./views/User/User";
import SignUP from "./views/SignUp/SignUp";
import AdminOverview from "./views/Admin/Overview";
import AdminUsers from "./views/Admin/Users";
import AdminTeams from "./views/Admin/Teams";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/admin/overview' component={AdminOverview} />
          <Route exact path='/admin/users' component={AdminUsers} />
          <Route exact path='/admin/teams' component={AdminTeams} />
          <Route exact path='/user' component={User} />
          <Route exact path='/coach' component={Coach} />
          <Route exact path='/signup' component={SignUP}/>
          <Redirect from='/admin' to='/admin/overview' />
          <Redirect from='/' to='/login' />
        </Switch>
      </Router>
    );
  }
}
export default withStyles({ withTheme: true })(App);
