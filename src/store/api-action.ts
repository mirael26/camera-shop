import axios from 'axios';
import { ApiUrl } from '../consts';
import { IProduct, IPromo } from '../types/data.type';
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

export const loadProducts = () => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}`)
    .then((response) => {
      dispatch(ActionCreator.LoadProducts(response.data as Array<IProduct>));
    })
    .catch((error) => {
      throw(error);
    });
};

export const loadCurrentProduct = (id: number) => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}/${id}`)
    .then((response) => {
      dispatch(ActionCreator.LoadCurrentProduct(response.data as IProduct));
    })
    .catch((error) => {
      throw(error);
    });
};
