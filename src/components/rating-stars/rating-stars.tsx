interface IRatingStarsProps {
  rating?: number;
}

const RATING_LENGTH = 5;

const RatingStars = ({ rating = 0 }: IRatingStarsProps): JSX.Element => {
  let stars = new Array(RATING_LENGTH).fill(0);
  stars = stars.map((star, i) => (i + 1 <= rating) ? 1 : 0);

  return (
    <>
      {stars.map((star, i) => {
        const key = `star-${i}`;
        return (
          <svg key={key} width="17" height="16" aria-hidden="true">
            {star
              ? <use xlinkHref="#icon-full-star" data-testid='full-star-icon'></use>
              : <use xlinkHref="#icon-star"></use>}
          </svg>
        );
      })}
    </>
  );
};

export default RatingStars;
