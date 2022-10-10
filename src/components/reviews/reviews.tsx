import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { loadReviews } from '../../store/api-action';
import ReviewCard from './review-card/review-card';

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

  const displayedReviews = reviews ? reviews.slice(0, displayedCount) : null;

  return (
    reviews &&
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">Оставить свой отзыв</button>
          </div>
          <ul className="review-block__list">
            {displayedReviews && displayedReviews.map((review, i) => {
              const key = `review-card-${i}`;
              return <ReviewCard key={key} review={review}/>;
            })}
          </ul>
          {reviews.length > displayedCount &&
          <div className="review-block__buttons" onClick={() => setDisplayedCount(displayedCount + DISPLAYED_COUNT_STEP)}>
            <button className="btn btn--purple" type="button">Показать больше отзывов
            </button>
          </div>}
        </div>
      </section>
    </div>
  );
};

export default Reviews;
