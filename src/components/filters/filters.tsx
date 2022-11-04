import { useSearchParams } from 'react-router-dom';
import { Param } from '../../consts';
import CategoryFilter from './category-fitler/category-fitler';
import LevelFilter from './level-filter/level-filter';
import PriceFilter from './price-filter/price-filter';
import TypeFilter from './type-filter/type-filter';

const DEFAULT_PAGE = '1';

const Filters = (): JSX.Element => {
  const [params, setParams] = useSearchParams();

  const handleResetButtonClick = () => {
    params.delete(Param.PriceMin);
    params.delete(Param.PriceMax);
    params.delete(Param.Category);
    params.delete(Param.Level);
    params.delete(Param.Type);
    params.set(Param.Page, DEFAULT_PAGE);
    setParams(params);
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <PriceFilter/>
        <CategoryFilter/>
        <TypeFilter/>
        <LevelFilter/>
        <button className="btn catalog-filter__reset-btn" type="reset" onClick={handleResetButtonClick}>Сбросить фильтры</button>
      </form>
    </div>
  );
};

export default Filters;
