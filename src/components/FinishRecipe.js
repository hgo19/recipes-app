import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import '../styles/recipeInProgress.css';
import { useHistory, useParams } from 'react-router-dom';

import RecipesContext from '../context/RecipesContext';

import { IS_ENABLED_FINISH } from '../constant';

function FinishRecipe(props) {
  const [checkedBox, setCheckedBox] = useState(true);
  const [isFinished, setIsFinished] = useState('not-yet');
  const { id } = useParams();
  const { location: { pathname } } = useHistory();

  const { progressDispatch } = useContext(RecipesContext);

  const {
    item,
    i,
    ingredients,
    halfLengthOfIngredients,
    setCheckIngredient,
    checkIngredient,
  } = props;

  useEffect(() => {
    setCheckedBox(false);
    const drinksOrMeals = pathname.split('/');
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes')) || {};

    if (Object.keys(getLocalStorage).includes(drinksOrMeals[1])) {
      const isCheckedIngredient = getLocalStorage[drinksOrMeals[1]][id]
      && getLocalStorage[drinksOrMeals[1]][id].some(
        (el) => el === `${item} ${ingredients[halfLengthOfIngredients + i]}`,
      );
      if (isCheckedIngredient) {
        setCheckedBox(true);
        setIsFinished('Finish');
        if (ingredients.length) {
          setCheckIngredient((prevState) => prevState + 1);
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finishIngredient = () => {
    const drinksOrMeals = pathname.split('/');
    const getLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (checkedBox) {
      const removedIngredient = getLocalStorage[drinksOrMeals[1]][id].filter(
        (el) => el !== `${item} ${ingredients[halfLengthOfIngredients + i]}`,
      );
      const NewLocalStorage = {
        ...getLocalStorage,
        [drinksOrMeals[1]]: {
          ...getLocalStorage[drinksOrMeals[1]],
          [id]: removedIngredient,
        },
      };

      setIsFinished('not-yet');
      localStorage.setItem('inProgressRecipes', JSON.stringify(NewLocalStorage));
    } else {
      const addIngredient = {
        ...getLocalStorage,
        [drinksOrMeals[1]]: {
          ...getLocalStorage[drinksOrMeals[1]],
          [id]: [
            ...getLocalStorage[drinksOrMeals[1]][id],
            `${item} ${ingredients[halfLengthOfIngredients + i]}`,
          ],
        },
      };

      setIsFinished('Finish');
      localStorage.setItem('inProgressRecipes', JSON.stringify(addIngredient));
    }

    setCheckedBox(!checkedBox);
    if (checkedBox) {
      setCheckIngredient((prevState) => prevState - 1);
    } else {
      setCheckIngredient((prevState) => prevState + 1);
    }
    if (ingredients.length / 2 === checkIngredient) {
      progressDispatch({ type: IS_ENABLED_FINISH, payload: false });
    } else {
      progressDispatch({ type: IS_ENABLED_FINISH, payload: true });
    }
  };

  return (
    <label
      data-testid={ `${i}-ingredient-step` }
      htmlFor={ item }
      className={ isFinished }
    >
      {`${item} ${ingredients[halfLengthOfIngredients + i]}`}
      <input
        type="checkbox"
        name={ item }
        id={ item }
        checked={ checkedBox }
        onChange={ finishIngredient }
      />
    </label>
  );
}

FinishRecipe.propTypes = {
  item: PropTypes.string.isRequired,
  i: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  halfLengthOfIngredients: PropTypes.number.isRequired,
  setCheckIngredient: PropTypes.func.isRequired,
  checkIngredient: PropTypes.number.isRequired,
};

export default FinishRecipe;
