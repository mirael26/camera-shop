import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { loadSimilarProducts } from '../../store/api-action';
import { getSimilarProducts } from '../../store/selectors';
import ProductCard from '../product-card/product-card';

const SimilarProducts = (): JSX.Element | null => {
  const similarProducts = useSelector(getSimilarProducts);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [visibleRange, setVisibleRange] = useState({min: 0, max: 2});

  useEffect(() => {
    if (id) {
      dispatch(loadSimilarProducts(+id));
    }
  }, [id, dispatch]);

  const handlePrevButtonClick = () => {
    setVisibleRange((prevState) => ({min: prevState.min - 1, max: prevState.max - 1}));
  };

  const handleNextButtonClick = () => {
    setVisibleRange((prevState) => ({min: prevState.min + 1, max: prevState.max + 1}));
  };

  const isPrevButtonDisabled = visibleRange.min === 0;
  const isNextButtonDisabled = similarProducts ? visibleRange.max === (similarProducts.length - 1) : false;

  return (
    similarProducts && similarProducts.length
      ?
      <div className="page-content__section">
        <section className="product-similar" data-testid='similar-products'>
          <div className="container">
            <h2 className="title title--h3">Похожие товары</h2>
            <div className="product-similar__slider">
              <div className="product-similar__slider-list">
                {similarProducts.map((similarProduct, i) => {
                  const isActive = (i >= visibleRange.min) && (i <= visibleRange.max);
                  const key = `similar-${i}`;
                  return (
                    <ProductCard key={key} product={similarProduct} isActive={isActive} />
                  );
                })}
              </div>
              {similarProducts.length > 3 &&
                <>
                  <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled={isPrevButtonDisabled} onClick={handlePrevButtonClick}>
                    <svg width="7" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                  <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" disabled={isNextButtonDisabled} onClick={handleNextButtonClick}>
                    <svg width="7" height="12" aria-hidden="true">
                      <use xlinkHref="#icon-arrow"></use>
                    </svg>
                  </button>
                </>}
            </div>
          </div>
        </section>
      </div>
      : null
  );
};

export default SimilarProducts;
