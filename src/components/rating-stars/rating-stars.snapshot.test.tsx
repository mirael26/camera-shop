import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import RatingStars from './rating-stars';

test('RatingStars renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<RatingStars rating={4}/>);
  expect(asFragment()).toMatchSnapshot();
});
