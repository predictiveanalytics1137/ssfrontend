// // // // // // // // // import React from 'react';
// // // // // // // // // import { Menu, X, Book, FileText, Database, Settings } from 'lucide-react';
// // // // // // // // // import { NavbarProps } from '../types';

// // // // // // // // // const Navbar: React.FC<NavbarProps> = ({ 
// // // // // // // // //   isSidebarOpen, 
// // // // // // // // //   setIsSidebarOpen, 
// // // // // // // // //   notebooks,
// // // // // // // // //   activeTab,
// // // // // // // // //   setActiveTab 
// // // // // // // // // }) => {
// // // // // // // // //   return (
// // // // // // // // //     <nav className="border-b border-gray-200 bg-white">
// // // // // // // // //       {/* Top Bar */}
// // // // // // // // //       <div className="h-14 flex items-center justify-between px-4 relative">
// // // // // // // // //         {/* Left Section */}
// // // // // // // // //         <div className="flex items-center gap-3">
// // // // // // // // //           <button 
// // // // // // // // //             onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// // // // // // // // //             className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
// // // // // // // // //             aria-label="Toggle sidebar"
// // // // // // // // //           >
// // // // // // // // //             {isSidebarOpen ? 
// // // // // // // // //               <X className="w-4 h-4" /> : 
// // // // // // // // //               <Menu className="w-4 h-4" />
// // // // // // // // //             }
// // // // // // // // //           </button>
// // // // // // // // //           <div className="flex items-center gap-2">
// // // // // // // // //             <Book className="w-4 h-4 text-teal-600" />
// // // // // // // // //             <span className="text-sm font-medium text-gray-700">Notebook Hub</span>
// // // // // // // // //           </div>
// // // // // // // // //         </div>

// // // // // // // // //         {/* Tab Bar - Centered */}
// // // // // // // // //         <div className="absolute left-1/2 transform -translate-x-1/2">
// // // // // // // // //           <div className="flex items-center gap-4">
// // // // // // // // //             {notebooks.map((notebook, index) => (
// // // // // // // // //               <React.Fragment key={notebook.id}>
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={() => setActiveTab(notebook.id)}
// // // // // // // // //                   className={`
// // // // // // // // //                     flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium
// // // // // // // // //                     transition-all duration-150
// // // // // // // // //                     ${activeTab === notebook.id 
// // // // // // // // //                       ? 'bg-teal-50 text-teal-700 shadow-sm' 
// // // // // // // // //                       : 'text-gray-600 hover:bg-gray-100'
// // // // // // // // //                     }
// // // // // // // // //                   `}
// // // // // // // // //                 >
// // // // // // // // //                   {notebook.id === 'data-analysis' && <Database className="w-3.5 h-3.5" />}
// // // // // // // // //                   {notebook.id === 'predictions' && <FileText className="w-3.5 h-3.5" />}
// // // // // // // // //                   {notebook.id === 'settings' && <Settings className="w-3.5 h-3.5" />}
// // // // // // // // //                   <span>{notebook.title}</span>
// // // // // // // // //                 </button>
// // // // // // // // //                 {index < notebooks.length - 1 && (
// // // // // // // // //                   <div className="h-6 w-px bg-gray-300 mx-2" />
// // // // // // // // //                 )}
// // // // // // // // //               </React.Fragment>
// // // // // // // // //             ))}
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </nav>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default Navbar;







// // // // // // // // // New code 



// // // // // // // // // Navbar.tsx
// // // // // // // // import React from 'react';
// // // // // // // // import { Book, BarChart2, FileText, Menu, X } from 'lucide-react';
// // // // // // // // import { NavbarProps } from '../types';

// // // // // // // // const Navbar: React.FC<NavbarProps> = ({
// // // // // // // //   isSidebarOpen,
// // // // // // // //   setIsSidebarOpen,
// // // // // // // //   activeTab,
// // // // // // // //   setActiveTab,
// // // // // // // // }) => {
// // // // // // // //   const tabs = [
// // // // // // // //     { id: 'notebook', title: 'Notebook', icon: <Book size={18} /> },
// // // // // // // //     { id: 'dashboard', title: 'Dashboard', icon: <BarChart2 size={18} /> },
// // // // // // // //     { id: 'predict', title: 'Predict', icon: <FileText size={18} /> },
// // // // // // // //   ];

