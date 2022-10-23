import { IProduct, IPromo, IReview } from './data.type';

export interface IDataReducer {
  promo: IPromo | null;
  products: Array<IProduct> | null;
  currentProduct: IProduct | null;
  similarProducts: Array<IProduct> | null;
  reviews: Array<IReview> | null;
}

export interface IViewReducer {
  addToCartModalOpen: boolean;
  addingToCartItem: IProduct | null;
  reviewModalOpen: boolean;
  redirect: null | string;
}
