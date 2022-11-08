import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import TypeFilter from './type-filter';

test('TypeFilter component renders correctly', () => {
  const {asFragment} = renderWithReduxAndRouter(<TypeFilter/>);
  expect(asFragment()).toMatchSnapshot();
});
