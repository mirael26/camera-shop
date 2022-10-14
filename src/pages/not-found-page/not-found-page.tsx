import NotFound from '../../components/not-found/not-found';

const NotFoundPage = ():JSX.Element => (
  <div className="wrapper" data-testid='not-found-page'>
    <main>
      <div className="page-content">
        <NotFound />
      </div>
    </main>
  </div>
);

export default NotFoundPage;
