import { ActionType } from '../store/action';
import { IProduct, IPromo, TModal } from './data.type';

export interface ILoadPromo {
  type: typeof ActionType.LoadPromo,
  payload: IPromo,
}

export interface ILoadProducts {
  type: typeof ActionType.LoadProducts,
  payload: Array<IProduct>,
}

export interface IOpenModal {
  type: typeof ActionType.OpenModal,
  payload: TModal,
}

export interface ICloseModal {
  type: typeof ActionType.CloseModal,
  payload: TModal,
}

export interface IChangeAddingToCartItem {
  type: typeof ActionType.ChangeAddingToCartItem,
  payload: IProduct | null,
}

export type TDataAction = ILoadPromo | ILoadProducts;
export type TStateAction = IOpenModal | ICloseModal | IChangeAddingToCartItem;
