import React, { useContext, useEffect, useState } from 'react';

import copy from 'clipboard-copy';

import { useHistory, useParams } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

import {
  saveStorageNewItem,
  FAV_RECIPES_KEY,
  readLocalStorage,
  removeStorageItem,
  DONERECIPES_KEY } from '../services/localStorageFuncs';

import RecipeInProgress from '../components/RecipeInProgress';

import RecipesContext from '../context/RecipesContext';
import { fetchMealDetail } from '../services/fetchDetails';

export default function MealInProgress() {
  const [showIfCopy, setShowIfCopy] = useState(false);
  const [heartIcon, setHeartIcon] = useState(whiteHeartIcon);
  const [tags, setTags] = useState([]);

  const { recipesProgress, progressDispatch } = useContext(RecipesContext);
  const { enabledFinish, recipeInfo } = recipesProgress;

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const getTags = async () => {
      const response = await fetchMealDetail(id);
      if (response.strTags !== null) {
        const tagsArray = response.strTags.split(', ');
        setTags(tagsArray);
      }
    };
    getTags();
  }, [id]);

  useEffect(() => {
    const readFavs = () => {
      const storageFavs = readLocalStorage(FAV_RECIPES_KEY);
      if (storageFavs !== null) {
        const checkStorage = storageFavs.some((e) => e.id === recipeInfo.id);
        if (checkStorage === true) {
          setHeartIcon(blackHeartIcon);
        }
      }
    };
    readFavs();
  }, [progressDispatch, recipeInfo]);

  const favoriteHandler = () => {
    if (heartIcon === whiteHeartIcon) {
      setHeartIcon(blackHeartIcon);
      saveStorageNewItem(recipeInfo, FAV_RECIPES_KEY);
    }
    if (heartIcon === blackHeartIcon) {
      setHeartIcon(whiteHeartIcon);
      removeStorageItem(recipeInfo, FAV_RECIPES_KEY);
    }
  };

  const shareHandler = () => {
    const link = window.location.href;
    const newLink = link.replace('/in-progress', '');
    copy(newLink);
    setShowIfCopy(true);
  };

  const recipeIsDone = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const doneDate = `${day}/${month}/${year}`;
    const recipeObj = {
      ...recipeInfo,
      doneDate,
      tags,
    };
    saveStorageNewItem(recipeObj, DONERECIPES_KEY);
    history.push('/done-recipes');
  };

  return (
    <div>
      <RecipeInProgress keys="meals" />
      <div className="div-buttons">
        <button
          type="button"
          data-testid="favorite-btn"
          onClick={ favoriteHandler }
        >
          <img
            src={ heartIcon }
            alt="btnImg"
          />
          Favorite Recipe
        </button>

        <button
          type="button"
          data-testid="share-btn"
          onClick={ shareHandler }
        >
          <img src={ shareIcon } alt="share" />
          Share Recipe
        </button>
        {showIfCopy && <p>Link copied!</p>}

        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ enabledFinish }
          onClick={ recipeIsDone }
        >
          Finish Recipe
        </button>
      </div>
    </div>
  );
}
