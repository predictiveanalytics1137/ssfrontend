// // // // // // import { useState, useEffect } from 'react';
// // // // // // import { Menu, X, Sun, Moon } from 'lucide-react';
// // // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // // import { Transition } from '@headlessui/react';

// // // // // // interface NavItem {
// // // // // //   label: string;
// // // // // //   href: string;
// // // // // // }

// // // // // // const navItems: NavItem[] = [
// // // // // //   { label: 'Product', href: '/product' },
// // // // // //   { label: 'Customers', href: '/customers' },
// // // // // //   { label: 'Pricing', href: '/pricing' },
// // // // // //   { label: 'Resources', href: '/resources' },
// // // // // //   { label: 'Company', href: '/company' },
// // // // // // ];

// // // // // // const Navbar2 = () => {
// // // // // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // // // // //   const [showAlert, setShowAlert] = useState(false);
// // // // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // // // // //   const [isDarkMode, setIsDarkMode] = useState(false);
// // // // // //   const navigate = useNavigate();

// // // // // //   // Check if user is logged in (based on token in localStorage)
// // // // // //   useEffect(() => {
// // // // // //     const token = localStorage.getItem('token');
// // // // // //     setIsLoggedIn(!!token); // Set true if token exists
// // // // // //   }, []);

// // // // // //   // Toggle Dark Mode
// // // // // //   useEffect(() => {
// // // // // //     if (isDarkMode) {
// // // // // //       document.documentElement.classList.add('dark');
// // // // // //     } else {
// // // // // //       document.documentElement.classList.remove('dark');
// // // // // //     }
// // // // // //   }, [isDarkMode]);

// // // // // //   const handleLogout = () => {
// // // // // //     localStorage.removeItem('token'); // Remove the token
// // // // // //     setIsLoggedIn(false); // Update state
// // // // // //     navigate('/'); // Redirect to home or login page
// // // // // //   };

// // // // // //   const handleAlert = (e: React.MouseEvent) => {
// // // // // //     e.preventDefault();
// // // // // //     setShowAlert(true);
// // // // // //     setTimeout(() => setShowAlert(false), 3000);
// // // // // //   };

// // // // // //   const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

// // // // // //   return (
// // // // // //     <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white z-50 shadow-lg">
// // // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // // // //         <div className="flex justify-between items-center h-16">
// // // // // //           {/* Logo */}
// // // // // //           <div className="flex-shrink-0 flex items-center">
// // // // // //             <Link to="/" className="flex items-center space-x-2">
// // // // // //               <img src="/logo.png" alt="PACX.ai Logo" className="h-8 w-8" />
// // // // // //               <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-600">
// // // // // //                 PACX.ai
// // // // // //               </span>
// // // // // //             </Link>
// // // // // //           </div>

// // // // // //           {/* Desktop Navigation */}
// // // // // //           <div className="hidden md:flex items-center space-x-6">
// // // // // //             {navItems.map((item) => (
// // // // // //               <Link
// // // // // //                 key={item.label}
// // // // // //                 to={item.href}
// // // // // //                 onClick={handleAlert}
// // // // // //                 className="relative group text-gray-300 hover:text-teal-400 transition-colors duration-300"
// // // // // //               >
// // // // // //                 {item.label}
// // // // // //                 <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-teal-400 transition-all group-hover:w-full"></span>
// // // // // //               </Link>
// // // // // //             ))}
// // // // // //           </div>

// // // // // //           {/* CTA Buttons and Dark Mode Toggle */}
// // // // // //           <div className="hidden md:flex items-center space-x-4">
// // // // // //             <Link
// // // // // //               to="/chat"
// // // // // //               className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition-colors duration-300"
// // // // // //             >
// // // // // //               Chat With Gen AI
// // // // // //             </Link>
// // // // // //             {isLoggedIn ? (
// // // // // //               <button
// // // // // //                 onClick={handleLogout}
// // // // // //                 className="border border-teal-400 text-teal-400 px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-500 hover:text-white transition-colors duration-300"
// // // // // //               >
// // // // // //                 Logout
// // // // // //               </button>
// // // // // //             ) : (
// // // // // //               <Link
// // // // // //                 to="/register"
// // // // // //                 className="border border-teal-400 text-teal-400 px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-500 hover:text-white transition-colors duration-300"
// // // // // //               >
// // // // // //                 Sign up for free
// // // // // //               </Link>
// // // // // //             )}
// // // // // //             {/* Dark Mode Toggle */}
// // // // // //             <button
// // // // // //               onClick={toggleDarkMode}
// // // // // //               className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
// // // // // //               aria-label="Toggle Dark Mode"
// // // // // //             >
// // // // // //               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
// // // // // //             </button>
// // // // // //           </div>

