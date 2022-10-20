import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import UpButton from './up-button';

test('UpButton render correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<UpButton/>);
  expect(asFragment).toMatchSnapshot();
});
