const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_API = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export const fetchMeals = async () => {
  const request = await fetch(MEALS_API);
  const response = await request.json();
  const data = response.meals;
  return data;
};

export const fetchDrinks = async () => {
  const request = await fetch(DRINKS_API);
  const response = await request.json();
  const data = response.drinks;
  return data;
};
