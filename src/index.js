import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import {PaintingProvider} from '../src/context/PaintingProvider';
import {OrderProvider} from '../src/context/OrderProvider';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import { AuthProvider } from './context/AuthProvider';

ReactDOM.render(
  <Provider store={store}>
    <AuthProvider>
      <PaintingProvider>
        <OrderProvider>
          <Router>
            <App />
          </Router>
        </OrderProvider>
      </PaintingProvider>
    </AuthProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
