import React from "react";
import Home from "./home/Home";
import Login from "./Login/Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {withStyles} from "@material-ui/core/styles";
import Admin from "./views/Admin";
import User from "./views/User";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/admin' component={Admin} />
          <Route exact path='/user' component={User} />
        </Switch>
      </Router>
    );
  }
}
export default withStyles({withTheme: true})(App);
