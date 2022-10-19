import { TDataAction } from '../../types/actions.type';
import { IDataReducer } from '../../types/reducers.type';
import { ActionType } from '../action';

export const initialState: IDataReducer = {
  promo: null,
  products: null,
  currentProduct: null,
  similarProducts: null,
  reviews: null,
};

export const dataReducer = (state = initialState, action: TDataAction): IDataReducer => {
  switch (action.type) {
    case ActionType.LoadPromo:
      return {...state, promo: action.payload};
    case ActionType.LoadProducts:
      return {...state, products: action.payload};
    case ActionType.LoadCurrentProduct:
      return {...state, currentProduct: action.payload};
    case ActionType.LoadSimilarProducts:
      return {...state, similarProducts: action.payload};
    case ActionType.LoadReviews:
      return {...state, reviews: action.payload};
    default:
      return state;
  }
};
