import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiUrl, AppUrl, Modal } from '../consts';
import { productMock, productsMock, promoMock, reviewsMock } from '../test/mocks';
import { ActionCreator } from './action';
import { ErrorStatus, loadCurrentProduct, loadDisplayedProducts, loadFilteredProducts, loadProducts, loadPromo, loadReviews, loadSimilarProducts, postOrder, postPromocode, postReview, URL } from './api-action';

jest.mock('axios');

const dispatchSpy = jest.fn();

describe('loadPromo api-action', () => {
  test('loads data correctly', async() => {
    const response = {
      status: 200,
      statusText: "OK",
      data: promoMock,
    };
    jest.mocked(axios).get.mockResolvedValue(response);

    await loadPromo()(dispatchSpy);

    expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(dispatchSpy).toHaveBeenCalledTimes(1);    
    await expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.LoadPromo(response.data));
  });

  test('should redirect if server is unavailable', async() => {
    const error = {
      response: { status: ErrorStatus.ServerUnavailable }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadPromo()(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
  });

  test('should redirect if unknown error', async() => {
    const error = {
      response: { status: 111 }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadPromo()(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.UnknownError));
  });
});

describe('loadProducts api-action', () => {
  test('loads data correctly', async() => {
    const response = {
      status: 200,
      statusText: "OK",
      data: productsMock,
    };
    jest.mocked(axios).get.mockResolvedValue(response);

    await loadProducts()(dispatchSpy);

    expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(dispatchSpy).toHaveBeenCalledTimes(1);
    await expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.LoadProducts(response.data));
  });

  test('should redirect if server is unavailable', async() => {
    const error = {
      response: { status: ErrorStatus.ServerUnavailable }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadProducts()(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
  });

  test('should redirect if unknown error', async() => {
    const error = {
      response: { status: 111 }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadProducts()(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.UnknownError));
  });
});

test('loadFilteredProduct api-action works correctly', async() => {
  const params = new URLSearchParams('?category=Фотокамера&level=Нулевой');
  const response = {
    status: 200,
    statusText: "OK",
    data: productsMock,
  };
  jest.mocked(axios).get.mockResolvedValue(response);

  await loadFilteredProducts(params)(dispatchSpy);

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(`${URL}${ApiUrl.Products}`, { params });
  expect(dispatchSpy).toHaveBeenCalledTimes(1);
  expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.LoadFilteredProducts(response.data));
});

test('loadDisplayedProduct api-action works correctly', async() => {
  const params = new URLSearchParams('?category=Фотокамера&level=Нулевой');
  const response = {
    status: 200,
    statusText: "OK",
    data: productsMock,
  };
  jest.mocked(axios).get.mockResolvedValue(response);

  await loadDisplayedProducts(params)(dispatchSpy);

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(`${URL}${ApiUrl.Products}`, { params });

  expect(dispatchSpy).toHaveBeenCalledTimes(3);
  expect(dispatchSpy).toHaveBeenNthCalledWith(1, ActionCreator.SetProdactsLoadingStatus(true));
  expect(dispatchSpy).toHaveBeenNthCalledWith(2, ActionCreator.LoadDisplayedProducts(response.data));
  expect(dispatchSpy).toHaveBeenNthCalledWith(3, ActionCreator.SetProdactsLoadingStatus(false));
});

describe('loadCurrentProduct api-action', () => {
  test('load data correctly', async() => {
    const response = {
      status: 200,
      statusText: "OK",
      data: productMock,
    };
    jest.mocked(axios).get.mockResolvedValue(response);

    await loadCurrentProduct(2)(dispatchSpy);

    expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(dispatchSpy).toHaveBeenCalledTimes(1);
    await expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.LoadCurrentProduct(response.data));
  });

  test('should throw error when bad-request error', async() => {
    const error = {
      response: { status: ErrorStatus.BadRequest }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadCurrentProduct(2)(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.NotFound));
  });

  test('should redirect if server is unavailable', async() => {
    const error = {
      response: { status: ErrorStatus.ServerUnavailable }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadCurrentProduct(2)(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
  });

  test('should redirect if unknown error', async() => {
    const error = {
      response: { status: 111 }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadCurrentProduct(2)(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.UnknownError));
  });
});

describe('loadSimilarProducts api-action', () => {
  test('load data correctly', async() => {
    const response = {
      status: 200,
      statusText: "OK",
      data: productsMock,
    };
    jest.mocked(axios).get.mockResolvedValue(response);

    await loadSimilarProducts(2)(dispatchSpy);

    expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(dispatchSpy).toHaveBeenCalledTimes(1);
    await expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.LoadSimilarProducts(response.data));
  });

  test('should throw error when bad-request error', async() => {
    const error = {
      response: { status: ErrorStatus.BadRequest }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadSimilarProducts(2)(dispatchSpy);
    
    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.NotFound));
  });

  test('should redirect if server is unavailable', async() => {
    const error = {
      response: { status: ErrorStatus.ServerUnavailable }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadSimilarProducts(2)(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
  });

  test('should redirect if unknown error', async() => {
    const error = {
      response: { status: 111 }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadSimilarProducts(2)(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.UnknownError));
  });
});

describe('loadReviews api-action', () => {
  test('load data correctly', async() => {
    const response = {
      status: 200,
      statusText: "OK",
      data: reviewsMock,
    };
    jest.mocked(axios).get.mockResolvedValue(response);

    await loadReviews(2)(dispatchSpy);

    expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(dispatchSpy).toHaveBeenCalledTimes(1);
    await expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.LoadReviews(response.data));
  });

  test('should redirect if server is unavailable', async() => {
    const error = {
      response: { status: ErrorStatus.ServerUnavailable }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadReviews(2)(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
  });

  test('should redirect if unknown error', async() => {
    const error = {
      response: { status: 111 }
    };
    jest.mocked(axios).get.mockRejectedValue(error);

    await loadReviews(2)(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.UnknownError));
  });
});

describe('postReview api-action', () => {
  test('post data correctly', async() => {
    jest.mocked(axios).post.mockResolvedValue(jest.fn());

    await postReview(reviewsMock[0])(dispatchSpy);

    expect(axios.post).toHaveBeenCalledTimes(1);
    await expect(dispatchSpy).toHaveBeenCalledTimes(0);
  });

  test('should redirect if server is unavailable', async() => {
    const error = {
      response: { status: ErrorStatus.ServerUnavailable }
    };
    jest.mocked(axios).post.mockRejectedValue(error);

    await postReview(reviewsMock[0])(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
  });

  test('should redirect if unknown error', async() => {
    const error = {
      response: { status: 111 }
    };
    jest.mocked(axios).post.mockRejectedValue(error);

    await postReview(reviewsMock[0])(dispatchSpy);

    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.UnknownError));
  });
});

describe('postPromocode api-action', () => {
  test('post correct promocode correctly', async() => {
    const response = {
      status: 200,
      statusText: "OK",
      data: 15,
    };
    jest.mocked(axios).post.mockResolvedValue(response);

    await postPromocode('abc')(dispatchSpy);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledTimes(3);
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, ActionCreator.ChangePromocodeConfirmed(true));
    expect(dispatchSpy).toHaveBeenNthCalledWith(2, ActionCreator.SetPromocode('abc'));
    expect(dispatchSpy).toHaveBeenNthCalledWith(3, ActionCreator.SetDiscount(0.15));
  });

  test('post incorrect promocode correctly', async() => {
    const error = {
      response: { status: ErrorStatus.BadRequest }
    };
    jest.mocked(axios).post.mockRejectedValue(error);

    await postPromocode('abc')(dispatchSpy);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(await dispatchSpy).toHaveBeenCalledTimes(3);
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, ActionCreator.ChangePromocodeConfirmed(false));
    expect(dispatchSpy).toHaveBeenNthCalledWith(2, ActionCreator.SetPromocode(null));
    expect(dispatchSpy).toHaveBeenNthCalledWith(3, ActionCreator.SetDiscount(0));
  });

  test('should redirect if server is unavailable', async() => {
    const error = {
      response: { status: ErrorStatus.ServerUnavailable }
    };
    jest.mocked(axios).post.mockRejectedValue(error);

    await postPromocode('abc')(dispatchSpy);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
  });

  test('should redirect if unknown error', async() => {
    const error = {
      response: { status: 100 }
    };
    jest.mocked(axios).post.mockRejectedValue(error);

    await postPromocode('abc')(dispatchSpy);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.UnknownError));
  });
});

