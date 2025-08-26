import React from 'react';
import { Link } from 'react-router-dom';
import style from "../../pages/NotFound/NotFound.module.scss"

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found__container">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>
          <h2 className="not-found__subtitle">Page Not Found</h2>
          <p className="not-found__message">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <div className="not-found__actions">
            <Link to="/" className="btn btn-primary">
              Go Home
            </Link>
            <Link to="/create-booking" className="btn btn-secondary">
              Create Booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;