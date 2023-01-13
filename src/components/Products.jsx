import React from 'react';
import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';

export default function Products() {
  const {
    productsQuery: { isLoading, error, data: products },
  } = useProducts();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 p-10">
        {products && products.map((product) => <ProductCard key={product.id} product={product} />)}
      </ul>
    </>
  );
}
