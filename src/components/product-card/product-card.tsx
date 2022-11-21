import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppUrl, Modal } from '../../consts';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { getProductsInCart } from '../../store/selectors';
import { IProduct } from '../../types/data.type';
import { addPriceSeparators } from '../../utils';
import RatingStars from '../rating-stars/rating-stars';

interface IProductCardProps {
  product: IProduct;
  isActive?: boolean;
}

const ProductCard = ({ product, isActive = false }: IProductCardProps): JSX.Element => {
  const productsInCart = useSelector(getProductsInCart);
  const dispatch = useAppDispatch();

  const handleAddToCartButtonClick = () => {
    dispatch(ActionCreator.OpenModal(Modal.AddToCart));
    dispatch(ActionCreator.SetAddedToCartItem(product));
  };

  const isAddedToCart = productsInCart.some((productInCart) => productInCart.id === product.id);
  const adaptedPrice = addPriceSeparators(product.price);

  return (
    <div className={`product-card${isActive ? ' is-active' : ''}`} data-testid='product-card'>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}/>
          <img src={product.previewImg} srcSet={`${product.previewImg2x} 2x`} width="280" height="240" alt={product.name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars rating={product.rating}/>
          <p className="visually-hidden" data-testid='rating'>Рейтинг: {product.rating}</p>
          <p className="rate__count" data-testid='rate-count'><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
        </div>
        <p className="product-card__title" data-testid='name'>{product.name}</p>
        <p className="product-card__price" data-testid='price'><span className="visually-hidden">Цена:</span>{adaptedPrice} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isAddedToCart
          ?
          <Link to={AppUrl.Cart} className="btn btn--purple-border product-card__btn product-card__btn--in-cart">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link>
          :
          <button className="btn btn--purple product-card__btn" type="button" onClick={handleAddToCartButtonClick}>Купить
          </button>}
        <Link className="btn btn--transparent" to={`${AppUrl.Catalog}${AppUrl.Product}/${product.id}`}>Подробнее</Link>
      </div>
    </div>
  );
};

export default ProductCard;
