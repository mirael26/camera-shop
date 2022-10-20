import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { AppUrl } from '../../../../consts';
import { renderTestApp } from '../../../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../../../test/mocks';
import ReviewForm from './review-form';

const noop = () => {};
const onSuccessMock = jest.fn();
jest.mock('axios');
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '1' }),
  }
});

describe('ReviewForm', () => {
  test('Render correctly', () => {
    const reviewForm = renderWithReduxAndRouter(<ReviewForm onSuccess={noop} onModalClose={noop}/>);
    expect(reviewForm).toMatchSnapshot();
  });

  test('Close correctly by click on close-button', () => {
    jest.mocked(axios).get.mockResolvedValue({});

    renderTestApp(null, {
      initialState: {
        state: {
          reviewModalOpen: true,
        }
      },
      route: `${AppUrl.Catalog}${AppUrl.Product}/1` 
    });

    const reviewModalContent = screen.getByTestId('review-modal');
    expect(reviewModalContent).toBeInTheDocument();

    const closeButton = screen.getByLabelText<HTMLButtonElement>('Закрыть попап');
    fireEvent.click(closeButton);
    expect(reviewModalContent).not.toBeInTheDocument();
  });

  test('Ratining works correctly', () => {
    renderWithReduxAndRouter(<ReviewForm onSuccess={noop} onModalClose={noop}/>);
    
    expect(screen.getByTestId('review-form-rate')).toHaveTextContent('0');

    const thirdRateStars = screen.getByTitle(/Нормально/i);
    fireEvent.click(thirdRateStars);
    expect(screen.getByTestId('review-form-rate')).toHaveTextContent('3');
  });

  test('Display typed text in input correctly', async () => {
    renderWithReduxAndRouter(<ReviewForm onSuccess={noop} onModalClose={noop}/>);
    
    const input = screen.getByPlaceholderText(/Введите ваше имя/i);
    expect(input).toHaveValue('');

    await userEvent.type(input, 'Иван' );
    expect(input).toHaveValue('Иван');
  });

  test('Display input error correctly', async () => {
    renderWithReduxAndRouter(<ReviewForm onSuccess={noop} onModalClose={noop}/>);

    const inputBlock = screen.getByTestId<HTMLDivElement>('name-input-block');
    expect(inputBlock).not.toHaveClass('is-invalid');

    const submitButton = screen.getByText<HTMLButtonElement>(/Отправить отзыв/i);
    fireEvent.click(submitButton);
    expect(inputBlock).toHaveClass('is-invalid');

    const input = screen.getByPlaceholderText(/Введите ваше имя/i);
    await userEvent.type(input, 'Иван' );
    fireEvent.click(submitButton);
    expect(inputBlock).not.toHaveClass('is-invalid');
  });

  test('Send review correctly', async() => {
    jest.mocked(axios).get.mockResolvedValue({});
    jest.mocked(axios).post.mockResolvedValue({});

    renderTestApp(<ReviewForm onSuccess={onSuccessMock} onModalClose={noop}/>, { initialState: {
      data: {
        currentProduct: productMock,
      }
    }});

    const submitButton = screen.getByText<HTMLButtonElement>(/Отправить отзыв/i);
    fireEvent.click(submitButton);
    expect(axios.post).toBeCalledTimes(0);
    expect(onSuccessMock).toBeCalledTimes(0);

    fireEvent.click(screen.getByTitle(/Нормально/i));
    await userEvent.type(screen.getByPlaceholderText(/Введите ваше имя/i), 'Иван');
    await userEvent.type(screen.getByPlaceholderText(/Основные преимущества товара/i), 'Все хорошо');
    await userEvent.type(screen.getByPlaceholderText(/Главные недостатки товара/i), 'Ничего плохого');
    await userEvent.type(screen.getByPlaceholderText(/Поделитесь своим опытом покупки/i), 'Супер');

    expect(screen.getByTestId('rating-input-block')).not.toHaveClass('is-invalid');
    expect(screen.getByTestId('name-input-block')).not.toHaveClass('is-invalid');
    expect(screen.getByTestId('advantage-input-block')).not.toHaveClass('is-invalid');
    expect(screen.getByTestId('disadvantage-input-block')).not.toHaveClass('is-invalid');
    expect(screen.getByTestId('review-input-block')).not.toHaveClass('is-invalid');
    
    fireEvent.click(screen.getByText<HTMLButtonElement>(/Отправить отзыв/i));
    expect(axios.post).toBeCalledTimes(1);
    expect(onSuccessMock).toBeCalledTimes(1);
  });
});
