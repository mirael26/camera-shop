import { screen } from '@testing-library/react';
import { AppUrl } from '../../consts';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import ServerUnavailable from './server-unavailable';

test('ServerUnavailable render redirect link correctly', () => {
  renderWithReduxAndRouter(<ServerUnavailable/>);

  const redirectLink = screen.getByRole('link');
  expect(redirectLink).toHaveAttribute('href', AppUrl.Main);
});