// // // // // //           {/* Mobile menu button */}
// // // // // //           <div className="md:hidden flex items-center space-x-2">
// // // // // //             {/* Dark Mode Toggle */}
// // // // // //             <button
// // // // // //               onClick={toggleDarkMode}
// // // // // //               className="p-2 rounded-md hover:bg-gray-700 transition-colors duration-300"
// // // // // //               aria-label="Toggle Dark Mode"
// // // // // //             >
// // // // // //               {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
// // // // // //             </button>
// // // // // //             <button
// // // // // //               type="button"
// // // // // //               className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-300"
// // // // // //               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// // // // // //               aria-controls="mobile-menu"
// // // // // //               aria-expanded={isMobileMenuOpen}
// // // // // //             >
// // // // // //               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Alert Notification */}
// // // // // //       {showAlert && (
// // // // // //         <div className="fixed top-20 right-4 bg-purple-800 border border-purple-700 text-white px-4 py-2 rounded shadow-lg animate-fade-in">
// // // // // //           <span>🚀 Feature under development! Please check back later.</span>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Mobile menu with transition */}
// // // // // //       <Transition
// // // // // //         show={isMobileMenuOpen}
// // // // // //         enter="transition ease-out duration-300 transform"
// // // // // //         enterFrom="opacity-0 -translate-y-2"
// // // // // //         enterTo="opacity-100 translate-y-0"
// // // // // //         leave="transition ease-in duration-200 transform"
// // // // // //         leaveFrom="opacity-100 translate-y-0"
// // // // // //         leaveTo="opacity-0 -translate-y-2"
// // // // // //       >
// // // // // //         {(ref) => (
// // // // // //           <div className="md:hidden" id="mobile-menu">
// // // // // //             <div
// // // // // //               ref={ref as React.RefObject<HTMLDivElement>}
// // // // // //               className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-800 bg-opacity-95 backdrop-blur-md"
// // // // // //             >
// // // // // //               {navItems.map((item) => (
// // // // // //                 <Link
// // // // // //                   key={item.label}
// // // // // //                   to={item.href}
// // // // // //                   onClick={() => {
// // // // // //                     handleAlert;
// // // // // //                     setIsMobileMenuOpen(false);
// // // // // //                   }}
// // // // // //                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-teal-400 hover:bg-gray-700 transition-colors duration-300"
// // // // // //                 >
// // // // // //                   {item.label}
// // // // // //                 </Link>
// // // // // //               ))}
// // // // // //               <div className="mt-4 space-y-2">
// // // // // //                 <Link
// // // // // //                   to="/chat"
// // // // // //                   className="block w-full text-center bg-teal-500 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-teal-600 transition-colors duration-300"
// // // // // //                 >
// // // // // //                   Chat Now
// // // // // //                 </Link>
// // // // // //                 {isLoggedIn ? (
// // // // // //                   <button
// // // // // //                     onClick={() => {
// // // // // //                       handleLogout();
// // // // // //                       setIsMobileMenuOpen(false);
// // // // // //                     }}
// // // // // //                     className="block w-full text-center border border-teal-400 text-teal-400 px-4 py-2 rounded-md text-base font-medium hover:bg-teal-500 hover:text-white transition-colors duration-300"
// // // // // //                   >
// // // // // //                     Logout
// // // // // //                   </button>
// // // // // //                 ) : (
// // // // // //                   <Link
// // // // // //                     to="/register"
// // // // // //                     className="block w-full text-center border border-teal-400 text-teal-400 px-4 py-2 rounded-md text-base font-medium hover:bg-teal-500 hover:text-white transition-colors duration-300"
// // // // // //                   >
// // // // // //                     Sign up for free
// // // // // //                   </Link>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </Transition>
// // // // // //     </nav>
// // // // // //   );
// // // // // // };

// // // // // // export default Navbar2;





// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { Menu, X, Star } from 'lucide-react';
// // // // // import { Link, useNavigate } from 'react-router-dom';
// // // // // import { Transition } from '@headlessui/react';

// // // // // interface NavItem {
// // // // //   label: string;
// // // // //   href: string;
// // // // // }

// // // // // const navItems: NavItem[] = [
// // // // //   { label: 'Product', href: '/product' },
// // // // //   { label: 'Customers', href: '/customers' },
// // // // //   { label: 'Pricing', href: '/pricing' },
// // // // //   { label: 'Resources', href: '/resources' },
// // // // //   { label: 'Company', href: '/company' },
// // // // // ];

// // // // // const Navbar2: React.FC = () => {
// // // // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // // // //   const [showAlert, setShowAlert] = useState(false);
// // // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // // // //   const navigate = useNavigate();

// // // // //   useEffect(() => {
// // // // //     const token = localStorage.getItem('token');
// // // // //     setIsLoggedIn(!!token);
// // // // //   }, []);

// // // // //   const handleLogout = () => {
// // // // //     localStorage.removeItem('token');
// // // // //     setIsLoggedIn(false);
// // // // //     navigate('/');
// // // // //   };

// // // // //   const handleAlert = (e: React.MouseEvent) => {
// // // // //     e.preventDefault();
// // // // //     setShowAlert(true);
// // // // //     setTimeout(() => setShowAlert(false), 3000);
// // // // //   };

// // // // //   return (
// // // // //     <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md text-[#1A1A1A] z-50 shadow-lg border-b border-[#5B3557]/20">
// // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center relative">
// // // // //         {/* Cosmic particle animation */}
// // // // //         <div className="absolute inset-0 overflow-hidden">
// // // // //           {[...Array(20)].map((_, i) => (
// // // // //             <div
// // // // //               key={i}
// // // // //               className="absolute w-1 h-1 bg-[#9b5de5]/40 rounded-full"
// // // // //               style={{
// // // // //                 top: `${Math.random() * 100}%`,
// // // // //                 left: `${Math.random() * 100}%`,
// // // // //                 animation: `float ${5 + Math.random() * 5}s linear infinite`,
// // // // //                 animationDelay: `${Math.random() * 5}s`
// // // // //               }}
// // // // //             />
// // // // //           ))}
// // // // //         </div>

// // // // //         <div className="flex-shrink-0 flex items-center z-10">
// // // // //           <Link to="/" className="flex items-center space-x-2">
// // // // //             <div className="w-10 h-10 bg-gradient-to-br from-[#5B3557] to-[#9b5de5] rounded-full flex items-center justify-center shadow-md glow">
// // // // //               <span className="text-white font-bold text-xl">P</span>
// // // // //             </div>
// // // // //             <span className="text-2xl font-bold text-[#5B3557]">
// // // // //               PACX.ai
// // // // //             </span>
// // // // //           </Link>
// // // // //         </div>

