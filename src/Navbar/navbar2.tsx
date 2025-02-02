import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'Product', href: '/product' },
  { label: 'Customers', href: '/customers' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
  { label: 'Company', href: '/company' },
];

const Navbar2 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  // Check if user is logged in (based on token in localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Set true if token exists
  }, []);

  // Toggle Dark Mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token
    setIsLoggedIn(false); // Update state
    navigate('/'); // Redirect to home or login page
  };

  const handleAlert = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="PACX.ai Logo" className="h-8 w-8" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-600">
                PACX.ai
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={handleAlert}
                className="relative group text-gray-300 hover:text-teal-400 transition-colors duration-300"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* CTA Buttons and Dark Mode Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/chat"
              className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition-colors duration-300"
            >
              Chat With Gen AI
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="border border-teal-400 text-teal-400 px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-500 hover:text-white transition-colors duration-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/register"
                className="border border-teal-400 text-teal-400 px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-500 hover:text-white transition-colors duration-300"
              >
                Sign up for free
              </Link>
            )}
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              type="button"
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed top-20 right-4 bg-purple-800 border border-purple-700 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
          <span>🚀 Feature under development! Please check back later.</span>
        </div>
      )}

      {/* Mobile menu with transition */}
      <Transition
        show={isMobileMenuOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div
              ref={ref as React.RefObject<HTMLDivElement>}
              className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 bg-opacity-95 backdrop-blur-md"
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => {
                    handleAlert;
                    setIsMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400 hover:bg-gray-700 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 space-y-2">
                <Link
                  to="/chat"
                  className="block w-full text-center bg-teal-500 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-teal-600 transition-colors duration-300"
                >
                  Chat Now
                </Link>
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center border border-teal-400 text-teal-400 px-4 py-2 rounded-md text-base font-medium hover:bg-teal-500 hover:text-white transition-colors duration-300"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/register"
                    className="block w-full text-center border border-teal-400 text-teal-400 px-4 py-2 rounded-md text-base font-medium hover:bg-teal-500 hover:text-white transition-colors duration-300"
                  >
                    Sign up for free
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

export default Navbar2;
