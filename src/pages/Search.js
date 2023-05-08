import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

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
      <div data-testid="page-search">
        <Header />
        <div>
          {loading ? <Loading /> : (
            <div>
              <form>
                <input
                  type="text"
                  onChange={ (event) => this.validateInputSearch(event) }
                  value={ nameArtist }
                  data-testid="search-artist-input"
                  placeholder="Nome do artista"
                />
                <button
                  type="submit"
                  disabled={ isButtonDisabled }
                  data-testid="search-artist-button"
                  onClick={ (event) => this.handleSearch(event) }
                >
                  Pesquisar
                </button>
              </form>
              {searchArtist && (
                <p>
                  {`Resultado de álbuns de: ${searchArtist}`}
                </p>
              )}
              {!albumsList.length && searchArtist
                ? <p>Nenhum álbum foi encontrado</p>
                : (
                  <div>
                    {albumsList.map(
                      (album) => <AlbumCard album={ album } key={ album.collectionId } />,
                    )}
                  </div>
                )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
