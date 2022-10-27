import { ISearchedProduct } from '../../../types/data.type';

interface ISearchListProps {
  searchedProducts: Array<ISearchedProduct>;
}

const SearchList = ({ searchedProducts }: ISearchListProps) => {
  const withScroll = searchedProducts.length > 4;

  return (
    <ul className={`form-search__select-list${withScroll ? ' with-scroll' : ''}`}>
      {searchedProducts.map((product, i) => {
        const key = `searched-product-${i}`;
        return <li key={key} className="form-search__select-item" tabIndex={0}>{product.name}</li>;
      })}
    </ul>
  );
};

export default SearchList;
