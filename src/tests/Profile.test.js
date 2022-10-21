import { screen } from '@testing-library/react';
import { USER_KEY } from '../services/localStorageFuncs';
import renderPath from './helpers/renderPath';

const mockLocalStorage = [
  { email: 'test1@trybe.com' },
  { anotherKey: 'value' },
];

describe('Test the Profile Component', () => {
  test('If the buttons "Done Recipes", "Favorite Recipes" e "Logout" to be in the document', () => {
    localStorage.setItem(USER_KEY, JSON.stringify(mockLocalStorage));
    renderPath('/profile');
    const doneBtn = screen.getByTestId('profile-done-btn');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    expect(doneBtn).toBeInTheDocument();
    expect(favoriteBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  test('If the button "Done Recipes" button redirect to the correct pages', () => {
    localStorage.setItem(USER_KEY, JSON.stringify(mockLocalStorage));
    const { history } = renderPath('/profile');
    const doneBtn = screen.getByTestId('profile-done-btn');
    doneBtn.click();
    expect(history.location.pathname).toBe('/done-recipes');
  });

  test('If the button "Favorite Recipes" button redirect to the correct pages', () => {
    localStorage.setItem(USER_KEY, JSON.stringify(mockLocalStorage));
    const { history } = renderPath('/profile');
    const favoriteBtn = screen.getByTestId('profile-favorite-btn');
    favoriteBtn.click();
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  test('If the button "Logout" button redirect to the correct pages and clear localStorage', () => {
    localStorage.setItem(USER_KEY, JSON.stringify(mockLocalStorage));
    const { history } = renderPath('/profile');
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    logoutBtn.click();
    expect(history.location.pathname).toBe('/');
    const localStorageContent = localStorage.getItem(USER_KEY);
    expect(localStorageContent).toBe(null);
  });
});
