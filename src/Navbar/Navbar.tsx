// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';
// import { FaBars, FaTimes } from 'react-icons/fa';

// const Navbar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-logo">MyLogo</div>
//       <ul className={`navbar-links ${isOpen ? 'navbar-links--open' : ''}`}>
//         <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
//         <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
//         <li><Link to="/services" onClick={toggleMenu}>Services</Link></li>
//         <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
//       </ul>
//       <div className="navbar-icon" onClick={toggleMenu}>
//         {isOpen ? <FaTimes /> : <FaBars />}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
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

  return (
    // <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-teal-50 to-teal-100">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-semibold">PredictWiseAI</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
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
            <Link
              to="/signup"
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Sign up for free
            </Link>
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

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 space-y-2">
              <Link
                to="/chat"
                className="block w-full text-center bg-teal-700 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-teal-900"
              >
                Chat Now
              </Link>
              <Link
                to="/signup"
                className="block w-full text-center border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-base font-medium hover:bg-gray-50"
              >
                Sign up for free
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
