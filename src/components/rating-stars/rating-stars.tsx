interface IRatingStarsProps {
  rating?: number;
  size: 'small' | 'big';
}

const RATING_LENGTH = 5;

const RatingStars = ({ rating = 0, size }: IRatingStarsProps): JSX.Element => {
  let stars = new Array(RATING_LENGTH).fill(0);
  stars = stars.map((star, i) => (i + 1 <= rating) ? 1 : 0);

  return (
    <>
      {size === 'small' &&
        stars.map((star, i) => {
          const key = `star-${i}`;
          return (
            <svg key={key} width="17" height="16" aria-hidden="true">
              {star
                ? <use xlinkHref="#icon-full-star"></use>
                : <use xlinkHref="#icon-star"></use>}
            </svg>
          );
        })}
      {size === 'big' &&
        stars.map((star, i) => {
          const key = `star-${i}`;
          return (
            <svg key={key} width="17" height="16" aria-hidden="true">
              {star
                ? <use xlinkHref="#icon-full-star"></use>
                : <use xlinkHref="#icon-star"></use>}
            </svg>
          );
        })}
    </>
  );
};

export default RatingStars;
