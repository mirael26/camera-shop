import UnknownError from '../../components/unknown-error/unknown-error';

const UnknownErrorPage = ():JSX.Element => (
  <div className="wrapper" data-testid='not-found-page'>
    <main>
      <div className="page-content">
        <UnknownError />
      </div>
    </main>
  </div>
);

export default UnknownErrorPage;
