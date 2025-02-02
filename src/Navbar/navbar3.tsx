import { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

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

const Navbar3 = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleAlert = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <>
      {/* Initial spacer to prevent content hiding */}
      <div className="h-24" aria-hidden="true" />
      
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav 
          className={`transition-all duration-300 ${
            isScrolled 
              ? 'bg-purple-950/90 backdrop-blur-md shadow-lg' 
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-24">
              {/* Logo */}
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold text-white tracking-tight">
                  PACX.ai
                </span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={handleAlert}
                    className="relative px-4 py-2 text-sm font-medium text-white/90 hover:text-white rounded-lg hover:bg-white/5 transition-all group"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <Link
                  to="/chat"
                  className="group relative inline-flex items-center bg-purple-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all hover:shadow-lg hover:shadow-purple-500/25"
                >
                  <Sparkles className="w-4 h-4 mr-2 opacity-70 group-hover:opacity-100 transition-opacity" />
                  Chat With Gen AI
                </Link>
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                  >
                    Sign up
                  </Link>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                className="md:hidden p-2.5 rounded-lg text-white/90 hover:text-white hover:bg-white/5 transition-all"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-purple-950/95 backdrop-blur-xl border-t border-white/5">
              <div className="px-4 py-4 space-y-1">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={handleAlert}
                    className="block px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-lg text-base font-medium transition-all"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="mt-6 pt-6 space-y-4 border-t border-white/5">
                  <Link
                    to="/chat"
                    className="flex items-center justify-center w-full bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-lg text-base font-medium transition-all"
                  >
                    <Sparkles className="w-4 h-4 mr-2 opacity-70" />
                    Chat With Gen AI
                  </Link>
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2.5 text-white/80 hover:text-white hover:bg-white/5 rounded-lg text-base font-medium transition-all"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/register"
                      className="w-full px-4 py-2.5 text-center text-white/80 hover:text-white hover:bg-white/5 rounded-lg text-base font-medium transition-all"
                    >
                      Sign up
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Alert Notification */}
        {showAlert && (
          <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-purple-900/90 backdrop-blur-xl text-white px-6 py-3 rounded-lg shadow-lg">
            Feature under development! Please check back later.
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar3;