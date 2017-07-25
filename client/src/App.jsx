/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
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
    <main className="App">
      <UploadMain />
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

ReactDOM.render(
  <App />,
  document.getElementById('app'),
);
