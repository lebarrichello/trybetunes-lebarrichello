import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiSearch, FiUser } from 'react-icons/fi';
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
        <Link to="/">
          <h1>
            TrybeTunes
          </h1>
        </Link>
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
                <Loading />
              </>)
            : (
              <>
                <img src={ userImg } alt="" />
                <p data-testid="header-user-name">{user}</p>
              </>
            )}
        </div>

      </header>

    );
  }
}

export default Header;

// adicionando commit do requisito 4 que eu esqueci de commitar :S
