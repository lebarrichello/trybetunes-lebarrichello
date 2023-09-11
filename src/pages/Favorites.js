import React, { Component } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import '../styles/Favorites.css';

class Favorites extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favoritesList: [],
    };

    this.toggleLoad = this.toggleLoad.bind(this);
    this.updateFavMusic = this.updateFavMusic.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const favoritesList = await getFavoriteSongs();
      this.setState({
        loading: false,
        favoritesList });
    });
  }

  toggleLoad() {
    this.setState((currentState) => ({
      loading: !currentState.loading,
    }));
  }

  async updateFavMusic() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoritesList: favoriteSongs,
    });
  }

  render() {
    const { favoritesList, loading } = this.state;
    return (
      <div className="container_page-favorites">
        <Header />
        <div className="container_favorites">
          <div className="container_top-title">
            <div><FaRegHeart className="icon-favorites" /></div>
            <div className="top-title_text">
              <span>Playlist</span>
              <h1>Músicas Curtidas</h1>
            </div>
          </div>
          <div className="container_songs-liked">
            {loading
              ? <Loading />
              : (
                <>
                  {favoritesList.map((song) => (
                    <MusicCard
                      track={ song }
                      key={ song.trackId }
                      favoritesList={ favoritesList }
                      toggleLoadingHandler={ this.toggleLoad }
                      updateHandler={ this.updateFavMusic }
                      showArtwork
                    />))}
                  {!favoritesList.length && <p>Nenhuma música favoritada</p>}
                </>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
