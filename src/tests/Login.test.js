import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import Login from '../pages/Login';
import renderWithRouter from '../renderWithRouter';

const testUserInputEmail = 'email-input';
const testUserInputPassword = 'password-input';
const testButtonEnter = 'login-submit-btn';
const testUserEmail = 'test@test.com';
const testUserPassword = '1234567';

describe('Test the Login page', () => {
  test('Checks if the email, password and login button exist', () => {
    renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(testUserInputEmail);
    const inputPassword = screen.getByTestId(testUserInputPassword);
    const button = screen.getByTestId(testButtonEnter);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Checks if the user can type in the email and password inputs', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId(testUserInputEmail);
    const inputPassword = screen.getByTestId(testUserInputPassword);

    userEvent.type(inputEmail, testUserEmail);
    userEvent.type(inputPassword, testUserPassword);

    expect(inputEmail).toHaveValue(testUserEmail);
    expect(inputPassword).toHaveValue(testUserPassword);
  });

  test('Checks if the user is able to click the sign in button after a valid email address and password of 6 or more characters', () => {
    renderWithRouter(<Login />);

    const inputEmail = screen.getByTestId(testUserInputEmail);
    const inputPassword = screen.getByTestId(testUserInputPassword);
    const button = screen.getByTestId(testButtonEnter);

    userEvent.type(inputEmail, 'incorrectEmail');
    expect(button).toBeDisabled();

    userEvent.type(inputPassword, '12345');
    expect(button).toBeDisabled();

    userEvent.type(inputEmail, testUserEmail);
    userEvent.type(inputPassword, testUserPassword);
    expect(button).toBeEnabled();
  });

  test('Checks if the user is redirected to the food page after clicking the enter button', () => {
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId(testUserInputEmail);
    const inputPassword = screen.getByTestId(testUserInputPassword);
    const button = screen.getByTestId(testButtonEnter);

    userEvent.type(inputEmail, testUserEmail);
    userEvent.type(inputPassword, testUserPassword);
    userEvent.click(button);

    expect(history.location.pathname).toBe('/meals');

    const mealsTokenLocalStorage = localStorage.getItem('mealsToken');
    const drinksTokenLocalStorage = localStorage.getItem('drinksToken');

    expect(mealsTokenLocalStorage).toBe('1');
    expect(drinksTokenLocalStorage).toBe('1');
  });
});
