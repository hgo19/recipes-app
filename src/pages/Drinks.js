import React, { useContext, useEffect, useState } from 'react';
import { act } from 'react-dom/test-utils';
import PropTypes from 'prop-types';

import { useLocation } from 'react-router-dom';

import { fetchDrinks } from '../services/fetchRecipes';
import { DRINKS_SAVE } from '../constant';
import RecipesContext from '../context/RecipesContext';
import { fetchDrinksCategories } from '../services/fetchCategories';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import searchImg from '../images/searchIcon.svg';
import Footer from '../components/Footer';

import '../styles/recipes.css';

export default function Drinks(props) {
  const { recipes, recipesDispatch } = useContext(RecipesContext);
  const [drinksElements, setDrinksElements] = useState([]);
  const [categories, setCategories] = useState([]);

  const location = useLocation();
  const { pathname } = location;

  const { drinks } = recipes;
  const { history } = props;
  const TWELVE_FIRST_DRINKS = 12;
  const FIVE_FIRST_CATEGORIES = 5;

  useEffect(() => {
    const fetchAPIS = async () => {
      const drinksRecipes = await fetchDrinks();
      act(() => { recipesDispatch({ type: DRINKS_SAVE, payload: drinksRecipes }); });

      const drinksCategories = await fetchDrinksCategories();
      const allCategories = drinksCategories.map((drink) => drink.strCategory);
      act(() => { setCategories(allCategories.slice(0, FIVE_FIRST_CATEGORIES)); });
    };
    fetchAPIS();
  }, [recipesDispatch]);

  useEffect(() => {
    const getDrinks = () => {
      if (drinks !== null) {
        setDrinksElements(drinks.slice(0, TWELVE_FIRST_DRINKS));
      }
    };
    getDrinks();
  }, [drinks]);

  return (
    <div>
      <Header
        title="Drinks"
        search={ searchImg }
        history={ history }
        path={ pathname }
      />
      <Recipes
        recipesList={ drinksElements }
        categories={ categories }
        recipesFor="drink"
      />
      <Footer history={ history } />
    </div>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
