import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { act } from '@testing-library/react';
import fetchMealsApi from '../services/api/fetchMealsApi';
import fetchDrinksApi from '../services/api/fetchDrinksApi';
import RecipesContext from '../context/RecipesContext';
import { MEALS_SAVE, DRINKS_SAVE } from '../constant';

import '../styles/searchBar.css';

export default function SearchBar({ path, history }) {
  const [radio, setRadio] = useState('Ingredient');
  const [input, setInput] = useState('');
  const { recipes, recipesDispatch } = useContext(RecipesContext);
  const { meals, drinks } = recipes;

  const handleChange = (event) => {
    const { target: { value } } = event;
    setRadio(value);
  };

  const verifyInput = () => {
    if (radio === 'First letter' && input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  const requestApi = async () => {
    if (path === '/meals') {
      const response = await fetch(fetchMealsApi(input, radio));
      const res = await response.json();
      const data = res.meals;
      return act(() => { recipesDispatch({ type: MEALS_SAVE, payload: data }); });
    }
    if (path === '/drinks') {
      const response = await fetch(fetchDrinksApi(input, radio));
      const res = await response.json();
      const data = res.drinks;
      return act(() => { recipesDispatch({ type: DRINKS_SAVE, payload: data }); });
    }
  };
  let call;
  if (path === '/drinks') {
    call = drinks;
  }
  if (path === '/meals') {
    call = meals;
  }
  useEffect(() => {
    if (call !== null) {
      const redirectRequest = async () => {
        if (call.length === 1) {
          console.log(call);
          const obj = call.map((item) => Object.values(item)[0]);
          await history.push(`${path}/${obj}`);
        }
      };
      redirectRequest();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [call]);

  useEffect(() => {
    const verifyNull = () => {
      if (call === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };
    verifyNull();
  }, [call]);

  return (
    <div className="search-bar-container">
      <form
        onSubmit={ (event) => {
          event.preventDefault();
          verifyInput();
          requestApi();
        } }
        className="search-form"
      >
        <input
          data-testid="search-input"
          type="text"
          value={ input }
          onChange={ ({ target }) => setInput(target.value) }
          className="form-control input-group mb-2 search-input"
        />
        <div className="search-filters">
          <label htmlFor="ingredient" className="form-check-label">
            <input
              type="radio"
              name="ingredient"
              id="ingredient"
              value="Ingredient"
              onChange={ handleChange }
              checked={ radio === 'Ingredient' }
              data-testid="ingredient-search-radio"
              className="form-check-input"

            />
            Ingredient
          </label>

          <label htmlFor="name" className="form-check-label">
            <input
              type="radio"
              name="name"
              id="name"
              value="Name"
              onChange={ handleChange }
              checked={ radio === 'Name' }
              data-testid="name-search-radio"
              className="form-check-input"
            />
            Name
          </label>

          <label htmlFor="first-letter" className="form-check-label">
            <input
              type="radio"
              name="first-letter"
              id="first-letter"
              value="First letter"
              onChange={ handleChange }
              checked={ radio === 'First letter' }
              data-testid="first-letter-search-radio"
              className="form-check-input"
            />
            First letter
          </label>
        </div>

        <button
          type="submit"
          data-testid="exec-search-btn"
        >
          Search

        </button>
      </form>
    </div>
  );
}
SearchBar.propTypes = {
  path: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
