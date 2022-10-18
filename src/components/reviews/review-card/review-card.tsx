import { Month } from '../../../consts';
import { IReview } from '../../../types/data.type';
import RatingStars from '../../rating-stars/rating-stars';

interface IReviewCardProps {
  review: IReview;
}

const ReviewCard = ({ review }: IReviewCardProps) => {
  const date = new Date(review.createAt);
  const day = date.getUTCDate();
  const month = Month[date.getUTCMonth() as keyof typeof Month];
  const dateTimeAttr = date.toISOString().slice(0, 10);

  return (
    <li className="review-card" data-testid='review-card'>
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={dateTimeAttr} data-testid='review-date'>{day} {month}</time>
      </div>
      <div className="rate review-card__rate">
        <RatingStars rating={review.rating}/>
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text" data-testid='review-advantage'>{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text" data-testid='review-disadvantage'>{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text" data-testid='review-review'>{review.review}</p>
        </li>
      </ul>
    </li>
  );
};

export default ReviewCard;
