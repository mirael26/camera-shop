import { renderWithReduxAndRouter } from '../../../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../../../test/mocks';
import AddToCartModalContent from './add-to-cart-modal-content';

test('AddToCartModalContent renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<AddToCartModalContent product={productMock}/>);
  expect(asFragment()).toMatchSnapshot();
});
