import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { ActionCreator } from '../../store/action';

const Redirect = () => {
  const redirectPath = useAppSelector((state) => state.state.redirect);
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
