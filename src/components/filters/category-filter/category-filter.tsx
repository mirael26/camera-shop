import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Category, Param } from '../../../consts';
import { useHandleFilterInputChange } from '../../../hooks/use-handle-filter-input-change';
import { valueof } from '../../../types/util.type';
import { checkFilters } from '../../../utils';

type TCategoryFilter = valueof<typeof Category>;

const CategoryFilter = () => {
  const [params, setParams] = useSearchParams();
  const [filtersChecked, setFiltersChecked] = useState({[Category.Camera]: false, [Category.VideoCamera]: false});

  useEffect(() => {
    checkFilters<TCategoryFilter>(params, filtersChecked, setFiltersChecked, Param.Category);
  }, [params, filtersChecked]);

  const handleFilterInputChange = useHandleFilterInputChange(Param.Category, params, setParams);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={Category.Camera} checked={filtersChecked[Category.Camera]} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={Category.VideoCamera} checked={filtersChecked[Category.VideoCamera]} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
};

export default CategoryFilter;
