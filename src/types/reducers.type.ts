import { TModal } from './app.type';
import { IProduct, IProductInCart, IPromo, IReview } from './data.type';

export interface IDataReducer {
  promo: IPromo | null;
  products: Array<IProduct> | null;
  filteredProducts: Array<IProduct> | null;
  filteredExcludingPriceProducts: Array<IProduct> | null;
  displayedProducts: Array<IProduct> | null;
  currentProduct: IProduct | null;
  similarProducts: Array<IProduct> | null;
  reviews: Array<IReview> | null;
}

export interface ICartReducer {
  productsInCart: Array<IProductInCart> | null;
  promocode: string | null;
}

export interface IViewReducer {
  isModalOpen: boolean;
  activeModal: TModal | null;
  addingToCartItem: IProduct | null;
  redirect: null | string;
  productsIsLoading: boolean;
}
