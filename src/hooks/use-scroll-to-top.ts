import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollToTop = (exceptions: Array<string>) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const isException = exceptions.some((exception) => pathname.includes(exception));

    if (!isException) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
};

export default useScrollToTop;
