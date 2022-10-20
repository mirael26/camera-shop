import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { promoMock } from '../../test/mocks';
import Promo from './promo';

test('Promo renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Promo/>, { initialState: { 
    data: { promo: promoMock }
  }});
  expect(asFragment()).toMatchSnapshot();
});
