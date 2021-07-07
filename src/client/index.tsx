import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store, history } from './store'
import { Provider } from 'react-redux'
import { ConnectedRouter } from "connected-react-router";

import App from './App';
import './styles.css';

const mountNode = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    mountNode
);
