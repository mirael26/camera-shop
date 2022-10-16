import { MemoryRouter } from 'react-router-dom';
import { renderWithRedux } from '../../../test/helpers/renderWithRedux';
import Filters from './filters';

test('Filters render correctly', () => {
  const filters = renderWithRedux(
    <MemoryRouter>
      <Filters />
    </MemoryRouter>
  );
  expect(filters).toMatchSnapshot();
});