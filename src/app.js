require('../node_modules/bootstrap/dist/css/bootstrap.min.css');
require('./static/custom.css');
import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Nav from './components/Nav';

class App extends Component {
    render() {
        return (
            <Nav />
        )
    }
}

export default App;