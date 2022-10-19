import { Modal } from '../../consts';
import { productMock, productsMock, promoMock, reviewsMock } from '../../test/mocks';
import { ActionCreator } from '../action';
import { dataReducer } from './data-reducer';
import { stateReducer } from './state-reducer';

describe('stateReducer', () => {
  test('opens modal correctly', () => {
    const newState = stateReducer(undefined, ActionCreator.OpenModal(Modal.AddToCart));
    expect(newState.addToCartModalOpen).toBe(true);
  });

  test('closes modal correctly', () => {
    const state = {
      addToCartModalOpen: true,
      addingToCartItem: null,
      reviewModalOpen: false,
      redirect: null,
    };

    const newState = stateReducer(state, ActionCreator.CloseModal(Modal.AddToCart));
    expect(newState.addToCartModalOpen).toBe(false);
  });

  test('changes adding to cart item correctly', () => {
    const newState = stateReducer(undefined, ActionCreator.ChangeAddingToCartItem(productMock));
    expect(newState.addingToCartItem).toEqual(productMock);
  });

  test('changes adding to cart item correctly', () => {
    const newState = stateReducer(undefined, ActionCreator.Redirect('/'));
    expect(newState.redirect).toBe('/');
  });
});
