import { IAddProductToCart, IChangeProductCountInCart, IChangePromocodeConfirmed, IClearCart, ICloseModal, IDeleteProductFromCart, ILoadCurrentProduct, ILoadDisplayedProducts, ILoadFilteredExcludingPriceProducts, ILoadFilteredProducts, ILoadProducts, ILoadPromo, ILoadReviews, ILoadSimilarProducts, IOpenModal, IRedirect, ISetAddedToCartItem, ISetDelitedFromCartItem, ISetDiscount, ISetProdactsLoadingStatus, ISetPromocode } from '../types/actions.type';
import { TModal } from '../types/app.type';
import { IProduct, IProductInCart, IPromo, IReview } from '../types/data.type';

export const ActionType = {
  LoadPromo: 'promo/loadPromo',
  LoadProducts: 'cameras/loadProducts',
  LoadFilteredProducts: 'cameras/loadFilteredProducts',
  LoadFilteredExcludingPriceProducts: 'cameras/loadFilteredExcludingPriceProducts',
  LoadDisplayedProducts: 'cameras/loadDisplayedProducts',
  LoadCurrentProduct: 'cameras/loadCurrentProduct',
  LoadSimilarProducts: 'cameras/loadSimilarProducts',
  LoadReviews: 'cameras/loadReviews',

  ClearCart: 'orders/clearCart',
  AddProductToCart: 'orders/addProductToCart',
  DeleteProductFromCart: 'orders/deleteProductInCart',
  ChangeProductCountInCart: 'orders/changeProductCountInCart',
  SetAddedToCartItem: 'state/setAddedToCartItem',
  SetDelitedFromCartItem: 'state/setDelitedFromCartItem',
  SetPromocode: 'coupons/setPromocode',
  ChangePromocodeConfirmed: 'coupons/changePromocodeConfirmed',
  SetDiscount: 'coupons/setDiscount',

  OpenModal: 'state/openModal',
  CloseModal: 'state/closeModal',
  Redirect: 'state/redirect',
  SetProdactsLoadingStatus:'state/setProdactsLoadingStatus',
} as const;

export const ActionCreator = {
  LoadPromo: (promo: IPromo): ILoadPromo => ({
    type: ActionType.LoadPromo,
    payload: promo,
  }),
  LoadProducts: (products: Array<IProduct>): ILoadProducts => ({
    type: ActionType.LoadProducts,
    payload: products,
  }),
  LoadFilteredProducts: (filteredProducts: Array<IProduct> | null): ILoadFilteredProducts => ({
    type: ActionType.LoadFilteredProducts,
    payload: filteredProducts,
  }),
  LoadFilteredExcludingPriceProducts: (filteredExcludingProducts: Array<IProduct> | null): ILoadFilteredExcludingPriceProducts => ({
    type: ActionType.LoadFilteredExcludingPriceProducts,
    payload: filteredExcludingProducts,
  }),
  LoadDisplayedProducts: (displayedProducts: Array<IProduct>): ILoadDisplayedProducts => ({
    type: ActionType.LoadDisplayedProducts,
    payload: displayedProducts,
  }),
  LoadCurrentProduct: (product: IProduct): ILoadCurrentProduct => ({
    type: ActionType.LoadCurrentProduct,
    payload: product,
  }),
  LoadSimilarProducts: (similarProducts: Array<IProduct>): ILoadSimilarProducts => ({
    type: ActionType.LoadSimilarProducts,
    payload: similarProducts,
  }),
  LoadReviews: (reviews: Array<IReview> | null): ILoadReviews => ({
    type: ActionType.LoadReviews,
    payload: reviews,
  }),

  ClearCart: (): IClearCart => ({
    type: ActionType.ClearCart,
  }),
  AddProductToCart: (product: IProduct): IAddProductToCart => ({
    type: ActionType.AddProductToCart,
    payload: product,
  }),
  DeleteProductFromCart: (id: number): IDeleteProductFromCart => ({
    type: ActionType.DeleteProductFromCart,
    payload: id,
  }),
  ChangeProductCountInCart: (id: number, count: number): IChangeProductCountInCart => ({
    type: ActionType.ChangeProductCountInCart,
    payload: { id, count},
  }),
  SetAddedToCartItem: (item: IProduct | null): ISetAddedToCartItem => ({
    type: ActionType.SetAddedToCartItem,
    payload: item,
  }),
  SetDelitedFromCartItem: (item: IProductInCart | null): ISetDelitedFromCartItem => ({
    type: ActionType.SetDelitedFromCartItem,
    payload: item,
  }),
  SetPromocode: (promocode: string | null): ISetPromocode => ({
    type: ActionType.SetPromocode,
    payload: promocode,
  }),
  ChangePromocodeConfirmed: (isConfirmed: boolean | null): IChangePromocodeConfirmed => ({
    type: ActionType.ChangePromocodeConfirmed,
    payload: isConfirmed,
  }),
  SetDiscount: (discount: number): ISetDiscount => ({
    type: ActionType.SetDiscount,
    payload: discount,
  }),

  OpenModal: (modal: TModal): IOpenModal => ({
    type: ActionType.OpenModal,
    payload: modal,
  }),
  CloseModal: (): ICloseModal => ({
    type: ActionType.CloseModal,
  }),
  Redirect: (path: string | null): IRedirect => ({
    type: ActionType.Redirect,
    payload: path,
  }),
  SetProdactsLoadingStatus: (status: boolean): ISetProdactsLoadingStatus => ({
    type: ActionType.SetProdactsLoadingStatus,
    payload: status,
  }),
};
