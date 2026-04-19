import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../redux/cartSlice";

const Checkout = () => {
  const items = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const nav = useNavigate();
  
  const [details, setDetails] = useState({
    name: "",
    email: "",
    address: "",
  });
  
  const [done, setDone] = useState(null);

  const priceTotal = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleInputs = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const placeOrder = (e) => {
    e.preventDefault();
    
    if (items.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // success message 
    setDone("Order placed successfully!");
    
    // cart clear karne ke liye dispatch
    dispatch(resetCart());
    
    // home pe wapas bhej dega 3 unit baad
    setTimeout(() => {
      nav("/");
    }, 3000);
  };

  if (done) {
    return (
      <div className="container center checkout-success">
        <div className="success-card">
          <h2>Thank you, {details.name}!</h2>
          <p>{done}</p>
          <p>Redirecting you back to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page container">
      <h1>Checkout</h1>
      
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={placeOrder}>
          <h3>Shipping Details</h3>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name" 
              required 
              value={details.name}
              onChange={handleInputs}
              placeholder="Enter your name"
            />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              required 
              value={details.email}
              onChange={handleInputs}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Shipping Address</label>
            <textarea 
              name="address" 
              required 
              rows="3"
              value={details.address}
              onChange={handleInputs}
              placeholder="Enter your full address"
            ></textarea>
          </div>
          
          <button type="submit" className="place-order-btn">
            Place Order
          </button>
        </form>

        <div className="order-summary-sidebar">
          <h3>Order Summary</h3>
          <div className="order-items">
            {items.map(p => (
              <div key={p.id} className="summary-item">
                <span>{p.title} (x{p.quantity})</span>
                <span>₹{(p.price * p.quantity * 80).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="total-bar">
            <strong>Grand Total:</strong>
            <strong>₹{(priceTotal * 80).toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
