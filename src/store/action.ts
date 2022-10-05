import { IChangeAddingToCartItem, ICloseModal, ILoadCurrentProduct, ILoadProducts, ILoadPromo, IOpenModal } from '../types/actions.type';
import { IProduct, IPromo, TModal } from '../types/data.type';

export const ActionType = {
  LoadPromo: 'promo/loadPromo',
  LoadProducts: 'cameras/loadProducts',
  LoadCurrentProduct: 'cameras/loadCurrentProduct',
  OpenModal: 'state/openModal',
  CloseModal: 'state/closeModal',
  ChangeAddingToCartItem: 'state/changeAddingToCartItem',
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
};
