import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { store } from './store'
import { Provider } from 'react-redux'

import App from './App';
import './styles.css';

const mountNode = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    mountNode
);
