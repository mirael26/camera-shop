import { fireEvent, screen } from '@testing-library/react';
import { Modal } from '../../consts';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { bigReviewsMock, reviewsMock } from '../../test/mocks';
import Reviews from './reviews';

const spyDispatch =  jest.fn();

jest.mock('../../hooks/use-app-dispatch');
jest.mock('./review-card/review-card', () => () => (<div data-testid='review-card'></div>));

describe('Reviews', () => {
  test('renders correct reviews count', () => {
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
    jest.mocked(useAppDispatch).mockReturnValue(spyDispatch);

    renderWithReduxAndRouter(<Reviews/>, {
      initialState: {
        data: { reviews: [] }
      }
    });

    const newReviewButton = screen.getByText(/Оставить свой отзыв/i);
    fireEvent.click(newReviewButton);

    expect(spyDispatch).toHaveBeenCalledWith(ActionCreator.OpenModal(Modal.Review));
  });
});
