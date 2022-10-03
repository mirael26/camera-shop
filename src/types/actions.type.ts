import { ActionType } from '../store/action';
import { IPromo } from './data.type';

export interface ILoadPromo {
  type: typeof ActionType.LoadPromo,
  payload: IPromo,
}

export type TDataAction = ILoadPromo;
