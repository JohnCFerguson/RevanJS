import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import img from '../../static/revanNavBar.png';

const NavItem = props => {
     const pageURI = window.location.pathname+window.location.search
     const liClassName = (props.path === pageURI) ? "nav-item active" : "nav-item";
    // const aClassName = props.disabled ? "nav-link disabled" : "nav-link";
    return (
      <li className="nav-link">
          <NavLink exact to={props.path} className={ liClassName }>{props.name}</NavLink>
      </li>
    );
}

class Navbar extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const userName = this.props.auth.user.name
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="d-flex flex-grow-1">
                    <a className="navbar-brand" href="/dashboard">
                    <img src={img} className="d-inline-block align-top" alt="Revan NavBar"></img>
                    RevanJS
                    </a>
                </div>
                <div className="w-10 text-right">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse flex-grow-1 text-right" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto flex-nowrap">
                        <NavItem path="/dashboard" name="Dashboard" />
                        <NavItem path="/submit" name="Submit Feedback" />
                        <NavItem path="/submittedfor" name="Feedback Submitted for" />
                        <NavItem path="/bymanager" name="Feedback By Manager" />
                        <NavItem path="/submittedbytra" name="Feedback by Submitter" />
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{userName}</a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item" onClick={this.onLogoutClick} href="/">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Navbar);