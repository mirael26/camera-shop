import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { productsMock } from '../../../test/mocks';
import ProductList from './product-list';

jest.mock('../../product-card/product-card', () => () => <div data-testid='product-card'></div>);

test('ProductList component renders correct products count', () => {
  renderWithReduxAndRouter(<ProductList products={productsMock}/>);

  const cards = screen.getAllByTestId('product-card');
  expect(cards).toHaveLength(3);
});
