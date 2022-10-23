import { useNavigate } from 'react-router-dom';
import { AppUrl } from '../../consts';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { renderWithReduxAndRouter } from '../../test/helpers/render-with-redux-and-router';
import Redirect from './redirect';

const spyDispatch =  jest.fn();
const spyNavigate = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
    useNavigate: jest.fn(),
  }
});
jest.mock('../../hooks/use-app-dispatch');

test('Redirect works correctly', () => {
  jest.mocked(useNavigate).mockReturnValue(spyNavigate);
  jest.mocked(useAppDispatch).mockReturnValue(spyDispatch);

  renderWithReduxAndRouter(<Redirect/>, {
    initialState: {
      view: { redirect: AppUrl.NotFound }
    }
  })

  expect(spyDispatch).toHaveBeenCalledWith(ActionCreator.Redirect(null));
  expect(spyNavigate).toHaveBeenCalledWith(AppUrl.NotFound);
});