// // // // // // // //   return (
// // // // // // // //     <nav className="border-b bg-white flex items-center justify-between px-4 h-14">
// // // // // // // //       <button
// // // // // // // //         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// // // // // // // //         className="text-gray-600 hover:text-gray-800"
// // // // // // // //       >
// // // // // // // //         {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
// // // // // // // //       </button>
// // // // // // // //       <div className="flex gap-6">
// // // // // // // //         {tabs.map((tab) => (
// // // // // // // //           <button
// // // // // // // //             key={tab.id}
// // // // // // // //             onClick={() => setActiveTab(tab.id)}
// // // // // // // //             className={`flex items-center gap-2 px-4 py-1 rounded ${
// // // // // // // //               activeTab === tab.id ? 'bg-teal-100 text-teal-700' : 'text-gray-600'
// // // // // // // //             }`}
// // // // // // // //           >
// // // // // // // //             {tab.icon}
// // // // // // // //             <span className="text-sm font-medium">{tab.title}</span>
// // // // // // // //           </button>
// // // // // // // //         ))}
// // // // // // // //       </div>
// // // // // // // //     </nav>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default Navbar;




// // // // // // // // Navbar.tsx
// // // // // // // import React from 'react';
// // // // // // // import { Book, BarChart2, FileText, Menu, X } from 'lucide-react';

// // // // // // // interface NavbarProps {
// // // // // // //   isSidebarOpen: boolean;
// // // // // // //   setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
// // // // // // //   activeTab: string;
// // // // // // //   setActiveTab: React.Dispatch<React.SetStateAction<string>>;
// // // // // // //   notebooks: { id: string; title: string }[]; // Dynamic tabs
// // // // // // // }

// // // // // // // const Navbar: React.FC<NavbarProps> = ({
// // // // // // //   isSidebarOpen,
// // // // // // //   setIsSidebarOpen,
// // // // // // //   activeTab,
// // // // // // //   setActiveTab,
// // // // // // //   notebooks,
// // // // // // // }) => {
// // // // // // //   return (
// // // // // // //     <nav className="border-b bg-white flex items-center justify-between px-4 h-14 shadow-sm">
// // // // // // //       {/* Sidebar Toggle */}
// // // // // // //       <button
// // // // // // //         onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// // // // // // //         className="text-gray-600 hover:text-gray-800"
// // // // // // //         aria-label="Toggle Sidebar"
// // // // // // //       >
// // // // // // //         {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
// // // // // // //       </button>

// // // // // // //       {/* Navigation Tabs */}
// // // // // // //       <div className="flex gap-6">
// // // // // // //         {notebooks.map((tab) => (
// // // // // // //           <button
// // // // // // //             key={tab.id}
// // // // // // //             onClick={() => setActiveTab(tab.id)}
// // // // // // //             className={`flex items-center gap-2 px-4 py-1 rounded transition-all duration-200 ${
// // // // // // //               activeTab === tab.id
// // // // // // //                 ? 'bg-teal-100 text-teal-700 font-semibold shadow-md'
// // // // // // //                 : 'text-gray-600 hover:bg-gray-100'
// // // // // // //             }`}
// // // // // // //           >
// // // // // // //             {tab.id === 'notebook' && <Book size={18} />}
// // // // // // //             {tab.id === 'dashboard' && <BarChart2 size={18} />}
// // // // // // //             {tab.id === 'predict' && <FileText size={18} />}
// // // // // // //             <span>{tab.title}</span>
// // // // // // //           </button>
// // // // // // //         ))}
// // // // // // //       </div>

// // // // // // //       {/* Placeholder for Future Buttons (if needed) */}
// // // // // // //       <div></div>
// // // // // // //     </nav>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Navbar;





// // // // // // // src/components/Navbar/Navbar.tsx

// // // // // // // import React from 'react';
// // // // // // // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';
// // // // // // // import { NavLink } from 'react-router-dom';

// // // // // // // interface NavbarProps {
// // // // // // //   isTrained: boolean;
// // // // // // // }

