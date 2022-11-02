import CategoryFilter from './category-fitler/category-fitler';
import LevelFilter from './level-filter/level-filter';
import PriceFilter from './price-filter/price-filter';
import TypeFilter from './type-filter/type-filter';

const Filters = (): JSX.Element => (
  <div className="catalog-filter">
    <form action="#">
      <h2 className="visually-hidden">Фильтр</h2>
      <PriceFilter/>
      <CategoryFilter/>
      <TypeFilter/>
      <LevelFilter/>
      <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
      </button>
    </form>
  </div>
);

export default Filters;
