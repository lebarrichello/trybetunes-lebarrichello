import React, { Component } from 'react';
import '../styles/Loading.css';

class Loading extends Component {
  render() {
    return (
      <div className="loadContainer">
        <div className="loading load1" />
        <div className="loading load2" />
        <div className="loading load3" />
        <div className="loading load4" />
        <div className="loading load5" />

      </div>
    );
  }
}

export default Loading;
