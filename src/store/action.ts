import { IChangeAddingToCartItem, ICloseModal, ILoadCurrentProduct, ILoadProducts, ILoadPromo, ILoadReviews, IOpenModal, IRedirect } from '../types/actions.type';
import { TModal } from '../types/app.type';
import { IProduct, IPromo, IReview } from '../types/data.type';

export const ActionType = {
  LoadPromo: 'promo/loadPromo',
  LoadProducts: 'cameras/loadProducts',
  LoadCurrentProduct: 'cameras/loadCurrentProduct',
  LoadReviews: 'cameras/loadReviews',
  OpenModal: 'state/openModal',
  CloseModal: 'state/closeModal',
  ChangeAddingToCartItem: 'state/changeAddingToCartItem',
  Redirect: 'state/redirect',
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
  LoadCurrentProduct: (product: IProduct): ILoadCurrentProduct => ({
    type: ActionType.LoadCurrentProduct,
    payload: product,
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
};
