import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import PropTypes from "prop-types";

// single product card component
const ProductItem = ({ item }) => {
  const dispatch = useDispatch();

  // cart me dalne ke liye function
  const addKariye = (e) => {
    e.preventDefault(); 
    dispatch(addItem(item));
  };

  return (
    <div className="product-item">
      <Link to={`/product/${item.id}`} className="product-link">
        <div className="product-image">
          <img src={item.thumbnail} alt={item.title} loading="lazy" />
        </div>
        <div className="product-info">
          <h3>{item.title}</h3>
          <p className="product-price">₹{(item.price * 80).toLocaleString('en-IN')}</p>
          <span className="category-label">{item.category}</span>
        </div>
      </Link>
      <button className="add-to-cart-btn" onClick={addKariye}>
        Add to Cart
      </button>
    </div>
  );
};

ProductItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default ProductItem;
