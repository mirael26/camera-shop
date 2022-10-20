import { renderWithReduxAndRouter } from '../../../../test/helpers/render-with-redux-and-router';
import ReviewForm from './review-form';

const noop = () => {};

test('ReviewForm renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<ReviewForm onSuccess={noop} onModalClose={noop}/>);
  expect(asFragment()).toMatchSnapshot();
});
