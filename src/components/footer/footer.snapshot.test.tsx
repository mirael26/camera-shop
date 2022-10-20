import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Footer from './footer';

test('Footer renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Footer/>);
  expect(asFragment()).toMatchSnapshot();
});
