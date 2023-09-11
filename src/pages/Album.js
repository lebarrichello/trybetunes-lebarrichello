import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import '../styles/Album.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicList: [],
      loading: true,
      favoritesList: [],
    };

    this.toggleLoading = this.toggleLoading.bind(this);
    this.updateFavoriteSongs = this.updateFavoriteSongs.bind(this);
    this.retrieveAlbumTime = this.retrieveAlbumTime.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;
    const musicList = await getMusics(id);
    this.setState({
      musicList,
      loading: false,
    });
    console.log(musicList);
    this.updateFavoriteSongs();
  }

  async updateFavoriteSongs() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoritesList: favoriteSongs,
    });
  }

  toggleLoading() {
    this.setState((currentState) => ({
      loading: !currentState.loading,
    }));
  }

  convertArtworkSize(url = '') {
    return url.replace(/100x100bb.jpg/, '300x300bb.jpg');
  }

  retrieveAlbumTime() {
    const { musicList } = this.state;
    const songsList = musicList.filter((_song, index) => index > 0);
    const accTime = new Date(
      songsList.reduce((accum, song) => accum + song.trackTimeMillis, 0),
    );
    const millisToHour = 3600000;
    const millisToMinute = 60000;
    const millisToSecond = 1000;
    const hours = Math.floor(accTime / millisToHour);
    const minutes = Math.floor((accTime % millisToHour) / millisToMinute);
    const seconds = Math
      .floor(((accTime % millisToHour) % millisToMinute) / millisToSecond);
    return `${hours > 0 ? `${hours}h` : ''} \
    ${minutes > 0 ? `${minutes}min` : ''} ${hours > 0 ? '' : `${seconds}s`}`;
  }

  render() {
    const { musicList, loading, favoritesList } = this.state;
    const { artworkUrl100, artistName, collectionName,
      primaryGenreName, releaseDate, trackCount } = musicList[0] || {};
    return (
      <div className="container_page-album">
        <Header />
        <div className="container_album">
          {loading ? <Loading /> : (
            <>
              <div className="container_infos-album">
                <img src={ this.convertArtworkSize(artworkUrl100) } alt="" />
                <div className="infos-album-desc">
                  <div className="infos-album">
                    <span>{musicList[0]?.artistName}</span>
                    <h2>{musicList[0]?.collectionName}</h2>
                  </div>
                  <div className="extra-info">
                    <span>{primaryGenreName}</span>
                    <span>{releaseDate.split('-')[0]}</span>
                    <span>
                      {`${trackCount} ${trackCount > 1 ? 'músicas' : 'música'}`}
                    </span>
                    <span>
                      {this.retrieveAlbumTime()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="container_songs-list">
                {musicList.map((track, index) => (
                  index > 0 && <MusicCard
                    track={ track }
                    key={ track.trackId }
                    toggleLoadingHandler={ this.toggleLoading }
                    favoritesList={ favoritesList }
                    updateHandler={ this.updateFavoriteSongs }
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
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
