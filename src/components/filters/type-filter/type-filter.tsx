import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CameraType, Category, Param } from '../../../consts';
import { useHandleFilterInputChange } from '../../../hooks/use-handle-filter-input-change';
import { checkFilter, deleteOneParam } from '../../../utils';

const TypeFilter = () => {
  const [params, setParams] = useSearchParams();
  const [isVideoCameraOnly, setVideoCameraOnly] = useState(false);

  useEffect(() => {
    const allCategoryFilters = params.getAll(Param.Category);
    const isVideoCameraParamOnly = (allCategoryFilters?.length === 1) && (allCategoryFilters[0] === Category.VideoCamera);

    if (isVideoCameraParamOnly && !isVideoCameraOnly) { // если в компоненте стояло обратное
      if (params.has(Param.Type)) { // если уже был выбран фильтр типа камеры, убираем из него заблокированные
        const paramsWithoutFilm = deleteOneParam(Param.Type, CameraType.Film, params);
        const paramsWithoutFilmAndInstant = deleteOneParam(Param.Type, CameraType.Film, paramsWithoutFilm);
        setParams(paramsWithoutFilmAndInstant);
      }
      setVideoCameraOnly(true);
    }

    if (!isVideoCameraParamOnly && isVideoCameraOnly) {
      setVideoCameraOnly(false);
    }
  }, [params, setParams, isVideoCameraOnly]);

  const handleFilterInputChange = useHandleFilterInputChange(Param.Type, params, setParams);

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={CameraType.Digital} checked={checkFilter(Param.Type, CameraType.Digital, params)} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Цифровая</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={CameraType.Film} disabled={isVideoCameraOnly} checked={checkFilter(Param.Type, CameraType.Film, params)} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Плёночная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={CameraType.Instant} disabled={isVideoCameraOnly} checked={checkFilter(Param.Type, CameraType.Instant, params)} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Моментальная</span>
        </label>
      </div>
      <div className="custom-checkbox catalog-filter__item">
        <label>
          <input type="checkbox" name={CameraType.Collectible} checked={checkFilter(Param.Type, CameraType.Collectible, params)} onChange={handleFilterInputChange}/>
          <span className="custom-checkbox__icon"></span>
          <span className="custom-checkbox__label">Коллекционная</span>
        </label>
      </div>
    </fieldset>
  );
};

export default TypeFilter;