// // // // // // // const Navbar: React.FC<NavbarProps> = ({ isTrained }) => {
// // // // // // //   return (
// // // // // // //     <nav className="bg-white border-b border-gray-200">
// // // // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // // // // //         <div className="flex justify-between h-16">
// // // // // // //           {/* Left section */}
// // // // // // //           <div className="flex">
// // // // // // //             {/* Branding */}
// // // // // // //             <div className="flex-shrink-0 flex items-center">
// // // // // // //               <FiBook className="h-6 w-6 text-teal-600" />
// // // // // // //               <span className="font-semibold text-xl text-gray-800 ml-1">Notebook Hub</span>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {/* Right section - Tabs */}
// // // // // // //           <div className="flex space-x-4">
// // // // // // //             <NavLink
// // // // // // //               to="/notebook-layout"
// // // // // // //               className={({ isActive }) =>
// // // // // // //                 `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
// // // // // // //                   isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
// // // // // // //                 }`
// // // // // // //               }
// // // // // // //             >
// // // // // // //               <FiBook className="mr-1 h-4 w-4" />
// // // // // // //               Notebook
// // // // // // //             </NavLink>
// // // // // // //             {isTrained && (
// // // // // // //               <>
// // // // // // //                 <NavLink
// // // // // // //                   to="/dashboard"
// // // // // // //                   className={({ isActive }) =>
// // // // // // //                     `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
// // // // // // //                       isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
// // // // // // //                     }`
// // // // // // //                   }
// // // // // // //                 >
// // // // // // //                   <FiBarChart2 className="mr-1 h-4 w-4" />
// // // // // // //                   Dashboard
// // // // // // //                 </NavLink>
// // // // // // //                 <NavLink
// // // // // // //                   to="/predict"
// // // // // // //                   className={({ isActive }) =>
// // // // // // //                     `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
// // // // // // //                       isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
// // // // // // //                     }`
// // // // // // //                   }
// // // // // // //                 >
// // // // // // //                   <FiFlag className="mr-1 h-4 w-4" />
// // // // // // //                   Predict
// // // // // // //                 </NavLink>
// // // // // // //               </>
// // // // // // //             )}
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </nav>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default Navbar;





// // // // // // // src/components/Navbar/Navbar.tsx

// // // // // // import React from 'react';
// // // // // // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';
// // // // // // import { NavLink } from 'react-router-dom';

// // // // // // interface NavbarProps {
// // // // // //   isTrained: boolean;
// // // // // // }

// // // // // // const Navbar: React.FC<NavbarProps> = ({ isTrained }) => {
// // // // // //   return (
// // // // // //     <nav className="bg-white border-b border-gray-200">
// // // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // // // //         <div className="flex justify-between h-16">
// // // // // //           {/* Left section */}
// // // // // //           <div className="flex">
// // // // // //             {/* Branding */}
// // // // // //             <div className="flex-shrink-0 flex items-center">
// // // // // //               <FiBook className="h-6 w-6 text-teal-600" />
// // // // // //               <span className="font-semibold text-xl text-gray-800 ml-1">Notebook Hub</span>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Right section - Tabs */}
// // // // // //           <div className="flex space-x-4">
// // // // // //             <NavLink
// // // // // //               to="/notebook-layout"
// // // // // //               className={({ isActive }) =>
// // // // // //                 `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
// // // // // //                   isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
// // // // // //                 }`
// // // // // //               }
// // // // // //             >
// // // // // //               <FiBook className="mr-1 h-4 w-4" />
// // // // // //               Notebook
// // // // // //             </NavLink>
// // // // // //             {isTrained && (
// // // // // //               <>
// // // // // //                 <NavLink
// // // // // //                   to="/dashboard"
// // // // // //                   className={({ isActive }) =>
// // // // // //                     `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
// // // // // //                       isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
// // // // // //                     }`
// // // // // //                   }
// // // // // //                 >
// // // // // //                   <FiBarChart2 className="mr-1 h-4 w-4" />
// // // // // //                   Dashboard
// // // // // //                 </NavLink>
// // // // // //                 <NavLink
// // // // // //                   to="/predict"
// // // // // //                   className={({ isActive }) =>
// // // // // //                     `flex items-center px-3 py-2 rounded-md text-sm font-medium ${
// // // // // //                       isActive ? 'bg-teal-50 text-teal-700' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
// // // // // //                     }`
// // // // // //                   }
// // // // // //                 >
// // // // // //                   <FiFlag className="mr-1 h-4 w-4" />
// // // // // //                   Predict
// // // // // //                 </NavLink>
// // // // // //               </>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </nav>
// // // // // //   );
// // // // // // };

