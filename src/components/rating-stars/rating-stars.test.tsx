import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import RatingStars from './rating-stars';

describe('RatingStars', () => {
  test('Renders correctly', () => {
    const ratingStars = renderWithReduxAndRouter(<RatingStars/>);
    expect(ratingStars).toMatchSnapshot();
  });

  test('Displays stars correctly', () => {
    renderWithReduxAndRouter(<RatingStars rating={4}/>)
    const checkedStars = screen.getAllByTestId('full-star-icon');
    expect(checkedStars).toHaveLength(4);
  });
});
