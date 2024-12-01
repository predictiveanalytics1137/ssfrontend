



// // // import React, { useState } from 'react';
// // // import { FileText, Settings, Database } from 'lucide-react';
// // // import Navbar from './Navbar/Navbar';
// // // import Sidebar from './Sidebar/Sidebar';

// // // import { NotebookTab } from './types';
// // // import SQLNotebook from './Notebook/Notebook';

// // // const NotebookLayout: React.FC = () => {
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // //   const [activeTab, setActiveTab] = useState('notebook1');

// // //   const notebooks: NotebookTab[] = [
// // //     { id: 'notebook1', title: 'Data Analysis', icon: <FileText className="w-4 h-4" /> },
// // //     { id: 'notebook2', title: 'Model Training', icon: <Settings className="w-4 h-4" /> },
// // //     { id: 'notebook3', title: 'Predictions', icon: <Database className="w-4 h-4" /> },
// // //   ];

// // //   return (
// // //     <div className="h-screen flex flex-col bg-gray-50">
// // //       <Navbar
// // //         isSidebarOpen={isSidebarOpen}
// // //         setIsSidebarOpen={setIsSidebarOpen}
// // //         notebooks={notebooks}
// // //         activeTab={activeTab}
// // //         setActiveTab={setActiveTab}
// // //       />
// // //       <div className="flex flex-1 overflow-hidden">
// // //         <Sidebar isOpen={isSidebarOpen} />
// // //         <div className="flex-1 flex justify-center items-start overflow-y-auto">
// // //           <div className="w-full max-w-6xl">
// // //             <SQLNotebook activeTab={activeTab} />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NotebookLayout;



// // import React, { useState } from 'react';
// // import { FileText, Settings } from 'lucide-react';
// // import Navbar from './Navbar/Navbar';
// // import Sidebar from './Sidebar/Sidebar';
// // import { useLocation } from 'react-router-dom';

// // import { NotebookTab } from './types';
// // import SQLNotebook from './Notebook/Notebook';

// // const NotebookLayout: React.FC = () => {
// //   const location = useLocation();
// //   const notebooksData = location.state?.notebooks || {};

// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// //   const notebooks: NotebookTab[] = [
// //     { id: 'entity_target_notebook', title: 'Entity & Target Analysis', icon: <FileText className="w-4 h-4" /> },
// //     { id: 'features_notebook', title: 'Features Analysis', icon: <Settings className="w-4 h-4" /> },
// //   ];

// //   const notebookContent = notebooksData[activeTab];

// //   return (
// //     <div className="h-screen flex flex-col bg-gray-50">
// //       <Navbar
// //         isSidebarOpen={isSidebarOpen}
// //         setIsSidebarOpen={setIsSidebarOpen}
// //         notebooks={notebooks}
// //         activeTab={activeTab}
// //         setActiveTab={setActiveTab}
// //       />
// //       <div className="flex flex-1 overflow-hidden">
// //         <Sidebar isOpen={isSidebarOpen} />
// //         <div className="flex-1 flex justify-center items-start overflow-y-auto">
// //           <div className="w-full max-w-6xl">
// //             <SQLNotebook activeTab={activeTab} notebookContent={notebookContent} />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NotebookLayout;


// // import React, { useState } from 'react';
// // import { FileText, Settings } from 'lucide-react';
// // import Navbar from './Navbar/Navbar';
// // import Sidebar from './Sidebar/Sidebar';
// // import { useLocation } from 'react-router-dom';

// // import { NotebookTab } from './types';
// // import SQLNotebook from './Notebook/Notebook';

// // const NotebookLayout: React.FC = () => {
// //   const location = useLocation();
// //   const notebooksData = location.state?.notebooks || {};

// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// //   const notebooks: NotebookTab[] = [
// //     { id: 'entity_target_notebook', title: 'Entity & Target Analysis', icon: <FileText className="w-4 h-4" /> },
// //     { id: 'features_notebook', title: 'Features Analysis', icon: <Settings className="w-4 h-4" /> },
// //   ];

// //   const notebookContent = notebooksData[activeTab];

// //   return (
// //     <div className="h-screen flex flex-col bg-gray-50">
// //       <Navbar
// //         isSidebarOpen={isSidebarOpen}
// //         setIsSidebarOpen={setIsSidebarOpen}
// //         notebooks={notebooks}
// //         activeTab={activeTab}
// //         setActiveTab={setActiveTab}
// //       />
// //       <div className="flex flex-1 overflow-hidden">
// //         <Sidebar isOpen={isSidebarOpen} />
// //         <div className="flex-1 flex justify-center items-start overflow-y-auto">
// //           <div className="w-full max-w-6xl">
// //             <SQLNotebook activeTab={activeTab} notebookContent={notebookContent} />
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NotebookLayout;



// // NotebookLayout.tsx

// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import SQLNotebook from './Notebook/Notebook'; // Adjust the import path as needed

// interface NotebookTab {
//   id: string;
//   title: string;
// }

// const NotebookLayout: React.FC = () => {
//   const location = useLocation();
//   const notebooksData = location.state?.notebooks || {};

//   const [activeTab, setActiveTab] = useState('entity_target_notebook');

//   const notebooks: NotebookTab[] = [
//     {
//       id: 'entity_target_notebook',
//       title: 'Entity & Target Analysis',
//     },
//     {
//       id: 'features_notebook',
//       title: 'Features Analysis',
//     },
//   ];

//   const notebookContent = notebooksData[activeTab];

//   return (
//     <div className="flex">
//       {/* Sidebar or Tab Navigation */}
//       <div className="w-64 bg-gray-100 p-4">
//         {notebooks.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`block w-full text-left px-4 py-2 mb-2 rounded ${
//               activeTab === tab.id
//                 ? 'bg-teal-600 text-white'
//                 : 'bg-white text-gray-700'
//             }`}
//           >
//             {tab.title}
//           </button>
//         ))}
//       </div>
//       {/* Main Content */}
//       <div className="flex-1">
//         <SQLNotebook
//           activeTab={activeTab}
//           notebookContent={notebookContent}
//         />
//       </div>
//     </div>
//   );
// };

// export default NotebookLayout;



import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import SQLNotebook from './Notebook/Notebook'; // Adjust the import path as needed

interface NotebookTab {
  id: string;
  title: string;
  icon: string;
}

const NotebookLayout: React.FC = () => {
  const location = useLocation();
  const notebooksData = location.state?.notebooks || {};

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('entity_target_notebook');

  const notebooks: NotebookTab[] = [
    {
      id: 'entity_target_notebook',
      title: 'Entity & Target Analysis',
      icon: 'icon-entity',
    },
    {
      id: 'features_notebook',
      title: 'Features Analysis',
      icon: 'icon-features', 
    },
  ];

  // const notebookContent = notebooksData[activeTab];

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
        <div className="flex-1 flex flex-col justify-start items-center overflow-y-auto p-10">
          <div className="w-full max-w-6xl">
            <SQLNotebook
              activeTab="entity_target_notebook"
              notebookContent={notebooksData['entity_target_notebook']}
            />
            <SQLNotebook
              activeTab="features_notebook"
              notebookContent={notebooksData['features_notebook']}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotebookLayout;