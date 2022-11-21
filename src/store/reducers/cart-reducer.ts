import { TCartAction } from '../../types/actions.type';
import { ICartReducer } from '../../types/reducers.type';
import { ActionType } from '../action';

export const initialState: ICartReducer = {
  productsInCart: [],
  promocode: null,
};

export const cartReducer = (state = initialState, action: TCartAction): ICartReducer => {
  switch (action.type) {
    case ActionType.AddProductToCart:
      return state.productsInCart.some((product) => product.id === action.payload.id) // проверяем, есть ли товар в корзине
        // если есть - увеличиваем его количество в корзине на 1
        ? {...state, productsInCart: state.productsInCart.map((product) => (product.id === action.payload.id) ? {...product, count: product.countInCart + 1} : product) || null}
        // если нет - добавляем товар с количеством 1
        : {...state, productsInCart: [...state.productsInCart, {...action.payload, countInCart: 1}]};

    case ActionType.DeleteProductFromCart:
      return {...state, productsInCart: state.productsInCart.filter((product) => product.id !== action.payload)};

    case ActionType.ChangeProductCountInCart:
      return {...state,
        productsInCart: state.productsInCart.map((product) => (product.id === action.payload.id)
          ? {...product, count: action.payload.count}
          : product)};
    default:
      return state;
  }
};
