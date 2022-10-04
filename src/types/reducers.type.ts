import { IProduct, IPromo } from './data.type';

export interface IDataReducer {
  promo: IPromo | null;
  products: Array<IProduct> | null;
}

// export type TReducer = IDataReducer;
