import { Link } from 'react-router-dom';
import { AppUrl } from '../../consts';

const UnknownError = (): JSX.Element => (
  <section className="unknown-error" data-testid='unknown-error'>
    <div className="container">
      <h1 className="title title--h2 unknown-error__title">Что-то пошло не так :(</h1>
      <Link className='btn btn--purple' to={AppUrl.Main}>Вернутся на главную</Link>
    </div>
  </section>
);

export default UnknownError;
