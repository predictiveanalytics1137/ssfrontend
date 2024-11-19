import React, { useState } from 'react';
import { Database, FolderOpen, Settings, ChevronDown, ChevronRight, Plus } from 'lucide-react';
import { SidebarProps } from '../types';

// Define the Section type
type Section = 'datasets' | 'files' | 'connections';

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  // Update the useState hook to use Record<Section, boolean>
  const [expandedSections, setExpandedSections] = useState<Record<Section, boolean>>({
    datasets: true,
    files: false,
    connections: false
  });

  // Update the toggleSection function to use the Section type
  const toggleSection = (section: Section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div 
      className={`bg-white border-r w-64 flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {(['datasets', 'files', 'connections'] as Section[]).map((section) => (
        <div key={section} className="border-b">
          <button
            onClick={() => toggleSection(section)}
            className="w-full px-4 py-2 flex items-center justify-between hover:bg-teal-50 transition-colors"
          >
            <div className="flex items-center space-x-2">
              {section === 'datasets' && <Database className="w-4 h-4 text-teal-600" />}
              {section === 'files' && <FolderOpen className="w-4 h-4 text-teal-600" />}
              {section === 'connections' && <Settings className="w-4 h-4 text-teal-600" />}
              <span className="text-xs font-medium text-black capitalize">{section}</span>
            </div>
            {expandedSections[section] ? (
              <ChevronDown className="w-4 h-4 text-teal-600" />
            ) : (
              <ChevronRight className="w-4 h-4 text-teal-600" />
            )}
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${
            expandedSections[section] ? 'max-h-48' : 'max-h-0'
          }`}>
            <div className="px-4 py-2 space-y-2">
              <button className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs text-black hover:bg-teal-50 rounded-lg transition-colors">
                <Plus className="w-4 h-4 text-teal-600" />
                <span>Add {section.slice(0, -1)}</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
