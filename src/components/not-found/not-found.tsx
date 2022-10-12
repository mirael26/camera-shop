import { Link } from 'react-router-dom';
import { AppUrl } from '../../consts';

const NotFound = (): JSX.Element => (
  <section className="not-found">
    <div className="container">
      <h1 className="title title--h2 not-found__title">404 Not Found</h1>
      <Link className='btn btn--purple' to={AppUrl.Main}>Вернутся на главную</Link>
    </div>
  </section>
);

export default NotFound;
