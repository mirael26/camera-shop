import axios from 'axios';
import { ApiUrl, AppUrl } from '../consts';
import { IProduct, IPromo, IReview, IReviewPost } from '../types/data.type';
import { ActionCreator } from './action';
import { TAppDispatch } from './store';

export const URL = 'https://camera-shop.accelerator.pages.academy';

export const StatusCode = {
  BadRequest: 'ERR_BAD_REQUEST',
  NoNetwork: 'ERR_NETWORK',
} as const;

export const loadPromo = () => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Promo}`)
    .then((response) => dispatch(ActionCreator.LoadPromo(response.data as IPromo)))
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === StatusCode.NoNetwork) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      }
      throw(error);
    });
};

export const loadProducts = () => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}`)
    .then((response) => {
      dispatch(ActionCreator.LoadProducts(response.data as Array<IProduct>));
    })
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === StatusCode.NoNetwork) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      }
      throw(error);
    });
};

export const loadFilteredProducts = (params: {[key: string]: string | null} | URLSearchParams) => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}`, { params })
    .then((response) => {
      dispatch(ActionCreator.LoadFilteredProducts(response.data as Array<IProduct>));
    })
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === StatusCode.NoNetwork) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      }
      throw(error);
    });
};

export const loadFilteredExcludingPriceProducts = (params: {[key: string]: string | null} | URLSearchParams) => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}`, { params })
    .then((response) => {
      dispatch(ActionCreator.LoadFilteredExcludingPriceProducts(response.data as Array<IProduct>));
    })
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === StatusCode.NoNetwork) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      }
      throw(error);
    });
};

export const loadDisplayedProducts = (params: {[key: string]: string | null} | URLSearchParams) => (dispatch: TAppDispatch) => {
  dispatch(ActionCreator.SetProdactsLoadingStatus(true));

  axios
    .get(`${URL}${ApiUrl.Products}`, { params })
    .then((response) => {
      dispatch(ActionCreator.LoadDisplayedProducts(response.data as Array<IProduct>));
      dispatch(ActionCreator.SetProdactsLoadingStatus(false));
    })
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === StatusCode.NoNetwork) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      }
      dispatch(ActionCreator.SetProdactsLoadingStatus(false));
      throw(error);
    });
};

export const loadCurrentProduct = (id: number) => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}/${id}`)
    .then((response) => {
      dispatch(ActionCreator.LoadCurrentProduct(response.data as IProduct));
    })
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === StatusCode.BadRequest) {
        dispatch(ActionCreator.Redirect(AppUrl.NotFound));
      }
      if (error.code === StatusCode.NoNetwork) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      }
      throw(error);
    });
};

export const loadSimilarProducts = (id: number) => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}/${id}${ApiUrl.Similar}`)
    .then((response) => {
      dispatch(ActionCreator.LoadSimilarProducts(response.data as Array<IProduct>));
    })
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === StatusCode.BadRequest) {
        dispatch(ActionCreator.Redirect(AppUrl.NotFound));
      }
      if (error.code === StatusCode.NoNetwork) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      }
      throw(error);
    });
};

export const loadReviews = (id: number) => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}/${id}${ApiUrl.Reviews}`)
    .then((response) => {
      dispatch(ActionCreator.LoadReviews(response.data as Array<IReview>));
    })
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === StatusCode.BadRequest) {
        dispatch(ActionCreator.Redirect(AppUrl.NotFound));
      }
      if (error.code === StatusCode.NoNetwork) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      }
      throw(error);
    });
};

export const postReview = (review: IReviewPost) => (dispatch: TAppDispatch) => {
  axios
    .post(`${URL}${ApiUrl.Reviews}`, review)
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === StatusCode.NoNetwork) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      }
      throw(error);
    });
};

export const postPromocode = (promocode: string) => (dispatch: TAppDispatch) => {
  axios
    .post(`${URL}${ApiUrl.Promocode}`, { coupon: promocode })
    .then((response) => {
      dispatch(ActionCreator.ChangePromocodeConfirmed(true));
      dispatch(ActionCreator.SetPromocode(promocode));
      dispatch(ActionCreator.SetDiscount(response.data / 100));
    })
    .catch((error: NodeJS.ErrnoException) => {
      if (error.code === StatusCode.BadRequest) {
        dispatch(ActionCreator.ChangePromocodeConfirmed(false));
        dispatch(ActionCreator.SetPromocode(null));
        dispatch(ActionCreator.SetDiscount(0));
      }
      if (error.code === StatusCode.NoNetwork) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      }
      throw(error);
    });
};