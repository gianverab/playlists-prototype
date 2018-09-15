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

class Playlist extends Component {
  constructor(props) {
    super();

    this.state = props;
  }

  render() {
    return (
      <div className={`app-playlist ${this.props.className}`}>
        <img src="https://via.placeholder.com/200x150" alt="Playlist album cover" />
        <h3>Playlist Name</h3>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
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
          <Playlist className="row-1" />
          <Playlist className="row-2" />
          <Playlist className="row-3" />
          <Playlist className="row-4" />
        </main>
      </div>
    );
  }
}

export default App;
