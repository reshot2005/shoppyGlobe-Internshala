import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Search, House } from "lucide-react";
import { setSearchQuery } from "../redux/searchSlice";

const Header = () => {
  const cart = useSelector((state) => state.cart.cartItems);
  const searchVal = useSelector((state) => state.search.query);
  const dispatch = useDispatch();
  const location = useLocation();

  // cart me kitne items h total
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <House size={26} className="logo-icon" />
          <span>ShoppyGlobe</span>
        </Link>

        {location.pathname === "/" && (
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              placeholder="Search for items..."
              value={searchVal}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            />
          </div>
        )}

        <nav className="nav-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/cart" className={`cart-link ${location.pathname === "/cart" ? "active" : ""}`}>
            <div className="cart-icon-wrapper">
              <ShoppingCart size={22} />
              {count > 0 && <span className="cart-badge">{count}</span>}
            </div>
            <span className="cart-text">Cart</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
