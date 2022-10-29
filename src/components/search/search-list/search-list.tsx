import { Link } from 'react-router-dom';
import { AppUrl } from '../../../consts';
import { ISearchedProduct } from '../../../types/data.type';

interface ISearchListProps {
  searchedProducts: Array<ISearchedProduct>;
  onLinkClick: () => void;
}

const SearchList = ({ searchedProducts, onLinkClick }: ISearchListProps) => {
  const withScroll = searchedProducts.length > 4;

  return (
    <ul className={`form-search__select-list${withScroll ? ' with-scroll' : ''}`}>
      {searchedProducts.map((product, i) => {
        const key = `searched-product-${i}`;
        return (
          <li key={key} className="form-search__select-item">
            <Link to={`${AppUrl.Catalog}${AppUrl.Product}/${product.id}`} className="form-search__link" onClick={onLinkClick}>{product.name}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchList;
