import { screen } from '@testing-library/react';
import axios from 'axios';
import { AppUrl } from '../../consts';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { promoMock } from '../../test/mocks';
import Promo from './promo';

jest.mock('axios');

describe('Promo', () => {
  beforeEach(() => {
    jest.mocked(axios).get.mockResolvedValue(promoMock);
  });

  test('Makes one get-query after render', () => {
    renderWithReduxAndRouter(<Promo/>);
    expect(jest.mocked(axios).get).toBeCalledTimes(1);
  });

  test('Renders right title', () => {
    renderWithReduxAndRouter(<Promo/>, { initialState: { 
        data: { promo: promoMock }
      }
    });
    const title = screen.getByTestId('promo-title');
    expect(title).toHaveTextContent(/Look 54/i);
  });

  test('Render correct link to product', () => {
    renderWithReduxAndRouter(<Promo/>, { route: AppUrl.Catalog,
      initialState: { 
        data: { promo: promoMock }
      }
    });
    
    const productLink = screen.getByText(/Подробнее/i);
    expect(productLink).toHaveAttribute('href', `${AppUrl.Catalog}${AppUrl.Product}/${promoMock.id}`);
  });
});
