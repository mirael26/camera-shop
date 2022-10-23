import { TRootReducer } from './store';

export const getAllProducts = (state: TRootReducer) => state.data.products;
export const getCurrentProduct = (state: TRootReducer) => state.data.currentProduct;
export const getSimilarProducts = (state: TRootReducer) => state.data.similarProducts;
export const getReviews = (state: TRootReducer) => state.data.reviews;
export const getPromo = (state: TRootReducer) => state.data.promo;

export const getAddingToCartItem = (state: TRootReducer) => state.view.addingToCartItem;
export const getAddToCartModalStatus = (state: TRootReducer) => state.view.addToCartModalOpen;
export const getReviewModalStatus = (state: TRootReducer) => state.view.reviewModalOpen;
export const getRedirectPath = (state: TRootReducer) => state.view.redirect;
