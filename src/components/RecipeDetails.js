import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import clipboard from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

import {
  saveStorageNewItem,
  FAV_RECIPES_KEY,
  readLocalStorage, removeStorageItem } from '../services/localStorageFuncs';

import { INITIAL_RECIPE_INFOS, SAVE_RECIPE_INFO } from '../constant';
import RecipesContext from '../context/RecipesContext';

export default function RecipeDetails({ details, pathname }) {
  const history = useHistory();

  const [heartIcon, setHeartIcon] = useState(whiteHeartIcon);
  const [recipeInfos, setRecipeInfos] = useState(INITIAL_RECIPE_INFOS);
  const [copyRecipe, setCopyRecipe] = useState(false);
  const ingredientsArray = [];
  const measures = [];

  const { progressDispatch } = useContext(RecipesContext);

  useEffect(() => {
    const saveRecipesInfos = () => {
      if (pathname.includes('/meals')) {
        setRecipeInfos({
          id: details.idMeal,
          type: 'meal',
          nationality: details.strArea,
          category: details.strCategory,
          alcoholicOrNot: '',
          name: details.strMeal,
          image: details.strMealThumb,
        });
      }

      if (pathname.includes('/drinks')) {
        setRecipeInfos({
          id: details.idDrink,
          type: 'drink',
          nationality: '',
          category: details.strCategory,
          alcoholicOrNot: details.strAlcoholic,
          name: details.strDrink,
          image: details.strDrinkThumb,
        });
      }
    };
    saveRecipesInfos();
  }, [details, pathname]);

  useEffect(() => {
    const readFavs = () => {
      const storageFavs = readLocalStorage(FAV_RECIPES_KEY);
      if (storageFavs !== null) {
        const checkStorage = storageFavs.some((e) => e.id === recipeInfos.id);
        if (checkStorage === true) {
          setHeartIcon(blackHeartIcon);
        }
      }
    };
    progressDispatch({ type: SAVE_RECIPE_INFO, payload: recipeInfos });
    readFavs();
  }, [recipeInfos, progressDispatch]);

  Object.keys(details).forEach((key) => {
    if (key.includes('strIngredient')) {
      ingredientsArray.push(details[key]);
    }
  });

  Object.keys(details).forEach((key) => {
    if (key.includes('strMeasure')) {
      measures.push(details[key]);
    }
  });

  const ingredientsAndMeasures = ingredientsArray.map((e, index) => ({
    ingredient: e,
    measure: measures[index],
  }));

  const replaceWatch = () => {
    if (details.strYoutube) {
      return details.strYoutube.replace('watch?v=', 'embed/');
    }
  };

  const favoriteRecipe = () => {
    if (heartIcon === whiteHeartIcon) {
      setHeartIcon(blackHeartIcon);
      saveStorageNewItem(recipeInfos, FAV_RECIPES_KEY);
    }
    if (heartIcon === blackHeartIcon) {
      setHeartIcon(whiteHeartIcon);
      removeStorageItem(recipeInfos, FAV_RECIPES_KEY);
    }
  };

  const copiedPathname = () => {
    clipboard(`http://localhost:3000${pathname}`);
    setCopyRecipe(true);
  };

  const backButton = () => {
    history.goBack();
  };

  return (
    <div className="recipe-details">
      <img
        src={ recipeInfos.image }
        alt={ recipeInfos.name }
        className="card-img recipe-image"
        data-testid="recipe-photo"
      />
      <div className="card-img-overlay overlay-button">
        <button type="button" onClick={ backButton } className="back-button">
          Go Back
        </button>
      </div>
      <div className="buttons-area">
        <div className="infos-box">
          <h4
            data-testid="recipe-title"
          >
            {recipeInfos.name}

          </h4>
          -
          <h4
            data-testid="recipe-category"
          >
            {recipeInfos.type === 'meal'
              ? recipeInfos.category : recipeInfos.alcoholicOrNot}

          </h4>
        </div>
        <div className="fav-and-share">
          <button type="button" onClick={ favoriteRecipe }>
            <img
              className="fav-image"
              src={ heartIcon }
              alt="favImage"
              data-testid="favorite-btn"
            />
          </button>

          <button type="button" onClick={ copiedPathname }>
            <img
              className="share-image"
              src={ shareIcon }
              alt="favImage"
              data-testid="share-btn"
            />
          </button>

          {copyRecipe && <span>Link copied!</span>}
        </div>
      </div>
      <div className="all-cards">
        <div className="recipes-card">
          <h4>Ingredients</h4>
          <div className="card ingredients-card">
            <ul className="list-group list-group-flush">
              {ingredientsAndMeasures.length > 0
              && ingredientsAndMeasures.map((e, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  className="list-group-item"
                >
                  {e.ingredient}
                  {' '}
                  -
                  {' '}
                  {e.measure}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="recipes-card">
          <h4>Instructions</h4>
          <div className="card instruction-card">
            <p
              className="card-text text-start"
              style={ { padding: '5px' } }
              data-testid="instructions"
            >
              {details.strInstructions}

            </p>
          </div>
        </div>
      </div>

      {recipeInfos.type === 'meal' && (
        <div className="recipes-card video-card">
          <h4>Video</h4>
          <iframe
            width="355"
            height="200"
            src={ replaceWatch() }
            data-testid="video"
            allowFullScreen
            title="Embedded youtube"
            className="video-recipe"
          />
        </div>
      )}
    </div>
  );
}

RecipeDetails.propTypes = {
  pathname: PropTypes.string.isRequired,
  details: PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
};
