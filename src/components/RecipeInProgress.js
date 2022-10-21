import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import PropTypes from 'prop-types';

import FinishRecipe from './FinishRecipe';

import { MEAL_API, DRINK_API } from '../services/fetchDetails';
import { readLocalStorage, INPROGRESS_RECIPES_KEY } from '../services/localStorageFuncs';

import { IS_ENABLED_FINISH } from '../constant';

import '../styles/recipeInProgress.css';

import RecipesContext from '../context/RecipesContext';

function RecipeInProgress({ keys }) {
  const [recipe, setRecipe] = useState();
  const [ingredients, setIngredients] = useState('');
  const [checkIngredient, setCheckIngredient] = useState(0);
  const { id } = useParams();
  const { location: { pathname } } = useHistory();
  const history = useHistory();

  const { progressDispatch } = useContext(RecipesContext);

  useEffect(() => {
    const fetching = async () => {
      try {
        if (pathname.includes('meals')) {
          const response = await fetch(`${MEAL_API}${id}`);
          const data = await response.json();
          setRecipe(data);
        } else {
          const response = await fetch(`${DRINK_API}${id}`);
          const data = await response.json();
          setRecipe(data);
        }
      } catch (e) {
        return e.message;
      }
    };

    const localStorageServices = () => {
      if (keys) {
        const getLocalStorage = readLocalStorage(INPROGRESS_RECIPES_KEY);

        if (getLocalStorage[keys][id]) {
          const newObj = {
            ...getLocalStorage,
            [keys]: {
              ...getLocalStorage[keys],
              [id]: [...getLocalStorage[keys][id]],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
        } else {
          const newObj = {
            ...getLocalStorage,
            [keys]: {
              ...getLocalStorage[keys],
              [id]: [],
            },
          };
          localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
        }
      }
    };
    localStorageServices();
    fetching();
  }, [pathname, id, keys]);

  useEffect(() => {
    if (recipe) {
      const data = recipe[keys][0];
      const ingredientsKeys = Object.keys(data).filter((ingredient) => {
        if (ingredient.includes('strIngredient')) return true;
        return ingredient.includes('strMeasure');
      });

      const filteredIngredients = ingredientsKeys.map((ing) => data[ing])
        .filter((ingredient) => ingredient && ingredient !== ' ');

      setIngredients(filteredIngredients);
    }
  }, [keys, recipe]);

  useEffect(() => {
    if (ingredients.length) {
      if (ingredients.length / 2 === checkIngredient) {
        progressDispatch({ type: IS_ENABLED_FINISH, payload: false });
      } else {
        progressDispatch({ type: IS_ENABLED_FINISH, payload: true });
      }
    }
  }, [checkIngredient, ingredients.length, progressDispatch]);

  const halfLengthOfIngredients = Math.ceil(ingredients.length / 2);

  const goBackBtn = () => history.goBack();

  return (
    <main className="recipe-inprogress-main">
      {
        recipe && recipe[keys].map((item) => {
          if (keys === 'drinks') {
            return (
              <div
                className="contair-text"
                key={ item.idDrink }
              >
                <h1
                  data-testid="recipe-title"
                >
                  { item.strDrink }
                </h1>
                <h3 data-testid="recipe-category">{ item.strAlcoholic }</h3>
                <img
                  className="card-img recipe-image"
                  data-testid="recipe-photo"
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                />
                <p data-testid="instructions">{ item.strInstructions }</p>
              </div>
            );
          }
          return (
            <div
              className="contair-text"
              key={ item.idMeal }
            >
              <h1 data-testid="recipe-title">{ item.strMeal }</h1>
              <h3 data-testid="recipe-category">{ item.strCategory }</h3>
              <img
                data-testid="recipe-photo"
                src={ item.strMealThumb }
                alt={ item.strMeal }
                className="card-img recipe-image"
              />
              <p data-testid="instructions">{ item.strInstructions }</p>
            </div>
          );
        })
      }

      <div className="checkbox-input">
        {ingredients && ingredients
          .slice(0, halfLengthOfIngredients)
          .map((item, i) => (
            <FinishRecipe
              setCheckIngredient={ setCheckIngredient }
              checkIngredient={ checkIngredient }
              key={ item + i }
              item={ item }
              i={ i }
              ingredients={ ingredients }
              halfLengthOfIngredients={ halfLengthOfIngredients }
            />
          ))}
      </div>

      <button type="button" onClick={ goBackBtn }>Go Back</button>
    </main>
  );
}

RecipeInProgress.propTypes = {
  keys: PropTypes.string.isRequired,
};

export default RecipeInProgress;
