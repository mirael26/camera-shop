import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import LevelFilter from './level-filter';

test('LevelFilter component renders correctly', () => {
  const {asFragment} = renderWithReduxAndRouter(<LevelFilter/>);
  expect(asFragment()).toMatchSnapshot();
});