// // // // //         {/* Desktop Navigation */}
// // // // //         <div className="hidden md:flex items-center space-x-8 ml-auto z-10">
// // // // //           {navItems.map((item) => (
// // // // //             <Link
// // // // //               key={item.label}
// // // // //               to={item.href}
// // // // //               onClick={handleAlert}
// // // // //               className="relative text-gray-700 hover:text-[#5B3557] transition-colors duration-300 font-medium text-sm"
// // // // //             >
// // // // //               {item.label}
// // // // //               <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#5B3557] transition-all group-hover:w-full"></span>
// // // // //             </Link>
// // // // //           ))}
// // // // //         </div>

// // // // //         {/* CTA Buttons */}
// // // // //         <div className="hidden md:flex items-center space-x-4 ml-8 z-10">
// // // // //           <Link
// // // // //             to="/chat"
// // // // //             className="bg-[#5B3557] hover:bg-[#4a2a46] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300"
// // // // //           >
// // // // //             Chat With Gen AI
// // // // //           </Link>
// // // // //           {isLoggedIn ? (
// // // // //             <button
// // // // //               onClick={handleLogout}
// // // // //               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
// // // // //             >
// // // // //               Logout
// // // // //             </button>
// // // // //           ) : (
// // // // //             <Link
// // // // //               to="/register"
// // // // //               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
// // // // //             >
// // // // //               Sign Up
// // // // //             </Link>
// // // // //           )}
// // // // //         </div>

// // // // //         {/* Mobile menu button */}
// // // // //         <div className="md:hidden flex items-center space-x-2 ml-auto z-10">
// // // // //           <button
// // // // //             type="button"
// // // // //             className="p-2 rounded-full text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
// // // // //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// // // // //             aria-controls="mobile-menu"
// // // // //             aria-expanded={isMobileMenuOpen}
// // // // //           >
// // // // //             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Alert Notification */}
// // // // //       {showAlert && (
// // // // //         <div className="fixed top-20 right-4 bg-[#5B3557] border border-[#4a2a46] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
// // // // //           <span>🚀 Feature under development! Check back later.</span>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Mobile menu with transition */}
// // // // //       <Transition
// // // // //         show={isMobileMenuOpen}
// // // // //         enter="transition ease-out duration-300 transform"
// // // // //         enterFrom="opacity-0 -translate-y-2"
// // // // //         enterTo="opacity-100 translate-y-0"
// // // // //         leave="transition ease-in duration-200 transform"
// // // // //         leaveFrom="opacity-100 translate-y-0"
// // // // //         leaveTo="opacity-0 -translate-y-2"
// // // // //       >
// // // // //         {(ref) => (
// // // // //           <div className="md:hidden" id="mobile-menu">
// // // // //             <div
// // // // //               ref={ref as React.RefObject<HTMLDivElement>}
// // // // //               className="px-2 pt-2 pb-3 space-y-1 bg-white bg-opacity-95 border-t border-gray-200"
// // // // //             >
// // // // //               {navItems.map((item) => (
// // // // //                 <Link
// // // // //                   key={item.label}
// // // // //                   to={item.href}
// // // // //                   onClick={() => {
// // // // //                     handleAlert;
// // // // //                     setIsMobileMenuOpen(false);
// // // // //                   }}
// // // // //                   className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
// // // // //                 >
// // // // //                   {item.label}
// // // // //                 </Link>
// // // // //               ))}
// // // // //               <div className="mt-4 space-y-2 px-2">
// // // // //                 <Link
// // // // //                   to="/chat"
// // // // //                   className="block w-full text-center bg-[#5B3557] hover:bg-[#4a2a46] text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// // // // //                 >
// // // // //                   Chat Now
// // // // //                 </Link>
// // // // //                 {isLoggedIn ? (
// // // // //                   <button
// // // // //                     onClick={() => {
// // // // //                       handleLogout();
// // // // //                       setIsMobileMenuOpen(false);
// // // // //                     }}
// // // // //                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// // // // //                   >
// // // // //                     Logout
// // // // //                   </button>
// // // // //                 ) : (
// // // // //                   <Link
// // // // //                     to="/register"
// // // // //                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// // // // //                   >
// // // // //                     Sign Up
// // // // //                   </Link>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </Transition>
// // // // //     </nav>
// // // // //   );
// // // // // };

// // // // // export default Navbar2;




// // // // import React, { useState, useEffect } from 'react';
// // // // import { Menu, X, Star } from 'lucide-react';
// // // // import { Link, useNavigate } from 'react-router-dom';
// // // // import { Transition } from '@headlessui/react';

// // // // interface NavItem {
// // // //   label: string;
// // // //   href: string;
// // // // }

// // // // const navItems: NavItem[] = [
// // // //   { label: 'Product', href: '/product' },
// // // //   { label: 'Customers', href: '/customers' },
// // // //   { label: 'Pricing', href: '/pricing' },
// // // //   { label: 'Resources', href: '/resources' },
// // // //   { label: 'Company', href: '/company' },
// // // // ];

// // // // const Navbar2: React.FC = () => {
// // // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // // //   const [showAlert, setShowAlert] = useState(false);
// // // //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// // // //   const navigate = useNavigate();

// // // //   useEffect(() => {
// // // //     const token = localStorage.getItem('token');
// // // //     setIsLoggedIn(!!token);
// // // //   }, []);

// // // //   const handleLogout = () => {
// // // //     localStorage.removeItem('token');
// // // //     setIsLoggedIn(false);
// // // //     navigate('/');
// // // //   };

// // // //   const handleAlert = (e: React.MouseEvent) => {
// // // //     e.preventDefault();
// // // //     setShowAlert(true);
// // // //     setTimeout(() => setShowAlert(false), 3000);
// // // //   };

