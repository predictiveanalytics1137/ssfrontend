


import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

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

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleAlert = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevents routing
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // Hides the alert after 3 seconds
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-50 to-teal-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold">PACX.ai</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                onClick={handleAlert}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/chat"
              className="bg-teal-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-700"
            >
              Chat With Gen AI
            </Link>
            <button
              onClick={handleAlert}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Sign up for free
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2 rounded-md text-gray-700 hover:text-gray-900"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed top-20 right-4 bg-yellow-100 border border-yellow-300 text-yellow-700 px-4 py-2 rounded shadow-md">
          <span>Feature under development! Please check back later.</span>
        </div>
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href="#"
                onClick={handleAlert}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-4 space-y-2">
              <Link
                to="/chat"
                className="block w-full text-center bg-teal-700 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-teal-900"
              >
                Chat Now
              </Link>
              <button
                onClick={handleAlert}
                className="block w-full text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                Sign up for free
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
