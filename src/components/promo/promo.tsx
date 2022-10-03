import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppUrl } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { loadPromo } from '../../store/api-action';

const Promo = (): JSX.Element | null => {
  const promo = useAppSelector((state) => state.data.promo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadPromo());
  }, []);

  return (
    promo &&
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`${promo?.previewImgWebp}, ${promo?.previewImgWebp} 2x`}/>
        <img src={promo.previewImg} srcSet={`${promo.previewImg2x} 2x`} width="1280" height="280" alt="баннер"/>
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{promo.name}</span>
        <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
        <Link className="btn" to={`${AppUrl.Product}/${promo.id}`}>Подробнее</Link>
      </p>
    </div>
  );
};

export default Promo;
