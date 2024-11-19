


// // src/components/NotebookUI/NotebookLayout.tsx

// import React, { useState } from 'react';
// import { FileText, Settings, Database } from 'lucide-react';
// import Navbar from './Navbar/Navbar';
// import Sidebar from './Sidebar/Sidebar';
// import Notebook from './Notebook/Notebook';
// import { NotebookTab } from './types';
// import { Box } from '@mui/material'; // Import Material-UI Box component

// const NotebookLayout: React.FC = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeTab, setActiveTab] = useState('notebook1');

//   const notebooks: NotebookTab[] = [
//     { id: 'notebook1', title: 'Data Analysis', icon: <FileText className="w-4 h-4" /> },
//     { id: 'notebook2', title: 'Model Training', icon: <Settings className="w-4 h-4" /> },
//     { id: 'notebook3', title: 'Predictions', icon: <Database className="w-4 h-4" /> },
//   ];

//   return (
//     <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F9FAFB' }}>
//       <Navbar
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//         notebooks={notebooks}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />
//       <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
//         <Sidebar isOpen={isSidebarOpen} />
//         <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '1rem' }}>
//           <Box
//             sx={{
//               width: '100%',
//               maxWidth: '1100px', // Increased max width for a wider shell
//               // backgroundColor: '#FFFFFF',
//               border: '1px solid #E0E0E0',
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Added shadow background
//               padding: '0.7rem',
//             }}
//           >
//             <Notebook activeTab={activeTab} />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default NotebookLayout;



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