// // // //   return (
// // // //     <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md text-[#1A1A1A] z-50 shadow-lg border-b border-[#5B3557]/20">
// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center relative">
// // // //         {/* Cosmic particle animation */}
// // // //         <div className="absolute inset-0 overflow-hidden">
// // // //           {[...Array(20)].map((_, i) => (
// // // //             <div
// // // //               key={i}
// // // //               className="absolute w-1 h-1 bg-[#9b5de5]/40 rounded-full"
// // // //               style={{
// // // //                 top: `${Math.random() * 100}%`,
// // // //                 left: `${Math.random() * 100}%`,
// // // //                 animation: `float ${5 + Math.random() * 5}s linear infinite`,
// // // //                 animationDelay: `${Math.random() * 5}s`
// // // //               }}
// // // //             />
// // // //           ))}
// // // //         </div>

// // // //         <div className="flex-shrink-0 flex items-center z-10">
// // // //           <Link to="/" className="flex items-center space-x-2">
// // // //             <div className="w-10 h-10 bg-gradient-to-br from-[#5B3557] to-[#9b5de5] rounded-full flex items-center justify-center shadow-md glow">
// // // //               <span className="text-white font-bold text-xl">P</span>
// // // //             </div>
// // // //             <span className="text-2xl font-bold text-[#5B3557]">
// // // //               PACX.ai
// // // //             </span>
// // // //           </Link>
// // // //         </div>

// // // //         {/* Desktop Navigation */}
// // // //         <div className="hidden md:flex items-center space-x-8 ml-auto z-10">
// // // //           {navItems.map((item) => (
// // // //             <Link
// // // //               key={item.label}
// // // //               to={item.href}
// // // //               onClick={handleAlert}
// // // //               className="relative text-gray-700 hover:text-[#5B3557] transition-colors duration-300 font-medium text-sm"
// // // //             >
// // // //               {item.label}
// // // //               <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-[#5B3557] transition-all group-hover:w-full"></span>
// // // //             </Link>
// // // //           ))}
// // // //         </div>

// // // //         {/* CTA Buttons */}
// // // //         <div className="hidden md:flex items-center space-x-4 ml-8 z-10">
// // // //           <Link
// // // //             to="/chat"
// // // //             className="bg-[#5B3557] hover:bg-[#4a2a46] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300"
// // // //           >
// // // //             Chat With Gen AI
// // // //           </Link>
// // // //           {isLoggedIn ? (
// // // //             <button
// // // //               onClick={handleLogout}
// // // //               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
// // // //             >
// // // //               Logout
// // // //             </button>
// // // //           ) : (
// // // //             <Link
// // // //               to="/register"
// // // //               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
// // // //             >
// // // //               Sign Up
// // // //             </Link>
// // // //           )}
// // // //         </div>

// // // //         {/* Mobile menu button */}
// // // //         <div className="md:hidden flex items-center space-x-2 ml-auto z-10">
// // // //           <button
// // // //             type="button"
// // // //             className="p-2 rounded-full text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
// // // //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// // // //             aria-controls="mobile-menu"
// // // //             aria-expanded={isMobileMenuOpen}
// // // //           >
// // // //             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Alert Notification */}
// // // //       {showAlert && (
// // // //         <div className="fixed top-20 right-4 bg-[#5B3557] border border-[#4a2a46] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
// // // //           <span>🚀 Feature under development! Check back later.</span>
// // // //         </div>
// // // //       )}

// // // //       {/* Mobile menu with transition */}
// // // //       <Transition
// // // //         show={isMobileMenuOpen}
// // // //         enter="transition ease-out duration-300 transform"
// // // //         enterFrom="opacity-0 -translate-y-2"
// // // //         enterTo="opacity-100 translate-y-0"
// // // //         leave="transition ease-in duration-200 transform"
// // // //         leaveFrom="opacity-100 translate-y-0"
// // // //         leaveTo="opacity-0 -translate-y-2"
// // // //       >
// // // //         {(ref) => (
// // // //           <div className="md:hidden" id="mobile-menu">
// // // //             <div
// // // //               ref={ref as React.RefObject<HTMLDivElement>}
// // // //               className="px-2 pt-2 pb-3 space-y-1 bg-white bg-opacity-95 border-t border-gray-200"
// // // //             >
// // // //               {navItems.map((item) => (
// // // //                 <Link
// // // //                   key={item.label}
// // // //                   to={item.href}
// // // //                   onClick={() => {
// // // //                     handleAlert;
// // // //                     setIsMobileMenuOpen(false);
// // // //                   }}
// // // //                   className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
// // // //                 >
// // // //                   {item.label}
// // // //                 </Link>
// // // //               ))}
// // // //               <div className="mt-4 space-y-2 px-2">
// // // //                 <Link
// // // //                   to="/chat"
// // // //                   className="block w-full text-center bg-[#5B3557] hover:bg-[#4a2a46] text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// // // //                 >
// // // //                   Chat Now
// // // //                 </Link>
// // // //                 {isLoggedIn ? (
// // // //                   <button
// // // //                     onClick={() => {
// // // //                       handleLogout();
// // // //                       setIsMobileMenuOpen(false);
// // // //                     }}
// // // //                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// // // //                   >
// // // //                     Logout
// // // //                   </button>
// // // //                 ) : (
// // // //                   <Link
// // // //                     to="/register"
// // // //                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// // // //                   >
// // // //                     Sign Up
// // // //                   </Link>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </Transition>
// // // //     </nav>
// // // //   );
// // // // };

// // // // export default Navbar2;





// // import React, { useState, useEffect } from 'react';
// // import { Menu, X } from 'lucide-react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { Transition } from '@headlessui/react';

// // interface NavItem {
// //   label: string;
// //   href: string;
// // }

// // const navItems: NavItem[] = [
// //   { label: 'Product', href: '/product' },
// //   { label: 'Customers', href: '/customers' },
// //   { label: 'Pricing', href: '/pricing' },
// //   { label: 'Resources', href: '/resources' },
// //   { label: 'Company', href: '/company' },
// // ];

