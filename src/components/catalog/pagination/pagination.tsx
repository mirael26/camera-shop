import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppUrl, Param } from '../../../consts';

interface IPaginationProps {
  pageCount: number;
}

const Pagination = ({ pageCount }: IPaginationProps): JSX.Element => {
  const navigate = useNavigate();

  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const page = params.get(Param.Page);
    if (page && (+page > pageCount || isNaN(+page))) {
      navigate(AppUrl.NotFound);
    }
  }, [params, pageCount, navigate]);

  const handlePaginationButtonCLick = (pageNumber: number) => {
    params.set(Param.Page, (pageNumber).toString());
    setParams(params);
  };

  const pages = new Array(pageCount).fill(1);
  const page = params.get(Param.Page);

  return (
    <div className="pagination" data-testid='pagination'>
      {page &&
      <ul className="pagination__list">
        {+page > 1 &&
          <li className="pagination__item">
            <button className="pagination__button pagination__button--text" onClick={() => handlePaginationButtonCLick(+page - 1)}>
              Назад
            </button>
          </li>}

        {pages.map((e, i) => {
          const key = `pagination-${i}`;
          const pageNumber = i + 1;
          const isActive = (pageNumber) === +page;
          return (
            <li key={key} className="pagination__item" data-testid='pagination-page'>
              <button className={`pagination__button${isActive ? ' pagination__button--active' : ''}`} onClick={() => handlePaginationButtonCLick(pageNumber)}>
                {pageNumber}
              </button>
            </li>
          );
        })}

        {+page < pageCount &&
          <li className="pagination__item">
            <button className="pagination__button pagination__button--text" onClick={() => handlePaginationButtonCLick(+page + 1)}>
              Далее
            </button>
          </li>}
      </ul>}
    </div>
  );
};

export default Pagination;
