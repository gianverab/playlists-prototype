import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const fakeServerData = {
  user: {
    name: 'Gian',
    playlists: [
      {
        name: 'Lipocarpha rehmanii',
        songs: [
          { title: 'Rehman’s Halfchaff Sedge', duration: 180 },
          { title: 'Little Floatingheart', duration: 175 },
          { title: 'Blue Ridge St. Johnswort', duration: 232 },
        ],
      },
      {
        name: 'Nymphoides cordata Fernald',
        songs: [
          { title: 'Rooted Poppy', duration: 244 },
          { title: 'Lavender Thrift', duration: 195 },
          { title: 'Rough Star-thistle', duration: 228 },
        ],
      },
      {
        name: 'Orbexilum stipulatum',
        songs: [
          { title: 'Alpine Clover', duration: 213 },
          { title: 'Redberry Nightshade', duration: 256 },
          { title: 'Scaldweed', duration: 198 },
        ],
      },
      {
        name: 'Cuscuta gronovii Willd',
        songs: [
          { title: 'Moor Rush', duration: 207 },
          { title: 'Largestipule Leather-root', duration: 194 },
          { title: 'Furcraea', duration: 118 },
        ],
      },
    ],
  },
};

class PlaylistCounter extends Component {
  render() {
    return (
      <div className="app-aggregate">
        <h2>
          {this.props.playlists.length}
          {' '}
            Playlists
        </h2>
      </div>
    );
  }
}

class TimeCounter extends Component {
  render() {
    const allSongs = this.props.playlists.reduce(
      (songs, eachPlaylist) => songs.concat(eachPlaylist.songs), [],
    );
    const totalDuration = allSongs.reduce((sum, eachSong) => sum + eachSong.duration, 0);
    return (
      <div className="app-aggregate">
        <h2>
          {Math.floor(totalDuration / 60)}
          {' '}
            Minutes
        </h2>
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
                <PlaylistCounter
                  playlists={this.state.serverData.user.playlists}
                />
                <TimeCounter
                  playlists={this.state.serverData.user.playlists}
                />
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
