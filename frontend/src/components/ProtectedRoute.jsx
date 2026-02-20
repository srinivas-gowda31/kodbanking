import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyJWT = async () => {
      try {
        // Try to access the balance endpoint to verify JWT is valid
        await api.get('/api/account/balance');
        setIsAuthenticated(true);
      } catch (error) {
        // If JWT is invalid or expired, redirect to login
        console.error('JWT verification failed:', error);
        localStorage.removeItem('username');
        localStorage.removeItem('userToken');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyJWT();
  }, []);

  // Show loading spinner while verifying JWT
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
          <p className="text-white/70">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
