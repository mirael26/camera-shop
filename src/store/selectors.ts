import { createSelector } from 'reselect';
import { TRootReducer } from './store';

export const getAllProducts = (state: TRootReducer) => state.data.products;
export const getAllProductsCount = (state: TRootReducer) => state.data.products?.length;
export const getDisplayedProducts = (state: TRootReducer) => state.data.displayedProducts;
export const getMinPriceInDisplayed = (state: TRootReducer) => state.data.displayedProducts?.reduce((a, b) => a.price < b.price ? a : b).price;
export const getMaxPriceInDisplayed = (state: TRootReducer) => state.data.displayedProducts?.reduce((a, b) => a.price > b.price ? a : b).price;
export const getCurrentProduct = (state: TRootReducer) => state.data.currentProduct;
export const getSimilarProducts = (state: TRootReducer) => state.data.similarProducts;
export const getReviews = (state: TRootReducer) => state.data.reviews;
export const getPromo = (state: TRootReducer) => state.data.promo;

export const getAddingToCartItem = (state: TRootReducer) => state.view.addingToCartItem;
export const getAddToCartModalStatus = (state: TRootReducer) => state.view.addToCartModalOpen;
export const getReviewModalStatus = (state: TRootReducer) => state.view.reviewModalOpen;
export const getRedirectPath = (state: TRootReducer) => state.view.redirect;

export const getAllProductsAsc = createSelector(
  getAllProducts,
  (products) => {
    const productsAsc = products?.slice();
    productsAsc?.sort((a, b) => a.price - b.price);
    return productsAsc;
  }
);
