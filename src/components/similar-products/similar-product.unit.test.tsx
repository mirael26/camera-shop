import { fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import { bigProductsMock, productMock, productsMock } from '../../test/mocks';
import SimilarProducts from './similar-products';

jest.mock('axios');
jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ id: '4' }),
  }
});

jest.mock('../product-card/product-card', () => () => (<div data-testid='product-card'></div>));

describe('SimilarProducts', () => {
  beforeEach(() => {
    jest.mocked(axios).get.mockResolvedValue(productsMock);
  });
  
  test('Makes one get-query on initial', () => {
    renderWithReduxAndRouter(<SimilarProducts/>, {
      initialState: {
        data: { similarProducts: productsMock }
      }
    });

    expect(jest.mocked(axios).get).toHaveBeenCalledTimes(1);
  });

  test('Renders right cards count when 1 similar', () => {
    renderWithReduxAndRouter(<SimilarProducts/>, {
      initialState: {
        data: { similarProducts: [productMock] }
      }
    });

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(1);
  });

  test('Renders right cards count when 5 similar', () => {
    renderWithReduxAndRouter(<SimilarProducts/>, {
      initialState: {
        data: { similarProducts: bigProductsMock }
      }
    });

    const cards = screen.getAllByTestId('product-card');
    expect(cards).toHaveLength(5);
    expect(screen.getByLabelText('Предыдущий слайд')).toBeInTheDocument();
    expect(screen.getByLabelText('Следующий слайд')).toBeInTheDocument();
  });

  test('Dont render component when no similar products', () => {
    renderWithReduxAndRouter(<SimilarProducts/>, {
      initialState: {
        data: { similarProducts: [] }
      }
    });

    expect(screen.queryByTestId('similar-products')).not.toBeInTheDocument();
  });

  test('Dont render prev/next button when 1 card', () => {
    renderWithReduxAndRouter(<SimilarProducts/>, {
      initialState: {
        data: { similarProducts: [productMock] }
      }
    });

    expect(screen.queryByLabelText('Предыдущий слайд')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Следующий слайд')).not.toBeInTheDocument();
  });

  test('Render right prev/next buttons state', () => {
    renderWithReduxAndRouter(<SimilarProducts/>, {
      initialState: {
        data: { similarProducts: bigProductsMock }
      }
    });

    const prevButton = screen.getByLabelText('Предыдущий слайд');
    const nextButton = screen.getByLabelText('Следующий слайд');

    expect(prevButton).toHaveAttribute('disabled');
    expect(nextButton).not.toHaveAttribute('disabled');

    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    
    expect(prevButton).not.toHaveAttribute('disabled');
    expect(nextButton).toHaveAttribute('disabled');
  });
});
