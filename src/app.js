import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Nav from './components/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import './static/custom.css';

class App extends Component {
    render() {
        return (
            <Nav />
        )
    }
}

export default App;