import { ActionType } from '../store/action';
import { TModal } from './app.type';
import { IProduct, IProductInCart, IPromo, IReview } from './data.type';

export interface ILoadPromo {
  type: typeof ActionType.LoadPromo;
  payload: IPromo;
}

export interface ILoadProducts {
  type: typeof ActionType.LoadProducts;
  payload: Array<IProduct>;
}

export interface ILoadFilteredProducts {
  type: typeof ActionType.LoadFilteredProducts;
  payload: Array<IProduct> | null;
}

export interface ILoadFilteredExcludingPriceProducts {
  type: typeof ActionType.LoadFilteredExcludingPriceProducts;
  payload: Array<IProduct> | null;
}

export interface ILoadDisplayedProducts {
  type: typeof ActionType.LoadDisplayedProducts;
  payload: Array<IProduct>;
}

export interface ILoadCurrentProduct {
  type: typeof ActionType.LoadCurrentProduct;
  payload: IProduct;
}

export interface ILoadSimilarProducts {
  type: typeof ActionType.LoadSimilarProducts;
  payload: Array<IProduct>;
}

export interface ILoadReviews {
  type: typeof ActionType.LoadReviews;
  payload: Array<IReview> | null;
}

export interface IAddProductToCart {
  type: typeof ActionType.AddProductToCart;
  payload: IProduct;
}

export interface IDeleteProductFromCart {
  type: typeof ActionType.DeleteProductFromCart;
  payload: number;
}

export interface IChangeProductCountInCart {
  type: typeof ActionType.ChangeProductCountInCart;
  payload: { id: number, count: number };
}

export interface ISetAddedToCartItem {
  type: typeof ActionType.SetAddedToCartItem;
  payload: IProduct | null;
}

export interface ISetDelitedFromCartItem {
  type: typeof ActionType.SetDelitedFromCartItem;
  payload: IProductInCart | null;
}

export interface ISetPromocode {
  type: typeof ActionType.SetPromocode;
  payload: string | null;
}

export interface IChangePromocodeConfirmed {
  type: typeof ActionType.ChangePromocodeConfirmed;
  payload: boolean | null;
}

export interface ISetDiscount {
  type: typeof ActionType.SetDiscount;
  payload: number;
}

export interface IOpenModal {
  type: typeof ActionType.OpenModal;
  payload: TModal;
}

export interface ICloseModal {
  type: typeof ActionType.CloseModal;
}

export interface IRedirect {
  type: typeof ActionType.Redirect;
  payload: string | null;
}

export interface ISetProdactsLoadingStatus {
  type: typeof ActionType.SetProdactsLoadingStatus;
  payload: boolean;
}

export type TDataAction = ILoadPromo | ILoadProducts | ILoadFilteredProducts | ILoadFilteredExcludingPriceProducts | ILoadDisplayedProducts | ILoadCurrentProduct | ILoadSimilarProducts | ILoadReviews;
export type TCartAction = IAddProductToCart | IDeleteProductFromCart | IChangeProductCountInCart | ISetAddedToCartItem | ISetDelitedFromCartItem | ISetPromocode | IChangePromocodeConfirmed | ISetDiscount;
export type TViewAction = IOpenModal | ICloseModal | IRedirect | ISetProdactsLoadingStatus;
