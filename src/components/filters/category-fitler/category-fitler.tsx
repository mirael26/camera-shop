import { ChangeEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Category, Param } from '../../../consts';
import { checkFilter, deleteOneParam } from '../../../utils';

const CategoryFilter = () => {
  const [params, setParams] = useSearchParams();

  const handleFilterInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const isChecked = evt.target.checked;
    const name = evt.target.name;

    if (isChecked) {
      params.append(Param.Category, name);
      setParams(params);
    } else {
      const newParams = deleteOneParam(Param.Category, name, params);
      setParams(newParams);
    }
  };

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
