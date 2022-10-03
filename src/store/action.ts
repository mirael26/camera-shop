import { ILoadPromo } from '../types/actions.type';
import { IPromo } from '../types/data.type';

export const ActionType = {
  LoadPromo: 'promo/loadPromo',
} as const;

export const ActionCreator = {
  LoadPromo: (promo: IPromo): ILoadPromo => ({
    type: ActionType.LoadPromo,
    payload: promo,
  }),
};