// // const Navbar2: React.FC = () => {
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [showAlert, setShowAlert] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     setIsLoggedIn(!!token);
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     setIsLoggedIn(false);
// //     navigate('/');
// //   };

// //   const handleAlert = (e: React.MouseEvent) => {
// //     e.preventDefault();
// //     setShowAlert(true);
// //     setTimeout(() => setShowAlert(false), 3000);
// //   };

// //   return (
// //     <nav className="fixed top-0 left-0 right-0 bg-[#F9F3FA]/80 backdrop-blur-md text-[#1A1A1A] z-50 shadow-lg border-b border-[#5B3557]/20">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center relative">
// //         {/* Cosmic particle animation */}
// //         <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //           {[...Array(20)].map((_, i) => (
// //             <div
// //               key={i}
// //               className="absolute w-1 h-1 bg-[#9b5de5]/40 rounded-full"
// //               style={{
// //                 top: `${Math.random() * 100}%`,
// //                 left: `${Math.random() * 100}%`,
// //                 animation: `float ${5 + Math.random() * 5}s linear infinite`,
// //                 animationDelay: `${Math.random() * 5}s`
// //               }}
// //             />
// //           ))}
// //         </div>

// //         {/* Logo */}
// //         <div className="flex-shrink-0 flex items-center z-10">
// //           <Link to="/" className="flex items-center space-x-2">
// //             <div className="w-10 h-10 bg-gradient-to-br from-[#5B3557] to-[#9b5de5] rounded-full flex items-center justify-center shadow-md glow">
// //               <span className="text-white font-bold text-xl">P</span>
// //             </div>
// //             <span className="text-2xl font-bold text-[#5B3557]">
// //               PACX.ai
// //             </span>
// //           </Link>
// //         </div>

// //         {/* Desktop Navigation */}
// //         <div className="hidden md:flex items-center space-x-8 ml-auto z-10">
// //           {navItems.map((item) => (
// //             <Link
// //               key={item.label}
// //               to={item.href}
// //               onClick={handleAlert}
// //               className="relative text-gray-700 hover:text-[#5B3557] transition-colors duration-300 font-medium text-sm"
// //             >
// //               {item.label}
// //             </Link>
// //           ))}
// //         </div>

// //         {/* CTA Buttons */}
// //         <div className="hidden md:flex items-center space-x-4 ml-8 z-10">
// //           <Link
// //             to="/chat"
// //             className="bg-[#5B3557] hover:bg-[#4a2a46] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300"
// //           >
// //             Chat With Gen AI
// //           </Link>
// //           {isLoggedIn ? (
// //             <button
// //               onClick={handleLogout}
// //               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
// //             >
// //               Logout
// //             </button>
// //           ) : (
// //             <Link
// //               to="/register"
// //               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
// //             >
// //               Sign Up
// //             </Link>
// //           )}
// //         </div>

// //         {/* Mobile menu button */}
// //         <div className="md:hidden flex items-center space-x-2 ml-auto z-10">
// //           <button
// //             type="button"
// //             className="p-2 rounded-full text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
// //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //             aria-controls="mobile-menu"
// //             aria-expanded={isMobileMenuOpen}
// //           >
// //             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Alert Notification */}
// //       {showAlert && (
// //         <div className="fixed top-20 right-4 bg-[#5B3557] border border-[#4a2a46] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
// //           <span>🚀 Feature under development! Check back later.</span>
// //         </div>
// //       )}

// //       {/* Mobile menu with transition */}
// //       <Transition
// //         show={isMobileMenuOpen}
// //         enter="transition ease-out duration-300 transform"
// //         enterFrom="opacity-0 -translate-y-2"
// //         enterTo="opacity-100 translate-y-0"
// //         leave="transition ease-in duration-200 transform"
// //         leaveFrom="opacity-100 translate-y-0"
// //         leaveTo="opacity-0 -translate-y-2"
// //       >
// //         {(ref) => (
// //           <div className="md:hidden" id="mobile-menu">
// //             <div
// //               ref={ref as React.RefObject<HTMLDivElement>}
// //               className="px-2 pt-2 pb-3 space-y-1 bg-[#F9F3FA] bg-opacity-95 border-t border-gray-200"
// //             >
// //               {navItems.map((item) => (
// //                 <Link
// //                   key={item.label}
// //                   to={item.href}
// //                   onClick={() => {
// //                     handleAlert;
// //                     setIsMobileMenuOpen(false);
// //                   }}
// //                   className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
// //                 >
// //                   {item.label}
// //                 </Link>
// //               ))}
// //               <div className="mt-4 space-y-2 px-2">
// //                 <Link
// //                   to="/chat"
// //                   className="block w-full text-center bg-[#5B3557] hover:bg-[#4a2a46] text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// //                 >
// //                   Chat Now
// //                 </Link>
// //                 {isLoggedIn ? (
// //                   <button
// //                     onClick={() => {
// //                       handleLogout();
// //                       setIsMobileMenuOpen(false);
// //                     }}
// //                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// //                   >
// //                     Logout
// //                   </button>
// //                 ) : (
// //                   <Link
// //                     to="/register"
// //                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// //                   >
// //                     Sign Up
// //                   </Link>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </Transition>

// //       {/* Keyframes for floating particles & alert fade-in */}
// //       <style>{`
// //         @keyframes float {
// //           0% { transform: translateY(0) translateX(0); }
// //           33% { transform: translateY(-50px) translateX(20px); }
// //           66% { transform: translateY(30px) translateX(-20px); }
// //           100% { transform: translateY(0) translateX(0); }
// //         }
// //         @keyframes fade-in {
// //           0% { opacity: 0; transform: translateY(-10px); }
// //           100% { opacity: 1; transform: translateY(0); }
// //         }
// //         .animate-fade-in {
// //           animation: fade-in 0.3s ease-out forwards;
// //         }
// //       `}</style>
// //     </nav>
// //   );
// // };

