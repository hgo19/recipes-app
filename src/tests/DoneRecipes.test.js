import { screen } from '@testing-library/react';
import renderPath from './helpers/renderPath';
import doneRecipesMock from './mocks/doneRecipesMock';
import { DONERECIPES_KEY } from '../services/localStorageFuncs';

const PAGE_TO_TEST = '/done-recipes';
const mockLocalStorage = doneRecipesMock;

describe('Test the DoneRecipes Component', () => {
  test('If the buttons "meals", "drinks" e "all" to be in the document', () => {
    localStorage.setItem(DONERECIPES_KEY, JSON.stringify(mockLocalStorage));
    renderPath(PAGE_TO_TEST);
    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    expect(filterAllBtn).toBeInTheDocument();
    expect(filterMealBtn).toBeInTheDocument();
    expect(filterDrinkBtn).toBeInTheDocument();
  });

  test('If the buttons "meals", "drinks" e "all" works correctly', () => {
    localStorage.setItem(DONERECIPES_KEY, JSON.stringify(mockLocalStorage));
    renderPath(PAGE_TO_TEST);
    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');

    filterMealBtn.click();
    let mealCard1 = screen.queryByTestId('213');
    let mealCard2 = screen.queryByTestId('321');
    expect(mealCard1).toBeInTheDocument();
    expect(mealCard2).toBeInTheDocument();

    filterDrinkBtn.click();
    let drinkCard1 = screen.queryByTestId('123');
    mealCard1 = screen.queryByTestId('213');
    mealCard2 = screen.queryByTestId('321');
    expect(drinkCard1).toBeInTheDocument();
    expect(mealCard1).not.toBeInTheDocument();
    expect(mealCard2).not.toBeInTheDocument();

    filterAllBtn.click();
    drinkCard1 = screen.queryByTestId('123');
    mealCard1 = screen.queryByTestId('213');
    mealCard2 = screen.queryByTestId('321');
    expect(drinkCard1).toBeInTheDocument();
    expect(mealCard1).toBeInTheDocument();
    expect(mealCard2).toBeInTheDocument();
  });
});

describe('Test the DoneRecipes Component', () => {
  test('If the button Share works correctly', () => {
    localStorage.setItem(DONERECIPES_KEY, JSON.stringify(mockLocalStorage));
    renderPath(PAGE_TO_TEST);
    const shareButtonCard1Meal = screen.queryByTestId('shareButton-213');
    const shareButtonCard3Drink = screen.queryByTestId('shareButton-123');
    expect(shareButtonCard1Meal).toBeInTheDocument();
    expect(shareButtonCard3Drink).toBeInTheDocument();
    document.execCommand = jest.fn().mockReturnValue('teste');
    shareButtonCard1Meal.click();
    shareButtonCard3Drink.click();
  });
});
