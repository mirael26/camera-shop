export const AppUrl = {
  Main: '/',
  Catalog: '/catalog',
  Page: '/page_',
  Product: '/product',
  Cart: '/cart',
  NotFound: '/404',
  UnknownError: '/unknown_error',
  ServerUnavailable: '/server_unavailable',
} as const;

export const ApiUrl = {
  Promo: '/promo',
  Products: '/cameras',
  Reviews: '/reviews',
  Similar: '/similar',
  Promocode: '/coupons',
  Order: '/orders',
} as const;

export const Modal = {
  AddToCart: 'addToCartModal',
  DeleteFromCart: 'deleteFromCartModal',
  Review: 'reviewModal',
  OrderSuccess: 'orderSuccessModal',
} as const;

export const Tab = {
  Features: 'features',
  Description: 'description',
} as const;

export const Month = {
  0: 'января',
  1: 'февраля',
  2: 'марта',
  3: 'апреля',
  4: 'мая',
  5: 'июня',
  6: 'июля',
  7: 'августа',
  8: 'сентября',
  9: 'октября',
  10: 'ноября',
  11: 'декабря',
} as const;

export const Param = {
  Sort: 'sort',
  Order: 'order',
  Page: 'page',
  Tab: 'tab',
  PriceMin: 'price_min',
  PriceMax: 'price_max',
  Category: 'category',
  Level: 'level',
  Type: 'type',
} as const;

export const SortType = {
  Price: 'price',
  Rating: 'rating',
} as const;

export const SortOrder = {
  Asc: 'asc',
  Desc: 'desc',
} as const;

export const Category = {
  Camera: 'Фотоаппарат',
  VideoCamera: 'Видеокамера',
} as const;

export const Level = {
  Beginner: 'Нулевой',
  Amateur: 'Любительский',
  Professional: 'Профессиональный',
} as const;

export const CameraType = {
  Digital: 'Цифровая',
  Film: 'Плёночная',
  Instant: 'Моментальная',
  Collectible: 'Коллекционная',
} as const;
