import React, { useContext, useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';
import { fetchMealsCategories } from '../services/fetchCategories';
import Header from '../components/Header';
import searchImg from '../images/searchIcon.svg';
import Footer from '../components/Footer';

import { fetchMeals } from '../services/fetchRecipes';
import { MEALS_SAVE } from '../constant';
import Recipes from '../components/Recipes';

import '../styles/recipes.css';

export default function Meals(props) {
  const { recipes, recipesDispatch } = useContext(RecipesContext);
  const [mealsElements, setMealsElements] = useState([]);
  const [categories, setCategories] = useState([]);

  const { meals } = recipes;
  const TWELVE_FIRST_MEALS = 12;
  const FIVE_FIRST_CATEGORIES = 5;
  const { history } = props;

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const fetchApis = async () => {
      const mealsRecipes = await fetchMeals();
      act(() => { recipesDispatch({ type: MEALS_SAVE, payload: mealsRecipes }); });

      const mealsCategories = await fetchMealsCategories();
      const allCategories = mealsCategories.map((meal) => meal.strCategory);
      act(() => { setCategories(allCategories.slice(0, FIVE_FIRST_CATEGORIES)); });
    };
    fetchApis();
  }, [recipesDispatch]);

  useEffect(() => {
    const getMeals = () => {
      if (meals !== null) {
        setMealsElements(meals.slice(0, TWELVE_FIRST_MEALS));
      }
    };
    getMeals();
  }, [meals]);

  return (
    <div>
      <Header
        title="Meals"
        search={ searchImg }
        history={ history }
        path={ pathname }
      />
      <Recipes
        recipesList={ mealsElements }
        categories={ categories }
        recipesFor="meal"
      />
      <Footer history={ history } />
    </div>
  );
}

Meals.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