// // export default Navbar2;




// // import React, { useState, useEffect } from 'react';
// // import { Menu, X } from 'lucide-react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { Transition } from '@headlessui/react';

// // interface NavItem {
// //   label: string;
// //   href: string;
// // }

// // const navItems: NavItem[] = [
// //   { label: 'Product', href: '/product' },
// //   { label: 'Customers', href: '/customers' },
// //   { label: 'Pricing', href: '/pricing' },
// //   { label: 'Resources', href: '/resources' },
// //   { label: 'Company', href: '/company' },
// // ];

// // const Navbar2: React.FC = () => {
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [showAlert, setShowAlert] = useState(false);
// //   const [isLoggedIn, setIsLoggedIn] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const token = localStorage.getItem('token');
// //     setIsLoggedIn(!!token);
// //   }, []);

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');
// //     setIsLoggedIn(false);
// //     navigate('/');
// //   };

// //   const handleAlert = (e: React.MouseEvent) => {
// //     e.preventDefault();
// //     setShowAlert(true);
// //     setTimeout(() => setShowAlert(false), 3000);
// //   };

// //   return (
// //     <nav className="fixed top-0 left-0 right-0 bg-white text-[#1A1A1A] z-50 shadow-md border-b border-gray-200">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center relative">
        
// //         {/* Floating Particles */}
// //         <div className="absolute inset-0 overflow-hidden pointer-events-none">
// //           {[...Array(10)].map((_, i) => (
// //             <div
// //               key={i}
// //               className="absolute w-1 h-1 bg-gray-300/40 rounded-full"
// //               style={{
// //                 top: `${Math.random() * 100}%`,
// //                 left: `${Math.random() * 100}%`,
// //                 animation: `float ${5 + Math.random() * 5}s linear infinite`,
// //                 animationDelay: `${Math.random() * 5}s`
// //               }}
// //             />
// //           ))}
// //         </div>

// //         {/* Logo */}
// //         <div className="flex-shrink-0 flex items-center z-10">
// //           <Link to="/" className="flex items-center space-x-2">
// //             <div className="w-10 h-10 bg-gradient-to-br from-[#5B3557] to-[#9b5de5] rounded-full flex items-center justify-center shadow-md">
// //               <span className="text-white font-bold text-xl">P</span>
// //             </div>
// //             <span className="text-2xl font-bold text-[#5B3557]">PACX.ai</span>
// //           </Link>
// //         </div>

// //         {/* Desktop Navigation */}
// //         <div className="hidden md:flex items-center space-x-8 ml-auto z-10">
// //           {navItems.map((item) => (
// //             <Link
// //               key={item.label}
// //               to={item.href}
// //               onClick={handleAlert}
// //               className="relative text-gray-700 hover:text-[#5B3557] transition-colors duration-300 font-medium text-sm"
// //             >
// //               {item.label}
// //             </Link>
// //           ))}
// //         </div>

// //         {/* CTA Buttons */}
// //         <div className="hidden md:flex items-center space-x-4 ml-8 z-10">
// //           <Link
// //             to="/chat"
// //             className="bg-[#5B3557] hover:bg-[#4a2a46] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300"
// //           >
// //             Chat With Gen AI
// //           </Link>
// //           {isLoggedIn ? (
// //             <button
// //               onClick={handleLogout}
// //               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
// //             >
// //               Logout
// //             </button>
// //           ) : (
// //             <Link
// //               to="/register"
// //               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
// //             >
// //               Sign Up
// //             </Link>
// //           )}
// //         </div>

// //         {/* Mobile Menu Button */}
// //         <div className="md:hidden flex items-center space-x-2 ml-auto z-10">
// //           <button
// //             type="button"
// //             className="p-2 rounded-full text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
// //             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //             aria-controls="mobile-menu"
// //             aria-expanded={isMobileMenuOpen}
// //           >
// //             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Alert Notification */}
// //       {showAlert && (
// //         <div className="fixed top-20 right-4 bg-[#5B3557] border border-[#4a2a46] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
// //           <span>🚀 Feature under development! Check back later.</span>
// //         </div>
// //       )}

// //       {/* Mobile Menu */}
// //       <Transition
// //         show={isMobileMenuOpen}
// //         enter="transition ease-out duration-300 transform"
// //         enterFrom="opacity-0 -translate-y-2"
// //         enterTo="opacity-100 translate-y-0"
// //         leave="transition ease-in duration-200 transform"
// //         leaveFrom="opacity-100 translate-y-0"
// //         leaveTo="opacity-0 -translate-y-2"
// //       >
// //         {(ref) => (
// //           <div className="md:hidden" id="mobile-menu">
// //             <div
// //               ref={ref as React.RefObject<HTMLDivElement>}
// //               className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200"
// //             >
// //               {navItems.map((item) => (
// //                 <Link
// //                   key={item.label}
// //                   to={item.href}
// //                   onClick={() => {
// //                     handleAlert;
// //                     setIsMobileMenuOpen(false);
// //                   }}
// //                   className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
// //                 >
// //                   {item.label}
// //                 </Link>
// //               ))}
// //               <div className="mt-4 space-y-2 px-2">
// //                 <Link
// //                   to="/chat"
// //                   className="block w-full text-center bg-[#5B3557] hover:bg-[#4a2a46] text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// //                 >
// //                   Chat Now
// //                 </Link>
// //                 {isLoggedIn ? (
// //                   <button
// //                     onClick={() => {
// //                       handleLogout();
// //                       setIsMobileMenuOpen(false);
// //                     }}
// //                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// //                   >
// //                     Logout
// //                   </button>
// //                 ) : (
// //                   <Link
// //                     to="/register"
// //                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
// //                   >
// //                     Sign Up
// //                   </Link>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </Transition>
// //     </nav>
// //   );
// // };

