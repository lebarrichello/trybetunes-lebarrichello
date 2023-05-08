import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isButtonDisabled: true,
      logIn: false,
      loading: false,
    };
  }

  handleSubmit(event) {
    const { name } = this.state;
    event.preventDefault();
    this.setState({
      loading: true,
    }, async () => {
      await createUser({ name, image: './images/default-icon.jpeg' });
      this.setState({
        loading: false,
        logIn: true,
      });
    });
  }

  validateLoginInput({ target }) {
    const minLength = 3;
    this.setState(() => ({
      name: target.value,
      isButtonDisabled: target.value.length < minLength,
    }));
  }

  render() {
    const { name, isButtonDisabled, logIn, loading } = this.state;
    return (
      <div>
        <h1>
          TrybeTunes
        </h1>
        <div data-testid="page-login">
          {loading === true
            ? <Loading />
            : (
              <form>
                <input
                  type="text"
                  onChange={ (event) => this.validateLoginInput(event) }
                  data-testid="login-name-input"
                  value={ name }
                  placeholder="Qual é o seu nome ?"
                />
                <button
                  type="submit"
                  onClick={ (event) => this.handleSubmit(event) }
                  data-testid="login-submit-button"
                  disabled={ isButtonDisabled }
                >
                  Entrar
                </button>
              </form>
            )}
          {logIn && <Redirect to="/search" />}
        </div>
      </div>
    );
  }
}

export default Login;
