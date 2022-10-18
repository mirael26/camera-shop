import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppUrl } from '../../consts';
import { renderTestApp } from '../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { bigReviewsMock, reviewsMock } from '../../test/mocks';
import Reviews from './reviews';

describe('Reviews', () => {
  test('Render correctly', () => {
    const reviews = renderWithReduxAndRouter(<Reviews/>, {
      initialState: {
        data: { reviews: reviewsMock }
      }
    });
    expect(reviews).toMatchSnapshot();
  });

  test('Render correct reviews count', () => {
    renderWithReduxAndRouter(<Reviews/>, {
      initialState: {
        data: { reviews: reviewsMock }
      }
    });
    const reviewCards = screen.getAllByTestId('review-card');
    expect(reviewCards).toHaveLength(2);
  });

  test('Display message if no reviews', () => {
    renderWithReduxAndRouter(<Reviews/>, {
      initialState: {
        data: { reviews: [] }
      }
    });
    const reviewCards = screen.queryAllByTestId('review-card');
    expect(reviewCards).toHaveLength(0);
    expect(screen.getByText<HTMLParagraphElement>(/Отзывов пока нет/i)).toBeInTheDocument();
  });

  test('Display message if no reviews', () => {
    renderWithReduxAndRouter(<Reviews/>, {
      initialState: {
        data: { reviews: [] }
      }
    });
    const reviewCards = screen.queryAllByTestId('review-card');
    expect(reviewCards).toHaveLength(0);
    expect(screen.getByText<HTMLParagraphElement>(/Отзывов пока нет/i)).toBeInTheDocument();
  });

  test('Show more reviews on click at showmore-button', () => {
    renderWithReduxAndRouter(<Reviews/>, {
      initialState: {
        data: { reviews: bigReviewsMock }
      }
    });
    let reviewCards = screen.getAllByTestId('review-card');
    expect(reviewCards).toHaveLength(3);
    fireEvent.click(screen.getByText<HTMLButtonElement>(/Показать больше отзывов/i));
    reviewCards = screen.getAllByTestId('review-card');
    expect(reviewCards).toHaveLength(5);
  });

  test('Open review-modal when click on new-review button', () => {
    renderTestApp(null, {
      route: `${AppUrl.Catalog}${AppUrl.Product}/1`,
      initialState: {
        data: { reviews: [] }
      }
    });
    const newReview = screen.getByText<HTMLButtonElement>(/Оставить свой отзыв/i);
    fireEvent.click(newReview);

    expect(screen.getByTestId('review-modal')).toBeInTheDocument();
  });
});
