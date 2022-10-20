import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppUrl } from '../../../../consts';
import { renderTestApp } from '../../../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../../../test/helpers/render-with-redux-and-router';
import ReviewModalContent from './review-modal-content';

jest.mock('../review-form/review-form', () => 'ReviewForm');

test('ReviewModalContent Renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<ReviewModalContent/>);
  expect(asFragment()).toMatchSnapshot();
});
