import { fireEvent, screen } from '@testing-library/react';
import { renderWithReduxAndRouter } from '../../../../test/helpers/render-with-redux-and-router';
import ReviewSuccess from './success';

const onModalCloseMock = jest.fn();

describe('ReviewSuccess', () => {
  test('Render correctly', () => {
    const reviewSuccess = renderWithReduxAndRouter(<ReviewSuccess onModalClose={onModalCloseMock}/>);
    expect(reviewSuccess).toMatchSnapshot();
  });

  test('Close button work correctly', () => {
    renderWithReduxAndRouter(<ReviewSuccess onModalClose={onModalCloseMock}/>);
    const closeButton = screen.getByLabelText('Закрыть попап');
    fireEvent.click(closeButton);
    expect(onModalCloseMock).toHaveBeenCalledTimes(1);
  });

  test('Return button work correctly', () => {
    renderWithReduxAndRouter(<ReviewSuccess onModalClose={onModalCloseMock}/>);
    const returnButton = screen.getByText(/Вернуться к покупкам/i);
    fireEvent.click(returnButton);
    expect(onModalCloseMock).toHaveBeenCalledTimes(1);
  });
});