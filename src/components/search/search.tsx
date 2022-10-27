import SearchList from './search-list/search-list';

const Search = () => (
  <div className="form-search list-opened">
    <form>
      <label>
        <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-lens"></use>
        </svg>
        <input className="form-search__input" type="text" autoComplete="off" placeholder="Поиск по сайту"/>
      </label>
      <SearchList/>
    </form>
    <button className="form-search__reset" type="reset">
      <svg width="10" height="10" aria-hidden="true">
        <use xlinkHref="#icon-close"></use>
      </svg><span className="visually-hidden">Сбросить поиск</span>
    </button>
  </div>
);

export default Search;