// // export default Navbar2;



// import React, { useState, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Transition } from '@headlessui/react';

// interface NavItem {
//   label: string;
//   href: string;
// }

// const navItems: NavItem[] = [
//   // { label: 'Product', href: '/product' },
//   // { label: 'Customers', href: '/customers' },
//   // { label: 'Pricing', href: '/pricing' },
//   // { label: 'Resources', href: '/resources' },
//   // { label: 'Company', href: '/company' },
//   { label: 'About', href: '/About' },
// ];

// const Navbar2: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     navigate('/');
//   };

//   const handleAlert = (e: React.MouseEvent, href: string) => {
//     e.preventDefault();
//     setShowAlert(true);
//     setTimeout(() => setShowAlert(false), 3000);
//   };

//   const handleChatClick = (e: React.MouseEvent) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       setShowAlert(true);
//       setTimeout(() => setShowAlert(false), 3000); // Show alert for 3 seconds
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-white text-[#1A1A1A] z-50 shadow-md border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center relative">
        
//         {/* Floating Particles */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(10)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-gray-300/40 rounded-full"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 animation: `float ${5 + Math.random() * 5}s linear infinite`,
//                 animationDelay: `${Math.random() * 5}s`
//               }}
//             />
//           ))}
//         </div>

//         {/* Logo */}
//         <div className="flex-shrink-0 flex items-center z-10">
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-gradient-to-br from-[#5B3557] to-[#9b5de5] rounded-full flex items-center justify-center shadow-md">
//               <span className="text-white font-bold text-xl">P</span>
//             </div>
//             <span className="text-2xl font-bold text-[#5B3557]">PACX.ai</span>
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         {/* <div className="hidden md:flex items-center space-x-8 ml-auto z-10">
//           {navItems.map((item) => (
//             <Link
//               key={item.label}
//               to={item.href}
//               onClick={handleAlert}
//               className="relative text-gray-700 hover:text-[#5B3557] transition-colors duration-300 font-medium text-sm"
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div> */}
//         <div className="hidden md:flex items-center space-x-8 ml-auto z-10">
//         {navItems.map((item) => (
//           <Link
//             key={item.label}
//             to={item.href}
//             onClick={(e) => handleAlert(e, item.href)}
//             className="relative text-gray-700 hover:text-[#5B3557] transition-colors duration-300 font-medium text-sm"
//           >
//             {item.label}
//           </Link>
//         ))}
//       </div>

//         {/* CTA Buttons */}
//         <div className="hidden md:flex items-center space-x-4 ml-8 z-10">
//           <Link
//             to="/chat"
//             onClick={handleChatClick}
//             className={`bg-[#5B3557] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300 ${
//               !isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4a2a46]'
//             }`}
//             aria-disabled={!isLoggedIn}
//           >
//             Chat With Gen AI
//           </Link>
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link
//               to="/register"
//               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
//             >
//               Sign Up
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center space-x-2 ml-auto z-10">
//           <button
//             type="button"
//             className="p-2 rounded-full text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-controls="mobile-menu"
//             aria-expanded={isMobileMenuOpen}
//           >
//             {isLoggedIn ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Alert Notification */}
//       {showAlert && (
//         <div className="fixed top-20 right-4 bg-[#5B3557] border border-[#4a2a46] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
//           <span>{!isLoggedIn ? "Please login to get started" : "🚀 Feature under development! Check back later."}</span>
//         </div>
//       )}

//       {/* Mobile Menu */}
//       <Transition
//         show={isMobileMenuOpen}
//         enter="transition ease-out duration-300 transform"
//         enterFrom="opacity-0 -translate-y-2"
//         enterTo="opacity-100 translate-y-0"
//         leave="transition ease-in duration-200 transform"
//         leaveFrom="opacity-100 translate-y-0"
//         leaveTo="opacity-0 -translate-y-2"
//       >
//         {(ref) => (
//           <div className="md:hidden" id="mobile-menu">
//             <div
//               ref={ref as React.RefObject<HTMLDivElement>}
//               className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200"
//             >
//               {navItems.map((item) => (
//                 <Link
//                   key={item.label}
//                   to={item.href}
//                   onClick={() => {
//                     handleAlert;
//                     setIsMobileMenuOpen(false);
//                   }}
//                   className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
//                 >
//                   {item.label}
//                 </Link>
//               ))}
//               <div className="mt-4 space-y-2 px-2">
//                 <Link
//                   to="/chat"
//                   onClick={handleChatClick}
//                   className={`block w-full text-center bg-[#5B3557] text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300 ${
//                     !isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4a2a46]'
//                   }`}
//                   aria-disabled={!isLoggedIn}
//                 >
//                   Chat Now
//                 </Link>
//                 {isLoggedIn ? (
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <Link
//                     to="/register"
//                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
//                   >
//                     Sign Up
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </Transition>
//     </nav>
//   );
// };

// export default Navbar2;




// import React, { useState, useEffect } from 'react';
// import { Menu, X } from 'lucide-react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Transition } from '@headlessui/react';

// const Navbar2: React.FC = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setIsLoggedIn(!!token);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     setIsLoggedIn(false);
//     navigate('/');
//   };

//   const handleAlert = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setShowAlert(true);
//     setTimeout(() => setShowAlert(false), 3000);
//   };

//   const handleChatClick = (e: React.MouseEvent) => {
//     if (!isLoggedIn) {
//       e.preventDefault();
//       setShowAlert(true);
//       setTimeout(() => setShowAlert(false), 3000); // Show alert for 3 seconds
//     }
//   };

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-white text-[#1A1A1A] z-50 shadow-md border-b border-gray-200">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center relative">
        
//         {/* Floating Particles */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           {[...Array(10)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-gray-300/40 rounded-full"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 animation: `float ${5 + Math.random() * 5}s linear infinite`,
//                 animationDelay: `${Math.random() * 5}s`
//               }}
//             />
//           ))}
//         </div>

//         {/* Logo */}
//         <div className="flex-shrink-0 flex items-center z-10">
//           <Link to="/" className="flex items-center space-x-2">
//             <div className="w-10 h-10 bg-gradient-to-br from-[#5B3557] to-[#9b5de5] rounded-full flex items-center justify-center shadow-md">
//               <span className="text-white font-bold text-xl">P</span>
//             </div>
//             <span className="text-2xl font-bold text-[#5B3557]">PACX.ai</span>
//           </Link>
//         </div>

//         {/* CTA Buttons - Moved to the right corner */}
//         <div className="hidden md:flex items-center space-x-4 ml-auto z-10">
//           <Link
//             to="/chat"
//             onClick={handleChatClick}
//             className={`bg-[#5B3557] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300 ${
//               !isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4a2a46]'
//             }`}
//             aria-disabled={!isLoggedIn}
//           >
//             Chat With Gen AI
//           </Link>
//           {isLoggedIn ? (
//             <button
//               onClick={handleLogout}
//               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
//             >
//               Logout
//             </button>
//           ) : (
//             <Link
//               to="/register"
//               className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
//             >
//               Sign Up
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex items-center space-x-2 ml-auto z-10">
//           <button
//             type="button"
//             className="p-2 rounded-full text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
//             onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             aria-controls="mobile-menu"
//             aria-expanded={isMobileMenuOpen}
//           >
//             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Alert Notification */}
//       {showAlert && (
//         <div className="fixed top-20 right-4 bg-[#5B3557] border border-[#4a2a46] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
//           <span>{!isLoggedIn ? "Please login to get started" : "🚀 Feature under development! Check back later."}</span>
//         </div>
//       )}

//       {/* Mobile Menu */}
//       <Transition
//         show={isMobileMenuOpen}
//         enter="transition ease-out duration-300 transform"
//         enterFrom="opacity-0 -translate-y-2"
//         enterTo="opacity-100 translate-y-0"
//         leave="transition ease-in duration-200 transform"
//         leaveFrom="opacity-100 translate-y-0"
//         leaveTo="opacity-0 -translate-y-2"
//       >
//         {(ref) => (
//           <div className="md:hidden" id="mobile-menu">
//             <div
//               ref={ref as React.RefObject<HTMLDivElement>}
//               className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200"
//             >
//               <div className="mt-4 space-y-2 px-2">
//                 <Link
//                   to="/chat"
//                   onClick={handleChatClick}
//                   className={`block w-full text-center bg-[#5B3557] text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300 ${
//                     !isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4a2a46]'
//                   }`}
//                   aria-disabled={!isLoggedIn}
//                 >
//                   Chat Now
//                 </Link>
//                 {isLoggedIn ? (
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setIsMobileMenuOpen(false);
//                     }}
//                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
//                   >
//                     Logout
//                   </button>
//                 ) : (
//                   <Link
//                     to="/register"
//                     className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
//                   >
//                     Sign Up
//                   </Link>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </Transition>
//     </nav>
//   );
// };

// export default Navbar2;



import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Transition } from '@headlessui/react';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: 'About', href: '/About' },
  // { label: 'Contact', href: '/bookademo' },
  { label: 'Contact', href: '/contact' },
  // { label: 'Product', href: '/product' },
  // { label: 'Customers', href: '/customers' },
  // Uncomment or add more as needed: { label: 'Product', href: '/product' }, etc.
];

