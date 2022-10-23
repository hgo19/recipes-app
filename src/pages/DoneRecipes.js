import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import {
  readLocalStorage,
  DONERECIPES_KEY,
} from '../services/localStorageFuncs';
import shareIcon from '../images/shareIcon.svg';

import '../styles/doneRecipes.css';

const copy = require('clipboard-copy');

export default function DoneRecipes(props) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const allDoneRecipes = readLocalStorage(DONERECIPES_KEY);

  const { history } = props;
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setDoneRecipes(readLocalStorage(DONERECIPES_KEY));
  }, []);

  const handleClickShareButton = (recipeType, recipeId) => {
    const currentURL = window.location.host;
    setIsLinkCopied(true);
    copy(`http://${currentURL}/${recipeType}s/${recipeId}`);
  };

  const handleClickFilterByMealsButton = () => {
    const tempDoneRecipes = allDoneRecipes.filter((recipe) => recipe.type === 'meal');
    setDoneRecipes(tempDoneRecipes);
  };

  const handleClickFilterByDrinkButton = () => {
    const tempDoneRecipes = allDoneRecipes.filter((recipe) => recipe.type === 'drink');
    setDoneRecipes(tempDoneRecipes);
  };

  const handleClickFilterAll = () => {
    setDoneRecipes(allDoneRecipes);
  };

  const generateMealCard = (mealObj, index) => (
    <div
      key={ mealObj.id }
      className="done-recipes-container"
      data-testid={ mealObj.id }
    >
      <div className="card card-color">
        <Link
          to={ `/recipes-app/meals/${mealObj.id}` }
        >
          <img
            src={ mealObj.image }
            alt={ mealObj.image }
            className="card-img-top card-img"
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <div className="card-body card-name">
          <Link
            to={ `/recipes-app/meals/${mealObj.id}` }
          >
            <h3 className="card-title" data-testid={ `${index}-horizontal-name` }>
              {mealObj.name}
            </h3>
          </Link>
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {`${mealObj.nationality} - ${mealObj.category}`}
          </h3>
          <h3 data-testid={ `${index}-horizontal-done-date` }>
            {mealObj.doneDate}
          </h3>
          <button
            type="button"
            data-testid={ `shareButton-${mealObj.id}` }
            onClick={ () => {
              handleClickShareButton(mealObj.type, mealObj.id);
            } }
            className="share-button"
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
              className="share-image"
            />
          </button>
          {isLinkCopied && <span>Link copied!</span>}
          <h4
            key={ `${index}-${mealObj.tags[0]}` }
            data-testid={ `${index}-${mealObj.tags[0]}-horizontal-tag` }
          >
            {mealObj.tags[0]}
          </h4>
          <h4
            key={ `${index}-${mealObj.tags[1]}` }
            data-testid={ `${index}-${mealObj.tags[1]}-horizontal-tag` }
          >
            {mealObj.tags[1]}
          </h4>
        </div>
      </div>
    </div>
  );

  const generateDrinkCard = (drinkObj, index) => (
    <div
      key={ drinkObj.id }
      className="done-recipes-container"
      data-testid={ drinkObj.id }
    >
      <div className="card card-color">
        <Link
          to={ `/recipes-app/drinks/${drinkObj.id}` }
        >
          <img
            src={ drinkObj.image }
            alt={ drinkObj.image }
            className="card-img-top card-img"
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
        <div className="card-body card-name">
          <Link
            to={ `/recipes-app/drinks/${drinkObj.id}` }
          >
            <h3 className="card-title" data-testid={ `${index}-horizontal-name` }>
              {drinkObj.name}
            </h3>
          </Link>
          <h3 data-testid={ `${index}-horizontal-top-text` }>
            {drinkObj.alcoholicOrNot}
          </h3>
          <h3 data-testid={ `${index}-horizontal-done-date` }>
            {drinkObj.doneDate}
          </h3>
          <button
            type="button"
            data-testid={ `shareButton-${drinkObj.id}` }
            onClick={ () => {
              handleClickShareButton(drinkObj.type, drinkObj.id);
            } }
            className="share-button"
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="shareIcon"
              className="share-image"
            />
          </button>
          {isLinkCopied && <span>Link copied!</span>}
        </div>
      </div>
    </div>
  );

  const generateRecipesCards = () => (
    doneRecipes.map((recipe, index) => {
      if (recipe.type === 'meal') return generateMealCard(recipe, index);
      return generateDrinkCard(recipe, index);
    })
  );

  return (
    <div>
      <Header
        title="Done Recipes"
        history={ history }
        search=""
        path={ pathname }
      />

      <div className="buttons-container-done-recipes">
        <button
          type="button"
          onClick={ handleClickFilterAll }
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          onClick={ handleClickFilterByMealsButton }
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          onClick={ handleClickFilterByDrinkButton }
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      {generateRecipesCards()}
    </div>
  );
}
DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
