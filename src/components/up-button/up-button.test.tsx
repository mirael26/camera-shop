import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import UpButton from './up-button';

test('UpButton render correctly', () => {
  const upButton = renderWithReduxAndRouter(<UpButton/>);
  expect(upButton).toMatchSnapshot();
});