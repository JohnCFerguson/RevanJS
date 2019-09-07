import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import registerServiceWorker from 'register-service-worker';

import './revan.css'
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root')
);
// registerServiceWorker();