import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileMenu = ({ isOpen, onClose, navLinks, location }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-out">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-secondary">MIGUEL</span>
            <span className="text-xl font-bold text-primary">SPORTS</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="p-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={onClose}
              className={`block py-3 px-4 font-medium transition-colors rounded-lg ${
                location.pathname === link.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-secondary hover:bg-gray-50 hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <p className="text-xs text-gray-500 text-center">
            © 2026 Miguel Sports
          </p>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ cartCount, onCartClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { path: '/', label: 'Inicio' },
    { path: '/about', label: 'Nuestra Empresa' },
    { path: '/shop', label: 'Tienda' },
    { path: '/contact', label: 'Contacto' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-1 sm:gap-2">
              <span className="text-lg sm:text-2xl font-bold text-secondary">MIGUEL</span>
              <span className="text-lg sm:text-2xl font-bold text-primary">SPORTS</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-medium text-sm xl:text-base transition-colors ${
                    location.pathname === link.path
                      ? 'text-primary'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Cart & Mobile Menu Button */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => onCartClick()}
                className="relative p-2 text-secondary hover:text-primary transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] sm:text-xs w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 text-secondary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        location={location}
      />
    </>
  );
};

export default Navbar;
