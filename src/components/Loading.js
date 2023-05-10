import React, { Component } from 'react';
import '../styles/Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loadContainer">
        <div className="loading load1">{/* Carregando... */}</div>
        <div className="loading load2">{/* Carregando... */}</div>
        <div className="loading load3">{/* Carregando... */}</div>
        <div className="loading load4">{/* Carregando... */}</div>
        <div className="loading load5">{/* Carregando... */}</div>
      </div>
    );
  }
}

export default Loading;
