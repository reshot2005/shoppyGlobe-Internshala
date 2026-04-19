import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, updateQty } from "../redux/cartSlice";
import { Trash2, Plus, Minus } from "lucide-react";
import PropTypes from "prop-types";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // item hatane ke liye
  const hataiye = () => {
    dispatch(removeItem(item.id));
  };

  // quantity badhane ke liye
  const badhaiye = () => {
    dispatch(updateQty({ id: item.id, amount: item.quantity + 1 }));
  };

  // quantity ghatane ke liye
  const ghataiye = () => {
    if (item.quantity > 1) {
      dispatch(updateQty({ id: item.id, amount: item.quantity - 1 }));
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.thumbnail} alt={item.title} />
      </div>
      <div className="cart-item-details">
        <h4>{item.title}</h4>
        <p className="cart-item-price">₹{(item.price * 80).toLocaleString('en-IN')}</p>
      </div>
      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button onClick={ghataiye} disabled={item.quantity <= 1} aria-label="Decrease quantity">
            <Minus size={16} />
          </button>
          <span className="qty-val">{item.quantity}</span>
          <button onClick={badhaiye} aria-label="Increase quantity">
            <Plus size={16} />
          </button>
        </div>
        <button className="remove-btn" onClick={hataiye} title="Remove item">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object.isRequired
};

export default CartItem;
