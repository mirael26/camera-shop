import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { reviewsMock } from '../../test/mocks';
import Reviews from './reviews';

jest.mock('./review-card/review-card', () => 'ReviewCard');

test('Reviews renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Reviews/>, {
    initialState: {
      data: { reviews: reviewsMock }
    }
  });
  expect(asFragment()).toMatchSnapshot();
});
