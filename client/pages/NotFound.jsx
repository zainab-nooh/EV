import React from 'react';
import { Link } from 'react-router-dom';

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
        <div className="not-found__illustration">
          <svg 
            width="200" 
            height="200" 
            viewBox="0 0 200 200" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="100" r="80" stroke="#e0e0e0" strokeWidth="2" fill="none"/>
            <path 
              d="M70 80 Q100 50 130 80" 
              stroke="#666" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="80" cy="120" r="3" fill="#666"/>
            <circle cx="120" cy="120" r="3" fill="#666"/>
            <path 
              d="M80 140 Q100 120 120 140" 
              stroke="#666" 
              strokeWidth="3" 
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      <style jsx>{`
        .not-found {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .not-found__container {
          text-align: center;
          max-width: 600px;
          padding: 2rem;
        }

        .not-found__title {
          font-size: 8rem;
          font-weight: bold;
          margin: 0;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          background: linear-gradient(45deg, #fff, #f0f0f0);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .not-found__subtitle {
          font-size: 2rem;
          margin: 1rem 0;
          font-weight: 600;
        }

        .not-found__message {
          font-size: 1.1rem;
          margin: 1.5rem 0 2rem;
          opacity: 0.9;
          line-height: 1.6;
        }

        .not-found__actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn {
          padding: 12px 24px;
          border: none;
          border-radius: 6px;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          cursor: pointer;
          display: inline-block;
        }

        .btn-primary {
          background: rgba(255, 255, 255, 0.2);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
        }

        .btn-primary:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.5);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        .not-found__illustration {
          margin-top: 2rem;
          opacity: 0.7;
        }

        @media (max-width: 768px) {
          .not-found__title {
            font-size: 6rem;
          }

          .not-found__subtitle {
            font-size: 1.5rem;
          }

          .not-found__actions {
            flex-direction: column;
            align-items: center;
          }

          .btn {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;