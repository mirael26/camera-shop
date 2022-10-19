import { productMock, productsMock, promoMock, reviewsMock } from '../../test/mocks';
import { ActionCreator } from '../action';
import { dataReducer } from './data-reducer';

describe('dataReducer', () => {
  test('adds promo data correctly', () => {
    const newState = dataReducer(undefined, ActionCreator.LoadPromo(promoMock));
    expect(newState.promo).toEqual(promoMock);
  });

  test('adds products correctly', () => {
    const newState = dataReducer(undefined, ActionCreator.LoadProducts(productsMock));
    expect(newState.products).toHaveLength(3);
    expect(newState.products).toEqual(productsMock);
  });

  test('adds current product correctly', () => {
    const newState = dataReducer(undefined, ActionCreator.LoadCurrentProduct(productMock));
    expect(newState.currentProduct).toEqual(productMock);
  });

  test('adds similar products correctly', () => {
    const newState = dataReducer(undefined, ActionCreator.LoadSimilarProducts(productsMock));
    expect(newState.similarProducts).toHaveLength(3);
    expect(newState.similarProducts).toEqual(productsMock);
  });

  test('adds reviews correctly', () => {
    const newState = dataReducer(undefined, ActionCreator.LoadReviews(reviewsMock));
    expect(newState.reviews).toHaveLength(2);
    expect(newState.reviews).toEqual(reviewsMock);
  });
});
