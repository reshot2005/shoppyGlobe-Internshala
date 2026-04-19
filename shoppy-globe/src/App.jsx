import React, { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";

// lazy loading pages to keep things snappy
const Home = lazy(() => import("./pages/Home"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const NotFound = lazy(() => import("./pages/NotFound"));

// layout wrapper for the whole app
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <main>
        <Suspense fallback={<div className="loading-fallback container">Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
      <footer className="footer">
        <p>&copy; 2026 ShoppyGlobe. Made with ❤️</p>
      </footer>
    </div>
  );
};

// routing configuration
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Suspense><NotFound /></Suspense>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