const Navbar2: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  const handleChatClick = (e: React.MouseEvent) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white text-[#1A1A1A] z-50 shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center relative">
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-300/40 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 5}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Logo */}
        <div className="flex-shrink-0 flex items-center z-10">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#5B3557] to-[#9b5de5] rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-[#5B3557]">PACX.ai</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 ml-auto z-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="relative text-gray-700 hover:text-[#5B3557] transition-colors duration-300 font-medium text-sm"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4 ml-8 z-10">
          <Link
            to="/chat"
            onClick={handleChatClick}
            className={`bg-[#5B3557] text-white px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300 ${
              !isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4a2a46]'
            }`}
            aria-disabled={!isLoggedIn}
          >
            Chat With Gen AI
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/register"
              className="border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
            >
              Sign Up
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-2 ml-auto z-10">
          <button
            type="button"
            className="p-2 rounded-full text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isLoggedIn ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Alert Notification */}
      {showAlert && (
        <div className="fixed top-20 right-4 bg-[#5B3557] border border-[#4a2a46] text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in">
          <span>{!isLoggedIn ? "Please login to get started" : "🚀 Feature under development! Check back later."}</span>
        </div>
      )}

      {/* Mobile Menu */}
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
              className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200"
            >
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-gray-700 hover:text-[#5B3557] hover:bg-gray-200 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 space-y-2 px-2">
                <Link
                  to="/chat"
                  onClick={handleChatClick}
                  className={`block w-full text-center bg-[#5B3557] text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300 ${
                    !isLoggedIn ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#4a2a46]'
                  }`}
                  aria-disabled={!isLoggedIn}
                >
                  Chat Now
                </Link>
                {isLoggedIn ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
                  >
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/register"
                    className="block w-full text-center border border-[#5B3557] text-[#5B3557] hover:bg-[#5B3557] hover:text-white px-4 py-3 rounded-lg text-base font-medium transition-colors duration-300"
                  >
                    Sign Up
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