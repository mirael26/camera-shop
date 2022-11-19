import { ActionType } from '../store/action';
import { TModal } from './app.type';
import { IProduct, IPromo, IReview } from './data.type';

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

export interface IIncreaseProductCountInCart {
  type: typeof ActionType.IncreaseProductCountInCart;
  payload: number;
}

export interface IDecreaseProductCountInCart {
  type: typeof ActionType.DecreaseProductCountInCart;
  payload: number;
}

export interface IOpenModal {
  type: typeof ActionType.OpenModal;
  payload: TModal;
}

export interface ICloseModal {
  type: typeof ActionType.CloseModal;
}

export interface IChangeAddingToCartItem {
  type: typeof ActionType.ChangeAddingToCartItem;
  payload: IProduct | null;
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
export type TCartAction = IAddProductToCart | IDeleteProductFromCart | IIncreaseProductCountInCart | IDecreaseProductCountInCart;
export type TViewAction = IOpenModal | ICloseModal | IChangeAddingToCartItem | IRedirect | ISetProdactsLoadingStatus;
