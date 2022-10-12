import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
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
  }, [redirectPath]);

  return null;
};

export default Redirect;
