import { screen } from '@testing-library/react';
import { AppUrl } from '../../consts';
import { renderTestApp } from '../../test/helpers/render-test-app';
import Redirect from './redirect';

test('Redirect works correctly', () => {
  renderTestApp(<Redirect/>, {
    route: AppUrl.Catalog,
    initialState: {
      state: { redirect: AppUrl.NotFound }
    }
  })
  expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
});
