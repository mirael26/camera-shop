import { TCartAction } from '../../types/actions.type';
import { ICartReducer } from '../../types/reducers.type';
import { ActionType } from '../action';

export const initialState: ICartReducer = {
  productsInCart: [],
  addedToCartItem: null,
  delitedFromCartItem: null,
  promocode: null,
  isPromocodeConfirmed: null,
  discount: 0,
};

export const cartReducer = (state = initialState, action: TCartAction): ICartReducer => {
  switch (action.type) {
    case ActionType.AddProductToCart:
      return state.productsInCart.some((product) => product.id === action.payload.id) // проверяем, есть ли товар в корзине
        // если есть - увеличиваем его количество в корзине на 1
        ? {...state, productsInCart: state.productsInCart.map((product) => (product.id === action.payload.id) ? {...product, countInCart: product.countInCart + 1} : product) || null}
        // если нет - добавляем товар с количеством 1
        : {...state, productsInCart: [...state.productsInCart, {...action.payload, countInCart: 1}]};

    case ActionType.DeleteProductFromCart:
      return {...state, productsInCart: state.productsInCart.filter((product) => product.id !== action.payload)};

    case ActionType.ChangeProductCountInCart:
      return {...state,
        productsInCart: state.productsInCart.map((product) => (product.id === action.payload.id)
          ? {...product, countInCart: action.payload.count}
          : product)};

    case ActionType.SetAddedToCartItem:
      return {...state, addedToCartItem: action.payload};
    case ActionType.SetDelitedFromCartItem:
      return {...state, delitedFromCartItem: action.payload};
    case ActionType.SetPromocode:
      return {...state, promocode: action.payload};
    case ActionType.ChangePromocodeConfirmed:
      return {...state, isPromocodeConfirmed: action.payload};
    case ActionType.SetDiscount:
      return {...state, discount: action.payload};
    default:
      return state;
  }
};
