import axios from 'axios';
import { ApiUrl, AppUrl } from '../consts';
import { productMock, productsMock, promoMock, reviewsMock } from '../test/mocks';
import { ActionCreator } from './action';
import { loadCurrentProduct, loadDisplayedProducts, loadFilteredProducts, loadProducts, loadPromo, loadReviews, loadSimilarProducts, postReview, StatusCode, URL } from './api-action';

jest.mock('axios');
const dispatch = jest.fn();

describe('loadPromo api-action', () => {
  test('load data correctly', async() => {
    const response = {
      status: 200,
      statusText: "OK",
      data: promoMock,
    };
    jest.mocked(axios).get.mockResolvedValue(response);

    await loadPromo()(dispatch);

    expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(dispatch).toHaveBeenCalledTimes(1);    
    await expect(dispatch).toHaveBeenCalledWith(ActionCreator.LoadPromo(response.data));
  });

  test('should throw error when network error', async() => {
    const error = {
      message: 'Network Error',
      name: 'AxiosError',
      code: StatusCode.NoNetwork,
    };
    jest.mocked(axios).get.mockResolvedValue(error);

    try {
      await loadPromo()(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      expect(error).toThrowError();
    }
  });

  test('should throw error', async() => {
    const error = {
      message: 'Network Error',
      name: 'AxiosError',
      code: 'SOME_ERROR',
    };
    jest.mocked(axios).get.mockResolvedValue(error);

    try {
      await loadPromo()(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(error).toThrowError();
    }
  });
});

describe('loadProducts api-action', () => {
  test('load data correctly', async() => {
    const response = {
      status: 200,
      statusText: "OK",
      data: productsMock,
    };
    jest.mocked(axios).get.mockResolvedValue(response);

    await loadProducts()(dispatch);

    expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(dispatch).toHaveBeenCalledTimes(1);
    await expect(dispatch).toHaveBeenCalledWith(ActionCreator.LoadProducts(response.data));
  });

  test('should throw error when network error', async() => {
    const error = {
      message: 'Network Error',
      name: 'AxiosError',
      code: StatusCode.NoNetwork,
    };
    jest.mocked(axios).get.mockResolvedValue(error);

    try {
      await loadProducts()(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      expect(error).toThrowError();
    }
  });

  test('should throw error', async() => {
    const error = {
      message: 'Network Error',
      name: 'AxiosError',
      code: 'SOME_ERROR',
    };
    jest.mocked(axios).get.mockResolvedValue(error);

    try {
      await loadProducts()(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledTimes(0);
      expect(error).toThrowError();
    }
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

  await loadFilteredProducts(params)(dispatch);

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(`${URL}${ApiUrl.Products}`, { params });
  expect(dispatch).toHaveBeenCalledTimes(1);
  expect(dispatch).toHaveBeenCalledWith(ActionCreator.LoadFilteredProducts(response.data));
});

test('loadDisplayedProduct api-action works correctly', async() => {
  const params = new URLSearchParams('?category=Фотокамера&level=Нулевой');
  const response = {
    status: 200,
    statusText: "OK",
    data: productsMock,
  };
  jest.mocked(axios).get.mockResolvedValue(response);

  await loadDisplayedProducts(params)(dispatch);

  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(`${URL}${ApiUrl.Products}`, { params });

  expect(dispatch).toHaveBeenCalledTimes(3);
  expect(dispatch).toHaveBeenNthCalledWith(1, ActionCreator.SetProdactsLoadingStatus(true));
  expect(dispatch).toHaveBeenNthCalledWith(2, ActionCreator.LoadDisplayedProducts(response.data));
  expect(dispatch).toHaveBeenNthCalledWith(3, ActionCreator.SetProdactsLoadingStatus(false));
});

describe('loadCurrentProduct api-action', () => {
  test('load data correctly', async() => {
    const response = {
      status: 200,
      statusText: "OK",
      data: productMock,
    };
    jest.mocked(axios).get.mockResolvedValue(response);

    await loadCurrentProduct(2)(dispatch);

    expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(dispatch).toHaveBeenCalledTimes(1);
    await expect(dispatch).toHaveBeenCalledWith(ActionCreator.LoadCurrentProduct(response.data));
  });

  test('should throw error when network error', async() => {
    const error = {
      message: 'Network Error',
      name: 'AxiosError',
      code: StatusCode.NoNetwork,
    };
    jest.mocked(axios).get.mockResolvedValue(error);

    try {
      await loadCurrentProduct(2)(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      expect(error).toThrowError();
    }
  });

  test('should throw error when bad-request error', async() => {
    const error = {
      message: 'Network Error',
      name: 'AxiosError',
      code: StatusCode.BadRequest,
    };
    jest.mocked(axios).get.mockResolvedValue(error);

    try {
      await loadCurrentProduct(2)(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.NotFound));
      expect(error).toThrowError();
    }
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

    await loadSimilarProducts(2)(dispatch);

    expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(dispatch).toHaveBeenCalledTimes(1);
    await expect(dispatch).toHaveBeenCalledWith(ActionCreator.LoadSimilarProducts(response.data));
  });

  test('should throw error when network error', async() => {
    const error = {
      message: 'Network Error',
      name: 'AxiosError',
      code: StatusCode.NoNetwork,
    };
    jest.mocked(axios).get.mockResolvedValue(error);

    try {
      await loadSimilarProducts(2)(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      expect(error).toThrowError();
    }
  });

  test('should throw error when bad-request error', async() => {
    const error = {
      message: 'Network Error',
      name: 'AxiosError',
      code: StatusCode.BadRequest,
    };
    jest.mocked(axios).get.mockResolvedValue(error);

    try {
      await loadSimilarProducts(2)(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.NotFound));
      expect(error).toThrowError();
    }
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

    await loadReviews(2)(dispatch);

    expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(dispatch).toHaveBeenCalledTimes(1);
    await expect(dispatch).toHaveBeenCalledWith(ActionCreator.LoadReviews(response.data));
  });

  test('should throw error when network error', async() => {
    const error = {
      message: 'Network Error',
      name: 'AxiosError',
      code: StatusCode.NoNetwork,
    };
    jest.mocked(axios).get.mockResolvedValue(error);

    try {
      await loadReviews(2)(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      expect(error).toThrowError();
    }
  });

  test('should throw error when bad-request error', async() => {
    const error = {
      message: 'Network Error',
      name: 'AxiosError',
      code: StatusCode.BadRequest,
    };
    jest.mocked(axios).get.mockResolvedValue(error);

    try {
      await loadReviews(2)(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.NotFound));
      expect(error).toThrowError();
    }
  });
});

describe('postReview api-action', () => {
  test('post data correctly', async() => {
    jest.mocked(axios).post.mockResolvedValue(jest.fn());

    await postReview(reviewsMock[0])(dispatch);

    expect(axios.post).toHaveBeenCalledTimes(1);
    await expect(dispatch).toHaveBeenCalledTimes(0);
  });

  test('should throw error when network error', async() => {
    const error = {
      message: 'Network Error',
      name: 'AxiosError',
      code: StatusCode.NoNetwork,
    };
    jest.mocked(axios).post.mockResolvedValue(error);

    try {
      await postReview(reviewsMock[0])(dispatch);
    } catch (error) {
      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith(ActionCreator.Redirect(AppUrl.ServerUnavailable));
      expect(error).toThrowError();
    }
  });
});
