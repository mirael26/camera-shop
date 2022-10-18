import { fireEvent, getByText, screen } from '@testing-library/react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AppUrl, Tab } from '../../consts';
import { renderTestApp } from '../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../test/mocks';
import Product from './product';

jest.mock('axios');
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
  }
});

describe('Product', () => {
  beforeEach(() => {
    jest.mocked(useParams).mockReturnValue({ id: '4' });
    jest.mocked(axios).get.mockResolvedValue(productMock);
  });

  test('Render correctly', () => {
    const product = renderWithReduxAndRouter(<Product/>, { initialState: { 
      data: { currentProduct: productMock }
    }});
    expect(product).toMatchSnapshot();
  });

  test('Features tab works correctly', () => {
    jest.mocked(useParams).mockReturnValueOnce({ id: '4', tab: Tab.Features });

    renderWithReduxAndRouter(<Product/>, { initialState: { 
      data: { currentProduct: productMock }
    }});
    
    expect(screen.getByText<HTMLLinkElement>(/Характеристики/i)).toHaveClass('is-active');
    expect(screen.getByText<HTMLLinkElement>(/Описание/i)).not.toHaveClass('is-active');
    expect(screen.getByTestId('features-content')).toHaveClass('is-active');
    expect(screen.getByTestId('description-content')).not.toHaveClass('is-active');
  });

  test('Description tab works correctly', () => {
    jest.mocked(useParams).mockReturnValue({ id: '4', tab: Tab.Description });
    renderWithReduxAndRouter(<Product/>, { initialState: { 
      data: { currentProduct: productMock }
    }});
    expect(screen.getByText<HTMLLinkElement>(/Характеристики/i)).not.toHaveClass('is-active');
    expect(screen.getByText<HTMLLinkElement>(/Описание/i)).toHaveClass('is-active');
    expect(screen.getByTestId('features-content')).not.toHaveClass('is-active');
    expect(screen.getByTestId('description-content')).toHaveClass('is-active');
  });

  test('AddToCart button invoke modal', () => {
    jest.mocked(useParams).mockReturnValue({ id: '4', tab: Tab.Description });
    renderTestApp(null, { route: `${AppUrl.Catalog}${AppUrl.Product}/4`,
      initialState: { 
        data: { currentProduct: productMock }
      }
    });
    const product = screen.getByTestId('product');
    const toCartButton = getByText(product, /Добавить в корзину/i);
    fireEvent.click(toCartButton);
    expect(screen.getByTestId('add-to-cart-modal')).toBeInTheDocument();
  });
});