import { IProduct, IPromo } from './data.type';

export interface IDataReducer {
  promo: IPromo | null;
  products: Array<IProduct> | null;
}

export interface IStateReducer {
  addToCartModal: boolean;
  addingToCartItem: IProduct | null;
}