// // // // // // export default Navbar;




// // // // // // src/components/Navbar/Navbar.tsx

// // // // // import React from 'react';
// // // // // import { FiMenu, FiX } from 'react-icons/fi';
// // // // // import { NavLink } from 'react-router-dom';

// // // // // interface Notebook {
// // // // //   id: string;
// // // // //   title: string;
// // // // //   icon: JSX.Element;
// // // // //   route: string;
// // // // // }

// // // // // interface NavbarProps {
// // // // //   isSidebarOpen: boolean;
// // // // //   setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
// // // // //   notebooks: Notebook[];
// // // // // }

// // // // // const Navbar: React.FC<NavbarProps> = ({
// // // // //   isSidebarOpen,
// // // // //   setIsSidebarOpen,
// // // // //   notebooks,
// // // // // }) => {
// // // // //   return (
// // // // //     <nav className="bg-white border-b border-gray-200 shadow-sm">
// // // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // // //         <div className="flex justify-between h-16 items-center">
// // // // //           {/* Left Section: Sidebar Toggle */}
// // // // //           <div >
// // // // //             <button
// // // // //               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// // // // //               className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 rounded-md"
// // // // //               aria-label="Toggle Sidebar"
// // // // //             >
// // // // //               {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// // // // //             </button>
// // // // //           </div>

// // // // //           {/* Center Section: Dynamic Tabs */}
// // // // //           <div className="flex space-x-4">
// // // // //             {notebooks.map((notebook) => (
// // // // //               <NavLink
// // // // //                 key={notebook.id}
// // // // //                 to={notebook.route}
// // // // //                 className={({ isActive }) =>
// // // // //                   `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
// // // // //                     isActive
// // // // //                       ? 'bg-teal-50 text-teal-700 shadow-md'
// // // // //                       : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
// // // // //                   }`
// // // // //                 }
// // // // //               >
// // // // //                 {notebook.icon}
// // // // //                 <span>{notebook.title}</span>
// // // // //               </NavLink>
// // // // //             ))}
// // // // //           </div>

// // // // //           {/* Right Section: Placeholder for Future Elements */}
// // // // //           <div className="flex-shrink-0">
// // // // //             {/* Future elements like user profile can be added here */}
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </nav>
// // // // //   );
// // // // // };

// // // // // export default Navbar;






// // // // src/components/Navbar/Navbar.tsx

// // // import React from 'react';
// // // import { FiMenu, FiX } from 'react-icons/fi';
// // // import { NavLink } from 'react-router-dom';

// // // interface Notebook {
// // //   id: string;
// // //   title: string;
// // //   icon: JSX.Element;
// // //   route: string;
// // // }

// // // interface NavbarProps {
// // //   isSidebarOpen: boolean;
// // //   setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
// // //   notebooks: Notebook[];
// // // }

// // // // const Navbar: React.FC<NavbarProps> = ({
// // // //   isSidebarOpen,
// // // //   setIsSidebarOpen,
// // // //   notebooks,
// // // // }) => {
// // // //   return (
// // // //     <nav className="border-b border-gray-200 bg-white">
// // // //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // // //         <div className="h-14 flex items-center justify-between px-4 relative">
// // // //           {/* Left Section: Sidebar Toggle */}
// // // //           <div className="flex items-center gap-3">
// // // //             <button
// // // //               onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// // // //               className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
// // // //               aria-label="Toggle Sidebar"
// // // //             >
// // // //               {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// // // //             </button>
// // // //           </div>

