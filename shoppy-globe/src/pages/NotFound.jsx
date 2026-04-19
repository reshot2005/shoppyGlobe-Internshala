import React from "react";
import { useRouteError, Link } from "react-router-dom";

const NotFound = () => {
  const galti = useRouteError();
  console.error(galti); // Log for debugging

  return (
    <div className="not-found-page container center">
      <div className="error-card">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>
        
        {galti && (
          <div className="error-details">
            <p><strong>Actual Error:</strong> {galti.statusText || galti.message}</p>
          </div>
        )}
        
        <Link to="/" className="home-link">Back to Home</Link>
      </div>
    </div>
  );
};

export default NotFound;
