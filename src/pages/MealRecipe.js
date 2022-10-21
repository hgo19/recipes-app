import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';

import { act } from '@testing-library/react';
import { fetchMealDetail } from '../services/fetchDetails';
import RecipeDetails from '../components/RecipeDetails';
import RecommendCarousel from '../components/RecommendCarousel';

import '../styles/recipesDetails.css';

import {
  readLocalStorage, DONERECIPES_KEY,
  INPROGRESS_RECIPES_KEY } from '../services/localStorageFuncs';

export default function MealRecipe() {
  const { id } = useParams();
  const location = useLocation();
  const history = useHistory();

  const [details, setDetails] = useState({});
  const [doneRecipes, setDoneRecipes] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const checkProgress = (param) => {
      const checkKey = Object.keys(param.meals);
      if (checkKey.includes(id)) { return setInProgress(true); }
    };

    const recipeDetails = async () => {
      const response = await fetchMealDetail(id);
      act(() => { setDetails(...response); });
      const payload = readLocalStorage(DONERECIPES_KEY);
      if (payload !== null) {
        const checkPayload = payload.some((e) => e.id === id);
        setDoneRecipes(checkPayload);
      }
      const inProgressStorage = readLocalStorage(INPROGRESS_RECIPES_KEY);
      if (inProgressStorage !== null) {
        checkProgress(inProgressStorage);
      }
    };
    recipeDetails();
  }, [id]);

  Object.keys(details).forEach((key) => {
    if (details[key] === null || details[key] === '' || details[key] === ' ') {
      delete details[key];
    }
  });

  const handleClick = () => {
    history.push(`/meals/${id}/in-progress`);
  };

  return (
    <div>
      <RecipeDetails details={ details } pathname={ location.pathname } />
      <RecommendCarousel pathname={ location.pathname } />
      {doneRecipes === false && (
        <button
          type="button"
          className="recipe-button"
          style={ { position: 'fixed', zIndex: '0', bottom: '0px' } }
          onClick={ handleClick }
          data-testid="start-recipe-btn"
        >
          {inProgress === true ? 'Continue Recipe' : 'Start Recipe'}

        </button>
      )}
    </div>
  );
}
