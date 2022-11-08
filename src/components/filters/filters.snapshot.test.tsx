import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Filters from './filters';

jest.mock('./category-filter/category-filter', () => 'CategoryFilter');
jest.mock('./level-filter/level-filter', () => 'LevelFilter');
jest.mock('./price-filter/price-filter', () => 'PriceFilter');
jest.mock('./type-filter/type-filter', () => 'TypeFilter');

test('Filters render correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Filters/>);
  expect(asFragment()).toMatchSnapshot();
});
