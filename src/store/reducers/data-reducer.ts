import { TDataAction } from '../../types/actions.type';
import { IDataReducer } from '../../types/reducers.type';
import { ActionType } from '../action';

const initialState: IDataReducer = {
  promo: null,
};

export const dataReducer = (state = initialState, action: TDataAction) => {
  switch (action.type) {
    case ActionType.LoadPromo:
      return {...state, promo: action.payload};
    default:
      return state;
  }
};
