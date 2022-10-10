import { IProduct, IPromo, IReview } from './data.type';

export interface IDataReducer {
  promo: IPromo | null;
  products: Array<IProduct> | null;
  currentProduct: IProduct | null;
  reviews: Array<IReview> | null;
}

export interface IStateReducer {
  addToCartModal: boolean;
  addingToCartItem: IProduct | null;
}
