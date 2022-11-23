import { productMock, productsInCartMock } from '../../test/mocks';
import { ICartReducer } from '../../types/reducers.type';
import { ActionCreator } from '../action';
import { cartReducer } from './cart-reducer';

describe('cartReducer', () => {
  test('clears cart correctly', () => {
    const state = {
      productsInCart: productsInCartMock,
    };

    const newState = cartReducer(state as ICartReducer, ActionCreator.ClearCart());

    expect(newState.productsInCart).toHaveLength(0);
  });

  test('adds new product to cart correctly', () => {
    const state = {
      productsInCart: productsInCartMock,
    };

    const newState = cartReducer(state as ICartReducer, ActionCreator.AddProductToCart(productMock));

    expect(newState.productsInCart).toHaveLength(3);
    expect(newState.productsInCart[2].countInCart).toBe(1);
  });

  test('deletes product from cart correctly', () => {
    const state = {
      productsInCart: productsInCartMock,
    };

    const newState = cartReducer(state as ICartReducer, ActionCreator.DeleteProductFromCart(7));

    expect(newState.productsInCart).toHaveLength(1);
    expect(newState.productsInCart[0].id).toBe(5);
  });

  test('changes products count in cart correctly', () => {
    const state = {
      productsInCart: productsInCartMock,
    };

    const newState = cartReducer(state as ICartReducer, ActionCreator.ChangeProductCountInCart(7, 5));

    expect(newState.productsInCart).toHaveLength(2);
    expect(newState.productsInCart[0].countInCart).toBe(5);
  });

  test('sets added to cart item correctly', () => {
    const newState = cartReducer(undefined, ActionCreator.SetAddedToCartItem(productMock));

    expect(newState.addedToCartItem).toEqual(productMock);
  });

  test('sets delited from cart item correctly', () => {
    const newState = cartReducer(undefined, ActionCreator.SetDelitedFromCartItem(productsInCartMock[0]));

    expect(newState.delitedFromCartItem).toEqual(productsInCartMock[0]);
  });

  test('sets promocode correctly', () => {
    const newState = cartReducer(undefined, ActionCreator.SetPromocode('abc'));

    expect(newState.promocode).toBe('abc');
  });

  test('change promocode confirmed correctly', () => {
    const state = {
      isPromocodeConfirmed: true,
    };

    const newState = cartReducer(state as ICartReducer, ActionCreator.ChangePromocodeConfirmed(false));

    expect(newState.isPromocodeConfirmed).toBe(false);
  });

  test('sets discount correctly', () => {
    const newState = cartReducer(undefined, ActionCreator.SetDiscount(0.15));

    expect(newState.discount).toBe(0.15);
  });
});
