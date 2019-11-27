import React from 'react';
import { render } from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const store = createStore(reducer, middleware)

render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
)