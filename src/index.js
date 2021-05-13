import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import './index.css';
import reportWebVitals from './reportWebVitals';
// import { store } from './redux/store';
import { store } from './redux/reduxStore';

ReactDOM.render(
  <React.StrictMode>
    <App 
      state={store.getState()}
      dispatch={store.dispatch.bind(store)}
    />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
