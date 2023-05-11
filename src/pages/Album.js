import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      playlist: [],
      loading: true,
      favoritesList: [],
    };

    this.toggleLoad = this.toggleLoad.bind(this);
    this.updateFavMusic = this.updateFavMusic.bind(this);
    this.recoverTime = this.recoverTime.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const playlist = await getMusics(id);
    this.setState({
      playlist,
      loading: false,
    });
    this.updateFavMusic();
  }

  async updateFavMusic() {
    const favSongs = await getFavoriteSongs();
    this.setState({
      favoritesList: favSongs,
    });
  }

  toggleLoad() {
    this.setState((currentState) => ({
      loading: !currentState.loading,
    }));
  }

  changeImgSize(url = '') {
    return url.replace(/100x100bb.jpg/, '300x300bb.jpg');
  }

  recoverTime() {
    const { playlist } = this.state;
    const songsList = playlist.filter((_song, index) => index > 0);
    const time = new Date(
      songsList.reduce((accum, song) => accum + song.trackTimeMillis, 0),
    );

    const millisHour = 3600000;
    const millisMinute = 60000;
    const millisSecond = 1000;
    const hours = Math.floor(time / millisHour);
    const minutes = Math.floor((time % millisHour) / millisMinute);
    const seconds = Math
      .floor(((time % millisHour) % millisMinute) / millisSecond);
    return `${hours > 0 ? `${hours}h` : ''} \
    ${minutes > 0 ? `${minutes}min` : ''} ${hours > 0 ? '' : `${seconds}s`}`;
  }

  render() {
    const { playlist, loading, favoritesList } = this.state;
    const { thumbnail, artistName, collectionName,
      genre, releaseDate, musicTrackCount } = playlist[0] || {};
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          {loading ? <Loading /> : (
            <>
              <div>
                <img src={ this.changeImgSize(thumbnail) } alt="" />
                <div>
                  <h3 data-testid="artist-name">{artistName}</h3>
                  <h2 data-testid="album-name">{collectionName}</h2>
                  <div>
                    <span>{genre}</span>
                    <span>{releaseDate.split('-')[0]}</span>
                    <span>
                      {`${musicTrackCount} 
                      ${musicTrackCount > 1 ? 'músicas' : 'música'}`}
                    </span>
                    <span>
                      {this.recoverTime()}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                {playlist.map((track, index) => (
                  index > 0 && <MusicCard
                    track={ track }
                    key={ track.trackId }
                    toggleLoadingHandler={ this.toggleLoad }
                    favoritesList={ favoritesList }
                    updateHandler={ this.updateFavMusic }
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape(PropTypes.o).isRequired,
};

export default Album;
