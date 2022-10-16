import { MemoryRouter } from 'react-router-dom';
import { renderWithRedux } from '../../../test/helpers/renderWithRedux';
import Sorts from './sorts';

test('Sorts render correctly', () => {
  const sorts = renderWithRedux(
    <MemoryRouter>
      <Sorts/>
    </MemoryRouter>
  );
  expect(sorts).toMatchSnapshot();
});