// // // //           {/* Center Section: Dynamic Tabs */}
// // // //           <div className="flex space-x-4">
// // // //             {notebooks.map((notebook) => (
// // // //               <NavLink
// // // //                 key={notebook.id}
// // // //                 to={notebook.route}
// // // //                 className={({ isActive }) =>
// // // //                   `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
// // // //                     isActive
// // // //                       ? 'bg-teal-50 text-teal-700 shadow-md'
// // // //                       : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
// // // //                   }`
// // // //                 }
// // // //               >
// // // //                 {notebook.icon}
// // // //                 <span>{notebook.title}</span>
// // // //               </NavLink>
// // // //             ))}
// // // //           </div>

// // // //           {/* Right Section: Placeholder for Future Elements */}
// // // //           <div className="flex-shrink-0">
// // // //             {/* Future elements like user profile can be added here */}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // // };

// // // const Navbar: React.FC<NavbarProps> = ({
// // //     isSidebarOpen,
// // //     setIsSidebarOpen,
// // //     notebooks,
// // //   }) => {
// // //     return (
// // //       <nav className="border-b border-gray-200 bg-white">
// // //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// // //           <div className="h-14 flex items-center justify-between px-4 relative">
// // //             {/* Left Section: Sidebar Toggle */}
// // //             <div className="flex items-center gap-3">
// // //               <button
// // //                 onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// // //                 className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
// // //                 aria-label="Toggle Sidebar"
// // //               >
// // //                 {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// // //               </button>
// // //             </div>
  
// // //             {/* Center Section: Dynamic Tabs */}
// // //             <div className="flex space-x-4">
// // //               {notebooks.map((notebook) =>
// // //                 notebook.route ? (
// // //                   <NavLink
// // //                     key={notebook.id}
// // //                     to={notebook.route}
// // //                     className={({ isActive }) =>
// // //                       `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
// // //                         isActive
// // //                           ? 'bg-teal-50 text-teal-700 shadow-md'
// // //                           : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
// // //                       }`
// // //                     }
// // //                   >
// // //                     {notebook.icon}
// // //                     <span>{notebook.title}</span>
// // //                   </NavLink>
// // //                 ) : (
// // //                   <div
// // //                     key={notebook.id}
// // //                     className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600"
// // //                   >
// // //                     {notebook.icon}
// // //                     <span>{notebook.title}</span>
// // //                   </div>
// // //                 )
// // //               )}
// // //             </div>
  
// // //             {/* Right Section: Placeholder for Future Elements */}
// // //             <div className="flex-shrink-0">
// // //               {/* Future elements like user profile can be added here */}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </nav>
// // //     );
// // //   };
  
  

// // // export default Navbar;









// // // // import React from 'react';
// // // // import { FiMenu, FiX, FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';

// // // // interface NavbarProps {
// // // //   isTrained: boolean;
// // // //   currentView: 'notebook' | 'dashboard' | 'predict';
// // // //   setCurrentView: (view: 'notebook' | 'dashboard' | 'predict') => void;
// // // //   isSidebarOpen: boolean;
// // // //   setIsSidebarOpen: (isOpen: boolean) => void;
// // // // }

// // // // const Navbar: React.FC<NavbarProps> = ({
// // // //   isTrained,
// // // //   currentView,
// // // //   setCurrentView,
// // // //   isSidebarOpen,
// // // //   setIsSidebarOpen,
// // // // }) => {
// // // //   return (
// // // //     <nav className="border-b border-gray-200 bg-white fixed top-0 left-0 right-0 z-50">
// // // //       <div className="h-16 flex items-center">
// // // //         {/* Left: Sidebar Toggle */}
// // // //         <button
// // // //           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// // // //           className="p-1.5 text-gray-500 hover:bg-gray-100 transition-colors h-16 w-16 flex items-center justify-center border-r border-gray-200"
// // // //         >
// // // //           {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// // // //         </button>

// // // //         {/* Center: Navigation Items */}
// // // //         <div className="flex-1 flex justify-center space-x-4">
// // // //           <button
// // // //             onClick={() => setCurrentView('notebook')}
// // // //             className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
// // // //               ${currentView === 'notebook' 
// // // //                 ? 'bg-teal-50 text-teal-700 shadow-sm' 
// // // //                 : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'}`}
// // // //           >
// // // //             <FiBook size={18} />
// // // //             <span>Notebook</span>
// // // //           </button>

