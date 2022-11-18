import { TViewAction } from '../../types/actions.type';
import { IViewReducer } from '../../types/reducers.type';
import { ActionType } from '../action';

export const initialState: IViewReducer = {
  isModalOpen: false,
  activeModal: null,
  addingToCartItem: null,
  redirect: null,
  productsIsLoading: false,
};

export const viewReducer = (state = initialState, action: TViewAction): IViewReducer => {
  switch (action.type) {
    case ActionType.OpenModal:
      return {...state,
        isModalOpen: true,
        activeModal: action.payload};
    case ActionType.CloseModal:
      return {...state,
        isModalOpen: false,
        activeModal: null};
    case ActionType.ChangeAddingToCartItem:
      return {...state, addingToCartItem: action.payload};
    case ActionType.Redirect:
      return {...state, redirect: action.payload};
    case ActionType.SetProdactsLoadingStatus:
      return {...state, productsIsLoading: action.payload};
    default:
      return state;
  }
};
