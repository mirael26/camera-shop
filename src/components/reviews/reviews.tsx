import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { loadReviews } from '../../store/api-action';
import { useDebouncedCallback as useDebounce } from 'use-debounce';
import ReviewCard from './review-card/review-card';
import { ActionCreator } from '../../store/action';
import { Modal } from '../../consts';

const DISPLAYED_COUNT_STEP = 3;

const Reviews = (): JSX.Element | null => {
  const reviews = useAppSelector((state) => state.data.reviews);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const [displayedCount, setDisplayedCount] = useState(DISPLAYED_COUNT_STEP);

  useEffect(() => {
    if (id) {
      dispatch(loadReviews(+id));
    }
  }, [id]);

  useEffect(() => {
    window.addEventListener('scroll', checkPosition);
    return () => window.removeEventListener('scroll', checkPosition);
  }, []);

  const changeDisplayedCountDebounced = useDebounce(() => setDisplayedCount(displayedCount + DISPLAYED_COUNT_STEP), 500, { leading: true });

  const checkPosition = () => {
    const height = document.body.offsetHeight;
    const screenHeight = window.innerHeight;
    const scrolled = window.scrollY;
    const position = scrolled + screenHeight;

    if (position === height) {
      changeDisplayedCountDebounced();
    }
  };

  const sortedReviews = reviews ? reviews.slice().sort((a, b) => new Date(a.createAt) > new Date(b.createAt) ? -1 : 1) : null;
  const displayedReviews = sortedReviews ? sortedReviews.slice(0, displayedCount) : null;

  return (
    reviews &&
    <div className="page-content__section">
      <section className="review-block" data-testid='reviews'>
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button" onClick={() => dispatch(ActionCreator.OpenModal(Modal.Review))}>Оставить свой отзыв</button>
          </div>
          {!reviews.length && <p>Отзывов пока нет</p>}
          <ul className="review-block__list">
            {displayedReviews && displayedReviews.map((review, i) => {
              const key = `review-card-${i}`;
              return <ReviewCard key={key} review={review}/>;
            })}
          </ul>
          {reviews.length > displayedCount &&
          <div className="review-block__buttons" onClick={changeDisplayedCountDebounced}>
            <button className="btn btn--purple" type="button">Показать больше отзывов
            </button>
          </div>}
        </div>
      </section>
    </div>
  );
};

export default Reviews;
