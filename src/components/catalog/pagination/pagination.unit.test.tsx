import { fireEvent, getByText, screen } from '@testing-library/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppUrl } from '../../../consts';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import Pagination from './pagination';

const spyNavigate = jest.fn();
const spySetSearchParams = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useSearchParams: jest.fn(),
    useNavigate: jest.fn(),
  }
});

describe('Pagination', () => {
  beforeEach(() => {
    const searchParams = new URLSearchParams({page: '1'});
    jest.mocked(useSearchParams).mockReturnValue([searchParams, spySetSearchParams]);
    jest.mocked(useNavigate).mockReturnValue(spyNavigate);
  });

  test('Renders pages-buttons correctly', () => {
    renderWithReduxAndRouter(<Pagination pageCount={3}/>);
    const buttons = screen.getAllByTestId('pagination-page');
    expect(buttons).toHaveLength(3);
  });

  test('Renders prev/next button correctly on first page', () => {
    renderWithReduxAndRouter(<Pagination pageCount={3}/>);
    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).toBeInTheDocument();
  });

  test('Renders prev/next button correctly on last page', () => {
    const searchParams = new URLSearchParams({page: '3'});
    jest.mocked(useSearchParams).mockReturnValue([searchParams, jest.fn()]);

    renderWithReduxAndRouter(<Pagination pageCount={3}/>);

    expect(screen.queryByText(/Назад/i)).toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });

  test('Renders active link correctly', () => {
    const searchParams = new URLSearchParams({page: '3'});
    jest.mocked(useSearchParams).mockReturnValue([searchParams, jest.fn()]);

    renderWithReduxAndRouter(<Pagination pageCount={3}/>);
    const pagination = screen.getByTestId('pagination');
    expect(getByText(pagination, /2/i)).not.toHaveClass('pagination__button--active');
    expect(getByText(pagination, /3/i)).toHaveClass('pagination__button--active');
  });

  test('If page incorrect redirect to 404', () => {
    const searchParams = new URLSearchParams({page: '4'});
    jest.mocked(useSearchParams).mockReturnValue([searchParams, jest.fn()]);
    renderWithReduxAndRouter(<Pagination pageCount={3}/>);

    expect(spyNavigate).toHaveBeenCalledWith(AppUrl.NotFound);
  });

  test('Change page by click on page-button', () => {
    renderWithReduxAndRouter(<Pagination pageCount={3}/>);
    
    fireEvent.click(screen.getByText(/2/i));

    expect(spySetSearchParams).toHaveBeenCalledWith({page: '2'});
  });
});
