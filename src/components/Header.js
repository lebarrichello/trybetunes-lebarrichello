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
        <div className="logoHeader">
          <Link to="/">
            <h1>
              TrybeTunes
            </h1>
          </Link>
        </div>
        <nav>
          <Link to="/search" data-testid="link-to-search">
            <FiSearch className="icon" />
            {' '}
            Pesquisa
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            <FiHeart className="icon" />
            {' '}
            Favoritas
          </Link>
          <Link className="profile" to="/profile" data-testid="link-to-profile">
            <FiUser className="icon" />
            {' '}
            Perfil

          </Link>
        </nav>
        <div className="containerUser">
          { loading
            ? (
              <>
                <img
                  className="header-profile-img"
                  src="./images/default-profile.jpeg"
                  alt=""
                />
                <div className="loadHeader">
                  <Loading />
                </div>
              </>)
            : (
              <>
                <img src={ userImg } alt="" />
                <p data-testid="header-user-name">{user}</p>
              </>
            )}
        </div>
        <div className="logoutHeader">
          <Link to="/">
            <button
              className="btnLogout"
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