// // // //           {isTrained && (
// // // //             <>
// // // //               <button
// // // //                 onClick={() => setCurrentView('dashboard')}
// // // //                 className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
// // // //                   ${currentView === 'dashboard' 
// // // //                     ? 'bg-teal-50 text-teal-700 shadow-sm' 
// // // //                     : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'}`}
// // // //               >
// // // //                 <FiBarChart2 size={18} />
// // // //                 <span>Dashboard</span>
// // // //               </button>

// // // //               <button
// // // //                 onClick={() => setCurrentView('predict')}
// // // //                 className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150
// // // //                   ${currentView === 'predict' 
// // // //                     ? 'bg-teal-50 text-teal-700 shadow-sm' 
// // // //                     : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'}`}
// // // //               >
// // // //                 <FiFlag size={18} />
// // // //                 <span>Predict</span>
// // // //               </button>
// // // //             </>
// // // //           )}
// // // //         </div>

// // // //         {/* Right: Placeholder for future elements */}
// // // //         <div className="w-16" />
// // // //       </div>
// // // //     </nav>
// // // //   );
// // // // };

// // // // export default Navbar;



// // // Navbar.tsx
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import { FiMenu, FiX } from 'react-icons/fi';

// // interface NavbarProps {
// //   isSidebarOpen: boolean;
// //   setIsSidebarOpen: (isOpen: boolean) => void;
// //   notebooks: {
// //     id: string;
// //     title: string;
// //     icon: JSX.Element;
// //     route: string;
// //   }[];
// // }

// // const Navbar: React.FC<NavbarProps> = ({
// //   isSidebarOpen,
// //   setIsSidebarOpen,
// //   notebooks,
// // }) => {
// //   return (
// //     <nav className="h-16 bg-white border-b border-gray-200 px-4">
// //       <div className="h-full flex items-center">
// //         {/* Sidebar Toggle - Always at the left */}
// //         <button
// //           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
// //           className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors"
// //           aria-label="Toggle Sidebar"
// //         >
// //           {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// //         </button>

// //         {/* Navigation Items - Centered */}
// //         <div className="flex-1 flex justify-center space-x-4">
// //           {notebooks.map((notebook) => (
// //             <Link
// //               key={notebook.id}
// //               to={notebook.route}
// //               className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
// //             >
// //               {notebook.icon}
// //               <span>{notebook.title}</span>
// //             </Link>
// //           ))}
// //         </div>

// //         {/* Right side spacer to balance layout */}
// //         <div className="w-10" />
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;






// // import React from 'react';
// // import { FiMenu, FiX } from 'react-icons/fi';

// // interface NavbarProps {
// //   isSidebarOpen: boolean;
// //   setIsSidebarOpen: (isOpen: boolean) => void;
// //   notebooks: {
// //     id: string;
// //     title: string;
// //     icon: JSX.Element;
// //     onClick: () => void;
// //   }[];
// //   activeTab: string;
// // }

// // const Navbar: React.FC<NavbarProps> = ({
// //   isSidebarOpen,
// //   setIsSidebarOpen,
// //   notebooks,
// //   activeTab,
// // }) => {
// //   console.log('Navbar: Rendering with props:', {
// //     isSidebarOpen,
// //     activeTab,
// //     notebooksCount: notebooks.length
// //   });

// //   return (
// //     <nav className="h-16 bg-white border-b border-gray-200 px-4">
// //       <div className="h-full flex items-center">
// //         <button
// //           onClick={() => {
// //             console.log('Navbar: Toggling sidebar');
// //             setIsSidebarOpen(!isSidebarOpen);
// //           }}
// //           className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors"
// //           aria-label="Toggle Sidebar"
// //         >
// //           {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
// //         </button>

// //         <div className="flex-1 flex justify-center space-x-4">
// //           {notebooks.map((notebook) => {
// //             const isActive = activeTab === notebook.id;
// //             console.log('Navbar: Rendering tab:', {
// //               id: notebook.id,
// //               isActive
// //             });

