import { AppUrl } from '../../consts';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Breadcrumbs from './breadcrumbs';

test('Breacrumbs renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Breadcrumbs/>, { route: `${AppUrl.Catalog}` });
  expect(asFragment()).toMatchSnapshot();
});
