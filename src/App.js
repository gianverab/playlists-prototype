import React, { Component } from 'react';
import queryString from 'query-string';
import './App.css';

const buttonStyle = {
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  outline: 0,
  height: '32px',
  width: '164px',
  fontSize: '12px',
  lineHeight: 1,
  borderRadius: '500px',
  backgroundColor: '#1db954',
};

const PlaylistCounter = ({ playlists }) => (
  <div className="app-aggregate">
    <h2>
      {playlists.length}
      {' '}
            Playlists
    </h2>
  </div>
);

const TimeCounter = ({ playlists }) => {
  const allSongs = playlists.reduce(
    (songs, eachPlaylist) => songs.concat(eachPlaylist.songs), [],
  );
  const totalDuration = allSongs.reduce((sum, eachSong) => sum + eachSong.duration, 0);
  return (
    <div className="app-aggregate">
      <h2>
        {Math.floor(totalDuration / 60000)}
        {' '}
            Minutes
      </h2>
    </div>
  );
};

const Filter = ({ onTextChange }) => (
  <div className="app-filter">
    <label htmlFor="filter">
      <input
        type="text"
        className="app-filter-box"
        id="filter"
        placeholder="Search"
        onKeyUp={onTextChange}
      />
    </label>
  </div>
);

const Playlist = ({ coverUrl, title, songs }) => (
  <div className="app-playlist">
    <img
      src={coverUrl}
      alt={`${title} cover`}
      className="app-playlist-img"
    />
    <h3 className="app-playlist-name">{title}</h3>
    <ul className="app-playlist-list">
      {songs.slice(0, 3).map(song => (
        <li>{song.name}</li>
      ))}
    </ul>
  </div>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      playlists: [],
      filterString: '',
    };
  }

  componentDidMount() {
    const parsed = queryString.parse(window.location.search);
    const accessToken = parsed.access_token;

    fetch('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(response => response.json())
      .then(data => this.setState({
        user: {
          name: data.display_name,
        },
      }));

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then(response => response.json())
      .then((playlistData) => {
        const playlists = playlistData.items;
        const trackDataPromises = playlists.map((playlist) => {
          const responsePromise = fetch(playlist.tracks.href, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          const trackDataPromise = responsePromise
            .then(response => response.json());
          return trackDataPromise;
        });
        const allTracksDataPromises = Promise.all(trackDataPromises);
        const playlistsPromise = allTracksDataPromises
          .then((trackDatas) => {
            trackDatas.forEach((trackData, i) => {
              playlists[i].trackDatas = trackData.items
                .map(item => item.track)
                .map(trackData => ({
                  name: trackData.name,
                  duration: trackData.duration_ms,
                }));
            });
            return playlists;
          });
        return playlistsPromise;
      })
      .then(playlists => this.setState({
        playlists: playlists.map(item => ({
          playlistTitle: item.name,
          coverUrl: item.images[0].url,
          songs: item.trackDatas,
        })),

      }));
  }

  handleTextChange = (event) => {
    this.setState({
      filterString: event.target.value,
    });
  }

  handleClick = () => {
    window.location = window.location.href.includes('localhost')
      ? 'http://localhost:8888/login'
      : 'https://playlist-prototype-backend.herokuapp.com/login';
  }

  render() {
    const playlistToRender = this.state.user
      && this.state.playlists
      ? (this.state.playlists
        .filter((playlist) => {
          const matchPlaylistTitle = playlist.playlistTitle.toLowerCase().includes(
            this.state.filterString.toLowerCase(),
          );

          const matchSongTitle = playlist.songs.find(song => song.name.toLowerCase().includes(
            this.state.filterString.toLowerCase(),
          ));

          return matchPlaylistTitle || matchSongTitle;
        })
      )
      : [];

    return (
      <div className="app">
        { this.state.user
          ? (
            <div>
              <header className="app-header">
                <h1 className="app-title">
                  {this.state.user.name}
                    ’s playlists
                </h1>
              </header>
              <main className="app-main">
                <PlaylistCounter
                  playlists={playlistToRender}
                />
                <TimeCounter
                  playlists={playlistToRender}
                />
                <Filter onTextChange={this.handleTextChange} />
                <div className="app-playlist-wrapper">
                  {playlistToRender.map(playlist => (
                    <Playlist
                      title={playlist.playlistTitle}
                      songs={playlist.songs}
                      coverUrl={playlist.coverUrl}
                    />
                  ))}
                </div>
              </main>
            </div>
          )
          : (
            <button
              style={{
                ...buttonStyle, margin: 0, padding: 0, position: 'absolute', left: 'calc(50% - 82px)', top: 'calc(50% - 12px)',
              }}
              type="submit"
              onClick={this.handleClick}
            >
            Sign in with Spotify
            </button>
          )
      }
      </div>
    );
  }
}

export default App;
