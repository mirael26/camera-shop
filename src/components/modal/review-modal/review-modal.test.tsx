import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import ReviewModal from './review-modal';

jest.mock('./review-modal-content/review-modal-content', () => () => (<div data-testid='review-modal-content'></div>));

test('ReviewModal displays modal-content correctly', () => {
  renderWithReduxAndRouter(<ReviewModal/>, { initialState: {
    view: {
      reviewModalOpen: true,
    }
  }});

  expect(screen.getByTestId('review-modal-content')).toBeInTheDocument();
});
