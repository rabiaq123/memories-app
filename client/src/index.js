import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducers';
import App, { ToggleColorMode } from './App';
import './index.css';

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

ReactDOM.render(
  // Provider will keep track of the store / global state and will allow us to access state from any component
  <Provider store={store}> 
    <ToggleColorMode />
  </Provider>,
  document.getElementById('root'),
);
