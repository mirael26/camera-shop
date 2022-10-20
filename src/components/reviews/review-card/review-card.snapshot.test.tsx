import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { reviewsMock } from '../../../test/mocks';
import ReviewCard from './review-card';

const reviewMock = reviewsMock[0];

test('ReviewCard renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<ReviewCard review={reviewMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
