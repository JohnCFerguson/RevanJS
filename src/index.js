import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from 'register-service-worker';
import TopAppBar, {
    TopAppBarFixedAdjustment,
    TopAppBarIcon,
    TopAppBarRow,
    TopApBarSection,
    TopAppBarTitle
} from '@material/react-top-app-bar';
import MaterialIcon from '@material/react-material-icon';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('root')
);
registerServiceWorker();