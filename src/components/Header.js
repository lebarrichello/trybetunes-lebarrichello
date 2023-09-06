import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiSearch, FiUser, FiLogOut } from 'react-icons/fi';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/HeaderSide.css';

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

        <div className="container__header-logo">
          <Link to="/">
            <h1>
              TrybeTunes
            </h1>
          </Link>
        </div>

        <nav>
          <Link to="/search" data-testid="link-to-search">
            <FiSearch className="icon-nav" />
            {' '}
            Pesquisa
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <FiHeart className="icon-nav" />
            {' '}
            Favoritas
          </Link>
          <Link className="profile" to="/profile" data-testid="link-to-profile">
            <FiUser className="icon-nav" />
            {' '}
            Perfil
          </Link>
        </nav>

        <div className="container__header-user">
          { loading
            ? (
              <div className="user-load">
                <Loading />
              </div>)
            : (
              <div className="user-infos">
                <img src={ userImg } alt="" />
                <p data-testid="header-user-name">{user}</p>
              </div>
            )}
        </div>

        <div className="container__header-logout">
          <Link to="/">
            <button
              className="button-logout"
              type="submit"
            >
              <FiLogOut className="icon" />
              {' '}
              Sair
            </button>
          </Link>
        </div>

      </header>

    );
  }
}

export default Header;

// adicionando commit do requisito 4 que eu esqueci de commitar :S
