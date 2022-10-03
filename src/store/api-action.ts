import axios from 'axios';
import { ApiUrl } from '../consts';
import { IPromo } from '../types/data.type';
import { ActionCreator } from './action';
import { TAppDispatch } from './store';

const URL = 'https://camera-shop.accelerator.pages.academy';

export const loadPromo = () => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Promo}`)
    .then((response) => dispatch(ActionCreator.LoadPromo(response.data as IPromo)))
    .catch((error) => {
      throw(error);
    });
};
