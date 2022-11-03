import { useSearchParams } from 'react-router-dom';
import { Level, Param } from '../../../consts';
import { useHandleFilterInputChange } from '../../../hooks/use-handle-filter-input-change';
import { checkFilter } from '../../../utils';

const LevelFilter = () => {
  const [params, setParams] = useSearchParams();

  const handleFilterInputChange = useHandleFilterInputChange(Param.Level, params, setParams);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={Level.Beginner} checked={checkFilter(Param.Level, Level.Beginner, params)} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Нулевой</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={Level.Amateur} checked={checkFilter(Param.Level, Level.Amateur, params)} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Любительский</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={Level.Professional} checked={checkFilter(Param.Level, Level.Professional, params)} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Профессиональный</span>
        </label>
      </div>
    </fieldset>
  );
};

export default LevelFilter;
