import React, { useMemo } from "react";
import ProductItem from "./ProductItem";
import useFetchProducts from "../hooks/useFetchProducts";
import { useSelector } from "react-redux";

const ProductList = () => {
  // data fetch hook use kar rha hu
  const { products, loading, error } = useFetchProducts();
  const search = useSelector((state) => state.search.query);

  // filter logic search ke liye
  const filteredItems = useMemo(() => {
    if (!products) return [];
    return products.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  if (loading) return <div className="loading">Getting products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="product-list">
      {filteredItems.length > 0 ? (
        filteredItems.map((prod) => (
          <ProductItem key={prod.id} item={prod} />
        ))
      ) : (
        <p className="no-products">No products found. Try searching for something else.</p>
      )}
    </div>
  );
};

export default ProductList;
