import { IPromo } from './data.type';

export interface IDataReducer {
  promo: IPromo | null;
}

export type TReducer = IDataReducer;