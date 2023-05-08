import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      user: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      loading: false,
      user: user.name,
      userImg: user.image,
    });
  }

  render() {
    const { loading, user, userImg } = this.state;
    return (
      <header data-testid="header-component">
        <Link to="/">
          <h1>
            TrybeTunes
          </h1>
        </Link>
        <div>
          <div>
            { loading
              ? (
                <>
                  <img
                    src="./images/default-profile.jpeg"
                    alt=""
                  />
                  <Loading />
                </>)
              : (
                <>
                  <img src={ userImg } alt="" />
                  <p data-testid="header-user-name">{user}</p>
                </>
              )}
          </div>
          <nav>
            <Link to="/search" data-testid="link-to-search">Pesquisa</Link>
            <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
            <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;

// adicionando commit do requisito 4 que eu esqueci de commitar :S
