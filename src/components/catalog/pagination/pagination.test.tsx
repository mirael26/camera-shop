import { getByText, screen } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { renderTestApp } from '../../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import Pagination from './pagination';

const noop = () => {};

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
  }
});

describe('Pagination', () => {
  beforeEach(() => {
    jest.mocked(useParams).mockReturnValue({ page: '1' });
  });

  test('Render correctly', () => { 
    const pagination = renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>);
    expect(pagination).toMatchSnapshot();
  });

  test('Render pages-buttons correctly', () => {
    renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>);
    const buttons = screen.getAllByTestId('pagination-item');
    expect(buttons).toHaveLength(3);
  });

  test('Render prev/next button correctly on first page', () => {
    renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>);
    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).toBeInTheDocument();
  });

  test('Render prev/next button correctly on last page', () => {
    jest.mocked(useParams).mockReturnValue({ page: '3' });

    renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>);

    expect(screen.queryByText(/Назад/i)).toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });

  test('Render active link correctly', () => {
    jest.mocked(useParams).mockReturnValue({ page: '3' });

    renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>);
    const pagination = screen.getByTestId('pagination');
    expect(getByText<HTMLLinkElement>(pagination, /2/i)).not.toHaveClass('pagination__link--active');
    expect(getByText<HTMLLinkElement>(pagination, /3/i)).toHaveClass('pagination__link--active');
  });

  test('If page incorrect redirect to 404', () => {
    jest.mocked(useParams).mockReturnValue({ page: '4' });

    renderTestApp(<Pagination pageCount={3} changeCurrentPage={noop}/>);

    const notFoundPage = screen.getByTestId('not-found-page');
    expect(notFoundPage).toBeInTheDocument(); 
  });
});