import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';
import { FAV_RECIPES_KEY } from '../services/localStorageFuncs';

import '../styles/favoriteRecipes.css';

const copy = require('clipboard-copy');

export default function FavoriteRecipes(props) {
  const { history } = props;
  const location = useLocation();
  const { pathname } = location;
  const storageFavs = JSON.parse(localStorage.getItem(FAV_RECIPES_KEY));
  const [copied, setCopy] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState(storageFavs);
  function handleClickShareButton(recipesId, recipesType) {
    const currentURL = window.location.host;
    setCopy(true);
    copy(`http://${currentURL}/${recipesType}s/${recipesId}`);
  }
  function mealFilter() {
    setFavoriteRecipes(storageFavs.filter((recipe) => recipe.type === 'meal'));
  }
  function drinkFilter() {
    setFavoriteRecipes(storageFavs.filter((recipe) => recipe.type === 'drink'));
  }
  function allFilter() {
    setFavoriteRecipes(storageFavs);
  }

  return (
    <div>
      <Header
        title="Favorite Recipes"
        search=""
        history={ history }
        path={ pathname }
      />
      <div className="buttons-container-done-recipes">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => allFilter() }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ mealFilter }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ drinkFilter }
        >
          Drinks
        </button>
      </div>
      <div className="fav-recipes-container">
        {favoriteRecipes !== null && favoriteRecipes.map((recipe, index) => (
          <div className="card card-color" data-testid={ recipe.id } key={ index }>

            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              data-testid={ `${index}-recipe-card` }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                className="card-img-top card-img"
                data-testid={ `${index}-horizontal-image` }
              />
              <h3
                className="card-title"
                data-testid={ `${index}-horizontal-name` }
              >
                {recipe.name}
              </h3>
            </Link>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </p>
            <div className="fav-recipe-btns">
              <button
                type="button"
                onClick={ () => handleClickShareButton(recipe.id, recipe.type) }
                className="share-button"
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="shareIcon"
                  className="share-image"
                />
              </button>
              {copied && <span>Link copied!</span> }

              <button
                type="button"
                data-testid={ `${recipe.id}-favorite-btn` }
                onClick={ () => {
                  setFavoriteRecipes(storageFavs.filter((item) => item.id !== recipe.id));
                  localStorage.setItem(FAV_RECIPES_KEY, JSON
                    .stringify(storageFavs.filter((item) => item.id !== recipe.id)));
                } }
                className="share-button"
              >
                <img
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ favoriteIcon }
                  alt="favoriteIcon"
                />
              </button>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
}
FavoriteRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
