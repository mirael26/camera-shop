import { renderWithReduxAndRouter } from '../../../test/helpers/render-with-redux-and-router';
import Pagination from './pagination';

const noop = () => {};

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({ page: '1' }),
  }
});

test('Pagination renders correctly', () => {
  const { asFragment } = renderWithReduxAndRouter(<Pagination pageCount={3} changeCurrentPage={noop}/>);
    expect(asFragment()).toMatchSnapshot();
});
