import { getByText, screen } from '@testing-library/react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppUrl } from '../../../consts';
import { renderTestApp } from '../../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import Pagination from './pagination';

const noop = () => {};
const spyNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: jest.fn(),
  }
});

describe('Pagination', () => {
  beforeEach(() => {
    jest.mocked(useParams).mockReturnValue({ page: '1' });
    jest.mocked(useNavigate).mockReturnValue(spyNavigate);
  });

  test('Renders pages-buttons correctly', () => {
    renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>);
    const buttons = screen.getAllByTestId('pagination-item');
    expect(buttons).toHaveLength(3);
  });

  test('Renders prev/next button correctly on first page', () => {
    renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>);
    expect(screen.queryByText(/Назад/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).toBeInTheDocument();
  });

  test('Renders prev/next button correctly on last page', () => {
    jest.mocked(useParams).mockReturnValue({ page: '3' });

    renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>);

    expect(screen.queryByText(/Назад/i)).toBeInTheDocument();
    expect(screen.queryByText(/Далее/i)).not.toBeInTheDocument();
  });

  test('Renders active link correctly', () => {
    jest.mocked(useParams).mockReturnValue({ page: '3' });

    renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>);
    const pagination = screen.getByTestId('pagination');
    expect(getByText<HTMLLinkElement>(pagination, /2/i)).not.toHaveClass('pagination__link--active');
    expect(getByText<HTMLLinkElement>(pagination, /3/i)).toHaveClass('pagination__link--active');
  });

  test('Pushes page number to url once after mount', () => {
    jest.mocked(useParams).mockReturnValue({});
    renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>, { route: AppUrl.Catalog});

    expect(spyNavigate).toHaveBeenCalledWith(`${AppUrl.Catalog}${AppUrl.Page}1`, {"replace": true});
  });

  test('If page incorrect redirect to 404', () => {
    jest.mocked(useParams).mockReturnValue({ page: '4' });
    renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>, { route: `${AppUrl.Catalog}${AppUrl.Page}4`});

    expect(spyNavigate).toHaveBeenCalledWith(AppUrl.NotFound);
  });
});
