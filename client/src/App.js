import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";


import './App.css';

import { Provider } from "react-redux"
import store from "./store";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login"
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/layout/Dashboard";
import Submit from "./components/layout/Submit";
import ForTra from "./components/layout/ForTra";
import ByManager from './components/layout/ByManager';
import ByTra from "./components/layout/ByTra";


// Check if token for user login
if (localStorage.jwtToken) {
  // set auth token header ath
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get userinfo and exp
  const decoded = jwt_decode(token);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for bad/expired token
  const currentTime = Date.now() / 1000; // get date in milis
  if (decoded.exp < currentTime) {
    // Log user out if epxired token
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login"
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={ Dashboard } />
              <PrivateRoute exact path="/submit" component={ Submit } />
              <PrivateRoute exact path="/submittedfor" component={ ForTra } />
              <PrivateRoute exact path="/bymanager" component={ ByManager } />
              <PrivateRoute exact path="/submittedbytra" component={ ByTra } />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
