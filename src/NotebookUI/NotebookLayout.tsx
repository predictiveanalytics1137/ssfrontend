



import React, { useState } from 'react';
import { FileText, Settings, Database } from 'lucide-react';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';

import { NotebookTab } from './types';
import SQLNotebook from './Notebook/Notebook';

const NotebookLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('notebook1');

  const notebooks: NotebookTab[] = [
    { id: 'notebook1', title: 'Data Analysis', icon: <FileText className="w-4 h-4" /> },
    { id: 'notebook2', title: 'Model Training', icon: <Settings className="w-4 h-4" /> },
    { id: 'notebook3', title: 'Predictions', icon: <Database className="w-4 h-4" /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        notebooks={notebooks}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex-1 flex justify-center items-start overflow-y-auto">
          <div className="w-full max-w-6xl">
            <SQLNotebook activeTab={activeTab} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotebookLayout;