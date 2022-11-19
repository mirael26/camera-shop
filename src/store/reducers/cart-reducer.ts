import { TCartAction } from '../../types/actions.type';
import { ICartReducer } from '../../types/reducers.type';
import { ActionType } from '../action';

export const initialState: ICartReducer = {
  productsInCart: null,
  promocode: null,
};

export const cartReducer = (state = initialState, action: TCartAction): ICartReducer => {
  switch (action.type) {
    case ActionType.AddProductToCart:
      const isProductInCart = state.productsInCart?.some((product) => product.id === action.payload.id);
      const newProduct = Object.assign({}, action.payload, {countInCart: 1});
      return isProductInCart
        ? {...state, productsInCart: state.productsInCart?.map((product) => (product.id === action.payload.id) ? {...product, count: product.countInCart + 1} : product) || null}
        : {...state, productsInCart: state.productsInCart?.concat(newProduct) || null};

    case ActionType.DeleteProductFromCart:
      return {...state, productsInCart: state.productsInCart?.filter((product) => product.id !== action.payload) || null};

    case ActionType.IncreaseProductCountInCart:
      return {...state,
        productsInCart: state.productsInCart?.map((product) => (product.id === action.payload)
          ? {...product, count: product.countInCart + 1}
          : product) || null};

    case ActionType.DecreaseProductCountInCart:
      return {...state,
        productsInCart: state.productsInCart?.map((product) => (product.id === action.payload)
          ? {...product, count: product.countInCart - 1}
          : product) || null};
    default:
      return state;
  }
};