describe('postOrder api-action', () => {
  test('post order correctly', async() => {
    const response = {
      status: 200,
      statusText: "OK",
    };
    jest.mocked(axios).post.mockResolvedValue(response);
    const mockOrder = {camerasIds: [1, 2], coupon: null};

    await postOrder(mockOrder)(dispatchSpy);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(await dispatchSpy).toHaveBeenCalledTimes(5);
    expect(dispatchSpy).toHaveBeenNthCalledWith(1, ActionCreator.ClearCart());
    expect(dispatchSpy).toHaveBeenNthCalledWith(2, ActionCreator.SetPromocode(null));
    expect(dispatchSpy).toHaveBeenNthCalledWith(3, ActionCreator.ChangePromocodeConfirmed(null));
    expect(dispatchSpy).toHaveBeenNthCalledWith(4, ActionCreator.SetDiscount(0));
    expect(dispatchSpy).toHaveBeenNthCalledWith(5, ActionCreator.OpenModal(Modal.OrderSuccess));
  });

  test('should redirect if server is unavailable', async() => {
    const error = {
      response: { status: ErrorStatus.ServerUnavailable }
    };
    jest.mocked(axios).post.mockRejectedValue(error);
    const mockOrder = {camerasIds: [1, 2], coupon: null};

    await postOrder(mockOrder)(dispatchSpy);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(await dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
  });

  test('should redirect if unknown error', async() => {
    const error = {
      response: { status: 100 }
    };
    jest.mocked(axios).post.mockRejectedValue(error);
  const mockOrder = {camerasIds: [1, 2], coupon: null};


    await postOrder(mockOrder)(dispatchSpy);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(await dispatchSpy).toHaveBeenCalledTimes(1);
    expect(dispatchSpy).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.UnknownError));
  });
});
