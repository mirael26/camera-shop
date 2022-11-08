import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import CategoryFilter from './category-filter';

test('CagetoryFilter component renders correctly', () => {
  const {asFragment} = renderWithReduxAndRouter(<CategoryFilter/>);
  expect(asFragment()).toMatchSnapshot();
});
