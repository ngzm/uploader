/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppMain from './AppMain';
import { Logout } from './Login';
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
    <div>
      <Logout />
      <header>
        <h1>ngzm - omg</h1>
      </header>
    </div>
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
