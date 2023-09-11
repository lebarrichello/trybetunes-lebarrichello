import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FiHeart } from 'react-icons/fi';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import '../styles/MusicCard.css';

class MusicCard extends Component {
  async handleFavorite({ target }) {
    const { track, toggleLoadingHandler, updateHandler } = this.props;
    const checked = !target.checked;
    toggleLoadingHandler();
    if (checked) {
      await removeSong(track);
    } else {
      await addSong(track);
    }
    await updateHandler();
    toggleLoadingHandler();
  }

  render() {
    const { track, favoritesList, showArtwork } = this.props;
    const { trackName, trackId, previewUrl,
      artworkUrl30, collectionName, trackNumber } = track;
    return (
      <div className="music-player">
        {showArtwork
          && <img src={ artworkUrl30 } alt={ collectionName } />}
        {!showArtwork && <span>{trackNumber}</span>}
        <h4>{trackName}</h4>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ `check-${trackId}` }>
          <input
            id={ `check-${trackId}` }
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            onChange={ (event) => this.handleFavorite(event, trackId) }
            checked={ favoritesList.some((song) => song.trackId === trackId) }
            style={ { display: 'none' } } // Esconde o checkbox original
          />
          <FiHeart
            style={ {
              color: favoritesList.some((song) => song.trackId === trackId)
                ? 'green'
                : 'gray', // Cor vermelha para favoritos marcados, cinza para não favoritos
            } }
          />
        </label>
      </div>
    );
  }
}

MusicCard.defaultProps = {
  showArtwork: false,
};

MusicCard.propTypes = {
  track: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
    previewUrl: PropTypes.string.isRequired,
    artworkUrl30: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
    trackNumber: PropTypes.number.isRequired,
  }).isRequired,
  toggleLoadingHandler: PropTypes.func.isRequired,
  updateHandler: PropTypes.func.isRequired,
  favoritesList: PropTypes.arrayOf(PropTypes.shape({
    trackId: PropTypes.number.isRequired,
  })).isRequired,
  showArtwork: PropTypes.bool,
};

export default MusicCard;
