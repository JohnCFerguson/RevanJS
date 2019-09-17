import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';


import EditComponent from './EditComponent';
import IndexComponent from './IndexComponent';
import DashboardComponent from './DashboardComponent';
import SubmitComponent from './SubmitComponent';
import img from '../static/revanNavBar.png';

const NavItem = props => {
    const pageURI = window.location.pathname+window.location.search
    const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
    const aClassName = props.disabled ? "nav-link disabled" : "nav-link";
    return (
      <li className="nav-item">
          <NavLink exact to={props.path} className="nav-link">{props.name}</NavLink>
      </li>
    );
}

export default class Nav extends Component {
    constructor(props) {
        super(props);
        this.toggleNavBar = this.toggleNavBar.bind(this);
        this.state= {
            collapsed: true,
        };
    }
    toggleNavBar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        const collapsed = this.state.collapsed;
        const divClassName = collapsed ? 'collapse navbar-collapse flex-grow-1 text-right' : 'collapse navbar-collapse show flex-grow-1 text-right';
        const buttonClassName = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        return (
            <Router>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="d-flex flex-grow-1">
                        <a className="navbar-brand" href="#">
                        <img src={img} class="d-inline-block align-top" alt="Revan NavBar"></img>
                        RevanJS
                        </a>
                    </div>
                    <div className="w-10 text-right">
                        <button onClick={this.toggleNavBar} className={`${buttonClassName}`} type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                    </div>
                    <div className={`${divClassName}`} id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto flex-nowrap">
                            <NavItem path="/dashboard" name="Dashboard" />
                            <NavItem path="/submit" name="Submit Feedback" />
                            <NavItem path="/fortra" name="Feedback Submitted for TRA" />
                            <NavItem path="/bymanager" name="Feedback Submitted by Manager" />
                            <NavItem path="/bytra" name="Feedback Submitted by TRA" />
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Username</a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#">Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Switch>
                    <Route exact path='/dashboard' component={DashboardComponent} />
                    <Route path='/submit' component={SubmitComponent} />
                    <Route path='/fortra' component={EditComponent} />
                    <Route path='/bymanager' component={IndexComponent} />
                    <Route path='/bytra' component = {IndexComponent} />
                </Switch>
            </Router>
        )
    }
}