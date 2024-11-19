import React from 'react';
import { Menu, X, Book, FileText, Database, Settings } from 'lucide-react';
import { NavbarProps } from '../types';

const Navbar: React.FC<NavbarProps> = ({ 
  isSidebarOpen, 
  setIsSidebarOpen, 
  notebooks,
  activeTab,
  setActiveTab 
}) => {
  return (
    <nav className="border-b border-gray-200 bg-white">
      {/* Top Bar */}
      <div className="h-14 flex items-center justify-between px-4 relative">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 text-gray-500 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? 
              <X className="w-4 h-4" /> : 
              <Menu className="w-4 h-4" />
            }
          </button>
          <div className="flex items-center gap-2">
            <Book className="w-4 h-4 text-teal-600" />
            <span className="text-sm font-medium text-gray-700">Notebook Hub</span>
          </div>
        </div>

        {/* Tab Bar - Centered */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <div className="flex items-center gap-4">
            {notebooks.map((notebook, index) => (
              <React.Fragment key={notebook.id}>
                <button
                  onClick={() => setActiveTab(notebook.id)}
                  className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium
                    transition-all duration-150
                    ${activeTab === notebook.id 
                      ? 'bg-teal-50 text-teal-700 shadow-sm' 
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  {notebook.id === 'data-analysis' && <Database className="w-3.5 h-3.5" />}
                  {notebook.id === 'predictions' && <FileText className="w-3.5 h-3.5" />}
                  {notebook.id === 'settings' && <Settings className="w-3.5 h-3.5" />}
                  <span>{notebook.title}</span>
                </button>
                {index < notebooks.length - 1 && (
                  <div className="h-6 w-px bg-gray-300 mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
