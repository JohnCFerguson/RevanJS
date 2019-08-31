import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import CreateComponent from './components/CreateComponent';
import EditComponent from './components/EditComponent';
import IndexComponent from './components/IndexComponent';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand">RevanJS</a>
                        <div>
                            <ul className="collapse navbar-collapse" id="navbarSupportedContent">
                                <li className="nav-item">
                                    <Link to={'/'} className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/create'} className="nav-link">Create</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/index'} className="nav-link">Create</Link>
                                </li>
                                <li>
                                    <Link to={'/edit/:id'} className="nav-link">Edit</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path='/create' component={CreateComponent} />
                        <Route path='/edit/:id' component={EditComponent} />
                        <Route path='/index' component={IndexComponent} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;