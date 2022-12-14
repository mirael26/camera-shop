import { Modal } from '../../consts';
import { ActionCreator } from '../action';
import { viewReducer } from './view-reducer';

describe('viewReducer', () => {
  test('opens modal correctly', () => {
    const newState = viewReducer(undefined, ActionCreator.OpenModal(Modal.AddingToCart));
    expect(newState.isModalOpen).toBe(true);
    expect(newState.activeModal).toBe(Modal.AddingToCart);
  });

  test('closes modal correctly', () => {
    const state = {
      isModalOpen: true,
      activeModal: Modal.AddingToCart,
      redirect: null,
      productsIsLoading: false,
    };

    const newState = viewReducer(state, ActionCreator.CloseModal());
    expect(newState.isModalOpen).toBe(false);
    expect(newState.activeModal).toBe(null);
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
