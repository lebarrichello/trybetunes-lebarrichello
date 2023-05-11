import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { FiPlay } from 'react-icons/fi';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

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

  showAudio({ currentTarget }) {
    const songContainer = document.querySelector('.songContainer');
    const isMobile = getComputedStyle(songContainer).justifyContent === 'space-between';
    if (!isMobile) {
      currentTarget.classList.add('display-none');
    }
    const currentActive = document.querySelector('.active');
    if (currentActive) {
      currentActive.classList.remove('active');
      currentActive.previousSibling.classList.remove('display-none');
      currentActive.pause();
    }
    currentTarget.nextSibling.classList.add('active');
    currentTarget.nextSibling.play();
  }

  render() {
    const { track, favoritesList, showArtwork } = this.props;
    const { trackName, trackId, previewUrl,
      artworkUrl30, collectionName, trackNumber } = track;
    return (
      <div>
        {showArtwork
          && <img src={ artworkUrl30 } alt={ collectionName } />}
        {!showArtwork && <span>{trackNumber}</span> }
        <h4>{trackName}</h4>
        <FiPlay size="1.6em" onClick={ (event) => this.showAudio(event) } />
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
          />
          Favorita
        </label>
      </div>
    );
  }
}

MusicCard.defaultProps = {
  showArtwork: false,
};

MusicCard.propTypes = {
  track: PropTypes.shape(PropTypes.o).isRequired,
  toggleLoadingHandler: PropTypes.func.isRequired,
  updateHandler: PropTypes.func.isRequired,
  favoritesList: PropTypes.shape(PropTypes.r).isRequired,
  showArtwork: PropTypes.bool,
};

export default MusicCard;
