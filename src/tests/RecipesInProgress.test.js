import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import detailsMealsMock from './mocks/penneMock';
import detailsDrinkMock from './mocks/drinksMock';

let GLOBAL_HISTORY;
let GLOBAL_HISTORY2;

describe('testes da rota meals/52771/in-progress', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(detailsMealsMock),
    }));

    const { history } = renderWithRouter(<App />, '/meals/52771/in-progress');
    GLOBAL_HISTORY = history;
  });

  it('verificar se tem a receita na tela, e seus devidos inputs e se ao clicar no input a label ganha a classe de "Finish"', async () => {
    expect(GLOBAL_HISTORY.location.pathname).toBe('/meals/52771/in-progress');

    const titleRecipe = await screen.findByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeImage = screen.getByTestId('recipe-photo');
    const recipeInstructions = screen.getByTestId('instructions');
    const ingredientsRecipe = screen.getAllByRole('checkbox');

    expect(titleRecipe).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(ingredientsRecipe).toHaveLength(8);

    const inputIngredient = '1-ingredient-step';

    const ingredient = screen.getByTestId(inputIngredient);

    userEvent.click(ingredient);

    expect(ingredient.className).toBe('Finish');

    window.location.reload(true);

    expect(ingredient.className).toBe('Finish');

    const ingredient2 = screen.getByTestId(inputIngredient);

    userEvent.click(ingredient2);

    expect(ingredient2.className).not.toBe('Finish');

    window.location.reload(true);

    expect(ingredient2.className).not.toBe('Finish');
  });

  it('testando o botão de "Finish Recipe"', async () => {
    const finishRecipe = 'Finish Recipe';

    const btnFinishRecipe = await screen.findByRole('button', { name: finishRecipe });

    expect(btnFinishRecipe.disabled).toBe(true);

    const ingredient0 = screen.getByTestId('0-ingredient-step');
    const ingredient1 = screen.getByTestId('1-ingredient-step');
    const ingredient2 = screen.getByTestId('2-ingredient-step');
    const ingredient3 = screen.getByTestId('3-ingredient-step');
    const ingredient4 = screen.getByTestId('4-ingredient-step');
    const ingredient5 = screen.getByTestId('5-ingredient-step');
    const ingredient6 = screen.getByTestId('6-ingredient-step');
    const ingredient7 = screen.getByTestId('7-ingredient-step');

    userEvent.click(ingredient0);
    userEvent.click(ingredient1);
    userEvent.click(ingredient2);
    userEvent.click(ingredient3);
    userEvent.click(ingredient4);
    userEvent.click(ingredient5);
    userEvent.click(ingredient6);
    userEvent.click(ingredient7);

    expect(ingredient0.className).toBe('Finish');
    expect(ingredient1.className).toBe('Finish');
    expect(ingredient2.className).toBe('Finish');
    expect(ingredient3.className).toBe('Finish');
    expect(ingredient4.className).toBe('Finish');
    expect(ingredient5.className).toBe('Finish');
    expect(ingredient6.className).toBe('Finish');
    expect(ingredient7.className).toBe('Finish');

    const btnFinishRecipe2 = screen.getByRole('button', { name: finishRecipe });
    expect(btnFinishRecipe2.disabled).toBe(false);

    userEvent.click(ingredient0);

    const btnFinishRecipe3 = screen.getByRole('button', { name: finishRecipe });

    expect(btnFinishRecipe3.disabled).toBe(true);
    userEvent.click(ingredient0);
    const btnFinishRecipe4 = screen.getByRole('button', { name: finishRecipe });

    expect(btnFinishRecipe4.disabled).toBe(false);

    userEvent.click(btnFinishRecipe4);

    expect(GLOBAL_HISTORY.location.pathname).toBe('/done-recipes');
  });

  it('testando o botão de "ShareRecipe"', async () => {
    const copyBtn = await screen.findByTestId('share-btn');
    expect(copyBtn.innerHTML).toContain('Share Recipe');

    window.document.execCommand = jest.fn().mockReturnValue(1);
    userEvent.click(copyBtn);

    const copyHtmlElem = await screen.findByText('Link copied!');
    expect(copyHtmlElem.innerHTML).toBe('Link copied!');

    expect(window.document.execCommand).toBeCalledWith('copy');
    expect(window.document.execCommand).toHaveBeenCalledTimes(1);
  });

  it('testando o botão de "Favorite Recipe"', async () => {
    window.localStorage.clear();
    const localStorage = window.localStorage.getItem('favoriteRecipes');
    expect(localStorage).toBe(null);

    const btnFavoriteRecipe = await screen.findByTestId('favorite-btn');
    userEvent.click(btnFavoriteRecipe);

    const localStorage2 = window.localStorage.getItem('favoriteRecipes');
    expect(localStorage2).not.toBe(null);
  });
});

describe('testes da rota drinks/  /in-progress', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(detailsDrinkMock),
    }));

    const { history } = renderWithRouter(<App />, '/drinks/15997/in-progress');
    GLOBAL_HISTORY2 = history;
  });

  it('verificar se tem a receita na tela, e seus devidos inputs e se ao clicar no input a label ganha a classe de "Finish"', async () => {
    expect(GLOBAL_HISTORY2.location.pathname).toBe('/drinks/15997/in-progress');

    const titleRecipe = await screen.findByTestId('recipe-title');
    const recipeCategory = screen.getByTestId('recipe-category');
    const recipeImage = screen.getByTestId('recipe-photo');
    const recipeInstructions = screen.getByTestId('instructions');
    const ingredientsRecipe = screen.getAllByRole('checkbox');

    expect(titleRecipe).toBeInTheDocument();
    expect(recipeCategory).toBeInTheDocument();
    expect(recipeImage).toBeInTheDocument();
    expect(recipeInstructions).toBeInTheDocument();
    expect(ingredientsRecipe).toHaveLength(2);
  });
});
