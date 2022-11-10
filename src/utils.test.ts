import { URLSearchParams } from 'url';
import { productsMock } from './test/mocks';
import { addPriceSeparators, checkFilters, deleteOneParam, searchProducts } from './utils';

describe('addPriceSeparators function', () => {
  test('Return correct three-digit result', () => {
    const priceResult = addPriceSeparators(123);
    expect(priceResult).toBe('123');
  });

  test('Return correct four-digit result', () => {
    const priceResult = addPriceSeparators(1234);
    expect(priceResult).toBe('1 234');
  });

  test('Return correct seven-digit result', () => {
    const priceResult = addPriceSeparators(1234567);
    expect(priceResult).toBe('1 234 567');
  });

  test('Return correct result with custom sign', () => {
    const priceResult = addPriceSeparators(1234, '.');
    expect(priceResult).toBe('1.234');
  });

  test('If negative value return undefined', () => {
    const priceResult = addPriceSeparators(-3);
    expect(priceResult).toBeUndefined();
  });
});

describe('deleteOneParam function', () => {
  test('deletes param correctly if only one deleting param', () => {
    const params = new URLSearchParams('?sort=price&category=camera');
    const result = deleteOneParam('category', 'camera', params);

    expect(result.has('category')).not.toBe(true);
    expect(result.has('sort')).toBe(true);
  })

  test('deletes param correctly if several same params', () => {
    const params = new URLSearchParams('?sort=price&category=camera&category=video');
    const result = deleteOneParam('category', 'camera', params);

    const allCategoryParams = result.getAll('category');
    expect(allCategoryParams).toHaveLength(1);
    expect(allCategoryParams.includes('camera')).not.toBe(true);
    expect(result.has('sort')).toBe(true);
  })

  test('behavior correctly if deliting param does not exist but another same params exists', () => {
    const params = new URLSearchParams('?sort=price&category=video');
    const result = deleteOneParam('category', 'camera', params);

    expect(result.toString()).toBe('sort=price&category=video');
  })
});

describe('checkFilters function', () => {
  test('unchecked filter correctly', () => {
    const mockState = {camera: true, video: true, lens: true};
    const setStateSpy = jest.fn();

    const params = new URLSearchParams('?category=camera&category=video');
    checkFilters(params, mockState, setStateSpy ,'category');

    expect(setStateSpy).toBeCalledTimes(1);
  });

  test('checked several filter correctly', () => {
    const mockState = {camera: true, video: false, lens: false};
    const setStateSpy = jest.fn();

    const params = new URLSearchParams('?category=camera&category=video&category=lens');
    checkFilters(params, mockState, setStateSpy ,'category');

    expect(setStateSpy).toBeCalledTimes(2);
  });
});

describe('searchProducts function', () => {
  test('returns empty array if no matchs are found', () => {
    const searchedProducts = searchProducts('abcdef', productsMock);
    expect(searchedProducts).toHaveLength(0);
  });

  test('returns correct array if some matchs are found', () => {
    const searchedProducts = searchProducts('shot', productsMock);
    expect(searchedProducts).toHaveLength(1);
  });
});
