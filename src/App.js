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

class Filter extends Component {
  render() {
    return (
      <div className="app-filter">
        <form action="">
          <label htmlFor="filter">
            <input type="text" id="filter" />
            Filter
          </label>
        </form>
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
          <Filter />
        </main>
      </div>
    );
  }
}

export default App;
