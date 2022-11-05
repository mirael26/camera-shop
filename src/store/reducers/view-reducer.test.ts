import { Modal } from '../../consts';
import { productMock } from '../../test/mocks';
import { ActionCreator } from '../action';
import { viewReducer } from './view-reducer';

describe('viewReducer', () => {
  test('opens modal correctly', () => {
    const newState = viewReducer(undefined, ActionCreator.OpenModal(Modal.AddToCart));
    expect(newState.addToCartModalOpen).toBe(true);
  });

  test('closes modal correctly', () => {
    const state = {
      addToCartModalOpen: true,
      addingToCartItem: null,
      reviewModalOpen: false,
      redirect: null,
      productsIsLoading: false,
    };

    const newState = viewReducer(state, ActionCreator.CloseModal(Modal.AddToCart));
    expect(newState.addToCartModalOpen).toBe(false);
  });

  test('changes adding to cart item correctly', () => {
    const newState = viewReducer(undefined, ActionCreator.ChangeAddingToCartItem(productMock));
    expect(newState.addingToCartItem).toEqual(productMock);
  });

  test('changes adding to cart item correctly', () => {
    const newState = viewReducer(undefined, ActionCreator.Redirect('/'));
    expect(newState.redirect).toBe('/');
  });

  test('sets products loading status correctly', () => {
    const newState = viewReducer(undefined, ActionCreator.SetProdactsLoadingStatus(true));
    expect(newState.productsIsLoading).toBe(true);
  });
});
