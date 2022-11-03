import { useSearchParams } from 'react-router-dom';
import { Category, Param } from '../../../consts';
import { useHandleFilterInputChange } from '../../../hooks/use-handle-filter-input-change';
import { checkFilter } from '../../../utils';

const CategoryFilter = () => {
  const [params, setParams] = useSearchParams();

  const handleFilterInputChange = useHandleFilterInputChange(Param.Category, params, setParams);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={Category.Camera} checked={checkFilter(Param.Category, Category.Camera, params)} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Фотокамера</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={Category.VideoCamera} checked={checkFilter(Param.Category, Category.VideoCamera, params)} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Видеокамера</span>
        </label>
      </div>
    </fieldset>
  );
};

export default CategoryFilter;
