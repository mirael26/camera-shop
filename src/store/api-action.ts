import axios, { AxiosError } from 'axios';
import { ApiUrl, AppUrl, Modal } from '../consts';
import { IProduct, IPromo, IReview, IReviewPost } from '../types/data.type';
import { ActionCreator } from './action';
import { TAppDispatch } from './store';

export const URL = 'https://camera-shop.accelerator.pages.academy';

export const ErrorStatus = {
  BadRequest: 400,
  ServerUnavailable: 503,
} as const;

export const loadPromo = () => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Promo}`)
    .then((response) => dispatch(ActionCreator.LoadPromo(response.data as IPromo)))
    .catch((error: AxiosError) => {
      const status = error.response?.status;
      if (status === ErrorStatus.ServerUnavailable) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      } else {
        dispatch(ActionCreator.Redirect(AppUrl.UnknownError));
      }
    });
};

export const loadProducts = () => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}`)
    .then((response) => {
      dispatch(ActionCreator.LoadProducts(response.data as Array<IProduct>));
    })
    .catch((error: AxiosError) => {
      const status = error.response?.status;
      if (status === ErrorStatus.ServerUnavailable) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      } else {
        dispatch(ActionCreator.Redirect(AppUrl.UnknownError));
      }
    });
};

export const loadFilteredProducts = (params: {[key: string]: string | null} | URLSearchParams) => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}`, { params })
    .then((response) => {
      dispatch(ActionCreator.LoadFilteredProducts(response.data as Array<IProduct>));
    })
    .catch((error: AxiosError) => {
      const status = error.response?.status;
      if (status === ErrorStatus.ServerUnavailable) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      } else {
        dispatch(ActionCreator.Redirect(AppUrl.UnknownError));
      }
    });
};

export const loadFilteredExcludingPriceProducts = (params: {[key: string]: string | null} | URLSearchParams) => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}`, { params })
    .then((response) => {
      dispatch(ActionCreator.LoadFilteredExcludingPriceProducts(response.data as Array<IProduct>));
    })
    .catch((error: AxiosError) => {
      const status = error.response?.status;
      if (status === ErrorStatus.ServerUnavailable) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      } else {
        dispatch(ActionCreator.Redirect(AppUrl.UnknownError));
      }
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
    .catch((error: AxiosError) => {
      const status = error.response?.status;
      if (status === ErrorStatus.ServerUnavailable) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      } else {
        dispatch(ActionCreator.Redirect(AppUrl.UnknownError));
      }
      dispatch(ActionCreator.SetProdactsLoadingStatus(false));
    });
};

export const loadCurrentProduct = (id: number) => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}/${id}`)
    .then((response) => {
      dispatch(ActionCreator.LoadCurrentProduct(response.data as IProduct));
    })
    .catch((error: AxiosError) => {
      const status = error.response?.status;
      if (status === ErrorStatus.BadRequest) {
        dispatch(ActionCreator.Redirect(AppUrl.NotFound));
      } else
      if (status === ErrorStatus.ServerUnavailable) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      } else {
        dispatch(ActionCreator.Redirect(AppUrl.UnknownError));
      }
    });
};

export const loadSimilarProducts = (id: number) => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}/${id}${ApiUrl.Similar}`)
    .then((response) => {
      dispatch(ActionCreator.LoadSimilarProducts(response.data as Array<IProduct>));
    })
    .catch((error: AxiosError) => {
      const status = error.response?.status;
      if (status === ErrorStatus.BadRequest) {
        dispatch(ActionCreator.Redirect(AppUrl.NotFound));
      } else
      if (status === ErrorStatus.ServerUnavailable) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      } else {
        dispatch(ActionCreator.Redirect(AppUrl.UnknownError));
      }
    });
};

export const loadReviews = (id: number) => (dispatch: TAppDispatch) => {
  axios
    .get(`${URL}${ApiUrl.Products}/${id}${ApiUrl.Reviews}`)
    .then((response) => {
      dispatch(ActionCreator.LoadReviews(response.data as Array<IReview>));
    })
    .catch((error: AxiosError) => {
      const status = error.response?.status;
      if (status === ErrorStatus.BadRequest) {
        dispatch(ActionCreator.Redirect(AppUrl.NotFound));
      } else
      if (status === ErrorStatus.ServerUnavailable) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      } else {
        dispatch(ActionCreator.Redirect(AppUrl.UnknownError));
      }
    });
};

export const postReview = (review: IReviewPost) => (dispatch: TAppDispatch) => {
  axios
    .post(`${URL}${ApiUrl.Reviews}`, review)
    .catch((error: AxiosError) => {
      const status = error.response?.status;
      if (status === ErrorStatus.ServerUnavailable) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      } else {
        dispatch(ActionCreator.Redirect(AppUrl.UnknownError));
      }
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
    .catch((error: AxiosError) => {
      const status = error.response?.status;
      if (status === ErrorStatus.BadRequest) {
        dispatch(ActionCreator.ChangePromocodeConfirmed(false));
        dispatch(ActionCreator.SetPromocode(null));
        dispatch(ActionCreator.SetDiscount(0));
      } else
      if (status === ErrorStatus.ServerUnavailable) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      } else {
        dispatch(ActionCreator.Redirect(AppUrl.UnknownError));
      }
    });
};

export const postOrder = (order: {camerasIds: Array<number>; coupon: string | null}) => (dispatch: TAppDispatch) => {
  axios
    .post(`${URL}${ApiUrl.Order}`, order)
    .then(() => {
      dispatch(ActionCreator.ClearCart());
      dispatch(ActionCreator.SetPromocode(null));
      dispatch(ActionCreator.ChangePromocodeConfirmed(null));
      dispatch(ActionCreator.SetDiscount(0));
      dispatch(ActionCreator.OpenModal(Modal.OrderSuccess));
    })
    .catch((error: AxiosError) => {
      const status = error.response?.status;
      if (status === ErrorStatus.ServerUnavailable) {
        dispatch(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      } else {
        dispatch(ActionCreator.Redirect(AppUrl.UnknownError));
      }
    });
};
