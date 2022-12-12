import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './bootstrap-override.scss'
import App from './container/App';

import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';

const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

//ApiProgress parent, Page ise child oldu. bu sayede onun özelliklerini alıp kullanabilecek

reportWebVitals();
