import React, { Component } from 'react';
import { FiSearch } from 'react-icons/fi';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      nameArtist: '',
      searchArtist: '',
      isButtonDisabled: true,
      loading: true,
      albumsList: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  handleSearch(event) {
    const { nameArtist } = this.state;
    const currentArtist = nameArtist;
    event.preventDefault();
    this.setState({
      nameArtist: '',
      loading: true,
    }, async () => {
      const albums = await searchAlbumsAPI(currentArtist);
      this.setState({
        loading: false,
        searchArtist: currentArtist,
        albumsList: albums,
      });
    });
  }

  validateInputSearch({ target }) {
    const minLength = 2;
    this.setState({
      nameArtist: target.value,
      isButtonDisabled: target.value.length < minLength,
    });
  }

  render() {
    const { nameArtist, searchArtist, albumsList,
      isButtonDisabled, loading } = this.state;
    return (

      <div className="container__page-search">
        <Header />
        <div className="container__search" data-testid="page-search">

          <div className="searchbar">
            {loading ? <Loading /> : (

              <form>
                <input
                  type="text"
                  onChange={ (event) => this.validateInputSearch(event) }
                  value={ nameArtist }
                  data-testid="search-artist-input"
                  placeholder="O que voce quer ouvir ?"
                />
                <button
                  type="submit"
                  disabled={ isButtonDisabled }
                  data-testid="search-artist-button"
                  onClick={ (event) => this.handleSearch(event) }
                >
                  <FiSearch />
                </button>
              </form>

            )}
          </div>

          <div className="container__results">
            {searchArtist && (
              <p>
                {`Resultado de álbuns para: ${searchArtist
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}`}
              </p>
            )}
            {!albumsList.length && searchArtist
              ? <p>Nenhum álbum foi encontrado</p>
              : (
                <div className="container_albums">

                  {albumsList.map(
                    (album) => (<AlbumCard
                      album={ album }
                      key={ album.collectionId }
                    />),
                  )}
                </div>

              )}

          </div>
        </div>
      </div>

    );
  }
}

export default Search;
