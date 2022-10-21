import { MEALS_SAVE, DRINKS_SAVE,
  SAVE_DETAIL, IS_ENABLED_FINISH, CHECK_LOCAL_STORAGE,
  SAVE_RECIPE_INFO } from '../constant';

export const RECIPES_INITIAL_STATE = {
  meals: [],
  drinks: [],
};

export const USER_INITIAL_STATE = {
  email: '',
};

export const PROGRESS_INITIAL_STATE = {
  lStorage: 'favoriteRecipes',
  enabledFinish: true,
  doesRecipeExist: false,
  recipeInfo: {},
};

export const recipesReducer = (state = RECIPES_INITIAL_STATE, action) => {
  switch (action.type) {
  case MEALS_SAVE:
    return {
      ...state,
      meals: action.payload,
    };

  case DRINKS_SAVE:
    return {
      ...state,
      drinks: action.payload,
    };

  case SAVE_DETAIL:
    return {
      ...state,
      details: action.payload,
    };

  default:
    return state;
  }
};

export const userReducer = (state = USER_INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    return {
      ...state,
      email: action.payload,
    };

  default:
    return state;
  }
};

export const recipesInProgressReducer = (state = PROGRESS_INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_ENABLED_FINISH:
    return {
      ...state,
      enabledFinish: action.payload,
    };

  case CHECK_LOCAL_STORAGE:
    return {
      ...state,
      doesRecipeExist: action.payload,
    };

  case SAVE_RECIPE_INFO:
    return {
      recipeInfo: action.payload,
    };

  default:
    return state;
  }
};
