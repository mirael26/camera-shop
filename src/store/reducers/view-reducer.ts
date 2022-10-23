import { TViewAction } from '../../types/actions.type';
import { IViewReducer } from '../../types/reducers.type';
import { ActionType } from '../action';

export const initialState: IViewReducer = {
  addToCartModalOpen: false,
  addingToCartItem: null,
  reviewModalOpen: false,
  redirect: null,
};

export const viewReducer = (state = initialState, action: TViewAction): IViewReducer => {
  switch (action.type) {
    case ActionType.OpenModal:
      return {...state, [action.payload]: true};
    case ActionType.CloseModal:
      return {...state, [action.payload]: false};
    case ActionType.ChangeAddingToCartItem:
      return {...state, addingToCartItem: action.payload};
    case ActionType.Redirect:
      return {...state, redirect: action.payload};
    default:
      return state;
  }
};
