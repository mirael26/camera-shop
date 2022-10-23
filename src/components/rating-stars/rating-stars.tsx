import { useEffect, useState } from 'react';

interface IRatingStarsProps {
  rating?: number;
}

const RatingStars = ({ rating = 0 }: IRatingStarsProps): JSX.Element => {
  const [stars, setStars] = useState([0, 0, 0, 0, 0]);

  useEffect(() => {
    setStars((prev) => prev.map((star, i) => (i + 1 <= rating) ? 1 : 0));
  }, []);

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
