import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import 'video-react/dist/video-react.css';
import './index.css';
import uuidv1 from 'uuid/v1';

import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './contexts/Global/GlobalContext';
import Routes from './routes/Routes';
sessionStorage.setItem('appId', uuidv1());

ReactDOM.render(
    <BrowserRouter>
        <GlobalProvider>
            <Routes />
        </GlobalProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
