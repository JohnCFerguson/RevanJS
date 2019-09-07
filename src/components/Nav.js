import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';


import CreateComponent from './CreateComponent';
import EditComponent from './EditComponent';
import IndexComponent from './IndexComponent';

const NavItem = props => {
    const pageURI = window.location.pathname+window.location.search
    const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
    const aClassName = props.disabled ? "nav-link disabled" : "nav-link";
    return (
      <li>
          <NavLink exact to={props.path} className="nav-link">{props.name}</NavLink>
      </li>
    );
}

export default class Nav extends Component {
    render() {
        return (
            <Router>
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">RevanJS</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav mr-auto">
                            <NavItem path="/" name="Home" />
                            <NavItem path="/index" name="Index" />
                            <NavItem path="/create" name="Create" />
                            <NavItem path="/edit" name="Edit" />
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route exact path='/create' component={CreateComponent} />
                    <Route path='/edit/:id' component={EditComponent} />
                    <Route path='/index' component={IndexComponent} />
                </Switch>
            </Router>
        )
    }
}