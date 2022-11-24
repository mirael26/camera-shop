import { createSelector } from 'reselect';
import { TRootReducer } from './store';

export const getAllProducts = (state: TRootReducer) => state.data.products;
export const getAllProductsCount = (state: TRootReducer) => state.data.products?.length;
export const getFilteredProductsCount = (state: TRootReducer) => state.data.filteredProducts?.length;
export const getFilteredExcludingPriceProducts = (state: TRootReducer) => state.data.filteredExcludingPriceProducts;
export const getDisplayedProducts = (state: TRootReducer) => state.data.displayedProducts;
export const getCurrentProduct = (state: TRootReducer) => state.data.currentProduct;
export const getSimilarProducts = (state: TRootReducer) => state.data.similarProducts;
export const getReviews = (state: TRootReducer) => state.data.reviews;
export const getPromo = (state: TRootReducer) => state.data.promo;

export const getProductsInCart = (state: TRootReducer) => state.cart.productsInCart;
export const getAddedToCartItem = (state: TRootReducer) => state.cart.addedToCartItem;
export const getDeletedFromCartItem = (state: TRootReducer) => state.cart.deletedFromCartItem;
export const getPromocode = (state: TRootReducer) => state.cart.promocode;
export const getPromocodeConfirmed = (state: TRootReducer) => state.cart.isPromocodeConfirmed;
export const getDiscount = (state: TRootReducer) => state.cart.discount;

export const getModalStatus = (state: TRootReducer) => state.view.isModalOpen;
export const getActiveModal = (state: TRootReducer) => state.view.activeModal;
export const getRedirectPath = (state: TRootReducer) => state.view.redirect;
export const getProductsLoadingStatus = (state: TRootReducer) => state.view.productsIsLoading;

export const getAllProductsAsc = createSelector(
  getAllProducts,
  (products) => {
    const productsAsc = products?.slice();
    productsAsc?.sort((a, b) => a.price - b.price);
    return productsAsc;
  }
);

export const getFilteredExcludingPriceProductsAsc = createSelector(
  getFilteredExcludingPriceProducts,
  (filteredExcludingPriceProducts) => {
    const filteredExcludingPriceProductsAsc = filteredExcludingPriceProducts?.slice();
    filteredExcludingPriceProductsAsc?.sort((a, b) => a.price - b.price);
    return filteredExcludingPriceProductsAsc;
  }
);

export const getProductsInCartCount = createSelector(
  getProductsInCart,
  (products) => {
    if (products.length === 0) {
      return 0;
    }
    const count = products.reduce((accumulator, product) => accumulator + product.countInCart, 0);
    return count;
  }
);
