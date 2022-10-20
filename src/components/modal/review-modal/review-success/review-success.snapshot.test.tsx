import { renderWithReduxAndRouter } from '../../../../test/helpers/render-with-redux-and-router';
import ReviewSuccess from './review-success';

test('ReviewSuccess renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<ReviewSuccess onModalClose={() => {}}/>);
  expect(asFragment()).toMatchSnapshot();
});
