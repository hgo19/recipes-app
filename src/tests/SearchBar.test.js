import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';

const SEARCH_INPUT = 'search-input';
const INGREDIENT_RADIO = 'ingredient-search-radio';
const NAME_RADIO = 'name-search-radio';
const FIRST_LETTER_RADIO = 'first-letter-search-radio';
const FILTER_BTN = 'exec-search-btn';
const SEARCH_ICON_BTN = 'search-top-btn';

describe('Test the SearchBar Component', () => {
  test('Verify if radio buttons to be in the document in path /meals.', async () => {
    const { history } = renderPath('/meals');
    const searchBtn = screen.getByTestId(SEARCH_ICON_BTN);
    userEvent.click(searchBtn);
    const ingredient = screen.getByTestId(INGREDIENT_RADIO);
    const name = screen.getByTestId(NAME_RADIO);
    const firstLetter = screen.getByTestId(FIRST_LETTER_RADIO);
    const filterBtn = screen.getByTestId(FILTER_BTN);
    const input = screen.getByTestId(SEARCH_INPUT);
    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();
    userEvent.type(input, 'corba');
    expect(input).toHaveValue('corba');
    userEvent.click(name);
    expect(name).toBeChecked();
    userEvent.click(filterBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52977');
    });
  });

  test('Verify if radio buttons to be in the document in path /drinks.', async () => {
    const { history } = renderPath('/drinks');
    const searchBtn = screen.getByTestId(SEARCH_ICON_BTN);
    userEvent.click(searchBtn);

    const ingredient = screen.getByTestId(INGREDIENT_RADIO);
    const name = screen.getByTestId(NAME_RADIO);
    const firstLetter = screen.getByTestId(FIRST_LETTER_RADIO);
    const filterBtn = screen.getByTestId(FILTER_BTN);
    const input = screen.getByTestId(SEARCH_INPUT);
    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(firstLetter).toBeInTheDocument();
    expect(filterBtn).toBeInTheDocument();

    userEvent.type(input, 'gg');
    expect(input).toHaveValue('gg');
    userEvent.click(name);
    userEvent.click(filterBtn);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/drinks/15997');
    });
  });
});
describe('Test the SearchBar Component', () => {
  test('Verify if alert apears in the document when user type more than on letter and click in filter button.', () => {
    renderPath('/drinks');
    const searchBtn = screen.getByTestId(SEARCH_ICON_BTN);
    userEvent.click(searchBtn);
    const input = screen.getByTestId(SEARCH_INPUT);
    const firstLetter = screen.getByTestId(FIRST_LETTER_RADIO);
    const filterBtn = screen.getByTestId(FILTER_BTN);
    userEvent.type(input, 'xablau');
    userEvent.click(firstLetter);
    window.alert = jest.fn().mockReturnValue('test');
    userEvent.click(filterBtn);

    expect(window.alert).toHaveBeenCalled();
  });

  test('Verify if alert apear in the document when value type is not found.', async () => {
    renderPath('/meals');
    const searchBtn = screen.getByTestId(SEARCH_ICON_BTN);
    userEvent.click(searchBtn);
    const input = screen.getByTestId(SEARCH_INPUT);
    const name = screen.getByTestId(NAME_RADIO);
    const filterBtn = screen.getByTestId(FILTER_BTN);
    userEvent.type(input, 'xablau');
    userEvent.click(name);
    window.alert = jest.fn().mockReturnValue('test');
    userEvent.click(filterBtn);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalled();
    });
  });
});
