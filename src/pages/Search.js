import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      artistName: '',
      isButtonDisabled: true,
      loading: true,

    };
  }

  componentDidMount() {
    this.setState({ loading: false });
  }

  handleSearch(event) {
    event.preventDefault();
    this.setState({
      artistName: '',
      loading: true,
    }, async () => {
    });
  }

  validateInputSearch({ target }) {
    const minLength = 2;
    this.setState({
      artistName: target.value,
      isButtonDisabled: target.value.length < minLength,
    });
  }

  render() {
    const { artistName, isButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <div className="container">
          {loading ? <Loading /> : (
            <div className="searchContainer">
              <form>
                <input
                  type="text"
                  onChange={ (event) => this.validateInputSearch(event) }
                  value={ artistName }
                  className="searchArtistInput"
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

            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
