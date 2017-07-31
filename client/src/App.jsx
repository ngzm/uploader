/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Auth from './Auth';
import UploadMain from './UploadMain';
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

function AppMain() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Login} />
        <Auth>
          <Switch>
            <Route path="/upmain" component={UploadMain} />
          </Switch>
        </Auth>
      </Switch>
    </main>
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
