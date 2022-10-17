import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderTestApp } from '../../../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../../../test/helpers/render-with-redux-and-router';
import { productMock } from '../../../../test/mocks';
import AddToCartModalContent from './modal-content';

describe('AddToCartModalContent', () => {
  test('Render correctly', () => {
    const addToCartModalContent = renderWithReduxAndRouter(<AddToCartModalContent product={productMock}/>);
    expect(addToCartModalContent).toMatchSnapshot();
  });

  test('Close correctly by click on close-button', () => {
    renderTestApp(null, { initialState: {
      state: {
        addToCartModalOpen: true,
        addingToCartItem: productMock,
      }
    }});

    const addToCartModalContent = screen.getByTestId('add-to-cart-modal-content');
    expect(addToCartModalContent).toBeInTheDocument();

    const closeButton = screen.getByLabelText<HTMLButtonElement>('Закрыть попап');
    fireEvent.click(closeButton);
    expect(addToCartModalContent).not.toBeInTheDocument();
  });

  test('Close correctly by click on overlay', () => {
    renderTestApp(null, { initialState: {
      state: {
        addToCartModalOpen: true,
        addingToCartItem: productMock,
      }
    }});

    const addToCartModalContent = screen.getByTestId('add-to-cart-modal-content');
    expect(addToCartModalContent).toBeInTheDocument();

    const modalOverlay = screen.getByTestId('modal-overlay');
    fireEvent.click(modalOverlay);
    expect(addToCartModalContent).not.toBeInTheDocument();
  });

  test('Do not close by click on not-overlay', () => {
    renderTestApp(null, { initialState: {
      state: {
        addToCartModalOpen: true,
        addingToCartItem: productMock,
      }
    }});

    const addToCartModalContent = screen.getByTestId('add-to-cart-modal-content');
    expect(addToCartModalContent).toBeInTheDocument();
    
    const modalContent = screen.getByTestId('modal-content');
    fireEvent.click(modalContent);
    expect(addToCartModalContent).toBeInTheDocument();
  });
  
  test('Close correctly by keydown Esc', async() => {
    renderTestApp(null, { initialState: {
      state: {
        addToCartModalOpen: true,
        addingToCartItem: productMock,
      }
    }});

    const addToCartModalContent = screen.getByTestId('add-to-cart-modal-content');
    expect(addToCartModalContent).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    expect(addToCartModalContent).not.toBeInTheDocument();
  });
});
