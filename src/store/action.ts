import { IChangeAddingToCartItem, ICloseModal, ILoadCurrentProduct, ILoadDisplayedProducts, ILoadFilteredProducts, ILoadProducts, ILoadPromo, ILoadReviews, ILoadSimilarProducts, IOpenModal, IRedirect, ISetProdactsLoadingStatus } from '../types/actions.type';
import { TModal } from '../types/app.type';
import { IProduct, IPromo, IReview } from '../types/data.type';

export const ActionType = {
  LoadPromo: 'promo/loadPromo',
  LoadProducts: 'cameras/loadProducts',
  LoadFilteredProducts: 'cameras/loadFilteredProducts',
  LoadDisplayedProducts: 'cameras/loadDisplayedProducts',
  LoadCurrentProduct: 'cameras/loadCurrentProduct',
  LoadSimilarProducts: 'cameras/loadSimilarProducts',
  LoadReviews: 'cameras/loadReviews',
  OpenModal: 'state/openModal',
  CloseModal: 'state/closeModal',
  ChangeAddingToCartItem: 'state/changeAddingToCartItem',
  Redirect: 'state/redirect',
  SetProdactsLoadingStatus:'state/setProdactsLoadingStatus',
} as const;

export const ActionCreator = {
  LoadPromo: (promo: IPromo): ILoadPromo => ({
    type: ActionType.LoadPromo,
    payload: promo,
  }),
  LoadProducts: (products: Array<IProduct>): ILoadProducts => ({
    type: ActionType.LoadProducts,
    payload: products,
  }),
  LoadFilteredProducts: (filteredProducts: Array<IProduct> | null): ILoadFilteredProducts => ({
    type: ActionType.LoadFilteredProducts,
    payload: filteredProducts,
  }),
  LoadDisplayedProducts: (displayedProducts: Array<IProduct>): ILoadDisplayedProducts => ({
    type: ActionType.LoadDisplayedProducts,
    payload: displayedProducts,
  }),
  LoadCurrentProduct: (product: IProduct): ILoadCurrentProduct => ({
    type: ActionType.LoadCurrentProduct,
    payload: product,
  }),
  LoadSimilarProducts: (similarProducts: Array<IProduct>): ILoadSimilarProducts => ({
    type: ActionType.LoadSimilarProducts,
    payload: similarProducts,
  }),
  LoadReviews: (reviews: Array<IReview> | null): ILoadReviews => ({
    type: ActionType.LoadReviews,
    payload: reviews,
  }),
  OpenModal: (modal: TModal): IOpenModal => ({
    type: ActionType.OpenModal,
    payload: modal,
  }),
  CloseModal: (modal: TModal): ICloseModal => ({
    type: ActionType.CloseModal,
    payload: modal,
  }),
  ChangeAddingToCartItem: (item: IProduct | null): IChangeAddingToCartItem => ({
    type: ActionType.ChangeAddingToCartItem,
    payload: item,
  }),
  Redirect: (path: string | null): IRedirect => ({
    type: ActionType.Redirect,
    payload: path,
  }),
  SetProdactsLoadingStatus: (status: boolean): ISetProdactsLoadingStatus => ({
    type: ActionType.SetProdactsLoadingStatus,
    payload: status,
  }),
};
