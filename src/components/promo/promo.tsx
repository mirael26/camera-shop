import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppUrl } from '../../consts';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadPromo } from '../../store/api-action';
import { getPromo } from '../../store/selectors';

const Promo = (): JSX.Element | null => {
  const promo = useSelector(getPromo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPromo());
  }, [dispatch]);

  return (
    promo &&
    <div className="banner" data-testid='banner'>
      <picture>
        <source type="image/webp" srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp} 2x`}/>
        <img src={promo.previewImg} srcSet={`${promo.previewImg2x} 2x`} width="1280" height="280" alt="баннер"/>
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1" data-testid='promo-title'>{promo.name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${AppUrl.Catalog}${AppUrl.Product}/${promo.id}`}>Подробнее</Link>
      </p>
    </div>
  );
};

export default Promo;
