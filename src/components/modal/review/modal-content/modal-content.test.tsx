import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppUrl } from '../../../../consts';
import { renderTestApp } from '../../../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../../../test/helpers/render-with-redux-and-router';
import ReviewModalContent from './modal-content';

describe('ReviewModalContent', () => {
  test('Render correctly', () => {
    const reviewModalContent = renderWithReduxAndRouter(<ReviewModalContent/>);
    expect(reviewModalContent).toMatchSnapshot();
  });
  
  test('Close correctly by click on overlay', () => {
    renderTestApp(null, {
      initialState: {
        state: {
          reviewModalOpen: true,
        }
      },
      route: `${AppUrl.Catalog}${AppUrl.Product}/1` 
    });

    const reviewModalContent = screen.getByTestId<HTMLDivElement>('review-modal');
    expect(reviewModalContent).toBeInTheDocument();

    const modalOverlay = screen.getByTestId('modal-overlay');
    fireEvent.click(modalOverlay);
    expect(reviewModalContent).not.toBeInTheDocument();
  });

  test('Do not close by click on not-overlay', () => {
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
    
    const modalContent = screen.getByTestId('review-form');
    fireEvent.click(modalContent);
    expect(reviewModalContent).toBeInTheDocument();
  });
  
  test('Close correctly by keydown Esc', async() => {
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

    await userEvent.keyboard('{Escape}');
    expect(reviewModalContent).not.toBeInTheDocument();
  });
});
