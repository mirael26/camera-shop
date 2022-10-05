import { NavHashLink } from 'react-router-hash-link';

const UpButton = (): JSX.Element => (
  <NavHashLink smooth className="up-btn" to="#header">
    <svg width="12" height="18" aria-hidden="true">
      <use xlinkHref="#icon-arrow2"></use>
    </svg>
  </NavHashLink>
);

export default UpButton;
