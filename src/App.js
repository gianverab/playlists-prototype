import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const fakeServerData = {
  user: {
    name: 'Gian',
    playlists: [
      {
        playlistTitle: 'Lipocarpha rehmanii',
        songs: [
          { songTitle: 'Rehman’s Halfchaff Sedge', duration: 180 },
          { songTitle: 'Little Floatingheart', duration: 175 },
          { songTitle: 'Blue Ridge St. Johnswort', duration: 232 },
        ],
      },
      {
        playlistTitle: 'Nymphoides cordata Fernald',
        songs: [
          { songTitle: 'Rooted Poppy', duration: 244 },
          { songTitle: 'Lavender Thrift', duration: 195 },
          { songTitle: 'Rough Star-thistle', duration: 228 },
        ],
      },
      {
        playlistTitle: 'Orbexilum stipulatum',
        songs: [
          { songTitle: 'Alpine Clover', duration: 213 },
          { songTitle: 'Redberry Nightshade', duration: 256 },
          { songTitle: 'Scaldweed', duration: 198 },
        ],
      },
      {
        playlistTitle: 'Cuscuta gronovii Willd',
        songs: [
          { songTitle: 'Moor Rush', duration: 207 },
          { songTitle: 'Largestipule Leather-root', duration: 194 },
          { songTitle: 'Furcraea', duration: 118 },
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
      <div className="app-playlist">
        <img
          src="https://via.placeholder.com/200x150"
          alt={`${this.props.title} cover`}
          className="app-playlist-img"
        />
        <h3>{this.props.title}</h3>
        <ul className="app-playlist-list">
          {this.props.songs.map(song => (
            <li>{song.songTitle}</li>
          ))}
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
                <div className="app-playlist-wrapper">
                  {this.state.serverData.user.playlists.map(playlist => (
                    <Playlist
                      title={playlist.playlistTitle}
                      songs={playlist.songs}
                    />
                  ))}
                </div>
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
