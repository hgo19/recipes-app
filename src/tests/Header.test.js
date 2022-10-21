import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderPath from './helpers/renderPath';

describe('Test the Header Component', () => {
  test('Verify if buttons profile and search to be in the document', () => {
    renderPath('/meals');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const seacrchBtn = screen.getByTestId('search-top-btn');
    expect(profileBtn).toBeInTheDocument();
    expect(seacrchBtn).toBeInTheDocument();
  });

  test('Verify if toggle input is working', () => {
    renderPath('/meals');
    const seacrchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(seacrchBtn);
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
  });

  test('Verify if on click the path is change', () => {
    const { history } = renderPath('/meals');
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    expect(history.location.pathname).toBe('/profile');
  });
});
