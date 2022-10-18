import { fireEvent, getByText, screen } from '@testing-library/react';
import axios from 'axios';
import { AppUrl } from '../../consts';
import { renderTestApp } from '../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { promoMock } from '../../test/mocks';
import Promo from './promo';

jest.mock('axios');

describe('Promo', () => {
  beforeEach(() => {
    jest.mocked(axios).get.mockResolvedValue(promoMock);
  });

  test('Renders correctly', () => {
    const promo = renderWithReduxAndRouter(<Promo/>, { initialState: { 
      data: { promo: promoMock }
    }});
    expect(promo).toMatchSnapshot();
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

  test('Redirect to product', () => {
    renderTestApp(null, { route: AppUrl.Catalog,
      initialState: { 
        data: { promo: promoMock }
      }
    });
    const bunner = screen.getByTestId('banner');
    const productLink = getByText<HTMLLinkElement>(bunner, /Подробнее/i);

    expect(screen.queryByTestId('product-page')).not.toBeInTheDocument();
    fireEvent.click(productLink);
    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });
});
