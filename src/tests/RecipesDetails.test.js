import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

import mealsMock from './mocks/mealsMock';
import corbaDetail from './mocks/corbaDetailMock';
import drinksMock from './mocks/drinksMock';
import ggDetail from './mocks/ggDetailMock';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import {
  saveStorageNewItem,
  FAV_RECIPES_KEY } from '../services/localStorageFuncs';

const objectToSaveLocalStorage = {
  id: '15997',
  type: 'drink',
  nationality: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' };

const favButton = 'favorite-btn';

describe('Testa o componente RecipeDetails', () => {
  it('Testa a tela de detalhes de uma refeição', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(corbaDetail)
        .mockResolvedValue(drinksMock),
    });

    navigator.clipboard = {
      writeText: jest.fn(),
    };

    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });

    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();

    const corbaMeal = await screen.findByText(/corba/i);
    expect(corbaMeal).toBeInTheDocument();

    const favIcon = await screen.findByTestId(favButton);
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', whiteHeartIcon);

    userEvent.click(favIcon);

    expect(favIcon).toHaveAttribute('src', blackHeartIcon);

    const shareIcon = await screen.findByTestId('share-btn');
    expect(shareIcon).toBeInTheDocument();

    userEvent.click(shareIcon);

    const copiedLink = await screen.findByText('Link copied!');
    expect(copiedLink).toBeInTheDocument();
  });

  it('Testa a tela de detalhes de uma drinks', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(ggDetail)
        .mockResolvedValue(drinksMock),
    });

    renderWithRouter(<App />, { initialEntries: ['/drinks/15997   '] });

    const recipePhoto = await screen.findByTestId('recipe-photo');
    expect(recipePhoto).toBeInTheDocument();

    const ggDrink = await screen.findByText('GG');
    expect(ggDrink).toBeInTheDocument();

    const favIcon = await screen.findByTestId(favButton);
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', whiteHeartIcon);

    userEvent.click(favIcon);

    expect(favIcon).toHaveAttribute('src', blackHeartIcon);
  });

  it('Testa se uma receita já estiver no localStorage aparecerá como favoritada', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(corbaDetail)
        .mockResolvedValue(drinksMock),
    });

    saveStorageNewItem(objectToSaveLocalStorage, FAV_RECIPES_KEY);

    renderWithRouter(<App />, { initialEntries: ['/meals/52977'] });

    const favIcon = await screen.findByTestId(favButton);
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', blackHeartIcon);

    userEvent.click(favIcon);

    expect(favIcon).toHaveAttribute('src', whiteHeartIcon);
  });
});
