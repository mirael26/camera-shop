import { Link } from 'react-router-dom';
import { AppUrl } from '../../consts';

const ServerUnavailable = (): JSX.Element => (
  <section className="server-unavailable">
    <div className="container">
      <h1 className="title title--h2 server-unavailable__title">Сервер недоступен 😥</h1>
      <h1 className="server-unavailable__text">Пожалуйста, попробуйте позднее</h1>
      <Link className='btn btn--purple' to={AppUrl.Main}>Перезагрузить</Link>
    </div>
  </section>
);

export default ServerUnavailable;
