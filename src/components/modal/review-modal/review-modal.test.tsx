import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import ReviewModal from './review-modal';

describe('ReviewModal', () => {
  test('Render correctly', () => {
    const reviewModal = renderWithReduxAndRouter(<ReviewModal/>);
    expect(reviewModal).toMatchSnapshot();
  });

  test('Display modal-content correctly', () => {
    renderWithReduxAndRouter(<ReviewModal/>, { initialState: {
      state: {
        reviewModalOpen: true,
      }
    }});

    const reviewModalContent = screen.getByTestId('review-modal');
    expect(reviewModalContent).toBeInTheDocument();
  });
});
