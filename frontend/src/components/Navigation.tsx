import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navigation() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const { getCartItemCount } = useCart();
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  
  const cartItemCount = getCartItemCount();

  return (
    <nav className="bg-dark/95 backdrop-blur-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/copilot.png" 
                alt="Copilot icon"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-light">OctoCAT Supply</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="text-light hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/products" className="text-light hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Products</Link>
              <Link to="/about" className="text-light hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About us</Link>
              {isAdmin && (
                <div className="relative">
                  <button 
                    onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                    className="text-light hover:text-primary px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    Admin
                    <svg 
                      className={`ml-1 h-4 w-4 transform ${adminMenuOpen ? 'rotate-180' : ''} transition-transform`}
                      fill="none" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  {adminMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-dark ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          to="/admin/products"
                          className="block px-4 py-2 text-sm text-light hover:bg-primary hover:text-white"
                          onClick={() => setAdminMenuOpen(false)}
                        >
                          Manage Products
                        </Link>
                        {/* Space for other entity management links */}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>          <div className="flex items-center space-x-4">
            {/* Cart Icon with Badge */}
            <Link to="/cart" className="relative text-light hover:text-primary transition-colors">
              <svg 
                className="h-6 w-6" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 21h12M9 19a1 1 0 100 2 1 1 0 000-2zm7 0a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
            </Link>
            
            {isLoggedIn ? (
              <>
                <span className="text-light text-sm">
                  {isAdmin && <span className="text-primary">(Admin) </span>}
                  Welcome!
                </span>
                <button 
                  onClick={logout}
                  className="text-light hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="bg-primary hover:bg-accent text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}