import { fireEvent, getByRole, screen } from '@testing-library/react';
import { AppUrl } from '../../consts';
import { renderTestApp } from '../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import NotFound from './not-found';

describe('NotFound', () => {
  test('Render correctly', () => {
    const notFound = renderWithReduxAndRouter(<NotFound/>);
    expect(notFound).toMatchSnapshot();
  });

  test('Redirect to main page', () => {
    renderTestApp(null, { route: `${AppUrl.NotFound}` });
    const notFound = screen.getByTestId('not-found');
    expect(notFound).toBeInTheDocument();

    const returnLink = getByRole(notFound, 'link');
    fireEvent.click(returnLink);
    expect(notFound).not.toBeInTheDocument();
    expect(screen.queryByTestId('catalog-page')).toBeInTheDocument();
  });
});
