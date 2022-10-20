import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import RatingStars from './rating-stars';

test('RatingStars displays stars correctly', () => {
  renderWithReduxAndRouter(<RatingStars rating={4}/>)
  const checkedStars = screen.getAllByTestId('full-star-icon');
  expect(checkedStars).toHaveLength(4);
});
