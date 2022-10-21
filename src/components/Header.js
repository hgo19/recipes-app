import React, { useState } from 'react';
import PropTypes from 'prop-types';

import profileImg from '../images/profileIcon.svg';
import mealsIcon from '../images/categories/mealsIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';

import SearchBar from './SearchBar';

import '../styles/header.css';

export default function Header({ title, search, history, path }) {
  const [toggle, setToggle] = useState(false);
  const handleClick = () => {
    history.push('/profile');
  };
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <header>
      <div className="title-container">
        <button
          type="button"
          onClick={ handleClick }
          className="header-button"
        >
          <img
            data-testid="profile-top-btn"
            src={ profileImg }
            alt="Profile-icon"
            className="header-img"
          />
        </button>

        <h1 className="header-title">{'<Recipes App />'}</h1>
        {search !== ''
          ? (
            <button type="button" onClick={ handleToggle } className="header-button">
              <img
                data-testid="search-top-btn"
                src={ search }
                alt="Search-Icon"
                className="header-img"
              />
            </button>)
          : '' }
      </div>
      <div className="category-header">
        {title === 'Meals' && (
          <img src={ mealsIcon } alt="Meals" className="title-image" />
        )}
        {title === 'Drinks' && (
          <img src={ drinkIcon } alt="Drinks" className="title-image" />
        )}
        <h1 data-testid="page-title" className="category-title">{title}</h1>
      </div>
      {toggle ? <SearchBar path={ path } history={ history } /> : null }
    </header>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  path: PropTypes.string.isRequired,

};
