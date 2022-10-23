import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeFilter from './RecipeFilter';

export default function Recipes({ recipesList, categories, recipesFor }) {
  return (
    <div>
      <RecipeFilter categories={ categories } filterFor={ recipesFor } />
      <div className="recipes-container">
        {recipesFor.includes('meal') && recipesList.map((meal, index) => (
          <Link
            key={ index }
            className="card card-color"
            to={ `/recipes-app/meals/${meal.idMeal}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              className="card-img-top card-img"
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
            <div className="card-body card-name">
              <h5
                className="card-title"
                data-testid={ `${index}-card-name` }
              >
                {meal.strMeal}
              </h5>
            </div>
          </Link>
        ))}

        {recipesFor.includes('drink') && recipesList.map((drink, index) => (
          <Link
            key={ index }
            className="card card-color"
            to={ `/recipes-app/drinks/${drink.idDrink}` }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              className="card-img-top card-img"
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <div className="card-body card-name">
              <h5
                className="card-title"
                data-testid={ `${index}-card-name` }
              >
                {drink.strDrink}
              </h5>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

Recipes.propTypes = {
  recipesList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  recipesFor: PropTypes.string.isRequired,
};
