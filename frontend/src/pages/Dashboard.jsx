import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showBalance, setShowBalance] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState({ message: '', type: '' });
  const [isSkeletonLoading, setIsSkeletonLoading] = useState(false);
  const username = localStorage.getItem('username');
  const confettiRef = useRef([]);

  // Session expiry check: verify JWT validity periodically
  useEffect(() => {
    const sessionCheckInterval = setInterval(async () => {
      try {
        await authService.getBalance();
      } catch (err) {
        if (err.response?.status === 401) {
          showToast('Session expired. Please login again.', 'error');
          localStorage.removeItem('username');
          localStorage.removeItem('userToken');
          setTimeout(() => navigate('/login'), 2000);
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(sessionCheckInterval);
  }, [navigate]);

  // Toast notification system
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    if (type !== 'error') {
      setTimeout(() => setToast({ message: '', type: '' }), 3000);
    }
  };

  // Generate confetti particles
  const generateConfetti = () => {
    const confetti = [];
    for (let i = 0; i < 50; i++) {
      confetti.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        duration: 2 + Math.random() * 1,
        size: 4 + Math.random() * 6,
        color: ['#ff6b6b', '#ffd93d', '#6bcf7f', '#4d96ff', '#a78bfa'][Math.floor(Math.random() * 5)],
      });
    }
    return confetti;
  };

  // Handle balance check with animations
  const handleCheckBalance = async () => {
    setShowBalance(false);
    setIsSkeletonLoading(true);
    setError('');

    // Simulate loading animation for better UX
    setTimeout(async () => {
      try {
        const response = await authService.getBalance();
        setBalance(response.data.balance);
        confettiRef.current = generateConfetti();
        setShowBalance(true);
        showToast('Balance fetched successfully! 🎉', 'success');

        // Auto-hide balance after 10 seconds
        setTimeout(() => setShowBalance(false), 10000);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Failed to fetch balance';
        setError(errorMessage);
        showToast(errorMessage, 'error');
      } finally {
        setIsSkeletonLoading(false);
      }
    }, 600);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('username');
      localStorage.removeItem('userToken');
      showToast('Logged out successfully', 'success');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error('Logout error:', err);
      showToast('Logout failed', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background with particles */}
      <div className="absolute inset-0 opacity-30 overflow-hidden">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Toast Notification */}
      {toast.message && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-3 rounded-lg backdrop-blur-md border animate-slideDown ${
          toast.type === 'success'
            ? 'bg-green-500/20 border-green-400/50 text-green-200'
            : 'bg-red-500/20 border-red-400/50 text-red-200'
        }`}>
          <span className="text-lg">
            {toast.type === 'success' ? '✓' : '✕'}
          </span>
          <p>{toast.message}</p>
        </div>
      )}

      {/* Main dashboard container */}
      <div className="w-full max-w-2xl relative z-10">
        {/* Header Card */}
        <div className="mb-6 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 hover:border-white/30 transition-all duration-300">
          <div className="flex justify-between items-start gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center font-bold text-xl text-white shadow-lg">
                  🏦
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white">KodBanking</h1>
                  <p className="text-white/50 text-xs md:text-sm">Secure Digital Banking</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-500/20 border border-red-400/50 text-red-200 rounded-lg hover:bg-red-500/30 transition-all duration-300 hover:shadow-lg active:scale-95 font-medium text-sm md:text-base whitespace-nowrap"
            >
              🚪 Logout
            </button>
          </div>

          {/* User info section */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/70 text-sm">Welcome back,</p>
            <p className="text-xl md:text-2xl font-bold text-white mt-1">
              {username || 'User'}
            </p>
            <div className="mt-3 inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/50 rounded-full">
              <span className="text-white/80 text-xs font-medium">👤 Premium Customer</span>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-10 border border-white/20 hover:border-white/30 transition-all duration-300 relative overflow-hidden">
          {/* Gradient overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/5 opacity-0 hover:opacity-100 transition-opacity rounded-3xl duration-300" />

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm animate-slideDown">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Skeleton Loader */}
          {isSkeletonLoading && (
            <div className="mb-8">
              <div className="h-6 bg-white/10 rounded-lg mb-4 w-32 animate-pulse" />
              <div className="h-16 bg-white/10 rounded-lg animate-pulse" />
            </div>
          )}

          {/* Balance Display with Animations */}
          {showBalance && balance !== null && !isSkeletonLoading && (
            <div className="mb-8 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-teal-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
              
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-400/50 rounded-2xl p-8 text-center relative overflow-hidden group animate-slideDown">
                {/* Glow effect background */}
                <div className="absolute inset-0 bg-radial opacity-0 group-hover:opacity-50 transition-opacity" />

                <p className="text-white/70 text-sm font-medium mb-2 relative z-10">Your Current Balance</p>
                
                <p className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent animate-popIn relative z-10">
                  ₹{balance.toLocaleString('en-IN')}
                </p>

                <p className="text-green-200/60 text-xs mt-3 relative z-10">Safe & Secure • Updated Now</p>

                {/* Confetti burst effect */}
                {confettiRef.current.length > 0 && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {confettiRef.current.map(particle => (
                      <div
                        key={particle.id}
                        className="absolute pointer-events-none"
                        style={{
                          left: `${particle.left}%`,
                          top: '50%',
                          width: `${particle.size}px`,
                          height: `${particle.size}px`,
                          backgroundColor: particle.color,
                          borderRadius: '50%',
                          animation: `confettiFall ${particle.duration}s ease-out forwards`,
                          animationDelay: `${particle.delay}s`,
                          opacity: 0.8,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Check Balance Button */}
          <button
            onClick={handleCheckBalance}
            disabled={loading || isSkeletonLoading}
            className="w-full py-4 px-6 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-xl transitions-all duration-300 hover:shadow-2xl hover:shadow-purple-500/50 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-lg relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isSkeletonLoading || loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Fetching Balance...</span>
                </>
              ) : (
                <>
                  <span className="text-xl">💰</span>
                  <span>Check Balance</span>
                </>
              )}
            </span>
            {/* Ripple effect on hover */}
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-20 group-active:opacity-40 transition-opacity rounded-xl" />
          </button>

          {/* Security info footer */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="group cursor-pointer">
                <p className="text-white/50 text-xs mb-1">🔐 Encryption</p>
                <p className="text-white/70 text-xs group-hover:text-white transition">End-to-End</p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-white/50 text-xs mb-1">✓ Verified</p>
                <p className="text-white/70 text-xs group-hover:text-white transition">JWT Auth</p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-white/50 text-xs mb-1">⚡ Live</p>
                <p className="text-white/70 text-xs group-hover:text-white transition">Real-time</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-white/50 text-xs">
            © 2026 KodBanking. All rights reserved. | Secure Digital Banking Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
