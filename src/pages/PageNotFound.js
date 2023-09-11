import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PageNotFound.css';

class PageNotFound extends Component {
  render() {
    return (
      <div className="wrapper">
        <div className="container" data-text="404">
          <div className="title glitch" data-text="404">
            404
          </div>
          <div className="description glitch" data-text="PAGE NOT FOUND">
            PAGE NOT FOUND
          </div>
          <Link to="/search">
            <button
              className="button-pageNotFound"
              type="submit"
            >
              Voltar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default PageNotFound;
