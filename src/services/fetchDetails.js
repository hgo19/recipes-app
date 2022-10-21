export const MEAL_API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const DRINK_API = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const fetchMealDetail = async (id) => {
  const request = await fetch(`${MEAL_API}${id}`);
  const response = await request.json();
  const data = response.meals;
  return data;
};

export const fetchDrinksDetail = async (id) => {
  const request = await fetch(`${DRINK_API}${id}`);
  const response = await request.json();
  const data = response.drinks;
  return data;
};
