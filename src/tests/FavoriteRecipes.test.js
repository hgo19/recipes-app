import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';
import localStorageMock from './mocks/favoriteRecipesMock';
import { FAV_RECIPES_KEY } from '../services/localStorageFuncs';

const PAGE_TO_TEST = '/favorite-recipes';

describe('Favorite recipes screen', () => {
  test('Checks if the title contains an h1 heading with the text "favorite recipes"', () => {
    renderPath(PAGE_TO_TEST);
    const title = screen.getByRole('heading', { name: /favorite recipes/i });
    expect(title).toBeInTheDocument();
  });
  test('If the buttons "meals", "drinks" e "all" works correctly', () => {
    localStorage.setItem(FAV_RECIPES_KEY, JSON.stringify(localStorageMock));
    renderPath(PAGE_TO_TEST);
    const filterAllBtn = screen.getByTestId('filter-by-all-btn');
    const filterMealBtn = screen.getByTestId('filter-by-meal-btn');
    const filterDrinkBtn = screen.getByTestId('filter-by-drink-btn');
    filterMealBtn.click();
    let mealCard1 = screen.queryByTestId('52948');
    let mealCard2 = screen.queryByTestId('53060');
    expect(mealCard1).toBeInTheDocument();
    expect(mealCard2).toBeInTheDocument();
    filterDrinkBtn.click();
    let drinkCard1 = screen.getByTestId('15997');
    let drinkCard2 = screen.queryByTestId('17222');
    mealCard1 = screen.queryByTestId('52948');
    mealCard2 = screen.queryByTestId('53060');
    expect(drinkCard1).toBeInTheDocument();
    expect(drinkCard2).toBeInTheDocument();
    expect(mealCard1).not.toBeInTheDocument();
    expect(mealCard2).not.toBeInTheDocument();
    filterAllBtn.click();
    drinkCard1 = screen.queryByTestId('15997');
    drinkCard2 = screen.queryByTestId('17222');
    mealCard1 = screen.queryByTestId('52948');
    mealCard2 = screen.queryByTestId('53060');
    expect(drinkCard1).toBeInTheDocument();
    expect(drinkCard2).toBeInTheDocument();
    expect(mealCard1).toBeInTheDocument();
    expect(mealCard2).toBeInTheDocument();
  });
  test('If the buttons favorites and share works correctly', () => {
    localStorage.setItem(FAV_RECIPES_KEY, JSON.stringify(localStorageMock));
    renderPath(PAGE_TO_TEST);
    const favoriteMealCard1 = screen.getByTestId('52948-favorite-btn');
    favoriteMealCard1.click();

    const mealCard1 = screen.queryByTestId('52948');
    expect(mealCard1).not.toBeInTheDocument();

    const firstShareBtn = screen.getByTestId('0-horizontal-share-btn');
    document.execCommand = jest.fn().mockReturnValue('teste');
    userEvent.click(firstShareBtn);
    expect(screen.getByText(/link copied/i)).toBeInTheDocument();
  });
});
