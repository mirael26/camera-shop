import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Level, Param } from '../../../consts';
import { useHandleFilterInputChange } from '../../../hooks/use-handle-filter-input-change';
import { valueof } from '../../../types/util.type';
import { checkFilters } from '../../../utils';

const LevelFilter = () => {
  const [params, setParams] = useSearchParams();
  const [filtersChecked, setFiltersChecked] = useState({[Level.Beginner]: false, [Level.Amateur]: false, [Level.Professional]: false});

  useEffect(() => {
    type TLevelFilter = valueof<typeof Level>;
    checkFilters<TLevelFilter>(params, filtersChecked, setFiltersChecked, Param.Level);
  }, [params, filtersChecked]);

  const handleFilterInputChange = useHandleFilterInputChange(Param.Level, params, setParams);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={Level.Beginner} checked={filtersChecked[Level.Beginner]} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={Level.Amateur} checked={filtersChecked[Level.Amateur]} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Любительский</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={Level.Professional} checked={filtersChecked[Level.Professional]} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Профессиональный</span>
        </label>
      </div>
    </fieldset>
  );
};

export default LevelFilter;
