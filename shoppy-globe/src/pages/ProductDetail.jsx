import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/cartSlice";
import { ArrowLeft, ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const dispatch = useDispatch();
  
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(true);
  const [khatra, setKhatra] = useState(null);

  useEffect(() => {
    // details lane ke liye api call
    const laiyeDetails = async () => {
      try {
        setLoad(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found.");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setKhatra(err.message);
      } finally {
        setLoad(false);
      }
    };

    laiyeDetails();
  }, [id]);

  // cart me dalne wala click
  const cartMeDalo = () => {
    if (data) {
      dispatch(addItem(data));
    }
  };

  if (load) return <div className="loading container">Loading details...</div>;
  if (khatra) return <div className="error container center">Error: {khatra}</div>;
  if (!data) return <div className="container center">No product found.</div>;

  return (
    <div className="product-detail-page container">
      <button className="back-btn" onClick={() => nav(-1)}>
        <ArrowLeft size={18} /> Go Back
      </button>
      
      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={data.images[0]} alt={data.title} />
        </div>
        
        <div className="product-detail-info">
          <span className="category-tag">{data.category}</span>
          <h1>{data.title}</h1>
          <p className="description">{data.description}</p>
          <p className="price">₹{(data.price * 80).toLocaleString('en-IN')}</p>
          <div className="meta">
            <p><strong>Brand:</strong> {data.brand}</p>
            <p><strong>Rating:</strong> {data.rating} / 5</p>
            <p><strong>Status:</strong> {data.stock > 0 ? "In Stock" : "Out of Stock"}</p>
          </div>
          
          <button className="add-to-cart-large" onClick={cartMeDalo}>
            <ShoppingCart size={20} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
