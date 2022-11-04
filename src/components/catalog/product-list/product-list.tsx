import { IProduct } from '../../../types/data.type';
import ProductCard from '../../product-card/product-card';

interface IProductListProps {
  products: Array<IProduct>;
}

const ProductList = ({products}: IProductListProps) => (
  <div className="cards catalog__cards">
    {products?.map((product, i) => {
      const key = `product-card-${i}`;
      return <ProductCard key={key} product={product} />;
    })}
  </div>
);

export default ProductList;
