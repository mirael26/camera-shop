import { fireEvent, screen } from '@testing-library/react';
import { AppUrl } from '../../consts';
import { renderTestApp } from '../../test/helpers/render-test-app';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import ServerUnavailable from './server-unavailable';

describe('ServerUnavailable', () => {
  test('Render correctly', () => {
    const serverUnavailable = renderWithReduxAndRouter(<ServerUnavailable/>);
    expect(serverUnavailable).toMatchSnapshot();
  });

  test('Redirect to main page correctly', () => {
    renderTestApp(null, { route: AppUrl.ServerUnavailable });

    fireEvent.click(screen.getByRole('link'));
    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
  });
});
