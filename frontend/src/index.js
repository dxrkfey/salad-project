import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import OrderEM from './Employees/OrderEM';
import LoginEM from './Employees/LoginEM';
import Statistics from './Employees/Statistics';
import AlertOrder from './Employees/AlertOrder';
import History from './Employees/History';


import SignUp from './Customer/signup';


import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Routes } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <App />
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
