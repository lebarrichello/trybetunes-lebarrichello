import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const { album } = this.props;
    const { artworkUrl100, collectionName, artistName, collectionId } = album;

    return (
      <Link
        to={ `/album/${collectionId}` }
        data-testid={ `link-to-album-${collectionId}` }
      >
        <img src={ artworkUrl100.replace(/100x100bb.jpg/, '300x300bb.jpg') } alt="" />
        <h3>
          {' '}
          { collectionName }
        </h3>
        <p>
          {' '}
          { artistName }
        </p>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  album: PropTypes.objectOf(PropTypes.a).isRequired,
};

export default AlbumCard;
