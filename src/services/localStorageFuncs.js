export const MEALS_TOKEN_KEY = 'mealsToken';
export const DRINKS_TOKEN_KEY = 'drinksToken';
export const USER_KEY = 'user';
export const DONERECIPES_KEY = 'doneRecipes';
export const FAV_RECIPES_KEY = 'favoriteRecipes';
export const INPROGRESS_RECIPES_KEY = 'inProgressRecipes';

export const readLocalStorage = (ITEM_KEY) => {
  if (!JSON.parse(localStorage.getItem(USER_KEY))) {
    localStorage.setItem(USER_KEY, JSON.stringify({
      email: '',
    }));
  }
  if (!JSON.parse(localStorage.getItem(DONERECIPES_KEY))) {
    localStorage.setItem(DONERECIPES_KEY, JSON.stringify([]));
  }
  if (!JSON.parse(localStorage.getItem(INPROGRESS_RECIPES_KEY))) {
    localStorage.setItem(INPROGRESS_RECIPES_KEY, JSON.stringify(
      {
        meals: {},
        drinks: {},
      },
    ));
  }
  return (JSON.parse(localStorage.getItem(ITEM_KEY)));
};

export const saveLocalStorageItem = (ITEM_KEY, ITEM_TO_SAVE) => {
  if (ITEM_KEY === USER_KEY) {
    localStorage.setItem(ITEM_KEY, JSON.stringify({
      email: ITEM_TO_SAVE,
    }));
  } else {
    localStorage
      .setItem(ITEM_KEY, JSON.stringify(ITEM_TO_SAVE));
  }
};

export const saveStorageNewItem = (ITEM_TO_SAVE, ITEM_KEY) => {
  if (ITEM_TO_SAVE) {
    let allItems = readLocalStorage(ITEM_KEY);
    if (allItems === null) {
      allItems = [];
    }
    saveLocalStorageItem(ITEM_KEY, [...allItems, ITEM_TO_SAVE]);
  }
};

export const removeStorageItem = (ITEM_TO_REMOVE, ITEM_KEY) => {
  const allItems = readLocalStorage(ITEM_KEY);
  const removeItem = allItems.filter((e) => e.id !== ITEM_TO_REMOVE.id);
  saveLocalStorageItem(ITEM_KEY, removeItem);
};

export const saveProgressRecipe = (ITEM_TO_SAVE, OBJ_KEY) => {
  if (OBJ_KEY === 'drinks') {
    const allItems = readLocalStorage(INPROGRESS_RECIPES_KEY);
    localStorage.setItem(INPROGRESS_RECIPES_KEY, JSON.stringify({
      ...allItems,
      drinks: {
        'id-da-bebida': [...allItems.drinks['id-da-bebida'], ITEM_TO_SAVE],
      },
    }));
  }
  if (OBJ_KEY === 'meals') {
    const allItems = readLocalStorage(INPROGRESS_RECIPES_KEY);
    localStorage.setItem(INPROGRESS_RECIPES_KEY, JSON.stringify({
      ...allItems,
      meals: {
        'id-da-comida': [...allItems.meals['id-da-comida'], ITEM_TO_SAVE],
      },
    }));
  }
};

export const clearLocalStorage = () => localStorage.clear();
