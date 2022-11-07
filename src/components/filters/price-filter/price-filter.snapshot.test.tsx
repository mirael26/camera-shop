import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import PriceFilter from './price-filter';

test('Price-filter component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<PriceFilter/>);
  expect(asFragment()).toMatchSnapshot();
});
