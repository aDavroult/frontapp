import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import '../node_modules/react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios';

//'https://apphot.herokuapp.com/'  'http://127.0.0.1:8000/'


axios.defaults.baseURL = 'http://127.0.0.1:8000/';

ReactDOM.render(
  <React.StrictMode>

    <App/>   

  </React.StrictMode>,
  document.getElementById('root')
);