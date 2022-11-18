import { screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import ReviewModal from './review-modal';

jest.mock('./review-modal-form/review-modal-form', () => () => <div data-testid='review-form'></div>);
jest.mock('./review-modal-success/review-modal-success', () => () => <div data-testid='review-success'></div>);

test('ReviewModal renders review-form on init', () => {
  renderWithReduxAndRouter(<ReviewModal/>);

  expect(screen.getByTestId('review-form')).toBeInTheDocument();
  expect(screen.queryByTestId('review-success')).not.toBeInTheDocument();
});
