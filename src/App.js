import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const fakeServerData = {
  user: {
    name: 'Gian',
    playlists: [
      {
        name: 'Lipocarpha rehmanii',
        songs: ['Rehman’s Halfchaff Sedge', 'Little Floatingheart', 'Blue Ridge St. Johnswort'],
      },
      {
        name: 'Nymphoides cordata Fernald',
        songs: ['Rooted Poppy', 'Lavender Thrift', 'Rough Star-thistle'],
      },
      {
        name: 'Orbexilum stipulatum',
        songs: ['Alpine Clover', 'Redberry Nightshade', 'Scaldweed'],
      },
      {
        name: 'Cuscuta gronovii Willd',
        songs: ['Moor Rush', 'Largestipule Leather-root', 'Furcraea'],
      },
    ],
  },
};

class Aggregate extends Component {
  render() {
    return (
      <div className="app-aggregate">
        { this.props.playlists
          && (
          <h2>
            {this.props.playlists.length}
            {' '}
            Playlists
          </h2>
          )
        }
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
  constructor() {
    super();
    this.state = {
      serverData: {},
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        serverData: fakeServerData,
      });
    }, 500);
  }

  render() {
    return (
      <div className="app">
        { this.state.serverData.user
          ? (
            <div>
              <header className="app-header">
                <img src={logo} className="app-logo" alt="logo" />
                <h1 className="app-title">
                  {this.state.serverData.user.name}
                    ’s playlists
                </h1>
              </header>
              <main className="app-main">
                <Aggregate
                  playlists={this.state.serverData.user.playlists}
                />
                <Aggregate />
                <Filter />
                <Playlist className="row-1" />
                <Playlist className="row-2" />
                <Playlist className="row-3" />
                <Playlist className="row-4" />
              </main>
            </div>
          )
          : 'Loading...'
      }
      </div>
    );
  }
}

export default App;
