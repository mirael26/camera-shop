import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Param, SortOrder, SortType } from '../../../consts';
import { valueof } from '../../../types/util.type';

type TSortType = valueof<typeof SortType>;
type TSortOrder = valueof<typeof SortOrder>;

const Sorts = (): JSX.Element => {
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.has(Param.Sort) && !params.has(Param.Order)) { // если пользователь вручную введет в url параметры только тип сортировки, добавляем порядок по умолчанию
      params.set(Param.Order, SortOrder.Asc);
      setParams(params);
    }

    if (params.has(Param.Order) && !params.has(Param.Sort)) { // если пользователь вручную введет в url параметры только порядок сортировки, добавляем тип по умолчанию
      params.set(Param.Sort, SortType.Price);
      setParams(params);
    }
  }, [params, setParams]);

  const handleSortTypeInputChange = (sortType: TSortType) => {
    params.set(Param.Sort, sortType);
    if (!params.has(Param.Order)) {
      params.set(Param.Order, SortOrder.Asc); // если не выбран порядок сортировки, ставим по умолчанию
    }
    setParams(params);
  };

  const handleOrdertInputChange = (sortOrder: TSortOrder) => {
    params.set(Param.Order, sortOrder);
    if (!params.has(Param.Sort)) {
      params.set(Param.Sort, SortType.Price); // если не выбран тип сортировки, ставим по умолчанию
    }
    setParams(params);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPrice" name="sort" checked={params.get(Param.Sort) === SortType.Price} onChange={() => handleSortTypeInputChange(SortType.Price)}/>
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input type="radio" id="sortPopular" name="sort" checked={params.get(Param.Sort) === SortType.Rating} onChange={() => handleSortTypeInputChange(SortType.Rating)}/>
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" checked={params.get(Param.Order) === SortOrder.Asc} onChange={() => handleOrdertInputChange(SortOrder.Asc)}/>
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" checked={params.get(Param.Order) === SortOrder.Desc} onChange={() => handleOrdertInputChange(SortOrder.Desc)}/>
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Sorts;
