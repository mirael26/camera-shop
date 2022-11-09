import { fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { AppUrl, Modal, Tab } from '../../consts';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../test/mocks';
import Product, { DEFAULT_TAB } from './product';

jest.mock('../rating-stars/rating-stars', () => 'RatingStars');

jest.mock('axios');
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: jest.fn(),
    useSearchParams: jest.fn(),
  }
});
jest.mock('../../hooks/use-app-dispatch');

const dispatchSpy =  jest.fn();
const navigateSpy = jest.fn();
const setSearchParamsSpy = jest.fn();

describe('Product component', () => {
  beforeEach(() => {
    jest.mocked(useParams).mockReturnValue({ id: '4' });
    const searchParams = new URLSearchParams({tab: Tab.Description});
    jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParamsSpy]);
    jest.mocked(useNavigate).mockReturnValue(navigateSpy);
    jest.mocked(axios).get.mockResolvedValue(productMock);
    jest.mocked(useAppDispatch).mockReturnValue(dispatchSpy);
  });

  test('manages features tab correct work', () => {
    jest.mocked(useParams).mockReturnValueOnce({ id: '4' });
    const searchParams = new URLSearchParams({tab: Tab.Features});
    jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParamsSpy]);

    renderWithReduxAndRouter(<Product/>, { initialState: { 
      data: { currentProduct: productMock }
    }});
    
    expect(screen.getByText<HTMLLinkElement>(/Характеристики/i)).toHaveClass('is-active');
    expect(screen.getByText<HTMLLinkElement>(/Описание/i)).not.toHaveClass('is-active');
    expect(screen.getByTestId('features-content')).toHaveClass('is-active');
    expect(screen.getByTestId('description-content')).not.toHaveClass('is-active');
  });

  test('manages description tab correct work', () => {
    jest.mocked(useParams).mockReturnValue({ id: '4' });

    renderWithReduxAndRouter(<Product/>, { initialState: { 
      data: { currentProduct: productMock }
    }});

    expect(screen.getByText<HTMLLinkElement>(/Характеристики/i)).not.toHaveClass('is-active');
    expect(screen.getByText<HTMLLinkElement>(/Описание/i)).toHaveClass('is-active');
    expect(screen.getByTestId('features-content')).not.toHaveClass('is-active');
    expect(screen.getByTestId('description-content')).toHaveClass('is-active');
  });

  test('invokes modal by click on addToCart button', async() => {
    jest.mocked(useParams).mockReturnValue({ id: '4' });
    renderWithReduxAndRouter(<Product/>, {
      initialState: { 
        data: { currentProduct: productMock }
      }
    });

    expect(dispatchSpy).toHaveBeenCalledTimes(1);

    const toCartButton = screen.getByText(/Добавить в корзину/i);
    fireEvent.click(toCartButton);

    expect(dispatchSpy).toHaveBeenNthCalledWith(2, ActionCreator.OpenModal(Modal.AddToCart));
    expect(dispatchSpy).toHaveBeenNthCalledWith(3, ActionCreator.ChangeAddingToCartItem(productMock));
  });

  test('should add tab in url-params when no tab', async() => {
    const searchParams = new URLSearchParams({});
    jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParamsSpy]);

    jest.mocked(useParams).mockReturnValue({ id: '4' });
    renderWithReduxAndRouter(<Product/>, {
      initialState: { 
        data: { currentProduct: productMock }
      }
    });

    expect(navigateSpy).toHaveBeenCalledWith(`${AppUrl.Catalog}${AppUrl.Product}/4?tab=${DEFAULT_TAB}`, {replace: true});
  });

  test('should redirect to 404 when unknown tab', async() => {
    const searchParams = new URLSearchParams({tab: 'unknown'});
    jest.mocked(useSearchParams).mockReturnValue([searchParams, setSearchParamsSpy]);

    jest.mocked(useParams).mockReturnValue({ id: '4' });
    renderWithReduxAndRouter(<Product/>, {
      initialState: { 
        data: { currentProduct: productMock }
      }
    });

    expect(navigateSpy).toHaveBeenCalledWith(AppUrl.NotFound);
  });
});
