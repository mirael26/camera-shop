import { screen } from '@testing-library/react';
import { AppUrl } from '../../consts';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import NotFound from './not-found';

test('NotFound renders redirect link correctly', () => {
  renderWithReduxAndRouter(<NotFound/>);

  const returnLink = screen.getByRole('link');
  expect(returnLink).toHaveAttribute('href', AppUrl.Main);
});
