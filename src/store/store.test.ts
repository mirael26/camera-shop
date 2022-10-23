import { productsMock } from '../test/mocks';
import { createReduxStore } from './store';
import { initialState as dataInitialState } from './reducers/data-reducer';
import { initialState as viewInitialState } from './reducers/view-reducer';

describe('Store', () => {
  test('configures store with initial state correctly', () => {
    const initialState = { data: { products: productsMock } };
    const store = createReduxStore(initialState);
    const resultState = store.getState();

    expect(resultState).toEqual({
      data: {
        products: productsMock,
      },
      view: viewInitialState,
    });
  });

  test('configures store without initial state correctly', () => {
    const store = createReduxStore();
    const resultState = store.getState();

    expect(resultState).toEqual({
      data: dataInitialState,
      view: viewInitialState,
    });
  });
});
