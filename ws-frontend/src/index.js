import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './bootstrap-override.scss'
import App from './container/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App />
);

//ApiProgress parent, Page ise child oldu. bu sayede onun özelliklerini alıp kullanabilecek

reportWebVitals();
