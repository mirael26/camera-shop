import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { AppUrl } from '../../../consts';

interface IPaginationProps {
  pageCount: number;
  changeCurrentPage: (page: number) => void;
}

const Pagination = ({ pageCount, changeCurrentPage }: IPaginationProps): JSX.Element => {
  const { pathname } = useLocation();
  const { page } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (pathname === AppUrl.Catalog) {
      navigate(`${AppUrl.Catalog}${AppUrl.Page}${currentPage}`, {replace: true});
    }
  }, []);

  useEffect(() => {
    if ((page && +page > pageCount) || (page && isNaN(+page))) {
      navigate(AppUrl.NotFound);
    } else
    if (page && +page !== currentPage) {
      changeCurrentPage(+page);
      setCurrentPage(+page);
    }
  }, [page]);

  const pages = new Array(pageCount).fill(1);

  return (
    <div className="pagination" data-testid='pagination'>
      <ul className="pagination__list">
        {currentPage > 1 &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={`${AppUrl.Catalog}${AppUrl.Page}${currentPage - 1}`}
            >Назад
            </Link>
          </li>}

        {pages.map((e, i) => {
          const key = `pagination-${i}`;
          const pageNumber = i + 1;
          const isActive = (pageNumber) === currentPage;
          return (
            <li key={key} className="pagination__item" data-testid='pagination-item'>
              <Link className={`pagination__link${isActive ? ' pagination__link--active' : ''}`}
                to={`${AppUrl.Catalog}${AppUrl.Page}${pageNumber}`}
              >{pageNumber}
              </Link>
            </li>
          );
        })}

        {currentPage < pageCount &&
          <li className="pagination__item">
            <Link className="pagination__link pagination__link--text"
              to={`${AppUrl.Catalog}${AppUrl.Page}${currentPage + 1}`}
            >Далее
            </Link>
          </li>}
      </ul>
    </div>
  );
};

export default Pagination;
