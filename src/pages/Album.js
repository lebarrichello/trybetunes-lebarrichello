import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import '../styles/Album.css';

function Album({ match }) {
  const { id } = match.params;

  const [musicList, setMusicList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoritesList, setFavoritesList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedMusicList = await getMusics(id);
      setMusicList(fetchedMusicList);
      setLoading(false);
      console.log(fetchedMusicList);
      updateFavoriteSongs();
    }

    fetchData();
  }, [id]);

  async function updateFavoriteSongs() {
    const favoriteSongs = await getFavoriteSongs();
    setFavoritesList(favoriteSongs);
  }

  function convertArtworkSize(url = '') {
    return url.replace(/100x100bb.jpg/, '300x300bb.jpg');
  }

  function retrieveAlbumTime() {
    const songsList = musicList.slice(1);
    const accTime = new Date(
      songsList.reduce((accum, song) => accum + song.trackTimeMillis, 0),
    );
    const millisToHour = 3600000;
    const millisToMinute = 60000;
    const millisToSecond = 1000;
    const hours = Math.floor(accTime / millisToHour);
    const minutes = Math.floor((accTime % millisToHour) / millisToMinute);
    const seconds = Math.floor(((accTime % millisToHour
    ) % millisToMinute) / millisToSecond);
    return `${hours > 0 ? `${hours}h` : ''} ${minutes > 0 ? `${minutes}min` : ''}
     ${hours > 0 ? '' : `${seconds}s`}`;
  }

  return (
    <div className="container_page-album">
      <Header />
      <div className="container_album">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="container_infos-album">
              <img src={ convertArtworkSize(musicList[0]?.artworkUrl100) } alt="" />
              <div className="infos-album-desc">
                <div className="infos-album">
                  <span>{musicList[0]?.artistName}</span>
                  <h2>{musicList[0]?.collectionName}</h2>
                </div>
                <div className="extra-info">
                  <span>{musicList[0]?.primaryGenreName}</span>
                  <span>{musicList[0]?.releaseDate.split('-')[0]}</span>
                  <span>
                    {`${musicList[0]?.trackCount} ${musicList[0]?.trackCount > 1
                      ? 'músicas' : 'música'}`}

                  </span>
                  <span>{retrieveAlbumTime()}</span>
                </div>
              </div>
            </div>
            <div className="songsListContainer">
              {musicList.slice(1).map((track) => (
                <MusicCard
                  key={ track.trackId }
                  track={ track }
                  favoritesList={ favoritesList }
                  updateHandler={ updateFavoriteSongs }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Album;
