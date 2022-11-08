import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Search from './search';

jest.mock('./search-list/search-list', () => 'SearchList');

test('Search component renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Search/>);
  expect(asFragment()).toMatchSnapshot();
});
