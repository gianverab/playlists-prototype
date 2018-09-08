import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h1 className="app-title">Better Playlists</h1>
        </header>
        <main className="app-main">

        </main>
      </div>
    );
  }
}

export default App;
