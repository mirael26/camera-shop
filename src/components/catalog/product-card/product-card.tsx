import { Link } from 'react-router-dom';
import { AppUrl, Modal } from '../../../consts';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { ActionCreator } from '../../../store/action';
import { IProduct } from '../../../types/data.type';
import { addPriceSeparators } from '../../../utils';
import RatingStars from '../../rating-stars/rating-stars';

interface IProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: IProductCardProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleAddToCartButtonClick = () => {
    dispatch(ActionCreator.OpenModal(Modal.AddToCart));
    dispatch(ActionCreator.ChangeAddingToCartItem(product));
  };

  const adaptedPrice = addPriceSeparators(product.price);

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`}/>
          <img src={product.previewImg} srcSet={`${product.previewImg2x} 2x`} width="280" height="240" alt={product.name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars rating={product.rating} size={'small'}/>
          <p className="visually-hidden">Рейтинг: {product.rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{adaptedPrice} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button" onClick={handleAddToCartButtonClick}>Купить
        </button>
        <Link className="btn btn--transparent" to={`${AppUrl.Catalog}${AppUrl.Product}/${product.id}`}>Подробнее</Link>
      </div>
    </div>
  );
};

export default ProductCard;
