import React from "react";
import Home from "./home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
        </Switch>
      </Router>
    );
  }
}

function HomeText() {
  return <h1>Home Page </h1>;
}

export default App;
