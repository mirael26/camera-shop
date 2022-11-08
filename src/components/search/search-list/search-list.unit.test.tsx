import { fireEvent, screen } from '@testing-library/react';
import { AppUrl } from '../../../consts';
import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import { searchedProductsMock } from '../../../test/mocks';
import SearchList from './search-list';

describe('SearchList component', () => {
  test('renders correct links count', () => {
    renderWithReduxAndRouter(<SearchList searchedProducts={searchedProductsMock} onLinkClick={jest.fn()}/>)

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
  });

  test('renders scroll correctly if few links', () => {
    renderWithReduxAndRouter(<SearchList searchedProducts={searchedProductsMock} onLinkClick={jest.fn()}/>)

    expect(screen.getByTestId('search-list')).not.toHaveClass('with-scroll');
  });

  test('renders scroll correctly if many links', () => {
    renderWithReduxAndRouter(<SearchList searchedProducts={searchedProductsMock.concat(searchedProductsMock)} onLinkClick={jest.fn()}/>)

    expect(screen.getByTestId('search-list')).toHaveClass('with-scroll');
  });

  test('renders scroll correctly if many links', () => {
    const mock = {id: 1, name: 'abc'};
    renderWithReduxAndRouter(<SearchList searchedProducts={[{id: 1, name: 'abc'}]} onLinkClick={jest.fn()}/>)

    expect(screen.getByRole('link')).toHaveAttribute('href', `${AppUrl.Catalog}${AppUrl.Product}/1`);
  });

  test('calls onLinkClick prop when link is clicked', () => {
    const onClickSpy = jest.fn();
    renderWithReduxAndRouter(<SearchList searchedProducts={[{id: 1, name: 'abc'}]} onLinkClick={onClickSpy}/>)

    fireEvent.click(screen.getByRole('link'));
    expect(onClickSpy).toBeCalledTimes(1);
  });
});
