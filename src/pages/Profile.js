import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  readLocalStorage,
  USER_KEY,
  clearLocalStorage,
} from '../services/localStorageFuncs';

import '../styles/profile.css';

export default function Profile(props) {
  const { history } = props;
  const [userEmail, setEmail] = useState('');
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const { email } = readLocalStorage(USER_KEY);
    setEmail(email);
  }, []);

  return (
    <div>
      <Header
        title="Profile"
        history={ history }
        search=""
        path={ pathname }
      />
      <p className="user-email" data-testid="profile-email">
        <span>Usuário:</span>
        {' '}
        {userEmail}
      </p>

      <div className="profile-buttons">
        <button
          type="button"
          onClick={ () => {
            history.push('/done-recipes');
          } }
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>

        <hr />

        <button
          type="button"
          onClick={ () => {
            history.push('/favorite-recipes');
          } }
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>

        <hr />

        <button
          type="button"
          onClick={ () => {
            clearLocalStorage();
            history.push('/');
          } }
          data-testid="profile-logout-btn"
        >
          Logout
        </button>
      </div>
      <Footer history={ history } />
    </div>
  );
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
