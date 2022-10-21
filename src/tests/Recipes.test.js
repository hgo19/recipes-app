import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

import mealsMock from './mocks/mealsMock';
import mealsCategories from './mocks/mealsCategoriesMock';
import beefCategorie from './mocks/beefCategorieMock';

import drinksMock from './mocks/drinksMock';
import drinksCategories from './mocks/drinksCategoriesMock';
import ordinaryDrink from './mocks/ordinaryDrinkMock';

describe('Teste da tela de receitas e drinks', () => {
  it('Testa a página \'/meals\' ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(mealsCategories)
        .mockResolvedValueOnce(beefCategorie)
        .mockResolvedValueOnce(mealsMock)
        .mockResolvedValueOnce(mealsMock),
    });

    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const allMeals = await screen.findAllByTestId(/recipe-card/i);
    expect(allMeals).toHaveLength(12);

    const findCorba = await screen.findByText(/corba/i);
    expect(findCorba).toBeInTheDocument();

    const categoriesButtons = await screen.findAllByTestId(/-category-filter/i);
    expect(categoriesButtons).toHaveLength(6);

    userEvent.click(categoriesButtons[1]);

    const findBeefAndMustard = await screen.findByText(/Beef and Mustard Pie/i);
    expect(findBeefAndMustard).toBeInTheDocument();

    userEvent.click(categoriesButtons[1]);

    userEvent.click(categoriesButtons[0]);
  });

  it('Testa a página \'/drinks\' ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValueOnce(drinksMock)
        .mockResolvedValueOnce(drinksCategories)
        .mockResolvedValueOnce(ordinaryDrink)
        .mockResolvedValueOnce(drinksMock)
        .mockResolvedValueOnce(drinksMock),

    });

    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const allDrinks = await screen.findAllByTestId(/recipe-card/i);
    expect(allDrinks).toHaveLength(12);

    const findGG = await screen.findByText(/gg/i);
    expect(findGG).toBeInTheDocument();

    const categoriesButtons = await screen.findAllByTestId(/-category-filter/i);
    expect(categoriesButtons).toHaveLength(6);

    userEvent.click(categoriesButtons[1]);

    const find69Special = await screen.findByText(/69 special/i);
    expect(find69Special).toBeInTheDocument();

    userEvent.click(categoriesButtons[1]);

    userEvent.click(categoriesButtons[0]);
  });
});
