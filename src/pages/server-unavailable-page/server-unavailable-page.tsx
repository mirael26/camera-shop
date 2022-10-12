import ServerUnavailable from '../../components/server-unavailable/server-unavailable';

const ServerUnavailablePage = ():JSX.Element => (
  <div className="wrapper">
    <main>
      <div className="page-content">
        <ServerUnavailable />
      </div>
    </main>
  </div>
);

export default ServerUnavailablePage;
