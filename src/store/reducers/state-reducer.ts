import { TStateAction } from '../../types/actions.type';
import { IStateReducer } from '../../types/reducers.type';
import { ActionType } from '../action';

const initialState: IStateReducer = {
  addToCartModalOpen: false,
  addingToCartItem: null,
  reviewModalOpen: false,
};

export const stateReducer = (state = initialState, action: TStateAction): IStateReducer => {
  switch (action.type) {
    case ActionType.OpenModal:
      return {...state, [action.payload]: true};
    case ActionType.CloseModal:
      return {...state, [action.payload]: false};
    case ActionType.ChangeAddingToCartItem:
      return {...state, addingToCartItem: action.payload};
    default:
      return state;
  }
};
