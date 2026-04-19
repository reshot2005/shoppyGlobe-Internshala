import React from "react";
import ProductList from "../components/ProductList";

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>India's Favorite Marketplace</h1>
        <p>Premium quality products at the best prices, delivered to your doorstep.</p>
      </section>
      <div className="container">
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