// //             return (
// //               <button
// //                 key={notebook.id}
// //                 onClick={() => {
// //                   console.log('Navbar: Tab clicked:', notebook.id);
// //                   notebook.onClick();
// //                 }}
// //                 className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
// //                   isActive
// //                     ? 'bg-gray-100 text-gray-900'
// //                     : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
// //                 }`}
// //               >
// //                 {notebook.icon}
// //                 <span>{notebook.title}</span>
// //               </button>
// //             );
// //           })}
// //         </div>

// //         <div className="w-10" />
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;




// import React from 'react';
// import { FiMenu, FiX } from 'react-icons/fi';

// interface NavbarProps {
//   isSidebarOpen: boolean;
//   setIsSidebarOpen: (isOpen: boolean) => void;
//   notebooks: {
//     id: string;
//     title: string;
//     icon: JSX.Element;
//     onClick: () => void;
//   }[];
//   activeTab: string;
// }

// const Navbar: React.FC<NavbarProps> = ({
//   isSidebarOpen,
//   setIsSidebarOpen,
//   notebooks,
//   activeTab,
// }) => {
//   console.log('Navbar: Rendering with props:', {
//     isSidebarOpen,
//     activeTab,
//     notebooksCount: notebooks.length
//   });

//   return (
//     <nav className="h-16 bg-white border-b border-gray-200 px-4">
//       <div className="h-full flex items-center">
//         <button
//           onClick={() => {
//             console.log('Navbar: Toggling sidebar');
//             setIsSidebarOpen(!isSidebarOpen);
//           }}
//           className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors"
//           aria-label="Toggle Sidebar"
//         >
//           {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//         </button>

//         <div className="flex-1 flex justify-center space-x-4">
//           {notebooks.map((notebook) => {
//             const isActive = activeTab === notebook.id;
//             console.log('Navbar: Rendering tab:', {
//               id: notebook.id,
//               isActive
//             });

//             return (
//               <button
//                 key={notebook.id}
//                 onClick={() => {
//                   console.log('Navbar: Tab clicked:', notebook.id);
//                   notebook.onClick();
//                 }}
//                 className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive
//                     ? 'bg-teal-500 text-white' // Changed to teal when active
//                     : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
//                 }`}
//               >
//                 {notebook.icon}
//                 <span>{notebook.title}</span>
//               </button>
//             );
//           })}
//         </div>

//         <div className="w-10" />
//       </div>
//     </nav>
//   );
// };

// export default Navbar;




// Navbar.tsx
import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

interface NavbarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  notebooks: {
    id: string;
    title: string;
    icon: JSX.Element;
    onClick: () => void;
  }[];
  activeTab: string;
}

const Navbar: React.FC<NavbarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
  notebooks,
  activeTab,
}) => {
  console.log('Navbar: Rendering with props:', {
    isSidebarOpen,
    activeTab,
    notebooksCount: notebooks.length,
  });

  return (
    <nav className="h-16 bg-white border-b border-gray-200 px-6 shadow-md">
      <div className="h-full flex items-center justify-between">
        {/* Sidebar Toggle Button */}
        <button
          onClick={() => {
            console.log('Navbar: Toggling sidebar');
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className="p-2 hover:bg-gray-100 rounded-md text-gray-500 transition-colors"
          aria-label="Toggle Sidebar"
        >
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Navigation Tabs */}
        <div className="flex space-x-6">
          {notebooks.map((notebook) => {
            const isActive = activeTab === notebook.id;
            console.log('Navbar: Rendering tab:', {
              id: notebook.id,
              isActive,
            });

            return (
              <button
                key={notebook.id}
                onClick={() => {
                  console.log('Navbar: Tab clicked:', notebook.id);
                  notebook.onClick();
                }}
                className={`flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition-colors transition-transform duration-200 ${
                  isActive
                    ? 'bg-teal-100 text-black-300 border border-teal-300 shadow-lg transform hover:scale-105'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 transform hover:scale-105'
                } transform hover:scale-105`
            
            }
              >
                <span className={isActive ? 'text-teal-800' : 'text-gray-600'}>
                  {notebook.icon}
                </span>
                <span>{notebook.title}</span>
              </button>
            );
          })}
        </div>

        {/* Spacer to align Train Model button */}
        <div className="w-10" />
      </div>
    </nav>
  );
};

export default Navbar;
