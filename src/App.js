import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Aggregate extends Component {
  render() {
    return (
      <div className="app-aggregate">
        <h2>Number Text</h2>
      </div>
    );
  }
}
class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Better Playlists</h1>
        </header>
        <main className="app-main">
          <Aggregate />
          <Aggregate />
        </main>
      </div>
    );
  }
}

export default App;
