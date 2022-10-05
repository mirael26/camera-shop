import { TDataAction } from '../../types/actions.type';
import { IDataReducer } from '../../types/reducers.type';
import { ActionType } from '../action';

const initialState: IDataReducer = {
  promo: null,
  products: null,
  currentProduct: null,
};

export const dataReducer = (state = initialState, action: TDataAction) => {
  switch (action.type) {
    case ActionType.LoadPromo:
      return {...state, promo: action.payload};
    case ActionType.LoadProducts:
      return {...state, products: action.payload};
    case ActionType.LoadCurrentProduct:
      return {...state, currentProduct: action.payload};
    default:
      return state;
  }
};
