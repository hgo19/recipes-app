const MEALS_CATEGORIES = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const DRINKS_CATEGORIES = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const fetchMealsCategories = async () => {
  const request = await fetch(MEALS_CATEGORIES);
  const response = await request.json();
  const data = response.meals;
  return data;
};

export const fetchDrinksCategories = async () => {
  const request = await fetch(DRINKS_CATEGORIES);
  const response = await request.json();
  const data = response.drinks;
  return data;
};
