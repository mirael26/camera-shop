import { HashLink } from 'react-router-hash-link';

const UpButton = (): JSX.Element => (
  <HashLink smooth className="up-btn" to='#header'>
    <svg width="12" height="18" aria-hidden="true">
      <use xlinkHref="#icon-arrow2"></use>
    </svg>
  </HashLink>
);

export default UpButton;
