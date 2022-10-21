import { screen } from '@testing-library/react';
import renderPath from './helpers/renderPath';

describe('Test the Footer Component', () => {
  test('If the buttons meals and drinks to be in the document', () => {
    renderPath('/meals');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  test('If the button meals button redirect to the correct pages', () => {
    const { history } = renderPath('/meals');
    const drinksBtn = screen.getByTestId('meals-bottom-btn');
    drinksBtn.click();
    expect(history.location.pathname).toBe('/meals');
  });

  test('If the button drink button redirect to the correct pages', () => {
    const { history } = renderPath('/meals');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    drinksBtn.click();
    expect(history.location.pathname).toBe('/drinks');
  });
});
