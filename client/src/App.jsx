/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppMain from './AppMain';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <AppMain />
      <AppFooter />
    </div>
  );
}

function AppHeader() {
  return (
    <header>
      <h1>ngzm - omg</h1>
    </header>
  );
}

function AppFooter() {
  return (
    <footer>
      <small>Beauty FRANCE</small>
    </footer>
  );
}

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ),
  document.getElementById('app'),
);
