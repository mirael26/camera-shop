import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { ActionCreator } from '../../store/action';
import { getRedirectPath } from '../../store/selectors';

const Redirect = () => {
  const redirectPath = useSelector(getRedirectPath);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (redirectPath) {
      dispatch(ActionCreator.Redirect(null));
      navigate(redirectPath);
    }
  }, [redirectPath, dispatch, navigate]);

  return null;
};

export default Redirect;
