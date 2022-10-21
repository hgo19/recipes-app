import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  DRINKS_TOKEN_KEY,
  MEALS_TOKEN_KEY,
  saveLocalStorageItem,
  USER_KEY,
} from '../services/localStorageFuncs';
import RecipesContext from '../context/RecipesContext';

import '../styles/login.css';

const MIN_PASSWORD_LENGTH = 7;
function Login(props) {
  const INITIAL_STATE = {
    email: '',
    password: '',
  };
  const [user, setUser] = useState(INITIAL_STATE);
  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(true);
  const { userDispatch } = useContext(RecipesContext);

  const isValidEmail = (inputEmail) => String(inputEmail)
    .toLowerCase()
    .match(
      /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
    );

  const handleChanges = ({ target }) => {
    const { name, value } = target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleLoginClickButton = (event) => {
    event.preventDefault();
    const { history } = props;
    const { email } = user;
    saveLocalStorageItem(USER_KEY, user.email);
    saveLocalStorageItem(DRINKS_TOKEN_KEY, 1);
    saveLocalStorageItem(MEALS_TOKEN_KEY, 1);
    userDispatch({ type: 'LOGIN', payload: email });
    history.push('/meals');
  };

  useEffect(() => {
    const verifyLoginRequest = () => {
      const { email, password } = user;
      if (isValidEmail(email) && password.length >= MIN_PASSWORD_LENGTH) {
        setIsLoginButtonDisabled(false);
      } else {
        setIsLoginButtonDisabled(true);
      }
    };
    verifyLoginRequest();
  }, [user]);

  return (
    <main className="main-container">
      <div className="login-container">
        <form onSubmit={ handleLoginClickButton } className="login-form">
          <h1 className="hero-title">
            {'<Recipes App />'}
            {' '}
          </h1>
          <input
            type="email"
            name="email"
            value={ user.email }
            data-testid="email-input"
            onChange={ handleChanges }
            className="form-control input-group mb-2"
            placeholder="email"
          />
          <input
            type="password"
            name="password"
            value={ user.password }
            data-testid="password-input"
            onChange={ handleChanges }
            className="form-control input-group mb-2"
            placeholder="password"
          />
          <button
            type="submit"
            disabled={ isLoginButtonDisabled }
            data-testid="login-submit-btn"
            className="login-button"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
