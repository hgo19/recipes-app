function fetchMealsApi(input, radio) {
  let URL;
  switch (radio) {
  case 'Ingredient':
    URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
    return URL;
  case 'Name':
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    return URL;
  case 'First letter':
    URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input.split('')[0]}`;
    return URL;

  default:
  }
}
export default fetchMealsApi;
