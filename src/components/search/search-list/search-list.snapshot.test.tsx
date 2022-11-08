import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { searchedProductsMock } from '../../../test/mocks';
import SearchList from './search-list';

test('SearchList component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<SearchList searchedProducts={searchedProductsMock} onLinkClick={() => ({})}/>);
  expect(asFragment()).toMatchSnapshot();
});
