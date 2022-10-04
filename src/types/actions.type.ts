import { ActionType } from '../store/action';
import { IProduct, IPromo } from './data.type';

export interface ILoadPromo {
  type: typeof ActionType.LoadPromo,
  payload: IPromo,
}

export interface ILoadProducts {
  type: typeof ActionType.LoadProducts,
  payload: Array<IProduct>,
}

export type TDataAction = ILoadPromo | ILoadProducts;
