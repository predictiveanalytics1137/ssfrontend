



// // // // // // // // // // // // // // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // // // // // // // // // // // // // import { FileText, Settings, Database } from 'lucide-react';
// // // // // // // // // // // // // // // // // // // // // // // // import Navbar from './Navbar/Navbar';
// // // // // // // // // // // // // // // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';

// // // // // // // // // // // // // // // // // // // // // // // // import { NotebookTab } from './types';
// // // // // // // // // // // // // // // // // // // // // // // // import SQLNotebook from './Notebook/Notebook';

// // // // // // // // // // // // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // // // // // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // // // // // // // // // // // // // // // // // // //   const [activeTab, setActiveTab] = useState('notebook1');

// // // // // // // // // // // // // // // // // // // // // // // //   const notebooks: NotebookTab[] = [
// // // // // // // // // // // // // // // // // // // // // // // //     { id: 'notebook1', title: 'Data Analysis', icon: <FileText className="w-4 h-4" /> },
// // // // // // // // // // // // // // // // // // // // // // // //     { id: 'notebook2', title: 'Model Training', icon: <Settings className="w-4 h-4" /> },
// // // // // // // // // // // // // // // // // // // // // // // //     { id: 'notebook3', title: 'Predictions', icon: <Database className="w-4 h-4" /> },
// // // // // // // // // // // // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // // // // //     <div className="h-screen flex flex-col bg-gray-50">
// // // // // // // // // // // // // // // // // // // // // // // //       <Navbar
// // // // // // // // // // // // // // // // // // // // // // // //         isSidebarOpen={isSidebarOpen}
// // // // // // // // // // // // // // // // // // // // // // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // // // // // // // // // // // // // // // // //         notebooks={notebooks}
// // // // // // // // // // // // // // // // // // // // // // // //         activeTab={activeTab}
// // // // // // // // // // // // // // // // // // // // // // // //         setActiveTab={setActiveTab}
// // // // // // // // // // // // // // // // // // // // // // // //       />
// // // // // // // // // // // // // // // // // // // // // // // //       <div className="flex flex-1 overflow-hidden">
// // // // // // // // // // // // // // // // // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // // // // // // // // // // // // // // // // // //         <div className="flex-1 flex justify-center items-start overflow-y-auto">
// // // // // // // // // // // // // // // // // // // // // // // //           <div className="w-full max-w-6xl">
// // // // // // // // // // // // // // // // // // // // // // // //             <SQLNotebook activeTab={activeTab} />
// // // // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // // // // // // export default NotebookLayout;



// // // // // // // // // // // // // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // // // // // // // // // // // // import { FileText, Settings } from 'lucide-react';
// // // // // // // // // // // // // // // // // // // // // // // import Navbar from './Navbar/Navbar';
// // // // // // // // // // // // // // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // // // // // // // // // // // // // // import { useLocation } from 'react-router-dom';

// // // // // // // // // // // // // // // // // // // // // // // import { NotebookTab } from './types';
// // // // // // // // // // // // // // // // // // // // // // // import SQLNotebook from './Notebook/Notebook';

// // // // // // // // // // // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // // // // // // // // // //   const notebooksData = location.state?.notebooks || {};

// // // // // // // // // // // // // // // // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // // // // // // // // // // // // // // // // // //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// // // // // // // // // // // // // // // // // // // // // // //   const notebooks: NotebookTab[] = [
// // // // // // // // // // // // // // // // // // // // // // //     { id: 'entity_target_notebook', title: 'Entity & Target Analysis', icon: <FileText className="w-4 h-4" /> },
// // // // // // // // // // // // // // // // // // // // // // //     { id: 'features_notebook', title: 'Features Analysis', icon: <Settings className="w-4 h-4" /> },
// // // // // // // // // // // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // // // // // // // // // // //   const notebookContent = notebooksData[activeTab];

// // // // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // // // //     <div className="h-screen flex flex-col bg-gray-50">
// // // // // // // // // // // // // // // // // // // // // // //       <Navbar
// // // // // // // // // // // // // // // // // // // // // // //         isSidebarOpen={isSidebarOpen}
// // // // // // // // // // // // // // // // // // // // // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // // // // // // // // // // // // // // // //         notebooks={notebooks}
// // // // // // // // // // // // // // // // // // // // // // //         activeTab={activeTab}
// // // // // // // // // // // // // // // // // // // // // // //         setActiveTab={setActiveTab}
// // // // // // // // // // // // // // // // // // // // // // //       />
// // // // // // // // // // // // // // // // // // // // // // //       <div className="flex flex-1 overflow-hidden">
// // // // // // // // // // // // // // // // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // // // // // // // // // // // // // // // // //         <div className="flex-1 flex justify-center items-start overflow-y-auto">
// // // // // // // // // // // // // // // // // // // // // // //           <div className="w-full max-w-6xl">
// // // // // // // // // // // // // // // // // // // // // // //             <SQLNotebook activeTab={activeTab} notebookContent={notebookContent} />
// // // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // // // // // export default NotebookLayout;


// // // // // // // // // // // // // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // // // // // // // // // // // // import { FileText, Settings } from 'lucide-react';
// // // // // // // // // // // // // // // // // // // // // // // import Navbar from './Navbar/Navbar';
// // // // // // // // // // // // // // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // // // // // // // // // // // // // // import { useLocation } from 'react-router-dom';

// // // // // // // // // // // // // // // // // // // // // // // import { NotebookTab } from './types';
// // // // // // // // // // // // // // // // // // // // // // // import SQLNotebook from './Notebook/Notebook';

// // // // // // // // // // // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // // // // // // // // // //   const notebooksData = location.state?.notebooks || {};

// // // // // // // // // // // // // // // // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // // // // // // // // // // // // // // // // // //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// // // // // // // // // // // // // // // // // // // // // // //   const notebooks: NotebookTab[] = [
// // // // // // // // // // // // // // // // // // // // // // //     { id: 'entity_target_notebook', title: 'Entity & Target Analysis', icon: <FileText className="w-4 h-4" /> },
// // // // // // // // // // // // // // // // // // // // // // //     { id: 'features_notebook', title: 'Features Analysis', icon: <Settings className="w-4 h-4" /> },
// // // // // // // // // // // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // // // // // // // // // // //   const notebookContent = notebooksData[activeTab];

// // // // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // // // //     <div className="h-screen flex flex-col bg-gray-50">
// // // // // // // // // // // // // // // // // // // // // // //       <Navbar
// // // // // // // // // // // // // // // // // // // // // // //         isSidebarOpen={isSidebarOpen}
// // // // // // // // // // // // // // // // // // // // // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // // // // // // // // // // // // // // // //         notebooks={notebooks}
// // // // // // // // // // // // // // // // // // // // // // //         activeTab={activeTab}
// // // // // // // // // // // // // // // // // // // // // // //         setActiveTab={setActiveTab}
// // // // // // // // // // // // // // // // // // // // // // //       />
// // // // // // // // // // // // // // // // // // // // // // //       <div className="flex flex-1 overflow-hidden">
// // // // // // // // // // // // // // // // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // // // // // // // // // // // // // // // // //         <div className="flex-1 flex justify-center items-start overflow-y-auto">
// // // // // // // // // // // // // // // // // // // // // // //           <div className="w-full max-w-6xl">
// // // // // // // // // // // // // // // // // // // // // // //             <SQLNotebook activeTab={activeTab} notebookContent={notebookContent} />
// // // // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // // // // // export default NotebookLayout;



// // // // // // // // // // // // // // // // // // // // // // // NotebookLayout.tsx

// // // // // // // // // // // // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // // // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // // // // // // // // // // // // // import SQLNotebook from './Notebook/Notebook'; // Adjust the import path as needed

// // // // // // // // // // // // // // // // // // // // // // interface NotebookTab {
// // // // // // // // // // // // // // // // // // // // // //   id: string;
// // // // // // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // // // // // // // // //   const notebooksData = location.state?.notebooks || {};

// // // // // // // // // // // // // // // // // // // // // //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// // // // // // // // // // // // // // // // // // // // // //   const notebooks: NotebookTab[] = [
// // // // // // // // // // // // // // // // // // // // // //     {
// // // // // // // // // // // // // // // // // // // // // //       id: 'entity_target_notebook',
// // // // // // // // // // // // // // // // // // // // // //       title: 'Entity & Target Analysis',
// // // // // // // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // // // // // // //     {
// // // // // // // // // // // // // // // // // // // // // //       id: 'features_notebook',
// // // // // // // // // // // // // // // // // // // // // //       title: 'Features Analysis',
// // // // // // // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // // // // // // // // // //   const notebookContent = notebooksData[activeTab];

// // // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // // //     <div className="flex">
// // // // // // // // // // // // // // // // // // // // // //       {/* Sidebar or Tab Navigation */}
// // // // // // // // // // // // // // // // // // // // // //       <div className="w-64 bg-gray-100 p-4">
// // // // // // // // // // // // // // // // // // // // // //         {notebooks.map((tab) => (
// // // // // // // // // // // // // // // // // // // // // //           <button
// // // // // // // // // // // // // // // // // // // // // //             key={tab.id}
// // // // // // // // // // // // // // // // // // // // // //             onClick={() => setActiveTab(tab.id)}
// // // // // // // // // // // // // // // // // // // // // //             className={`block w-full text-left px-4 py-2 mb-2 rounded ${
// // // // // // // // // // // // // // // // // // // // // //               activeTab === tab.id
// // // // // // // // // // // // // // // // // // // // // //                 ? 'bg-teal-600 text-white'
// // // // // // // // // // // // // // // // // // // // // //                 : 'bg-white text-gray-700'
// // // // // // // // // // // // // // // // // // // // // //             }`}
// // // // // // // // // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // // // // // // // // //             {tab.title}
// // // // // // // // // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // // // // // // // // //         ))}
// // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // //       {/* Main Content */}
// // // // // // // // // // // // // // // // // // // // // //       <div className="flex-1">
// // // // // // // // // // // // // // // // // // // // // //         <SQLNotebook
// // // // // // // // // // // // // // // // // // // // // //           activeTab={activeTab}
// // // // // // // // // // // // // // // // // // // // // //           notebookContent={notebookContent}
// // // // // // // // // // // // // // // // // // // // // //         />
// // // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // // // // export default NotebookLayout;



// // // // // // // // // // // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // // // // // // // // // // // // import Navbar from './Navbar/Navbar';
// // // // // // // // // // // // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // // // // // // // // // // // // import SQLNotebook from './Notebook/Notebook'; // Adjust the import path as needed

// // // // // // // // // // // // // // // // // // // // // interface NotebookTab {
// // // // // // // // // // // // // // // // // // // // //   id: string;
// // // // // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // // // // //   icon: string;
// // // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // // // // // // // //   const notebooksData = location.state?.notebooks || {};

// // // // // // // // // // // // // // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // // // // // // // // // // // // // // // //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// // // // // // // // // // // // // // // // // // // // //   const notebooks: NotebookTab[] = [
// // // // // // // // // // // // // // // // // // // // //     {
// // // // // // // // // // // // // // // // // // // // //       id: 'entity_target_notebook',
// // // // // // // // // // // // // // // // // // // // //       title: 'Entity & Target Analysis',
// // // // // // // // // // // // // // // // // // // // //       icon: 'icon-entity',
// // // // // // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // // // // // //     {
// // // // // // // // // // // // // // // // // // // // //       id: 'features_notebook',
// // // // // // // // // // // // // // // // // // // // //       title: 'Features Analysis',
// // // // // // // // // // // // // // // // // // // // //       icon: 'icon-features', 
// // // // // // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // // // // // // // // //   // const notebookContent = notebooksData[activeTab];

// // // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // // //     <div className="h-screen flex flex-col bg-gray-50">
// // // // // // // // // // // // // // // // // // // // //       <Navbar
// // // // // // // // // // // // // // // // // // // // //         isSidebarOpen={isSidebarOpen}
// // // // // // // // // // // // // // // // // // // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // // // // // // // // // // // // // //         notebooks={notebooks}
// // // // // // // // // // // // // // // // // // // // //         activeTab={activeTab}
// // // // // // // // // // // // // // // // // // // // //         setActiveTab={setActiveTab}
// // // // // // // // // // // // // // // // // // // // //       />
// // // // // // // // // // // // // // // // // // // // //       <div className="flex flex-1 overflow-hidden">
// // // // // // // // // // // // // // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // // // // // // // // // // // // // // //         <div className="flex-1 flex flex-col justify-start items-center overflow-y-auto p-10">
// // // // // // // // // // // // // // // // // // // // //           <div className="w-full max-w-6xl">
// // // // // // // // // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // // // // // // // // //               activeTab="entity_target_notebook"
// // // // // // // // // // // // // // // // // // // // //               notebookContent={notebooksData['entity_target_notebook']}
// // // // // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // // // // // // // // //               activeTab="features_notebook"
// // // // // // // // // // // // // // // // // // // // //               notebookContent={notebooksData['features_notebook']}
// // // // // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // // // export default NotebookLayout;



// // // // // // // // // // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // // // // // // // // // // // import Navbar from './Navbar/Navbar';
// // // // // // // // // // // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // // // // // // // // // // // import SQLNotebook from './Notebook/Notebook';

// // // // // // // // // // // // // // // // // // // // interface NotebookTab {
// // // // // // // // // // // // // // // // // // // //   id: string;
// // // // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // // // //   icon: string;
// // // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // // // // // // //   const notebooksData = location.state?.notebooks || {};

// // // // // // // // // // // // // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // // // // // // // // // // // // // // //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// // // // // // // // // // // // // // // // // // // //   const [entityTargetQuery, setEntityTargetQuery] = useState('');
// // // // // // // // // // // // // // // // // // // //   const [featuresQuery, setFeaturesQuery] = useState('');
// // // // // // // // // // // // // // // // // // // //   const [entityTargetData, setEntityTargetData] = useState([]);
// // // // // // // // // // // // // // // // // // // //   const [featuresData, setFeaturesData] = useState([]);

// // // // // // // // // // // // // // // // // // // //   const notebooks: NotebookTab[] = [
// // // // // // // // // // // // // // // // // // // //     {
// // // // // // // // // // // // // // // // // // // //       id: 'entity_target_notebook',
// // // // // // // // // // // // // // // // // // // //       title: 'Entity & Target Analysis',
// // // // // // // // // // // // // // // // // // // //       icon: 'icon-entity',
// // // // // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // // // // //     {
// // // // // // // // // // // // // // // // // // // //       id: 'features_notebook',
// // // // // // // // // // // // // // // // // // // //       title: 'Features Analysis',
// // // // // // // // // // // // // // // // // // // //       icon: 'icon-features',
// // // // // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // // // // // // // //   // Function to fetch data from the backend API
// // // // // // // // // // // // // // // // // // // //   const fetchDataForAutomation = async () => {
// // // // // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // // // // //       const response = await fetch('http://localhost:8000/api/automation/', {
// // // // // // // // // // // // // // // // // // // //         method: 'POST',
// // // // // // // // // // // // // // // // // // // //         headers: {
// // // // // // // // // // // // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // // // // // // // // // // //         throw new Error(`API error: ${response.statusText}`);
// // // // // // // // // // // // // // // // // // // //       }

// // // // // // // // // // // // // // // // // // // //       const data = await response.json();

// // // // // // // // // // // // // // // // // // // //       // Extract SQL queries and data, limiting to 10 for presentation
// // // // // // // // // // // // // // // // // // // //       setEntityTargetQuery(`SELECT * FROM (${data.entity_target_query}) LIMIT 10;`);
// // // // // // // // // // // // // // // // // // // //       setFeaturesQuery(`SELECT * FROM (${data.features_query}) LIMIT 10;`);

// // // // // // // // // // // // // // // // // // // //       // Set data with LIMIT 10 for presentation
// // // // // // // // // // // // // // // // // // // //       setEntityTargetData(data.entity_target_data.slice(0, 10));
// // // // // // // // // // // // // // // // // // // //       setFeaturesData(data.features_data.slice(0, 10));

// // // // // // // // // // // // // // // // // // // //       console.log('[DEBUG] Entity & Target Data:', data.entity_target_data.slice(0, 10));
// // // // // // // // // // // // // // // // // // // //       console.log('[DEBUG] Features Data:', data.features_data.slice(0, 10));
// // // // // // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // // // // // //       console.error('Error fetching data for automation:', error);
// // // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // // //     <div className="h-screen flex flex-col bg-gray-50 relative">
// // // // // // // // // // // // // // // // // // // //       <Navbar
// // // // // // // // // // // // // // // // // // // //         isSidebarOpen={isSidebarOpen}
// // // // // // // // // // // // // // // // // // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // // // // // // // // // // // // //         notebooks={notebooks}
// // // // // // // // // // // // // // // // // // // //         activeTab={activeTab}
// // // // // // // // // // // // // // // // // // // //         setActiveTab={setActiveTab}
// // // // // // // // // // // // // // // // // // // //       />
// // // // // // // // // // // // // // // // // // // //       <div className="flex flex-1 overflow-hidden">
// // // // // // // // // // // // // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // // // // // // // // // // // // // //         <div className="flex-1 flex flex-col justify-start items-center overflow-y-auto p-10">
// // // // // // // // // // // // // // // // // // // //           <div className="w-full max-w-6xl">
// // // // // // // // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // // // // // // // //               activeTab="entity_target_notebook"
// // // // // // // // // // // // // // // // // // // //               notebookContent={notebooksData['entity_target_notebook']}
// // // // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // // // // // // // //               activeTab="features_notebook"
// // // // // // // // // // // // // // // // // // // //               notebookContent={notebooksData['features_notebook']}
// // // // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // // // // // // // //       {/* Floating Button */}
// // // // // // // // // // // // // // // // // // // //       <button
// // // // // // // // // // // // // // // // // // // //         onClick={fetchDataForAutomation}
// // // // // // // // // // // // // // // // // // // //         className="fixed bottom-10 right-10 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
// // // // // // // // // // // // // // // // // // // //       >
// // // // // // // // // // // // // // // // // // // //         Train Model
// // // // // // // // // // // // // // // // // // // //       </button>

// // // // // // // // // // // // // // // // // // // //       {/* Display SQL Queries and Data */}
// // // // // // // // // // // // // // // // // // // //       <div className="fixed bottom-20 right-10 w-96 bg-white p-4 shadow-lg rounded-md overflow-y-auto">
// // // // // // // // // // // // // // // // // // // //         <h3 className="text-lg font-semibold mb-2">SQL Queries</h3>
// // // // // // // // // // // // // // // // // // // //         <div className="mb-4">
// // // // // // // // // // // // // // // // // // // //           <strong>Entity & Target Query:</strong>
// // // // // // // // // // // // // // // // // // // //           <pre className="bg-gray-100 p-2 rounded">{entityTargetQuery}</pre>
// // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // //         <div>
// // // // // // // // // // // // // // // // // // // //           <strong>Features Query:</strong>
// // // // // // // // // // // // // // // // // // // //           <pre className="bg-gray-100 p-2 rounded">{featuresQuery}</pre>
// // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // //         <h3 className="text-lg font-semibold mt-4">Sample Data</h3>
// // // // // // // // // // // // // // // // // // // //         <div>
// // // // // // // // // // // // // // // // // // // //           <strong>Entity & Target Data:</strong>
// // // // // // // // // // // // // // // // // // // //           <pre className="bg-gray-100 p-2 rounded">
// // // // // // // // // // // // // // // // // // // //             {JSON.stringify(entityTargetData, null, 2)}
// // // // // // // // // // // // // // // // // // // //           </pre>
// // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // //         <div>
// // // // // // // // // // // // // // // // // // // //           <strong>Features Data:</strong>
// // // // // // // // // // // // // // // // // // // //           <pre className="bg-gray-100 p-2 rounded">
// // // // // // // // // // // // // // // // // // // //             {JSON.stringify(featuresData, null, 2)}
// // // // // // // // // // // // // // // // // // // //           </pre>
// // // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // // export default NotebookLayout;


// // // // // // // // // // // // // // // // // // // Below working code

// // // // // // // // // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // // // // // // // // import { useLocation } from 'react-router-dom';
// // // // // // // // // // // // // // // // // // // import Navbar from './Navbar/Navbar';
// // // // // // // // // // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // // // // // // // // // // import SQLNotebook from './Notebook/Notebook';

// // // // // // // // // // // // // // // // // // // interface NotebookTab {
// // // // // // // // // // // // // // // // // // //   id: string;
// // // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // // //   icon: string;
// // // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // // // // // // //   const location = useLocation();
  
// // // // // // // // // // // // // // // // // // //   // Retrieve data from location.state
// // // // // // // // // // // // // // // // // // //   const notebooksData = location.state?.notebooks || {};
// // // // // // // // // // // // // // // // // // //   const fileUrl = location.state?.file_url;
// // // // // // // // // // // // // // // // // // //   const entityColumn = location.state?.entity_column;
// // // // // // // // // // // // // // // // // // //   const targetColumn = location.state?.target_column;
// // // // // // // // // // // // // // // // // // //   const features = location.state?.features || [];
// // // // // // // // // // // // // // // // // // //   const trainingUserId = location.state?.user_id;
// // // // // // // // // // // // // // // // // // //   const trainingChatId = location.state?.chat_id;

// // // // // // // // // // // // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // // // // // // // // // // // // // //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// // // // // // // // // // // // // // // // // // //   const notebooks: NotebookTab[] = [
// // // // // // // // // // // // // // // // // // //     {
// // // // // // // // // // // // // // // // // // //       id: 'entity_target_notebook',
// // // // // // // // // // // // // // // // // // //       title: 'Entity & Target Analysis',
// // // // // // // // // // // // // // // // // // //       icon: 'icon-entity',
// // // // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // // // //     {
// // // // // // // // // // // // // // // // // // //       id: 'features_notebook',
// // // // // // // // // // // // // // // // // // //       title: 'Features Analysis',
// // // // // // // // // // // // // // // // // // //       icon: 'icon-features',
// // // // // // // // // // // // // // // // // // //     },
// // // // // // // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // // // // // // //   const fetchDataForAutomation = async () => {
// // // // // // // // // // // // // // // // // // //     // Check if we have the required params
// // // // // // // // // // // // // // // // // // //     if (!fileUrl || !targetColumn) {
// // // // // // // // // // // // // // // // // // //       console.error('[DEBUG] Missing required parameters (fileUrl or targetColumn) for training.');
// // // // // // // // // // // // // // // // // // //       return;
// // // // // // // // // // // // // // // // // // //     }

// // // // // // // // // // // // // // // // // // //     try {
// // // // // // // // // // // // // // // // // // //       const payload = {
// // // // // // // // // // // // // // // // // // //         file_url: fileUrl,
// // // // // // // // // // // // // // // // // // //         target_column: targetColumn,
// // // // // // // // // // // // // // // // // // //         entity_column: entityColumn,
// // // // // // // // // // // // // // // // // // //         features: features,
// // // // // // // // // // // // // // // // // // //         user_id: trainingUserId,
// // // // // // // // // // // // // // // // // // //         chat_id: trainingChatId,
// // // // // // // // // // // // // // // // // // //       };

// // // // // // // // // // // // // // // // // // //       console.log('[DEBUG] Sending payload to data-for-automation:', payload);

// // // // // // // // // // // // // // // // // // //       const response = await fetch('http://localhost:8000/api/automation/', {
// // // // // // // // // // // // // // // // // // //         method: 'POST',
// // // // // // // // // // // // // // // // // // //         headers: {
// // // // // // // // // // // // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // // // // // // // // // // // //         },
// // // // // // // // // // // // // // // // // // //         body: JSON.stringify(payload),
// // // // // // // // // // // // // // // // // // //       });

// // // // // // // // // // // // // // // // // // //       if (!response.ok) {
// // // // // // // // // // // // // // // // // // //         throw new Error(`API error: ${response.statusText}`);
// // // // // // // // // // // // // // // // // // //       }

// // // // // // // // // // // // // // // // // // //       const data = await response.json();
// // // // // // // // // // // // // // // // // // //       console.log('[DEBUG] Training response:', data);
// // // // // // // // // // // // // // // // // // //       alert('Training completed successfully!\nCheck console for details.');
// // // // // // // // // // // // // // // // // // //     } catch (error) {
// // // // // // // // // // // // // // // // // // //       console.error('Error triggering the training pipeline:', error);
// // // // // // // // // // // // // // // // // // //       alert('Error triggering the training pipeline. Check console for details.');
// // // // // // // // // // // // // // // // // // //     }
// // // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // // //     <div className="h-screen flex flex-col bg-gray-50 relative">
// // // // // // // // // // // // // // // // // // //       <Navbar
// // // // // // // // // // // // // // // // // // //         isSidebarOpen={isSidebarOpen}
// // // // // // // // // // // // // // // // // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // // // // // // // // // // // //         notebooks={notebooks}
// // // // // // // // // // // // // // // // // // //         activeTab={activeTab}
// // // // // // // // // // // // // // // // // // //         setActiveTab={setActiveTab}
// // // // // // // // // // // // // // // // // // //       />

// // // // // // // // // // // // // // // // // // //       {/* Train Model Button */}
// // // // // // // // // // // // // // // // // // //       {/* Position: below navbar, top right corner, small and teal with hover animation */}
// // // // // // // // // // // // // // // // // // //       <div className="w-full relative">
// // // // // // // // // // // // // // // // // // //         <div className="absolute top-6 right-10">
// // // // // // // // // // // // // // // // // // //           <button
// // // // // // // // // // // // // // // // // // //             onClick={fetchDataForAutomation}
// // // // // // // // // // // // // // // // // // //             className="bg-teal-500 text-white px-4 py-2 rounded-full shadow-md 
// // // // // // // // // // // // // // // // // // //                        hover:bg-teal-600 transition-transform transform hover:-translate-y-0.5 hover:scale-105
// // // // // // // // // // // // // // // // // // //                        text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
// // // // // // // // // // // // // // // // // // //             title="Train Model"
// // // // // // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // // // // // //             Train Model
// // // // // // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // // // // // // //       <div className="flex flex-1 overflow-hidden mt-4">
// // // // // // // // // // // // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // // // // // // // // // // // // //         <div className="flex-1 flex flex-col justify-start items-center overflow-y-auto p-10">
// // // // // // // // // // // // // // // // // // //           <div className="w-full max-w-6xl">
// // // // // // // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // // // // // // //               activeTab="entity_target_notebook"
// // // // // // // // // // // // // // // // // // //               notebookContent={notebooksData['entity_target_notebook']}
// // // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // // // // // // //               activeTab="features_notebook"
// // // // // // // // // // // // // // // // // // //               notebookContent={notebooksData['features_notebook']}
// // // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // // export default NotebookLayout;





// // // // // // // // // // // // // // // // // // // Before new code implementation.



// // // // // // // // // // // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // // // // // // // // // import Navbar from './Navbar/Navbar';
// // // // // // // // // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // // // // // // // // // import SQLNotebook from './Notebook/Notebook';

// // // // // // // // // // // // // // // // // // interface NotebookTab {
// // // // // // // // // // // // // // // // // //   id: string;
// // // // // // // // // // // // // // // // // //   title: string;
// // // // // // // // // // // // // // // // // //   icon: string;
// // // // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // // // // // // //   const notebooksData = location.state?.notebooks || {};
// // // // // // // // // // // // // // // // // //   const fileUrl = location.state?.file_url;
// // // // // // // // // // // // // // // // // //   const entityColumn = location.state?.entity_column;
// // // // // // // // // // // // // // // // // //   const targetColumn = location.state?.target_column;
// // // // // // // // // // // // // // // // // //   const features = location.state?.features || [];
// // // // // // // // // // // // // // // // // //   const trainingUserId = location.state?.user_id;
// // // // // // // // // // // // // // // // // //   const trainingChatId = location.state?.chat_id;

// // // // // // // // // // // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // // // // // // // // // // // // // // // //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// // // // // // // // // // // // // // // // // //   const notebooks: NotebookTab[] = [
// // // // // // // // // // // // // // // // // //     { id: 'entity_target_notebook', title: 'Entity & Target Analysis', icon: 'icon-entity' },
// // // // // // // // // // // // // // // // // //     { id: 'features_notebook', title: 'Features Analysis', icon: 'icon-features' },
// // // // // // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // // // // // //   const handleTrainModel = () => {
// // // // // // // // // // // // // // // // // //     // Navigate to training page with all needed info
// // // // // // // // // // // // // // // // // //     navigate('/training', { state: { file_url: fileUrl, target_column: targetColumn, user_id: trainingUserId, chat_id: trainingChatId, features, entity_column: entityColumn } });
// // // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // // //     <div className="h-screen flex flex-col bg-gray-50 relative">
// // // // // // // // // // // // // // // // // //       <Navbar
// // // // // // // // // // // // // // // // // //         isSidebarOpen={isSidebarOpen}
// // // // // // // // // // // // // // // // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // // // // // // // // // // //         notebooks={notebooks}
// // // // // // // // // // // // // // // // // //         activeTab={activeTab}
// // // // // // // // // // // // // // // // // //         setActiveTab={setActiveTab}
// // // // // // // // // // // // // // // // // //       />

// // // // // // // // // // // // // // // // // //       <div className="w-full relative">
// // // // // // // // // // // // // // // // // //         <div className="absolute top-6 right-10">
// // // // // // // // // // // // // // // // // //           <button
// // // // // // // // // // // // // // // // // //             onClick={handleTrainModel}
// // // // // // // // // // // // // // // // // //             className="bg-teal-500 text-white px-4 py-2 rounded-full shadow-md 
// // // // // // // // // // // // // // // // // //                        hover:bg-teal-600 transition-transform transform hover:-translate-y-0.5 hover:scale-105
// // // // // // // // // // // // // // // // // //                        text-sm focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
// // // // // // // // // // // // // // // // // //             title="Train Model"
// // // // // // // // // // // // // // // // // //           >
// // // // // // // // // // // // // // // // // //             Train Model
// // // // // // // // // // // // // // // // // //           </button>
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //       </div>

// // // // // // // // // // // // // // // // // //       <div className="flex flex-1 overflow-hidden mt-4">
// // // // // // // // // // // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // // // // // // // // // // // //         <div className="flex-1 flex flex-col justify-start items-center overflow-y-auto p-10">
// // // // // // // // // // // // // // // // // //           <div className="w-full max-w-6xl">
// // // // // // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // // // // // //               activeTab="entity_target_notebook"
// // // // // // // // // // // // // // // // // //               notebookContent={notebooksData['entity_target_notebook']}
// // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // // // // // //               activeTab="features_notebook"
// // // // // // // // // // // // // // // // // //               notebookContent={notebooksData['features_notebook']}
// // // // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // // export default NotebookLayout;




// // // // // // // // // // // // // // // // // // NotebookLayout.tsx
// // // // // // // // // // // // // // // // // import React, { useState } from "react";
// // // // // // // // // // // // // // // // // import { useLocation, useNavigate } from "react-router-dom";
// // // // // // // // // // // // // // // // // import Navbar from "./Navbar/Navbar";
// // // // // // // // // // // // // // // // // import Sidebar from "./Sidebar/Sidebar";
// // // // // // // // // // // // // // // // // import SQLNotebook from "./Notebook/Notebook";
// // // // // // // // // // // // // // // // // import Dashboard from "../Dashboard/Dashboard";
// // // // // // // // // // // // // // // // // import PredictionsUI from "../Predict/PredictNewData";
// // // // // // // // // // // // // // // // // import { Database, FileText, Settings } from "lucide-react";
// // // // // // // // // // // // // // // // // import { NotebookTab } from "./types";

// // // // // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // // // // // //   const notebooksData = location.state?.notebooks || {};
// // // // // // // // // // // // // // // // //   const userId = location.state?.user_id || "default_user";
// // // // // // // // // // // // // // // // //   const chatId = location.state?.chat_id || "default_chat";
// // // // // // // // // // // // // // // // //   const isTrained = location.state?.isTrained || false;

// // // // // // // // // // // // // // // // //   const [activeTab, setActiveTab] = useState("notebook");

// // // // // // // // // // // // // // // // //   const notebooks: NotebookTab[] = [
// // // // // // // // // // // // // // // // //     { id: 'notebook', title: 'Notebook', icon: <FileText className="w-4 h-4" /> },
// // // // // // // // // // // // // // // // //     { id: 'dashboard', title: 'Dashboard', icon: <Settings className="w-4 h-4" /> },
// // // // // // // // // // // // // // // // //     { id: 'predict', title: 'Predict', icon: <Database className="w-4 h-4" /> },
// // // // // // // // // // // // // // // // //   ];

// // // // // // // // // // // // // // // // //   const handleTrainModel = () => {
// // // // // // // // // // // // // // // // //     navigate("/training", { state: { ...location.state } });
// // // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // // //     <div className="h-screen flex flex-col">
// // // // // // // // // // // // // // // // //       <Navbar
// // // // // // // // // // // // // // // // //   isSidebarOpen={true}
// // // // // // // // // // // // // // // // //   // setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // // // // // // // // // //   setIsSidebarOpen={() => {}}

// // // // // // // // // // // // // // // // //   activeTab={activeTab}
// // // // // // // // // // // // // // // // //   setActiveTab={setActiveTab}
// // // // // // // // // // // // // // // // //   notebooks={notebooks}
// // // // // // // // // // // // // // // // // />
// // // // // // // // // // // // // // // // //       <div className="flex flex-1">
// // // // // // // // // // // // // // // // //         <Sidebar isOpen={true} />
// // // // // // // // // // // // // // // // //         <div className="p-4 flex-1 overflow-auto">
// // // // // // // // // // // // // // // // //           {activeTab === "notebook" && <SQLNotebook activeTab={activeTab} notebookContent={notebooksData['notebook']} />}
// // // // // // // // // // // // // // // // //           {activeTab === "dashboard" && isTrained && <Dashboard user_id={userId} chat_id={chatId} />}
// // // // // // // // // // // // // // // // //           {activeTab === "predict" && isTrained && <PredictionsUI user_id={userId} chat_id={chatId} />}
// // // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // // //       {!isTrained && (
// // // // // // // // // // // // // // // // //         <button onClick={handleTrainModel} className="bg-teal-500 text-white px-4 py-2 rounded-full">
// // // // // // // // // // // // // // // // //           Train Model
// // // // // // // // // // // // // // // // //         </button>
// // // // // // // // // // // // // // // // //       )}
// // // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // // export default NotebookLayout;




// // // // // // // // // // // // // // // // // src/components/NotebookLayout/NotebookLayout.tsx

// // // // // // // // // // // // // // // // import React from 'react';
// // // // // // // // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // // // // // // // // // // import SQLNotebook from './Notebook/Notebook'; // Ensure this component exists

// // // // // // // // // // // // // // // // interface NotebookMetadata {
// // // // // // // // // // // // // // // //   file_url: string;
// // // // // // // // // // // // // // // //   target_column: string;
// // // // // // // // // // // // // // // //   entity_column: string;
// // // // // // // // // // // // // // // //   features: string[];
// // // // // // // // // // // // // // // //   user_id: string;
// // // // // // // // // // // // // // // //   chat_id: string;
// // // // // // // // // // // // // // // //   isTrained: boolean;
// // // // // // // // // // // // // // // // }

// // // // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // // // // //   // Extract notebook metadata from navigation state
// // // // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // // // //     file_url,
// // // // // // // // // // // // // // // //     entity_column,
// // // // // // // // // // // // // // // //     target_column,
// // // // // // // // // // // // // // // //     features,
// // // // // // // // // // // // // // // //     user_id,
// // // // // // // // // // // // // // // //     chat_id,
// // // // // // // // // // // // // // // //     isTrained = false,
// // // // // // // // // // // // // // // //   } = location.state as NotebookMetadata;

// // // // // // // // // // // // // // // //   const handleTrainModel = () => {
// // // // // // // // // // // // // // // //     navigate('/training-in-progress', {
// // // // // // // // // // // // // // // //       state: {
// // // // // // // // // // // // // // // //         file_url,
// // // // // // // // // // // // // // // //         target_column,
// // // // // // // // // // // // // // // //         user_id,
// // // // // // // // // // // // // // // //         chat_id,
// // // // // // // // // // // // // // // //         features,
// // // // // // // // // // // // // // // //         entity_column,
// // // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // // //     <div className="h-screen flex flex-col bg-gray-50 relative">
// // // // // // // // // // // // // // // //       {/* Navbar */}
// // // // // // // // // // // // // // // //       <Navbar isTrained={isTrained} />

// // // // // // // // // // // // // // // //       {/* Main Content */}
// // // // // // // // // // // // // // // //       <div className="flex flex-1 overflow-hidden mt-4">
// // // // // // // // // // // // // // // //         <div className="flex-1 flex flex-col justify-start items-center overflow-y-auto p-10">
// // // // // // // // // // // // // // // //           <div className="w-full max-w-6xl">
// // // // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // // // //               activeTab="entity_target_notebook" // or 'features_notebook' based on your logic
// // // // // // // // // // // // // // // //               notebookContent={{
// // // // // // // // // // // // // // // //                 file_url,
// // // // // // // // // // // // // // // //                 entity_column,
// // // // // // // // // // // // // // // //                 target_column,
// // // // // // // // // // // // // // // //                 features,
// // // // // // // // // // // // // // // //                 user_id,
// // // // // // // // // // // // // // // //                 chat_id,
// // // // // // // // // // // // // // // //                 isTrained,
// // // // // // // // // // // // // // // //                 handleTrainModel,
// // // // // // // // // // // // // // // //                 // sql_queries can be added here if needed
// // // // // // // // // // // // // // // //               }}
// // // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // // export default NotebookLayout;



// // // // // // // // // // // // // // // import React from 'react';
// // // // // // // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // // // // // // import Navbar from './Navbar/Navbar';
// // // // // // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // // // // // // import SQLNotebook from './Notebook/Notebook';

// // // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // // // //   // Extract notebook metadata from navigation state
// // // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // // //     notebooks,
// // // // // // // // // // // // // // //     file_url,
// // // // // // // // // // // // // // //     entity_column,
// // // // // // // // // // // // // // //     target_column,
// // // // // // // // // // // // // // //     features,
// // // // // // // // // // // // // // //     user_id,
// // // // // // // // // // // // // // //     chat_id,
// // // // // // // // // // // // // // //     isTrained = false,
// // // // // // // // // // // // // // //   } = location.state || {};

// // // // // // // // // // // // // // //   console.log('Received notebook data:', {
// // // // // // // // // // // // // // //     notebooks,
// // // // // // // // // // // // // // //     file_url,
// // // // // // // // // // // // // // //     entity_column,
// // // // // // // // // // // // // // //     target_column,
// // // // // // // // // // // // // // //     features,
// // // // // // // // // // // // // // //     user_id,
// // // // // // // // // // // // // // //     chat_id,
// // // // // // // // // // // // // // //     isTrained,
// // // // // // // // // // // // // // //   });

// // // // // // // // // // // // // // //   const handleTrainModel = () => {
// // // // // // // // // // // // // // //     navigate('/training-in-progress', {
// // // // // // // // // // // // // // //       state: {
// // // // // // // // // // // // // // //         file_url,
// // // // // // // // // // // // // // //         target_column,
// // // // // // // // // // // // // // //         user_id,
// // // // // // // // // // // // // // //         chat_id,
// // // // // // // // // // // // // // //         features,
// // // // // // // // // // // // // // //       },
// // // // // // // // // // // // // // //     });
// // // // // // // // // // // // // // //   };

// // // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // // //     <div className="h-screen flex flex-col">
// // // // // // // // // // // // // // //       <Navbar isTrained={isTrained} />
// // // // // // // // // // // // // // //       <div className="flex flex-1">
// // // // // // // // // // // // // // //         <Sidebar isOpen={true} />
// // // // // // // // // // // // // // //         <div className="p-4 flex-1 overflow-auto">
// // // // // // // // // // // // // // //           <div className="w-full max-w-6xl">
// // // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // // //               activeTab="entity_target_notebook" // or 'features_notebook' based on your logic
// // // // // // // // // // // // // // //               notebookContent={{
// // // // // // // // // // // // // // //                 file_url,
// // // // // // // // // // // // // // //                 entity_column,
// // // // // // // // // // // // // // //                 target_column,
// // // // // // // // // // // // // // //                 features,
// // // // // // // // // // // // // // //                 user_id,
// // // // // // // // // // // // // // //                 chat_id,
// // // // // // // // // // // // // // //                 isTrained,
// // // // // // // // // // // // // // //                 handleTrainModel,
// // // // // // // // // // // // // // //                 sql_queries: notebooks?.entity_target_notebook ? JSON.parse(notebooks.entity_target_notebook).cells.map((cell: { source: any[]; }) => cell.source.join('')) : [],
// // // // // // // // // // // // // // //               }}
// // // // // // // // // // // // // // //             />
// // // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // // };

// // // // // // // // // // // // // // // export default NotebookLayout;



// // // // // // // // // // // // // // import React from 'react';
// // // // // // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // // // // // import Navbar from './Navbar/Navbar';
// // // // // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // // // // // import SQLNotebook from './Notebook/Notebook';

// // // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // // //   // Extract notebook metadata from navigation state
// // // // // // // // // // // // // //   const {
// // // // // // // // // // // // // //     notebooks,
// // // // // // // // // // // // // //     file_url,
// // // // // // // // // // // // // //     entity_column,
// // // // // // // // // // // // // //     target_column,
// // // // // // // // // // // // // //     features,
// // // // // // // // // // // // // //     user_id,
// // // // // // // // // // // // // //     chat_id,
// // // // // // // // // // // // // //     isTrained = false,
// // // // // // // // // // // // // //   } = location.state || {};

// // // // // // // // // // // // // //   console.log('Received notebook data:', {
// // // // // // // // // // // // // //     notebooks,
// // // // // // // // // // // // // //     file_url,
// // // // // // // // // // // // // //     entity_column,
// // // // // // // // // // // // // //     target_column,
// // // // // // // // // // // // // //     features,
// // // // // // // // // // // // // //     user_id,
// // // // // // // // // // // // // //     chat_id,
// // // // // // // // // // // // // //     isTrained,
// // // // // // // // // // // // // //   });

// // // // // // // // // // // // // //   const handleTrainModel = () => {
// // // // // // // // // // // // // //     navigate('/training-in-progress', {
// // // // // // // // // // // // // //       state: {
// // // // // // // // // // // // // //         file_url,
// // // // // // // // // // // // // //         target_column,
// // // // // // // // // // // // // //         user_id,
// // // // // // // // // // // // // //         chat_id,
// // // // // // // // // // // // // //         features,
// // // // // // // // // // // // // //       },
// // // // // // // // // // // // // //     });
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const entityTargetNotebookContent = {
// // // // // // // // // // // // // //     file_url,
// // // // // // // // // // // // // //     entity_column,
// // // // // // // // // // // // // //     target_column,
// // // // // // // // // // // // // //     features,
// // // // // // // // // // // // // //     user_id,
// // // // // // // // // // // // // //     chat_id,
// // // // // // // // // // // // // //     isTrained,
// // // // // // // // // // // // // //     handleTrainModel,
// // // // // // // // // // // // // //     sql_queries: notebooks?.entity_target_notebook ? JSON.parse(notebooks.entity_target_notebook).cells.map((cell: { source: any[]; }) => cell.source.join('')) : [],
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   const featuresNotebookContent = {
// // // // // // // // // // // // // //     file_url,
// // // // // // // // // // // // // //     entity_column,
// // // // // // // // // // // // // //     target_column,
// // // // // // // // // // // // // //     features,
// // // // // // // // // // // // // //     user_id,
// // // // // // // // // // // // // //     chat_id,
// // // // // // // // // // // // // //     isTrained,
// // // // // // // // // // // // // //     handleTrainModel,
// // // // // // // // // // // // // //     sql_queries: notebooks?.features_notebook ? JSON.parse(notebooks.features_notebook).cells.map((cell: { source: any[]; }) => cell.source.join('')) : [],
// // // // // // // // // // // // // //   };

// // // // // // // // // // // // // //   return (
// // // // // // // // // // // // // //     <div className="h-screen flex flex-col">
// // // // // // // // // // // // // //       <Navbar isTrained={isTrained} />
// // // // // // // // // // // // // //       <div className="flex flex-1">
// // // // // // // // // // // // // //         <Sidebar isOpen={true} />
// // // // // // // // // // // // // //         <div className="p-4 flex-1 overflow-auto">
// // // // // // // // // // // // // //           <div className="w-full max-w-6xl">
// // // // // // // // // // // // // //             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // //               activeTab="entity_target_notebook"
// // // // // // // // // // // // // //               notebookContent={entityTargetNotebookContent}
// // // // // // // // // // // // // //             />
// // // // // // // // // // // // // //             <h2 className="text-xl font-bold mt-8 mb-4">Features Analysis</h2>
// // // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // // //               activeTab="features_notebook"
// // // // // // // // // // // // // //               notebookContent={featuresNotebookContent}
// // // // // // // // // // // // // //             />
// // // // // // // // // // // // // //           </div>
// // // // // // // // // // // // // //         </div>
// // // // // // // // // // // // // //       </div>
// // // // // // // // // // // // // //     </div>
// // // // // // // // // // // // // //   );
// // // // // // // // // // // // // // };

// // // // // // // // // // // // // // export default NotebookLayout;




// // // // // // // // // // // // // // src/components/NotebookLayout/NotebookLayout.tsx

// // // // // // // // // // // // // import React from 'react';
// // // // // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook'; // Adjust the path as needed

// // // // // // // // // // // // // // interface NotebookMetadata {
// // // // // // // // // // // // // //   file_url: string;
// // // // // // // // // // // // // //   target_column: string;
// // // // // // // // // // // // // //   entity_column: string;
// // // // // // // // // // // // // //   features: string[];
// // // // // // // // // // // // // //   user_id: string;
// // // // // // // // // // // // // //   chat_id: string;
// // // // // // // // // // // // // //   isTrained: boolean;
// // // // // // // // // // // // // //   handleTrainModel: () => void;
// // // // // // // // // // // // // // }

// // // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // // //   // Extract notebook metadata from navigation state
// // // // // // // // // // // // //   const {
// // // // // // // // // // // // //     notebooks,
// // // // // // // // // // // // //     file_url,
// // // // // // // // // // // // //     entity_column,
// // // // // // // // // // // // //     target_column,
// // // // // // // // // // // // //     features,
// // // // // // // // // // // // //     user_id,
// // // // // // // // // // // // //     chat_id,
// // // // // // // // // // // // //     isTrained = false,
// // // // // // // // // // // // //   } = location.state || {};

// // // // // // // // // // // // //   console.log('Received notebook data:', {
// // // // // // // // // // // // //     notebooks,
// // // // // // // // // // // // //     file_url,
// // // // // // // // // // // // //     entity_column,
// // // // // // // // // // // // //     target_column,
// // // // // // // // // // // // //     features,
// // // // // // // // // // // // //     user_id,
// // // // // // // // // // // // //     chat_id,
// // // // // // // // // // // // //     isTrained,
// // // // // // // // // // // // //   });

// // // // // // // // // // // // //   const handleTrainModel = () => {
// // // // // // // // // // // // //     navigate('/training-in-progress', {
// // // // // // // // // // // // //       state: {
// // // // // // // // // // // // //         file_url,
// // // // // // // // // // // // //         target_column,
// // // // // // // // // // // // //         user_id,
// // // // // // // // // // // // //         chat_id,
// // // // // // // // // // // // //         features,
// // // // // // // // // // // // //         entity_column,
// // // // // // // // // // // // //       },
// // // // // // // // // // // // //     });
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   // Parse the notebook JSON strings into JavaScript objects
// // // // // // // // // // // // //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// // // // // // // // // // // // //     ? JSON.parse(notebooks.entity_target_notebook).cells
// // // // // // // // // // // // //     : [];

// // // // // // // // // // // // //   const featuresNotebookCells = notebooks?.features_notebook
// // // // // // // // // // // // //     ? JSON.parse(notebooks.features_notebook).cells
// // // // // // // // // // // // //     : [];

// // // // // // // // // // // // //   const entityTargetNotebookContent = {
// // // // // // // // // // // // //     file_url,
// // // // // // // // // // // // //     entity_column,
// // // // // // // // // // // // //     target_column,
// // // // // // // // // // // // //     features,
// // // // // // // // // // // // //     user_id,
// // // // // // // // // // // // //     chat_id,
// // // // // // // // // // // // //     isTrained,
// // // // // // // // // // // // //     handleTrainModel,
// // // // // // // // // // // // //     cells: entityTargetNotebookCells,
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   const featuresNotebookContent = {
// // // // // // // // // // // // //     file_url,
// // // // // // // // // // // // //     entity_column,
// // // // // // // // // // // // //     target_column,
// // // // // // // // // // // // //     features,
// // // // // // // // // // // // //     user_id,
// // // // // // // // // // // // //     chat_id,
// // // // // // // // // // // // //     isTrained,
// // // // // // // // // // // // //     handleTrainModel,
// // // // // // // // // // // // //     cells: featuresNotebookCells,
// // // // // // // // // // // // //   };

// // // // // // // // // // // // //   return (
// // // // // // // // // // // // //     <div className="h-screen flex flex-col">
// // // // // // // // // // // // //       <Navbar isTrained={isTrained} />
// // // // // // // // // // // // //       <div className="flex flex-1">
// // // // // // // // // // // // //         <Sidebar isOpen={true} />
// // // // // // // // // // // // //         <div className="p-4 flex-1 overflow-auto">
// // // // // // // // // // // // //           <div className="w-full max-w-6xl">
// // // // // // // // // // // // //             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // //               activeTab="entity_target_notebook"
// // // // // // // // // // // // //               notebookContent={entityTargetNotebookContent}
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //             <h2 className="text-xl font-bold mt-8 mb-4">Features Analysis</h2>
// // // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // // //               activeTab="features_notebook"
// // // // // // // // // // // // //               notebookContent={featuresNotebookContent}
// // // // // // // // // // // // //             />
// // // // // // // // // // // // //           </div>
// // // // // // // // // // // // //         </div>
// // // // // // // // // // // // //       </div>
// // // // // // // // // // // // //     </div>
// // // // // // // // // // // // //   );
// // // // // // // // // // // // // };

// // // // // // // // // // // // // export default NotebookLayout;






// // // // // // // // // // // // // src/components/NotebookLayout/NotebookLayout.tsx

// // // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook'; // Adjust the path as needed
// // // // // // // // // // // // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';

// // // // // // // // // // // // // interface NotebookMetadata {
// // // // // // // // // // // // //   file_url: string;
// // // // // // // // // // // // //   target_column: string;
// // // // // // // // // // // // //   entity_column: string;
// // // // // // // // // // // // //   features: string[];
// // // // // // // // // // // // //   user_id: string;
// // // // // // // // // // // // //   chat_id: string;
// // // // // // // // // // // // //   isTrained: boolean;
// // // // // // // // // // // // //   handleTrainModel: () => void;
// // // // // // // // // // // // // }

// // // // // // // // // // // // interface NotebookState {
// // // // // // // // // // // //   notebooks: {
// // // // // // // // // // // //     entity_target_notebook: string;
// // // // // // // // // // // //     features_notebook: string;
// // // // // // // // // // // //   };
// // // // // // // // // // // //   file_url: string;
// // // // // // // // // // // //   entity_column: string;
// // // // // // // // // // // //   target_column: string;
// // // // // // // // // // // //   features: string[];
// // // // // // // // // // // //   user_id: string;
// // // // // // // // // // // //   chat_id: string;
// // // // // // // // // // // //   isTrained: boolean;
// // // // // // // // // // // // }

// // // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // // //   // Extract notebook metadata from navigation state
// // // // // // // // // // // //   const {
// // // // // // // // // // // //     notebooks,
// // // // // // // // // // // //     file_url,
// // // // // // // // // // // //     entity_column,
// // // // // // // // // // // //     target_column,
// // // // // // // // // // // //     features,
// // // // // // // // // // // //     user_id,
// // // // // // // // // // // //     chat_id,
// // // // // // // // // // // //     isTrained = false,
// // // // // // // // // // // //   } = (location.state as NotebookState) || {};

// // // // // // // // // // // //   console.log('Received notebook data:', {
// // // // // // // // // // // //     notebooks,
// // // // // // // // // // // //     file_url,
// // // // // // // // // // // //     entity_column,
// // // // // // // // // // // //     target_column,
// // // // // // // // // // // //     features,
// // // // // // // // // // // //     user_id,
// // // // // // // // // // // //     chat_id,
// // // // // // // // // // // //     isTrained,
// // // // // // // // // // // //   });

// // // // // // // // // // // //   const handleTrainModel = () => {
// // // // // // // // // // // //     navigate('/training-in-progress', {
// // // // // // // // // // // //       state: {
// // // // // // // // // // // //         file_url,
// // // // // // // // // // // //         target_column,
// // // // // // // // // // // //         user_id,
// // // // // // // // // // // //         chat_id,
// // // // // // // // // // // //         features,
// // // // // // // // // // // //         entity_column,
// // // // // // // // // // // //       },
// // // // // // // // // // // //     });
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Parse the notebook JSON strings into JavaScript objects
// // // // // // // // // // // //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// // // // // // // // // // // //     ? JSON.parse(notebooks.entity_target_notebook).cells
// // // // // // // // // // // //     : [];

// // // // // // // // // // // //   const featuresNotebookCells = notebooks?.features_notebook
// // // // // // // // // // // //     ? JSON.parse(notebooks.features_notebook).cells
// // // // // // // // // // // //     : [];

// // // // // // // // // // // //   const entityTargetNotebookContent = {
// // // // // // // // // // // //     file_url,
// // // // // // // // // // // //     entity_column,
// // // // // // // // // // // //     target_column,
// // // // // // // // // // // //     features,
// // // // // // // // // // // //     user_id,
// // // // // // // // // // // //     chat_id,
// // // // // // // // // // // //     isTrained,
// // // // // // // // // // // //     handleTrainModel,
// // // // // // // // // // // //     cells: entityTargetNotebookCells,
// // // // // // // // // // // //   };

// // // // // // // // // // // //   const featuresNotebookContent = {
// // // // // // // // // // // //     file_url,
// // // // // // // // // // // //     entity_column,
// // // // // // // // // // // //     target_column,
// // // // // // // // // // // //     features,
// // // // // // // // // // // //     user_id,
// // // // // // // // // // // //     chat_id,
// // // // // // // // // // // //     isTrained,
// // // // // // // // // // // //     handleTrainModel,
// // // // // // // // // // // //     cells: featuresNotebookCells,
// // // // // // // // // // // //   };

// // // // // // // // // // // //   // Define the sidebar toggle state
// // // // // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

// // // // // // // // // // // //   // Define the notebooks for Navbar, dynamically based on isTrained
// // // // // // // // // // // //   const navbarNotebooks = [
// // // // // // // // // // // //     {
// // // // // // // // // // // //       id: 'entity_target_notebook',
// // // // // // // // // // // //       title: 'Entity & Target Analysis',
// // // // // // // // // // // //       icon: <FiBook size={18} />,
// // // // // // // // // // // //       route: '/notebook-layout/entity-target',
// // // // // // // // // // // //     },
// // // // // // // // // // // //     ...(isTrained
// // // // // // // // // // // //       ? [
// // // // // // // // // // // //           {
// // // // // // // // // // // //             id: 'dashboard',
// // // // // // // // // // // //             title: 'Dashboard',
// // // // // // // // // // // //             icon: <FiBarChart2 size={18} />,
// // // // // // // // // // // //             route: '/dashboard',
// // // // // // // // // // // //           },
// // // // // // // // // // // //           {
// // // // // // // // // // // //             id: 'predict',
// // // // // // // // // // // //             title: 'Predict',
// // // // // // // // // // // //             icon: <FiFlag size={18} />,
// // // // // // // // // // // //             route: '/predict',
// // // // // // // // // // // //           },
// // // // // // // // // // // //         ]
// // // // // // // // // // // //       : []),
// // // // // // // // // // // //   ];

// // // // // // // // // // // //   // Optional: Synchronize activeTab based on current route
// // // // // // // // // // // //   // This ensures that the active tab reflects the current URL
// // // // // // // // // // // //   // You can implement this if needed

// // // // // // // // // // // //   return (
// // // // // // // // // // // //     <div className="h-screen flex flex-col">
// // // // // // // // // // // //       {/* Navbar */}
// // // // // // // // // // // //       <Navbar
// // // // // // // // // // // //         isSidebarOpen={isSidebarOpen}
// // // // // // // // // // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // // // // //         notebooks={navbarNotebooks}
// // // // // // // // // // // //       />

// // // // // // // // // // // //       {/* "Train Model" Button */}
// // // // // // // // // // // //       <div className="flex justify-end px-6 mt-2">
// // // // // // // // // // // //         <button
// // // // // // // // // // // //           onClick={handleTrainModel}
// // // // // // // // // // // //           className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
// // // // // // // // // // // //         >
// // // // // // // // // // // //           Train Model
// // // // // // // // // // // //         </button>
// // // // // // // // // // // //       </div>

// // // // // // // // // // // //       <div className="flex flex-1">
// // // // // // // // // // // //         {/* Sidebar */}
// // // // // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />

// // // // // // // // // // // //         {/* Main Content */}
// // // // // // // // // // // //         <div className="p-4 flex-1 overflow-auto">
// // // // // // // // // // // //           <div className="w-full max-w-6xl mx-auto">
// // // // // // // // // // // //             {/* Entity & Target Analysis Notebook */}
// // // // // // // // // // // //             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // //               activeTab="entity_target_notebook"
// // // // // // // // // // // //               notebookContent={entityTargetNotebookContent}
// // // // // // // // // // // //             />

// // // // // // // // // // // //             {/* Features Analysis Notebook */}
// // // // // // // // // // // //             <h2 className="text-xl font-bold mt-8 mb-4">Features Analysis</h2>
// // // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // // //               activeTab="features_notebook"
// // // // // // // // // // // //               notebookContent={featuresNotebookContent}
// // // // // // // // // // // //             />
// // // // // // // // // // // //           </div>
// // // // // // // // // // // //         </div>
// // // // // // // // // // // //       </div>
// // // // // // // // // // // //     </div>
// // // // // // // // // // // //   );
// // // // // // // // // // // // };

// // // // // // // // // // // // export default NotebookLayout;





// // // // // // // // // // // // src/components/NotebookLayout/NotebookLayout.tsx

// // // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // // import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
// // // // // // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook'; /// Adjust the path as needed
// // // // // // // // // // // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';

// // // // // // // // // // // // Define the NotebookMetadata interface
// // // // // // // // // // // interface NotebookMetadata {
// // // // // // // // // // //   file_url: string;
// // // // // // // // // // //   target_column: string;
// // // // // // // // // // //   entity_column: string;
// // // // // // // // // // //   features: string[];
// // // // // // // // // // //   user_id: string;
// // // // // // // // // // //   chat_id: string;
// // // // // // // // // // //   isTrained: boolean;
// // // // // // // // // // //   handleTrainModel: () => void;
// // // // // // // // // // // }

// // // // // // // // // // // interface NotebookState {
// // // // // // // // // // //   notebooks: {
// // // // // // // // // // //     entity_target_notebook: string;
// // // // // // // // // // //     features_notebook: string;
// // // // // // // // // // //   };
// // // // // // // // // // //   file_url: string;
// // // // // // // // // // //   entity_column: string;
// // // // // // // // // // //   target_column: string;
// // // // // // // // // // //   features: string[];
// // // // // // // // // // //   user_id: string;
// // // // // // // // // // //   chat_id: string;
// // // // // // // // // // //   isTrained: boolean;
// // // // // // // // // // // }

// // // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // // //   const location = useLocation();
// // // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // // //   // Extract notebook metadata from navigation state
// // // // // // // // // // //   const {
// // // // // // // // // // //     notebooks,
// // // // // // // // // // //     file_url,
// // // // // // // // // // //     entity_column,
// // // // // // // // // // //     target_column,
// // // // // // // // // // //     features,
// // // // // // // // // // //     user_id,
// // // // // // // // // // //     chat_id,
// // // // // // // // // // //     isTrained = false,
// // // // // // // // // // //   } = (location.state as NotebookState) || {};

// // // // // // // // // // //   console.log('Received notebook data:', {
// // // // // // // // // // //     notebooks,
// // // // // // // // // // //     file_url,
// // // // // // // // // // //     entity_column,
// // // // // // // // // // //     target_column,
// // // // // // // // // // //     features,
// // // // // // // // // // //     user_id,
// // // // // // // // // // //     chat_id,
// // // // // // // // // // //     isTrained,
// // // // // // // // // // //   });

// // // // // // // // // // //   const handleTrainModel = () => {
// // // // // // // // // // //     navigate('/training', {
// // // // // // // // // // //       state: {
// // // // // // // // // // //         file_url,
// // // // // // // // // // //         target_column,
// // // // // // // // // // //         user_id,
// // // // // // // // // // //         chat_id,
// // // // // // // // // // //         features,
// // // // // // // // // // //         entity_column,
// // // // // // // // // // //       },
// // // // // // // // // // //     });
// // // // // // // // // // //   };

// // // // // // // // // // //   // Parse the notebook JSON strings into JavaScript objects
// // // // // // // // // // //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// // // // // // // // // // //     ? JSON.parse(notebooks.entity_target_notebook).cells
// // // // // // // // // // //     : [];

// // // // // // // // // // //   const featuresNotebookCells = notebooks?.features_notebook
// // // // // // // // // // //     ? JSON.parse(notebooks.features_notebook).cells
// // // // // // // // // // //     : [];

// // // // // // // // // // //   const entityTargetNotebookContent = {
// // // // // // // // // // //     file_url,
// // // // // // // // // // //     entity_column,
// // // // // // // // // // //     target_column,
// // // // // // // // // // //     features,
// // // // // // // // // // //     user_id,
// // // // // // // // // // //     chat_id,
// // // // // // // // // // //     isTrained,
// // // // // // // // // // //     handleTrainModel,
// // // // // // // // // // //     cells: entityTargetNotebookCells,
// // // // // // // // // // //   };

// // // // // // // // // // //   const featuresNotebookContent = {
// // // // // // // // // // //     file_url,
// // // // // // // // // // //     entity_column,
// // // // // // // // // // //     target_column,
// // // // // // // // // // //     features,
// // // // // // // // // // //     user_id,
// // // // // // // // // // //     chat_id,
// // // // // // // // // // //     isTrained,
// // // // // // // // // // //     handleTrainModel,
// // // // // // // // // // //     cells: featuresNotebookCells,
// // // // // // // // // // //   };

// // // // // // // // // // //   // Define the sidebar toggle state
// // // // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

// // // // // // // // // // //   // Define the notebooks for Navbar based on isTrained
// // // // // // // // // // //   // const navbarNotebooks = [
// // // // // // // // // // //   //   {
// // // // // // // // // // //   //     id: 'notebook',
// // // // // // // // // // //   //     title: 'Notebook',
// // // // // // // // // // //   //     icon: <FiBook size={18} />,
// // // // // // // // // // //   //     route: '/notebook-layout/notebook',
// // // // // // // // // // //   //   },
// // // // // // // // // // //   //   ...(isTrained
// // // // // // // // // // //   //     ? [
// // // // // // // // // // //   //         {
// // // // // // // // // // //   //           id: 'dashboard',
// // // // // // // // // // //   //           title: 'Dashboard',
// // // // // // // // // // //   //           icon: <FiBarChart2 size={18} />,
// // // // // // // // // // //   //           route: '/dashboard',
// // // // // // // // // // //   //         },
// // // // // // // // // // //   //         {
// // // // // // // // // // //   //           id: 'predict',
// // // // // // // // // // //   //           title: 'Predict',
// // // // // // // // // // //   //           icon: <FiFlag size={18} />,
// // // // // // // // // // //   //           route: '/predict',
// // // // // // // // // // //   //         },
// // // // // // // // // // //   //       ]
// // // // // // // // // // //   //     : []),
// // // // // // // // // // //   // ];


// // // // // // // // // // //   const navbarNotebooks = [
// // // // // // // // // // //     {
// // // // // // // // // // //       id: 'notebook',
// // // // // // // // // // //       title: 'Notebook',
// // // // // // // // // // //       icon: <FiBook size={18} />,
// // // // // // // // // // //       route: '/notebook',
// // // // // // // // // // //     },
// // // // // // // // // // //     ...(isTrained
// // // // // // // // // // //       ? [

        
// // // // // // // // // // //           {
// // // // // // // // // // //             id: 'dashboard',
// // // // // // // // // // //             title: 'Dashboard',
// // // // // // // // // // //             icon: <FiBarChart2 size={18} />,
// // // // // // // // // // //             route: '/Dashboard',
// // // // // // // // // // //           },
// // // // // // // // // // //           {
// // // // // // // // // // //             id: 'predict',
// // // // // // // // // // //             title: 'Predict',
// // // // // // // // // // //             icon: <FiFlag size={18} />,
// // // // // // // // // // //             route: '/predict',
// // // // // // // // // // //           },
// // // // // // // // // // //         ]
// // // // // // // // // // //       : []),
// // // // // // // // // // //   ];

// // // // // // // // // // //   // Synchronize activeTab based on current route (optional)
// // // // // // // // // // //   // Implement if you need to manage activeTab state dynamically

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="h-screen flex flex-col pt-16"> {/* pt-16 to offset the fixed navbar height */}
// // // // // // // // // // //       {/* Navbar */}
// // // // // // // // // // //       <Navbar
// // // // // // // // // // //         isSidebarOpen={isSidebarOpen}
// // // // // // // // // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // // // //         notebooks={navbarNotebooks}
// // // // // // // // // // //       />

// // // // // // // // // // //       {/* "Train Model" Button */}
// // // // // // // // // // //       <div className="flex justify-end px-6 mt-2">
// // // // // // // // // // //         <button
// // // // // // // // // // //           onClick={handleTrainModel}
// // // // // // // // // // //           className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
// // // // // // // // // // //         >
// // // // // // // // // // //           Train Model
// // // // // // // // // // //         </button>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       <div className="flex flex-1">
// // // // // // // // // // //         {/* Sidebar */}
// // // // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />

// // // // // // // // // // //         {/* Main Content */}
// // // // // // // // // // //         <div className="p-4 flex-1 overflow-auto mt-4">
// // // // // // // // // // //           <div className="w-full max-w-6xl mx-auto">
// // // // // // // // // // //             {/* Entity & Target Analysis Notebook */}
// // // // // // // // // // //             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // //               activeTab="entity_target_notebook"
// // // // // // // // // // //               notebookContent={entityTargetNotebookContent}
// // // // // // // // // // //             />
// // // // // // // // // // //             <SQLNotebook
// // // // // // // // // // //                   activeTab="features_notebook"
// // // // // // // // // // //                   notebookContent={featuresNotebookContent}
// // // // // // // // // // //                 />
// // // // // // // // // // //             {/* Features Analysis Notebook */}
// // // // // // // // // // //             {/* {isTrained && (
// // // // // // // // // // //               <>
// // // // // // // // // // //                 <h2 className="text-xl font-bold mt-8 mb-4"> Trained Notebook</h2>
// // // // // // // // // // //                 <SQLNotebook
// // // // // // // // // // //               activeTab="entity_target_notebook"
// // // // // // // // // // //               notebookContent={entityTargetNotebookContent}
// // // // // // // // // // //             />
// // // // // // // // // // //                 <SQLNotebook
// // // // // // // // // // //                   activeTab="features_notebook"
// // // // // // // // // // //                   notebookContent={featuresNotebookContent}
// // // // // // // // // // //                 />
// // // // // // // // // // //               </>
// // // // // // // // // // //             )} */}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </div>
// // // // // // // // // // //       </div>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default NotebookLayout;





// // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
// // // // // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // // // // // // // // import Dashboard from '../Dashboard/Dashboard'; // Import the Dashboard component
// // // // // // // // // // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';

// // // // // // // // // // interface NotebookMetadata {
// // // // // // // // // //   file_url: string;
// // // // // // // // // //   target_column: string;
// // // // // // // // // //   entity_column: string;
// // // // // // // // // //   features: string[];
// // // // // // // // // //   user_id: string;
// // // // // // // // // //   chat_id: string;
// // // // // // // // // //   isTrained: boolean;
// // // // // // // // // //   handleTrainModel: () => void;
// // // // // // // // // // }

// // // // // // // // // // interface NotebookState {
// // // // // // // // // //   notebooks: {
// // // // // // // // // //     entity_target_notebook: string;
// // // // // // // // // //     features_notebook: string;
// // // // // // // // // //   };
// // // // // // // // // //   file_url: string;
// // // // // // // // // //   entity_column: string;
// // // // // // // // // //   target_column: string;
// // // // // // // // // //   features: string[];
// // // // // // // // // //   user_id: string;
// // // // // // // // // //   chat_id: string;
// // // // // // // // // //   isTrained: boolean;
// // // // // // // // // // }

// // // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // // //   const location = useLocation();
// // // // // // // // // //   const navigate = useNavigate();

// // // // // // // // // //   const {
// // // // // // // // // //     notebooks,
// // // // // // // // // //     file_url,
// // // // // // // // // //     entity_column,
// // // // // // // // // //     target_column,
// // // // // // // // // //     features,
// // // // // // // // // //     user_id,
// // // // // // // // // //     chat_id,
// // // // // // // // // //     isTrained = false,
// // // // // // // // // //   } = (location.state as NotebookState) || {};

// // // // // // // // // //   const handleTrainModel = () => {
// // // // // // // // // //     navigate('/training', {
// // // // // // // // // //       state: {
// // // // // // // // // //         file_url,
// // // // // // // // // //         target_column,
// // // // // // // // // //         user_id,
// // // // // // // // // //         chat_id,
// // // // // // // // // //         features,
// // // // // // // // // //         entity_column,
        
// // // // // // // // // //       },
// // // // // // // // // //     });
// // // // // // // // // //   };

// // // // // // // // // //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// // // // // // // // // //     ? JSON.parse(notebooks.entity_target_notebook).cells
// // // // // // // // // //     : [];

// // // // // // // // // //   const featuresNotebookCells = notebooks?.features_notebook
// // // // // // // // // //     ? JSON.parse(notebooks.features_notebook).cells
// // // // // // // // // //     : [];

// // // // // // // // // //   const entityTargetNotebookContent = {
// // // // // // // // // //     file_url,
// // // // // // // // // //     entity_column,
// // // // // // // // // //     target_column,
// // // // // // // // // //     features,
// // // // // // // // // //     user_id,
// // // // // // // // // //     chat_id,
// // // // // // // // // //     isTrained,
// // // // // // // // // //     handleTrainModel,
// // // // // // // // // //     cells: entityTargetNotebookCells,
// // // // // // // // // //   };

// // // // // // // // // //   const featuresNotebookContent = {
// // // // // // // // // //     file_url,
// // // // // // // // // //     entity_column,
// // // // // // // // // //     target_column,
// // // // // // // // // //     features,
// // // // // // // // // //     user_id,
// // // // // // // // // //     chat_id,
// // // // // // // // // //     isTrained,
// // // // // // // // // //     handleTrainModel,
// // // // // // // // // //     cells: featuresNotebookCells,
// // // // // // // // // //   };

// // // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

// // // // // // // // // //   const navbarNotebooks = [
// // // // // // // // // //     {
// // // // // // // // // //       id: 'notebook',
// // // // // // // // // //       title: 'Notebook',
// // // // // // // // // //       icon: <FiBook size={18} />,
// // // // // // // // // //       route: '/notebook',
// // // // // // // // // //     },
// // // // // // // // // //     ...(isTrained
// // // // // // // // // //       ? [
// // // // // // // // // //           {
// // // // // // // // // //             id: 'dashboard',
// // // // // // // // // //             title: 'Dashboard',
// // // // // // // // // //             icon: <FiBarChart2 size={18} />,
// // // // // // // // // //             route: '/dashboard',
// // // // // // // // // //           },
// // // // // // // // // //           {
// // // // // // // // // //             id: 'predict',
// // // // // // // // // //             title: 'Predict',
// // // // // // // // // //             icon: <FiFlag size={18} />,
// // // // // // // // // //             route: '/predict',
// // // // // // // // // //           },
// // // // // // // // // //         ]
// // // // // // // // // //       : []),
// // // // // // // // // //   ];

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="h-screen flex flex-col pt-16">
// // // // // // // // // //       <Navbar
// // // // // // // // // //         isSidebarOpen={isSidebarOpen}
// // // // // // // // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // // //         notebooks={navbarNotebooks}
// // // // // // // // // //       />

// // // // // // // // // //       <div className="flex justify-end px-6 mt-2">
// // // // // // // // // //         <button
// // // // // // // // // //           onClick={handleTrainModel}
// // // // // // // // // //           className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
// // // // // // // // // //         >
// // // // // // // // // //           Train Model
// // // // // // // // // //         </button>
// // // // // // // // // //       </div>

// // // // // // // // // //       <div className="flex flex-1">
// // // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />

// // // // // // // // // //         <div className="p-4 flex-1 overflow-auto mt-4">
// // // // // // // // // //           <div className="w-full max-w-6xl mx-auto">
// // // // // // // // // //             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // // // // //             <SQLNotebook
// // // // // // // // // //               activeTab="entity_target_notebook"
// // // // // // // // // //               notebookContent={entityTargetNotebookContent}
// // // // // // // // // //             />
// // // // // // // // // //             <SQLNotebook
// // // // // // // // // //               activeTab="features_notebook"
// // // // // // // // // //               notebookContent={featuresNotebookContent}
// // // // // // // // // //             />
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       <Routes>
// // // // // // // // // //         <Route
// // // // // // // // // //           path="/dashboard"
// // // // // // // // // //           element={<Dashboard user_id={user_id} chat_id={chat_id} />}
// // // // // // // // // //         />
// // // // // // // // // //       </Routes>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default NotebookLayout;




// // // // // // // // import React, { useState } from 'react';
// // // // // // // // import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
// // // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // // // // // // import Dashboard from '../Dashboard/Dashboard'; // Import the Dashboard component
// // // // // // // // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';

// // // // // // // // interface NotebookMetadata {
// // // // // // // //   file_url: string;
// // // // // // // //   target_column: string;
// // // // // // // //   entity_column: string;
// // // // // // // //   features: string[];
// // // // // // // //   user_id: string;
// // // // // // // //   chat_id: string;
// // // // // // // //   isTrained: boolean;
// // // // // // // //   handleTrainModel: () => void;
// // // // // // // // }

// // // // // // // // interface NotebookState {
// // // // // // // //   notebooks: {
// // // // // // // //     entity_target_notebook: string;
// // // // // // // //     features_notebook: string;
// // // // // // // //   };
// // // // // // // //   file_url: string;
// // // // // // // //   entity_column: string;
// // // // // // // //   target_column: string;
// // // // // // // //   features: string[];
// // // // // // // //   user_id: string;
// // // // // // // //   chat_id: string;
// // // // // // // //   isTrained: boolean;
// // // // // // // // }

// // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // //   const location = useLocation();
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   const {
// // // // // // // //     notebooks,
// // // // // // // //     file_url,
// // // // // // // //     entity_column,
// // // // // // // //     target_column,
// // // // // // // //     features,
// // // // // // // //     user_id,
// // // // // // // //     chat_id,
// // // // // // // //     isTrained = false,
// // // // // // // //   } = (location.state as NotebookState) || {};

// // // // // // // //   console.log('NotebookLayout received notebook data:', notebooks);

// // // // // // // //   const handleTrainModel = () => {
// // // // // // // //     console.log('Navigating to training with user_id:', user_id, 'and chat_id:', chat_id);
// // // // // // // //     navigate('/training', {
// // // // // // // //       state: {
// // // // // // // //         file_url,
// // // // // // // //         target_column,
// // // // // // // //         user_id,
// // // // // // // //         chat_id,
// // // // // // // //         features,
// // // // // // // //         entity_column,
// // // // // // // //         notebooks, // Pass the notebooks data
// // // // // // // //       },
// // // // // // // //     });
// // // // // // // //   };

// // // // // // // //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// // // // // // // //     ? JSON.parse(notebooks.entity_target_notebook).cells
// // // // // // // //     : [];

// // // // // // // //   const featuresNotebookCells = notebooks?.features_notebook
// // // // // // // //     ? JSON.parse(notebooks.features_notebook).cells
// // // // // // // //     : [];

// // // // // // // //   const entityTargetNotebookContent = {
// // // // // // // //     file_url,
// // // // // // // //     entity_column,
// // // // // // // //     target_column,
// // // // // // // //     features,
// // // // // // // //     user_id,
// // // // // // // //     chat_id,
// // // // // // // //     isTrained,
// // // // // // // //     handleTrainModel,
// // // // // // // //     cells: entityTargetNotebookCells,
// // // // // // // //   };

// // // // // // // //   const featuresNotebookContent = {
// // // // // // // //     file_url,
// // // // // // // //     entity_column,
// // // // // // // //     target_column,
// // // // // // // //     features,
// // // // // // // //     user_id,
// // // // // // // //     chat_id,
// // // // // // // //     isTrained,
// // // // // // // //     handleTrainModel,
// // // // // // // //     cells: featuresNotebookCells,
// // // // // // // //   };

// // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

// // // // // // // //   const navbarNotebooks = [
// // // // // // // //     {
// // // // // // // //       id: 'notebook',
// // // // // // // //       title: 'Notebook',
// // // // // // // //       icon: <FiBook size={18} />,
// // // // // // // //       route: "/notebook",
// // // // // // // //     },
// // // // // // // //     ...(isTrained
// // // // // // // //       ? [
// // // // // // // //           {
// // // // // // // //             id: 'dashboard',
// // // // // // // //             title: 'Dashboard',
// // // // // // // //             icon: <FiBarChart2 size={18} />,
// // // // // // // //             route: '/Dashboard',
// // // // // // // //           },
// // // // // // // //           {
// // // // // // // //             id: 'predict',
// // // // // // // //             title: 'Predict',
// // // // // // // //             icon: <FiFlag size={18} />,
// // // // // // // //             route: '/predict',
// // // // // // // //           },
// // // // // // // //         ]
// // // // // // // //       : []),
// // // // // // // //   ];




// // // // // // // //   return (
// // // // // // // //     <div className="h-screen flex flex-col pt-16">
// // // // // // // //       <Navbar
// // // // // // // //               isSidebarOpen={isSidebarOpen}
// // // // // // // //               setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // //               notebooks={navbarNotebooks}     />

// // // // // // // //       <div className="flex justify-end px-6 mt-2">
// // // // // // // //         <button
// // // // // // // //           onClick={handleTrainModel}
// // // // // // // //           className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
// // // // // // // //         >
// // // // // // // //           Train Model
// // // // // // // //         </button>
// // // // // // // //       </div>

// // // // // // // //       <div className="flex flex-1">
// // // // // // // //         <Sidebar isOpen={isSidebarOpen} />

// // // // // // // //         <div className="p-4 flex-1 overflow-auto mt-4">
// // // // // // // //           <div className="w-full max-w-6xl mx-auto">
// // // // // // // //             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // // //             <SQLNotebook
// // // // // // // //               activeTab="entity_target_notebook"
// // // // // // // //               notebookContent={entityTargetNotebookContent}
// // // // // // // //             />
// // // // // // // //             <SQLNotebook
// // // // // // // //               activeTab="features_notebook"
// // // // // // // //               notebookContent={featuresNotebookContent}
// // // // // // // //             />
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       <Routes>
// // // // // // // //         <Route
// // // // // // // //           path="/Dashboard"
// // // // // // // //           element={<Dashboard user_id={user_id} chat_id={chat_id} />}
// // // // // // // //         />
// // // // // // // //       </Routes>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default NotebookLayout;



// // // // // // // // // // NotebookLayout.tsx
// // // // // // // // // import React, { useState } from 'react';
// // // // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // // // // // // // import Dashboard from '../Dashboard/Dashboard';
// // // // // // // // // import Predict from '../Predict/PredictNewData';

// // // // // // // // // interface NotebookMetadata {
// // // // // // // // //   file_url: string;
// // // // // // // // //   target_column: string;
// // // // // // // // //   entity_column: string;
// // // // // // // // //   features: string[];
// // // // // // // // //   user_id: string;
// // // // // // // // //   chat_id: string;
// // // // // // // // //   notebooks?: {
// // // // // // // // //     entity_target_notebook: string;
// // // // // // // // //     features_notebook: string;
// // // // // // // // //   };
// // // // // // // // //   isTrained?: boolean;
// // // // // // // // // }

// // // // // // // // // const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
// // // // // // // // //   return (
// // // // // // // // //     <div 
// // // // // // // // //       className={`bg-white border-r border-gray-200 h-full fixed left-0 top-16 transition-transform duration-300 transform ${
// // // // // // // // //         isOpen ? 'translate-x-0' : '-translate-x-full'
// // // // // // // // //       }`}
// // // // // // // // //       style={{ width: '250px' }}
// // // // // // // // //     >
// // // // // // // // //       <div className="p-4">
// // // // // // // // //         {/* Add your sidebar content here */}
// // // // // // // // //         <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
// // // // // // // // //         <ul className="space-y-2">
// // // // // // // // //           <li className="px-2 py-1 hover:bg-gray-100 rounded">Menu Item 1</li>
// // // // // // // // //           <li className="px-2 py-1 hover:bg-gray-100 rounded">Menu Item 2</li>
// // // // // // // // //           <li className="px-2 py-1 hover:bg-gray-100 rounded">Menu Item 3</li>
// // // // // // // // //         </ul>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // //   const [isTrained, setIsTrained] = useState(false);
// // // // // // // // //   const [currentView, setCurrentView] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
// // // // // // // // //   const [notebookData] = useState<NotebookMetadata>({
// // // // // // // // //     file_url: '',
// // // // // // // // //     target_column: '',
// // // // // // // // //     entity_column: '',
// // // // // // // // //     features: [],
// // // // // // // // //     user_id: '',
// // // // // // // // //     chat_id: '',
// // // // // // // // //     notebooks: {
// // // // // // // // //       entity_target_notebook: '',
// // // // // // // // //       features_notebook: ''
// // // // // // // // //     }
// // // // // // // // //   });

// // // // // // // // //   const handleTrainModel = async () => {
// // // // // // // // //     try {
// // // // // // // // //       console.log('Training model with:', {
// // // // // // // // //         user_id: notebookData.user_id,
// // // // // // // // //         chat_id: notebookData.chat_id
// // // // // // // // //       });
// // // // // // // // //       setIsTrained(true);
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Training failed:', error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const renderMainContent = () => {
// // // // // // // // //     switch (currentView) {
// // // // // // // // //       case 'dashboard':
// // // // // // // // //         return (
// // // // // // // // //           <Dashboard 
// // // // // // // // //             user_id={notebookData.user_id} 
// // // // // // // // //             chat_id={notebookData.chat_id} 
// // // // // // // // //           />
// // // // // // // // //         );
        
// // // // // // // // //       case 'predict':
// // // // // // // // //         return (
// // // // // // // // //           <Predict 
// // // // // // // // //             user_id={notebookData.user_id} 
// // // // // // // // //             chat_id={notebookData.chat_id}
// // // // // // // // //           />
// // // // // // // // //         );
        
// // // // // // // // //       default:
// // // // // // // // //         return (
// // // // // // // // //           <div className="w-full max-w-6xl mx-auto">
// // // // // // // // //             {!isTrained && (
// // // // // // // // //               <div className="flex justify-end mb-4">
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={handleTrainModel}
// // // // // // // // //                   className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
// // // // // // // // //                 >
// // // // // // // // //                   Train Model
// // // // // // // // //                 </button>
// // // // // // // // //               </div>
// // // // // // // // //             )}
            
// // // // // // // // //             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // // // //             <div className="space-y-8">
// // // // // // // // //               <SQLNotebook
// // // // // // // // //                 activeTab="entity_target_notebook"
// // // // // // // // //                 notebookContent={{
// // // // // // // // //                   ...notebookData,
// // // // // // // // //                   isTrained,
// // // // // // // // //                   handleTrainModel,
// // // // // // // // //                   cells: notebookData.notebooks?.entity_target_notebook ? JSON.parse(notebookData.notebooks.entity_target_notebook).cells : []
// // // // // // // // //                 }}
// // // // // // // // //               />
              
// // // // // // // // //               <SQLNotebook
// // // // // // // // //                 activeTab="features_notebook"
// // // // // // // // //                 notebookContent={{
// // // // // // // // //                   ...notebookData,
// // // // // // // // //                   isTrained,
// // // // // // // // //                   handleTrainModel,
// // // // // // // // //                   cells: notebookData.notebooks?.features_notebook ? JSON.parse(notebookData.notebooks.features_notebook).cells : []
// // // // // // // // //                 }}
// // // // // // // // //               />
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         );
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="h-screen flex flex-col">
// // // // // // // // //       <Navbar 
// // // // // // // // //         isTrained={isTrained}
// // // // // // // // //         currentView={currentView}
// // // // // // // // //         setCurrentView={setCurrentView}
// // // // // // // // //         isSidebarOpen={isSidebarOpen}
// // // // // // // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // //       />
      
// // // // // // // // //       <div className="flex flex-1 pt-16">
// // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // // //         <div 
// // // // // // // // //           className={`flex-1 transition-all duration-300 ${
// // // // // // // // //             isSidebarOpen ? 'ml-[250px]' : 'ml-0'
// // // // // // // // //           }`}
// // // // // // // // //         >
// // // // // // // // //           <div className="p-4 overflow-auto">
// // // // // // // // //             {renderMainContent()}
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default NotebookLayout;




// // // // // // // // NotebookLayout.tsx
// // // // // // // import React, { useState } from 'react';
// // // // // // // import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
// // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // // // // // import Dashboard from '../Dashboard/Dashboard';
// // // // // // // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';

// // // // // // // interface NotebookMetadata {
// // // // // // //   file_url: string;
// // // // // // //   target_column: string;
// // // // // // //   entity_column: string;
// // // // // // //   features: string[];
// // // // // // //   user_id: string;
// // // // // // //   chat_id: string;
// // // // // // //   isTrained: boolean;
// // // // // // //   handleTrainModel: () => void;
// // // // // // // }

// // // // // // // interface NotebookState {
// // // // // // //   notebooks: {
// // // // // // //     entity_target_notebook: string;
// // // // // // //     features_notebook: string;
// // // // // // //   };
// // // // // // //   file_url: string;
// // // // // // //   entity_column: string;
// // // // // // //   target_column: string;
// // // // // // //   features: string[];
// // // // // // //   user_id: string;
// // // // // // //   chat_id: string;
// // // // // // //   isTrained: boolean;
// // // // // // // }

// // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // //   const location = useLocation();
// // // // // // //   const navigate = useNavigate();

// // // // // // //   const {
// // // // // // //     notebooks,
// // // // // // //     file_url,
// // // // // // //     entity_column,
// // // // // // //     target_column,
// // // // // // //     features,
// // // // // // //     user_id,
// // // // // // //     chat_id,
// // // // // // //     isTrained = false,
// // // // // // //   } = (location.state as NotebookState) || {};

// // // // // // //   console.log('NotebookLayout received notebook data:', notebooks);

// // // // // // //   const handleTrainModel = () => {
// // // // // // //     console.log('Navigating to training with user_id:', user_id, 'and chat_id:', chat_id);
// // // // // // //     navigate('/training', {
// // // // // // //       state: {
// // // // // // //         file_url,
// // // // // // //         target_column,
// // // // // // //         user_id,
// // // // // // //         chat_id,
// // // // // // //         features,
// // // // // // //         entity_column,
// // // // // // //         notebooks,
// // // // // // //       },
// // // // // // //     });
// // // // // // //   };

// // // // // // //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// // // // // // //     ? JSON.parse(notebooks.entity_target_notebook).cells
// // // // // // //     : [];

// // // // // // //   const featuresNotebookCells = notebooks?.features_notebook
// // // // // // //     ? JSON.parse(notebooks.features_notebook).cells
// // // // // // //     : [];

// // // // // // //   const entityTargetNotebookContent = {
// // // // // // //     file_url,
// // // // // // //     entity_column,
// // // // // // //     target_column,
// // // // // // //     features,
// // // // // // //     user_id,
// // // // // // //     chat_id,
// // // // // // //     isTrained,
// // // // // // //     handleTrainModel,
// // // // // // //     cells: entityTargetNotebookCells,
// // // // // // //   };

// // // // // // //   const featuresNotebookContent = {
// // // // // // //     file_url,
// // // // // // //     entity_column,
// // // // // // //     target_column,
// // // // // // //     features,
// // // // // // //     user_id,
// // // // // // //     chat_id,
// // // // // // //     isTrained,
// // // // // // //     handleTrainModel,
// // // // // // //     cells: featuresNotebookCells,
// // // // // // //   };

// // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

// // // // // // //   const navbarNotebooks = [
// // // // // // //     {
// // // // // // //       id: 'notebook',
// // // // // // //       title: 'Notebook',
// // // // // // //       icon: <FiBook size={18} />,
// // // // // // //       route: '/notebook',
// // // // // // //     },
// // // // // // //     ...(isTrained
// // // // // // //       ? [
// // // // // // //           {
// // // // // // //             id: 'dashboard',
// // // // // // //             title: 'Dashboard',
// // // // // // //             icon: <FiBarChart2 size={18} />,
// // // // // // //             route: '/Dashboard',
// // // // // // //           },
// // // // // // //           {
// // // // // // //             id: 'predict',
// // // // // // //             title: 'Predict',
// // // // // // //             icon: <FiFlag size={18} />,
// // // // // // //             route: '/predict',
// // // // // // //           },
// // // // // // //         ]
// // // // // // //       : []),
// // // // // // //   ];

// // // // // // //   return (
// // // // // // //     <div className="relative h-screen overflow-hidden">
// // // // // // //       {/* Fixed Navbar */}
// // // // // // //       <div className="fixed top-0 left-0 right-0 z-50">
// // // // // // //         <Navbar
// // // // // // //           isSidebarOpen={isSidebarOpen}
// // // // // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // // // // //           notebooks={navbarNotebooks}
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       {/* Fixed Sidebar */}
// // // // // // //       <div 
// // // // // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // // // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // // // // //         }`}
// // // // // // //         style={{ width: '16rem' }}
// // // // // // //       >
// // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // //       </div>

// // // // // // //       {/* Main Content Area */}
// // // // // // //       <div 
// // // // // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // // // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // // // // //         }`}
// // // // // // //       >
// // // // // // //         {/* Train Model Button Container */}
// // // // // // //         <div className="sticky top-0 bg-white z-30 px-6 py-2 border-b">
// // // // // // //           <button
// // // // // // //             onClick={handleTrainModel}
// // // // // // //             className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
// // // // // // //           >
// // // // // // //             Train Model
// // // // // // //           </button>
// // // // // // //         </div>

// // // // // // //         {/* Scrollable Content Area */}
// // // // // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
// // // // // // //           <div className="p-4">
// // // // // // //             <div className="w-full max-w-6xl mx-auto">
// // // // // // //               <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // //               <div className="space-y-8">
// // // // // // //                 <SQLNotebook
// // // // // // //                   activeTab="entity_target_notebook"
// // // // // // //                   notebookContent={entityTargetNotebookContent}
// // // // // // //                 />
// // // // // // //                 <SQLNotebook
// // // // // // //                   activeTab="features_notebook"
// // // // // // //                   notebookContent={featuresNotebookContent}
// // // // // // //                 />
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       <Routes>
// // // // // // //         <Route
// // // // // // //           path="/Dashboard"
// // // // // // //           element={<Dashboard user_id={user_id} chat_id={chat_id} />}
// // // // // // //         />
// // // // // // //       </Routes>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default NotebookLayout;



// // // // // // // NotebookLayout.tsx
// // // // // // import React, { useState } from 'react';
// // // // // // import { useLocation, useNavigate, Routes, Route } from 'react-router-dom';
// // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // // // // import Dashboard from '../Dashboard/Dashboard';
// // // // // // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';
// // // // // // import { motion } from 'framer-motion'; // Import Framer Motion

// // // // // // interface NotebookMetadata {
// // // // // //   file_url: string;
// // // // // //   target_column: string;
// // // // // //   entity_column: string;
// // // // // //   features: string[];
// // // // // //   user_id: string;
// // // // // //   chat_id: string;
// // // // // //   isTrained: boolean;
// // // // // //   handleTrainModel: () => void;
// // // // // // }

// // // // // // interface NotebookState {
// // // // // //   notebooks: {
// // // // // //     entity_target_notebook: string;
// // // // // //     features_notebook: string;
// // // // // //   };
// // // // // //   file_url: string;
// // // // // //   entity_column: string;
// // // // // //   target_column: string;
// // // // // //   features: string[];
// // // // // //   user_id: string;
// // // // // //   chat_id: string;
// // // // // //   isTrained: boolean;
// // // // // // }

// // // // // // const NotebookLayout: React.FC = () => {
// // // // // //   const location = useLocation();
// // // // // //   const navigate = useNavigate();

// // // // // //   const {
// // // // // //     notebooks,
// // // // // //     file_url,
// // // // // //     entity_column,
// // // // // //     target_column,
// // // // // //     features,
// // // // // //     user_id,
// // // // // //     chat_id,
// // // // // //     isTrained = false,
// // // // // //   } = (location.state as NotebookState) || {};

// // // // // //   console.log('NotebookLayout received notebook data:', notebooks);

// // // // // //   const handleTrainModel = () => {
// // // // // //     console.log('Navigating to training with user_id:', user_id, 'and chat_id:', chat_id);
// // // // // //     navigate('/training', {
// // // // // //       state: {
// // // // // //         file_url,
// // // // // //         target_column,
// // // // // //         user_id,
// // // // // //         chat_id,
// // // // // //         features,
// // // // // //         entity_column,
// // // // // //         notebooks,
// // // // // //       },
// // // // // //     });
// // // // // //   };

// // // // // //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// // // // // //     ? JSON.parse(notebooks.entity_target_notebook).cells
// // // // // //     : [];

// // // // // //   const featuresNotebookCells = notebooks?.features_notebook
// // // // // //     ? JSON.parse(notebooks.features_notebook).cells
// // // // // //     : [];

// // // // // //   const entityTargetNotebookContent = {
// // // // // //     file_url,
// // // // // //     entity_column,
// // // // // //     target_column,
// // // // // //     features,
// // // // // //     user_id,
// // // // // //     chat_id,
// // // // // //     isTrained,
// // // // // //     handleTrainModel,
// // // // // //     cells: entityTargetNotebookCells,
// // // // // //   };

// // // // // //   const featuresNotebookContent = {
// // // // // //     file_url,
// // // // // //     entity_column,
// // // // // //     target_column,
// // // // // //     features,
// // // // // //     user_id,
// // // // // //     chat_id,
// // // // // //     isTrained,
// // // // // //     handleTrainModel,
// // // // // //     cells: featuresNotebookCells,
// // // // // //   };

// // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

// // // // // //   const navbarNotebooks = [
// // // // // //     {
// // // // // //       id: 'notebook',
// // // // // //       title: 'Notebook',
// // // // // //       icon: <FiBook size={18} />,
// // // // // //       route: '/notebook',
// // // // // //     },
// // // // // //     ...(isTrained
// // // // // //       ? [
// // // // // //           {
// // // // // //             id: 'dashboard',
// // // // // //             title: 'Dashboard',
// // // // // //             icon: <FiBarChart2 size={18} />,
// // // // // //             route: '/Dashboard',
// // // // // //           },
// // // // // //           {
// // // // // //             id: 'predict',
// // // // // //             title: 'Predict',
// // // // // //             icon: <FiFlag size={18} />,
// // // // // //             route: '/predict',
// // // // // //           },
// // // // // //         ]
// // // // // //       : []),
// // // // // //   ];

// // // // // //   return (
// // // // // //     <div className="relative h-screen overflow-hidden">
// // // // // //       {/* Fixed Navbar */}
// // // // // //       <div className="fixed top-0 left-0 right-0 z-50">
// // // // // //         <Navbar
// // // // // //           isSidebarOpen={isSidebarOpen}
// // // // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // // // //           notebooks={navbarNotebooks}
// // // // // //         />
// // // // // //       </div>

// // // // // //       {/* Fixed Sidebar */}
// // // // // //       <div
// // // // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // // // //         }`}
// // // // // //         style={{ width: '16rem' }}
// // // // // //       >
// // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // //       </div>

// // // // // //       {/* Train Model Button - Positioned at Top Right Below Navbar */}
// // // // // //       <motion.div
// // // // // //         initial={{ opacity: 0, y: -10, scale: 0.8 }}
// // // // // //         animate={{ opacity: 1, y: 0, scale: 1 }}
// // // // // //         transition={{ duration: 0.5, ease: 'easeOut' }}
// // // // // //         className="fixed top-16 right-4 z-50"
// // // // // //       >
// // // // // //         <button
// // // // // //           onClick={handleTrainModel}
// // // // // //           className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // //           aria-label="Train your predictive model"
// // // // // //         >
// // // // // //           Train Model
// // // // // //         </button>
// // // // // //       </motion.div>

// // // // // //       {/* Main Content Area */}
// // // // // //       <div
// // // // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // // // //         }`}
// // // // // //       >
// // // // // //         {/* Scrollable Content Area */}
// // // // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
// // // // // //           <div className="p-4">
// // // // // //             <div className="w-full max-w-6xl mx-auto">
// // // // // //               <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // //               <div className="space-y-8">
// // // // // //                 <SQLNotebook
// // // // // //                   activeTab="entity_target_notebook"
// // // // // //                   notebookContent={entityTargetNotebookContent}
// // // // // //                 />
// // // // // //                 <SQLNotebook
// // // // // //                   activeTab="features_notebook"
// // // // // //                   notebookContent={featuresNotebookContent}
// // // // // //                 />
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       <Routes>
// // // // // //         <Route
// // // // // //           path="/Dashboard"
// // // // // //           element={<Dashboard user_id={user_id} chat_id={chat_id} />}
// // // // // //         />
// // // // // //       </Routes>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default NotebookLayout;



// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // // // import Dashboard from '../Dashboard/Dashboard';
// // // // // import PredictionsUI from '../Predict/PredictNewData';
// // // // // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';
// // // // // import { motion } from 'framer-motion';

// // // // // interface NotebookMetadata {
// // // // //   file_url: string;
// // // // //   target_column: string;
// // // // //   entity_column: string;
// // // // //   features: string[];
// // // // //   user_id: string;
// // // // //   chat_id: string;
// // // // //   isTrained: boolean;
// // // // //   handleTrainModel: () => void;
// // // // // }

// // // // // interface NotebookState {
// // // // //   notebooks: {
// // // // //     entity_target_notebook: string;
// // // // //     features_notebook: string;
// // // // //   };
// // // // //   file_url: string;
// // // // //   entity_column: string;
// // // // //   target_column: string;
// // // // //   features: string[];
// // // // //   user_id: string;
// // // // //   chat_id: string;
// // // // //   isTrained: boolean;
// // // // // }

// // // // // const NotebookLayout: React.FC = () => {
// // // // //   console.log('NotebookLayout: Component mounting');
  
// // // // //   const location = useLocation();
// // // // //   const navigate = useNavigate();
// // // // //   const [activeTab, setActiveTab] = useState('notebook');
// // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

// // // // //   const {
// // // // //     notebooks,
// // // // //     file_url,
// // // // //     entity_column,
// // // // //     target_column,
// // // // //     features,
// // // // //     user_id,
// // // // //     chat_id,
// // // // //     isTrained = false,
// // // // //   } = (location.state as NotebookState) || {};

// // // // //   useEffect(() => {
// // // // //     console.log('NotebookLayout: State from location:', {
// // // // //       notebooks,
// // // // //       file_url,
// // // // //       entity_column,
// // // // //       target_column,
// // // // //       features,
// // // // //       user_id,
// // // // //       chat_id,
// // // // //       isTrained
// // // // //     });
// // // // //   }, [notebooks, file_url, entity_column, target_column, features, user_id, chat_id, isTrained]);

// // // // //   const handleTrainModel = () => {
// // // // //     console.log('NotebookLayout: Training model with:', {
// // // // //       file_url,
// // // // //       target_column,
// // // // //       user_id,
// // // // //       chat_id,
// // // // //       features,
// // // // //       entity_column
// // // // //     });

// // // // //     navigate('/training', {
// // // // //       state: {
// // // // //         file_url,
// // // // //         target_column,
// // // // //         user_id,
// // // // //         chat_id,
// // // // //         features,
// // // // //         entity_column,
// // // // //         notebooks,
// // // // //       },
// // // // //     });
// // // // //   };

// // // // //   const handleTabChange = (tabId: string) => {
// // // // //     console.log('NotebookLayout: Changing tab to:', tabId);
// // // // //     setActiveTab(tabId);
// // // // //   };

// // // // //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// // // // //     ? JSON.parse(notebooks.entity_target_notebook).cells
// // // // //     : [];

// // // // //   const featuresNotebookCells = notebooks?.features_notebook
// // // // //     ? JSON.parse(notebooks.features_notebook).cells
// // // // //     : [];

// // // // //   console.log('NotebookLayout: Parsed notebook cells:', {
// // // // //     entityTargetNotebookCells: entityTargetNotebookCells.length,
// // // // //     featuresNotebookCells: featuresNotebookCells.length
// // // // //   });

// // // // //   const navbarNotebooks = [
// // // // //     {
// // // // //       id: 'notebook',
// // // // //       title: 'Notebook',
// // // // //       icon: <FiBook size={18} />,
// // // // //       onClick: () => handleTabChange('notebook'),
// // // // //     },
// // // // //     {
// // // // //       id: 'dashboard',
// // // // //       title: 'Dashboard',
// // // // //       icon: <FiBarChart2 size={18} />,
// // // // //       onClick: () => handleTabChange('dashboard'),
// // // // //     },
// // // // //     {
// // // // //       id: 'predict',
// // // // //       title: 'Predict',
// // // // //       icon: <FiFlag size={18} />,
// // // // //       onClick: () => handleTabChange('predict'),
// // // // //     },
// // // // //   ];

// // // // //   const renderContent = () => {
// // // // //     console.log('NotebookLayout: Rendering content for tab:', activeTab);
// // // // //     console.log('NotebookLayout: Training status:', isTrained);

// // // // //     switch (activeTab) {
// // // // //       case 'notebook':
// // // // //         return (
// // // // //           <div className="space-y-8">
// // // // //             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // //             <SQLNotebook
// // // // //               activeTab="entity_target_notebook"
// // // // //               notebookContent={{
// // // // //                 file_url,
// // // // //                 entity_column,
// // // // //                 target_column,
// // // // //                 features,
// // // // //                 user_id,
// // // // //                 chat_id,
// // // // //                 isTrained,
// // // // //                 handleTrainModel,
// // // // //                 cells: entityTargetNotebookCells,
// // // // //               }}
// // // // //             />
// // // // //             <SQLNotebook
// // // // //               activeTab="features_notebook"
// // // // //               notebookContent={{
// // // // //                 file_url,
// // // // //                 entity_column,
// // // // //                 target_column,
// // // // //                 features,
// // // // //                 user_id,
// // // // //                 chat_id,
// // // // //                 isTrained,
// // // // //                 handleTrainModel,
// // // // //                 cells: featuresNotebookCells,
// // // // //               }}
// // // // //             />
// // // // //           </div>
// // // // //         );

// // // // //       case 'dashboard':
// // // // //         if (!isTrained) {
// // // // //           console.log('NotebookLayout: Showing dashboard placeholder - model not trained');
// // // // //           return (
// // // // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // //                 <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// // // // //                 <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// // // // //                 <p className="text-gray-600">Please train your model first to view the dashboard metrics.</p>
// // // // //               </div>
// // // // //             </div>
// // // // //           );
// // // // //         }
// // // // //         console.log('NotebookLayout: Rendering dashboard with:', { user_id, chat_id });
// // // // //         return <Dashboard user_id={user_id} chat_id={chat_id} />;

// // // // //       case 'predict':
// // // // //         if (!isTrained) {
// // // // //           console.log('NotebookLayout: Showing predict placeholder - model not trained');
// // // // //           return (
// // // // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // //                 <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // // // //                 <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// // // // //                 <p className="text-gray-600">Please train your model first to make predictions.</p>
// // // // //               </div>
// // // // //             </div>
// // // // //           );
// // // // //         }
// // // // //         console.log('NotebookLayout: Rendering predictions UI with:', { user_id, chat_id });
// // // // //         return <PredictionsUI user_id={user_id} chat_id={chat_id} />;

// // // // //       default:
// // // // //         console.log('NotebookLayout: Unknown tab:', activeTab);
// // // // //         return null;
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="relative h-screen overflow-hidden">
// // // // //       <div className="fixed top-0 left-0 right-0 z-50">
// // // // //         <Navbar
// // // // //           isSidebarOpen={isSidebarOpen}
// // // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // // //           notebooks={navbarNotebooks}
// // // // //           activeTab={activeTab}
// // // // //         />
// // // // //       </div>

// // // // //       <div
// // // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // // //         }`}
// // // // //         style={{ width: '16rem' }}
// // // // //       >
// // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // //       </div>

// // // // //       <motion.div
// // // // //         initial={{ opacity: 0, y: -10, scale: 0.8 }}
// // // // //         animate={{ opacity: 1, y: 0, scale: 1 }}
// // // // //         transition={{ duration: 0.5, ease: 'easeOut' }}
// // // // //         className="fixed top-16 right-4 z-50"
// // // // //       >
// // // // //         <button
// // // // //           onClick={handleTrainModel}
// // // // //           className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // //           aria-label="Train your predictive model"
// // // // //         >
// // // // //           Train Model
// // // // //         </button>
// // // // //       </motion.div>

// // // // //       <div
// // // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // // //         }`}
// // // // //       >
// // // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
// // // // //           <div className="p-4">
// // // // //             <div className="w-full max-w-6xl mx-auto">
// // // // //               {renderContent()}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default NotebookLayout;




// // // // import React, { useState, useEffect } from 'react';
// // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // import Sidebar from './Sidebar/Sidebar';
// // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // // import Dashboard from '../Dashboard/Dashboard';
// // // // import PredictionsUI from '../Predict/PredictNewData';
// // // // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';
// // // // import { motion } from 'framer-motion';

// // // // interface NotebookMetadata {
// // // //   file_url: string;
// // // //   target_column: string;
// // // //   entity_column: string;
// // // //   features: string[];
// // // //   user_id: string;
// // // //   chat_id: string;
// // // //   isTrained: boolean;
// // // //   handleTrainModel: () => void;
// // // // }

// // // // interface NotebookState {
// // // //   notebooks: {
// // // //     entity_target_notebook: string;
// // // //     features_notebook: string;
// // // //   };
// // // //   file_url: string;
// // // //   entity_column: string;
// // // //   target_column: string;
// // // //   features: string[];
// // // //   user_id: string;
// // // //   chat_id: string;
// // // //   isTrained: boolean;
// // // // }

// // // // const NotebookLayout: React.FC = () => {
// // // //   console.log('NotebookLayout: Component mounting');
  
// // // //   const location = useLocation();
// // // //   const navigate = useNavigate();
// // // //   const [activeTab, setActiveTab] = useState('notebook');
// // // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

// // // //   const {
// // // //     notebooks,
// // // //     file_url,
// // // //     entity_column,
// // // //     target_column,
// // // //     features,
// // // //     user_id,
// // // //     chat_id,
// // // //     isTrained = false,
// // // //   } = (location.state as NotebookState) || {};

// // // //   useEffect(() => {
// // // //     console.log('NotebookLayout: State from location:', {
// // // //       notebooks,
// // // //       file_url,
// // // //       entity_column,
// // // //       target_column,
// // // //       features,
// // // //       user_id,
// // // //       chat_id,
// // // //       isTrained
// // // //     });
// // // //   }, [notebooks, file_url, entity_column, target_column, features, user_id, chat_id, isTrained]);

// // // //   const handleTrainModel = () => {
// // // //     console.log('NotebookLayout: Training model with:', {
// // // //       file_url,
// // // //       target_column,
// // // //       user_id,
// // // //       chat_id,
// // // //       features,
// // // //       entity_column
// // // //     });

// // // //     navigate('/training', {
// // // //       state: {
// // // //         file_url,
// // // //         target_column,
// // // //         user_id,
// // // //         chat_id,
// // // //         features,
// // // //         entity_column,
// // // //         notebooks,
// // // //       },
// // // //     });
// // // //   };

// // // //   const handleTabChange = (tabId: string) => {
// // // //     console.log('NotebookLayout: Changing tab to:', tabId);
// // // //     setActiveTab(tabId);
// // // //   };

// // // //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// // // //     ? JSON.parse(notebooks.entity_target_notebook).cells
// // // //     : [];

// // // //   const featuresNotebookCells = notebooks?.features_notebook
// // // //     ? JSON.parse(notebooks.features_notebook).cells
// // // //     : [];

// // // //   console.log('NotebookLayout: Parsed notebook cells:', {
// // // //     entityTargetNotebookCells: entityTargetNotebookCells.length,
// // // //     featuresNotebookCells: featuresNotebookCells.length
// // // //   });

// // // //   const navbarNotebooks = [
// // // //     {
// // // //       id: 'notebook',
// // // //       title: 'Notebook',
// // // //       icon: <FiBook size={18} />,
// // // //       onClick: () => handleTabChange('notebook'),
// // // //     },
// // // //     {
// // // //       id: 'dashboard',
// // // //       title: 'Dashboard',
// // // //       icon: <FiBarChart2 size={18} />,
// // // //       onClick: () => handleTabChange('dashboard'),
// // // //     },
// // // //     {
// // // //       id: 'predict',
// // // //       title: 'Predict',
// // // //       icon: <FiFlag size={18} />,
// // // //       onClick: () => handleTabChange('predict'),
// // // //     },
// // // //   ];

// // // //   const renderContent = () => {
// // // //     console.log('NotebookLayout: Rendering content for tab:', activeTab);
// // // //     console.log('NotebookLayout: Training status:', isTrained);

// // // //     switch (activeTab) {
// // // //       case 'notebook':
// // // //         return (
// // // //           <div className="space-y-8">
// // // //             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // //             <SQLNotebook
// // // //               activeTab="entity_target_notebook"
// // // //               notebookContent={{
// // // //                 file_url,
// // // //                 entity_column,
// // // //                 target_column,
// // // //                 features,
// // // //                 user_id,
// // // //                 chat_id,
// // // //                 isTrained,
// // // //                 handleTrainModel,
// // // //                 cells: entityTargetNotebookCells,
// // // //               }}
// // // //             />
// // // //             <SQLNotebook
// // // //               activeTab="features_notebook"
// // // //               notebookContent={{
// // // //                 file_url,
// // // //                 entity_column,
// // // //                 target_column,
// // // //                 features,
// // // //                 user_id,
// // // //                 chat_id,
// // // //                 isTrained,
// // // //                 handleTrainModel,
// // // //                 cells: featuresNotebookCells,
// // // //               }}
// // // //             />
// // // //           </div>
// // // //         );

// // // //       case 'dashboard':
// // // //         if (!isTrained) {
// // // //           console.log('NotebookLayout: Showing dashboard placeholder - model not trained');
// // // //           return (
// // // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // //                 <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// // // //                 <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// // // //                 <p className="text-gray-600">Please train your model first to view the dashboard metrics.</p>
// // // //               </div>
// // // //             </div>
// // // //           );
// // // //         }
// // // //         console.log('NotebookLayout: Rendering dashboard with:', { user_id, chat_id });
// // // //         return <Dashboard user_id={user_id} chat_id={chat_id} />;

// // // //       case 'predict':
// // // //         // Removed the isTrained check to always display PredictionsUI
// // // //         console.log('NotebookLayout: Rendering predictions UI with:', { user_id, chat_id });
// // // //         return <PredictionsUI />;

// // // //       default:
// // // //         console.log('NotebookLayout: Unknown tab:', activeTab);
// // // //         return null;
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="relative h-screen overflow-hidden">
// // // //       {/* Fixed Navbar at the top */}
// // // //       <div className="fixed top-0 left-0 right-0 z-50">
// // // //         <Navbar
// // // //           isSidebarOpen={isSidebarOpen}
// // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // //           notebooks={navbarNotebooks}
// // // //           activeTab={activeTab}
// // // //         />
// // // //       </div>

// // // //       {/* Sidebar */}
// // // //       <div
// // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // //         }`}
// // // //         style={{ width: '16rem' }}
// // // //       >
// // // //         <Sidebar isOpen={isSidebarOpen} />
// // // //       </div>

// // // //       {/* Train Model Button - Only show if not trained */}
// // // //       {!isTrained && (
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: 20, x: -20 }} // Adjusted initial position
// // // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // // //           className="fixed top-20 left-4 z-50" // Adjusted position: lower and to the left
// // // //         >
// // // //           <button
// // // //             onClick={handleTrainModel}
// // // //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // //             aria-label="Train your predictive model"
// // // //           >
// // // //             Train Model
// // // //           </button>
// // // //         </motion.div>
// // // //       )}

// // // //       {/* Main Content Area */}
// // // //       <div
// // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // //         }`}
// // // //       >
// // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
// // // //           <div className="p-4">
// // // //             <div className="w-full max-w-6xl mx-auto">
// // // //               {renderContent()}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default NotebookLayout;




// // // import React, { useState, useEffect } from 'react';
// // // import { useLocation, useNavigate } from 'react-router-dom';
// // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // import Sidebar from './Sidebar/Sidebar';
// // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // import Dashboard from '../Dashboard/Dashboard';
// // // import PredictionsUI from '../Predict/PredictNewData';
// // // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';
// // // import { motion } from 'framer-motion';

// // // interface NotebookMetadata {
// // //   file_url: string;
// // //   target_column: string;
// // //   entity_column: string;
// // //   features: string[];
// // //   user_id: string;
// // //   chat_id: string;
// // //   isTrained: boolean;
// // //   handleTrainModel: () => void;
// // // }

// // // interface Metrics {
// // //   rmse: number;
// // //   r2_score: number;
// // //   mae: number;
// // // }

// // // interface ModelMetrics {
// // //   training: Metrics;
// // //   testing: Metrics;
// // //   assessment: string;
// // // }

// // // interface MetricsData {
// // //   model_metrics: ModelMetrics;
// // //   feature_importance: Record<string, number>;
// // //   predictions: {
// // //     actual: number[];
// // //     predicted: number[];
// // //   };
// // //   user_id: string;
// // //   chat_id: string;
// // // }

// // // interface NotebookState {
// // //   notebooks: {
// // //     entity_target_notebook: string;
// // //     features_notebook: string;
// // //   };
// // //   file_url: string;
// // //   entity_column: string;
// // //   target_column: string;
// // //   features: string[];
// // //   user_id: string;
// // //   chat_id: string;
// // //   isTrained: boolean;
// // // }

// // // const NotebookLayout: React.FC = () => {
// // //   console.log('NotebookLayout: Component mounting');
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
// // //   const [activeTab, setActiveTab] = useState('notebook');
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
// // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // //   const [modelTrained, setModelTrained] = useState(false);

// // //   const {
// // //     notebooks,
// // //     file_url,
// // //     entity_column,
// // //     target_column,
// // //     features,
// // //     user_id,
// // //     chat_id,
// // //     isTrained = false,
// // //   } = (location.state as NotebookState) || {};

// // //   useEffect(() => {
// // //     // Update the model trained state from location data
// // //     setModelTrained(isTrained);
// // //   }, [isTrained]);

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       console.log('Fetching dashboard data after model training...');
// // //       setLoadingDashboard(true);
// // //       const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // //       const response = await fetch(url);
// // //       if (!response.ok) throw new Error('Failed to fetch dashboard data');
// // //       const result = await response.json();
// // //       setDashboardData(result);
// // //       console.log('Dashboard data fetched successfully:', result);
// // //     } catch (error) {
// // //       console.error('Error fetching dashboard data:', error);
// // //     } finally {
// // //       setLoadingDashboard(false);
// // //     }
// // //   };

// // //   const handleTrainModel = async () => {
// // //     console.log('NotebookLayout: Training model with:', {
// // //       file_url,
// // //       target_column,
// // //       user_id,
// // //       chat_id,
// // //       features,
// // //       entity_column,
// // //     });

// // //     navigate('/training', {
// // //       state: {
// // //         file_url,
// // //         target_column,
// // //         user_id,
// // //         chat_id,
// // //         features,
// // //         entity_column,
// // //         notebooks,
// // //       },
// // //     });

// // //     // Simulate training completion delay or hook into a real callback
// // //     setTimeout(() => {
// // //       setModelTrained(true); // Mark model as trained
// // //       fetchDashboardData(); // Fetch dashboard data
// // //     },);
// // //   };

// // //   const handleTabChange = (tabId: string) => {
// // //     console.log('NotebookLayout: Changing tab to:', tabId);
// // //     setActiveTab(tabId);
// // //   };

// // //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// // //     ? JSON.parse(notebooks.entity_target_notebook).cells
// // //     : [];

// // //   const featuresNotebookCells = notebooks?.features_notebook
// // //     ? JSON.parse(notebooks.features_notebook).cells
// // //     : [];

// // //   const navbarNotebooks = [
// // //     {
// // //       id: 'notebook',
// // //       title: 'Notebook',
// // //       icon: <FiBook size={18} />,
// // //       onClick: () => handleTabChange('notebook'),
// // //     },
// // //     {
// // //       id: 'dashboard',
// // //       title: 'Dashboard',
// // //       icon: <FiBarChart2 size={18} />,
// // //       onClick: () => handleTabChange('dashboard'),
// // //     },
// // //     {
// // //       id: 'predict',
// // //       title: 'Predict',
// // //       icon: <FiFlag size={18} />,
// // //       onClick: () => handleTabChange('predict'),
// // //     },
// // //   ];

// // //   const renderContent = () => {
// // //     switch (activeTab) {
// // //       case 'notebook':
// // //         return (
// // //           <div className="space-y-8">
// // //             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // //             <SQLNotebook
// // //               activeTab="entity_target_notebook"
// // //               notebookContent={{
// // //                 file_url,
// // //                 entity_column,
// // //                 target_column,
// // //                 features,
// // //                 user_id,
// // //                 chat_id,
// // //                 isTrained,
// // //                 handleTrainModel,
// // //                 cells: entityTargetNotebookCells,
// // //               }}
// // //             />
// // //             <SQLNotebook
// // //               activeTab="features_notebook"
// // //               notebookContent={{
// // //                 file_url,
// // //                 entity_column,
// // //                 target_column,
// // //                 features,
// // //                 user_id,
// // //                 chat_id,
// // //                 isTrained,
// // //                 handleTrainModel,
// // //                 cells: featuresNotebookCells,
// // //               }}
// // //             />
// // //           </div>
// // //         );
// // //       case 'dashboard':
// // //         if (!modelTrained) {
// // //           return (
// // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // //                 <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// // //                 <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// // //                 <p className="text-gray-600">Please train your model first to view the dashboard metrics.</p>
// // //               </div>
// // //             </div>
// // //           );
// // //         }
// // //         return loadingDashboard ? (
// // //           <div>Loading Dashboard...</div>
// // //         ) : (
// // //           <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // //         );
// // //       case 'predict':
// // //         if (!modelTrained) {
// // //           return (
// // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // //                 <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // //                 <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// // //                 <p className="text-gray-600">Please train your model first to make predictions.</p>
// // //               </div>
// // //             </div>
// // //           );
// // //         }
// // //         return <PredictionsUI />;
// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   return (
// // //     <div className="relative h-screen overflow-hidden">
// // //       <div className="fixed top-0 left-0 right-0 z-50">
// // //         <Navbar
// // //           isSidebarOpen={isSidebarOpen}
// // //           setIsSidebarOpen={setIsSidebarOpen}
// // //           notebooks={navbarNotebooks}
// // //           activeTab={activeTab}
// // //         />
// // //       </div>
// // //       <div
// // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // //         }`}
// // //         style={{ width: '16rem' }}
// // //       >
// // //         <Sidebar isOpen={isSidebarOpen} />
// // //       </div>
// // //       {!modelTrained && (
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // //           className="fixed top-20 left-4 z-50"
// // //         >
// // //           <button
// // //             onClick={handleTrainModel}
// // //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // //             aria-label="Train your predictive model"
// // //           >
// // //             Train Model
// // //           </button>
// // //         </motion.div>
// // //       )}
// // //       <div
// // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // //           isSidebarOpen ? 'left-64' : 'left-0'
// // //         }`}
// // //       >
// // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
// // //           <div className="p-4">
// // //             <div className="w-full max-w-6xl mx-auto">{renderContent()}</div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NotebookLayout;







// // import React, { useState, useEffect } from 'react';
// // import { useLocation, useNavigate } from 'react-router-dom';
// // import Navbar from '../NotebookUI/Navbar/Navbar';
// // import Sidebar from './Sidebar/Sidebar';
// // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // import Dashboard from '../Dashboard/Dashboard';
// // import PredictionsUI from '../Predict/PredictNewData';
// // import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';
// // import { motion } from 'framer-motion';

// // interface NotebookMetadata {
// //   file_url: string;
// //   target_column: string;
// //   entity_column: string;
// //   features: string[];
// //   user_id: string;
// //   chat_id: string;
// //   isTrained: boolean;
// //   handleTrainModel: () => void;
// // }

// // interface Metrics {
// //   rmse: number;
// //   r2_score: number;
// //   mae: number;
// // }

// // interface ModelMetrics {
// //   training: Metrics;
// //   testing: Metrics;
// //   assessment: string;
// // }

// // interface MetricsData {
// //   model_metrics: ModelMetrics;
// //   feature_importance: Record<string, number>;
// //   predictions: {
// //     actual: number[];
// //     predicted: number[];
// //   };
// //   user_id: string;
// //   chat_id: string;
// // }

// // interface NotebookState {
// //   notebooks: {
// //     entity_target_notebook: string;
// //     features_notebook: string;
// //   };
// //   file_url: string;
// //   entity_column: string;
// //   target_column: string;
// //   features: string[];
// //   user_id: string;
// //   chat_id: string;
// //   isTrained: boolean;
// // }

// // const NotebookLayout: React.FC = () => {
// //   console.log('NotebookLayout: Component mounting');
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const [activeTab, setActiveTab] = useState('notebook');
// //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
// //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// //   const [modelTrained, setModelTrained] = useState(false); // Tracks if training is complete
// //   const [polling, setPolling] = useState(false); // Tracks if polling is active

// //   const {
// //     notebooks,
// //     file_url,
// //     entity_column,
// //     target_column,
// //     features,
// //     user_id,
// //     chat_id,
// //     isTrained = false,
// //   } = (location.state as NotebookState) || {};

// // //   useEffect(() => {
// // //     // Update the model trained state from location data
// // //     setModelTrained(isTrained);
// // //   }, [isTrained]);

// //   // Fetch model results from the backend
// //   const fetchModelResults = async () => {
// //     try {
// //       console.log('Fetching model results...');
// //       const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// //       const response = await fetch(url);
// //       if (!response.ok) {
// //         if (response.status === 404) {
// //           console.log('Model results not found yet. Retrying...');
// //           return null; // No results yet, keep polling
// //         } else {
// //           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
// //         }
// //       }
// //       const result = await response.json();
// //       setDashboardData(result); // Save the model results in state
// //       console.log('Model results fetched:', result);
// //       setModelTrained(true); // Mark training as completed
// //       return result;
// //     } catch (error) {
// //       console.error('Error fetching model results:', error);
// //       return null;
// //     }
// //   };

// //   // Poll for model results periodically until available
// //   const pollModelResults = async () => {
// //     setPolling(true); // Start polling
// //     const interval = setInterval(async () => {
// //       const result = await fetchModelResults();
// //       if (result) {
// //         clearInterval(interval); // Stop polling when results are found
// //         setPolling(false);
// //       }
// //     },90000); // Poll every 5 seconds
// //   };

// //   const handleTrainModel = async () => {
// //     console.log('NotebookLayout: Training model with:', {
// //       file_url,
// //       target_column,
// //       user_id,
// //       chat_id,
// //       features,
// //       entity_column,
// //     });

// //     navigate('/training', {
// //       state: {
// //         file_url,
// //         target_column,
// //         user_id,
// //         chat_id,
// //         features,
// //         entity_column,
// //         notebooks,
// //       },
// //     });

// //     // Wait for 5 minutes before starting polling
// //     setTimeout(() => {
// //       console.log('Starting polling after 5 minutes...');
// //       pollModelResults(); // Start polling for model results
// //     }, 300000); // 300,000 milliseconds = 5 minutes
// //   };

// //   const handleTabChange = (tabId: string) => {
// //     setActiveTab(tabId); // Change active tab
// //   };

// //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// //     ? JSON.parse(notebooks.entity_target_notebook).cells
// //     : [];

// //   const featuresNotebookCells = notebooks?.features_notebook
// //     ? JSON.parse(notebooks.features_notebook).cells
// //     : [];

// //   const navbarNotebooks = [
// //     {
// //       id: 'notebook',
// //       title: 'Notebook',
// //       icon: <FiBook size={18} />,
// //       onClick: () => handleTabChange('notebook'),
// //     },
// //     {
// //       id: 'dashboard',
// //       title: 'Dashboard',
// //       icon: <FiBarChart2 size={18} />,
// //       onClick: () => handleTabChange('dashboard'),
// //     },
// //     {
// //       id: 'predict',
// //       title: 'Predict',
// //       icon: <FiFlag size={18} />,
// //       onClick: () => handleTabChange('predict'),
// //     },
// //   ];

// //   const renderContent = () => {
// //     switch (activeTab) {
// //       case 'notebook':
// //         return (
// //           <div className="space-y-8">
// //             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// //             <SQLNotebook
// //               activeTab="entity_target_notebook"
// //               notebookContent={{
// //                 file_url,
// //                 entity_column,
// //                 target_column,
// //                 features,
// //                 user_id,
// //                 chat_id,
// //                 isTrained,
// //                 handleTrainModel,
// //                 cells: entityTargetNotebookCells,
// //               }}
// //             />
// //             <SQLNotebook
// //               activeTab="features_notebook"
// //               notebookContent={{
// //                 file_url,
// //                 entity_column,
// //                 target_column,
// //                 features,
// //                 user_id,
// //                 chat_id,
// //                 isTrained,
// //                 handleTrainModel,
// //                 cells: featuresNotebookCells,
// //               }}
// //             />
// //           </div>
// //         );
// //       case 'dashboard':
// //         if (!isTrained) {
// //           return (
// //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// //                 <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// //                 <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// //                 <p className="text-gray-600">Please train your model first to view the dashboard metrics.</p>
// //               </div>
// //             </div>
// //           );
// //         }
// //         return loadingDashboard ? (
// //           <div>Loading Dashboard...</div>
// //         ) : (
// //           <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// //         );
// //       case 'predict':
// //         if (!isTrained) {
// //           return (
// //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// //                 <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// //                 <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// //                 <p className="text-gray-600">Please train your model first to make predictions.</p>
// //               </div>
// //             </div>
// //           );
// //         }
// //         return <PredictionsUI />;
// //       default:
// //         return null;
// //     }
// //   };

// //   return (
// //     <div className="relative h-screen overflow-hidden">
// //       <div className="fixed top-0 left-0 right-0 z-50">
// //         <Navbar
// //           isSidebarOpen={isSidebarOpen}
// //           setIsSidebarOpen={setIsSidebarOpen}
// //           notebooks={navbarNotebooks}
// //           activeTab={activeTab}
// //         />
// //       </div>
// //       <div
// //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// //         }`}
// //         style={{ width: '16rem' }}
// //       >
// //         <Sidebar isOpen={isSidebarOpen} />
// //       </div>
// //       {!isTrained && (
// //         <motion.div
// //           initial={{ opacity: 0, y: 20, x: -20 }}
// //           animate={{ opacity: 1, y: 0, x: 0 }}
// //           transition={{ duration: 0.5, ease: 'easeOut' }}
// //           className="fixed top-20 right-4 z-50"
// //         >
// //           <button
// //             onClick={handleTrainModel}
// //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// //             aria-label="Train your predictive model"
// //           >
// //             Train Model
// //           </button>
// //         </motion.div>
// //       )}
// //       <div
// //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// //           isSidebarOpen ? 'left-64' : 'left-0'
// //         }`}
// //       >
// //         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
// //           <div className="p-4">
// //             <div className="w-full max-w-6xl mx-auto">{renderContent()}</div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NotebookLayout;






// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import Navbar from '../NotebookUI/Navbar/Navbar';
// import Sidebar from './Sidebar/Sidebar';
// import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// import Dashboard from '../Dashboard/Dashboard';
// import PredictionsUI from '../Predict/PredictNewData';
// import { FiBook, FiBarChart2, FiFlag } from 'react-icons/fi';
// import { motion } from 'framer-motion';

// // interface NotebookMetadata {
// //   file_url: string;
// //   target_column: string;
// //   entity_column: string;
// //   features: string[];
// //   user_id: string;
// //   chat_id: string;
// //   isTrained: boolean;
// //   handleTrainModel: () => void;
// // }

// interface Metrics {
//   rmse: number;
//   r2_score: number;
//   mae: number;
// }

// interface ModelMetrics {
//   training: Metrics;
//   testing: Metrics;
//   assessment: string;
// }

// interface MetricsData {
//   model_metrics: ModelMetrics;
//   feature_importance: Record<string, number>;
//   predictions: {
//     actual: number[];
//     predicted: number[];
//   };
//   user_id: string;
//   chat_id: string;
// }

// interface NotebookState {
//   notebooks: {
//     entity_target_notebook?: string;
//     features_notebook?: string;
//     time_based_notebook?: string;  // <--- ADDED: for time-based approach
//   };
//   file_url: string;
//   entity_column: string;
//   target_column: string;
//   features: string[];
//   user_id: string;
//   chat_id: string;
//   isTrained: boolean;
//   time_column?: string;    // optional, for time-based
//   time_frame?: string;     // optional, for time-based
// }

// const NotebookLayout: React.FC = () => {
//   console.log('NotebookLayout: Component mounting');
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState('notebook');
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
//   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
//   const [loadingDashboard, setLoadingDashboard] = useState(false);
//   const [modelTrained, setModelTrained] = useState(false); // Tracks if training is complete
//   const [polling, setPolling] = useState(false); // Tracks if polling is active

//   const {
//     notebooks,
//     file_url,
//     entity_column,
//     target_column,
//     features,
//     user_id,
//     chat_id,
//     isTrained = false,
//     // time_column, time_frame // if needed
//   } = (location.state as NotebookState) || {};

//   // Polling / Model training logic remains the same
//   const fetchModelResults = async () => {
//     try {
//       console.log('Fetching model results...');
//       const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
//       const response = await fetch(url);
//       if (!response.ok) {
//         if (response.status === 404) {
//           console.log('Model results not found yet. Retrying...');
//           return null; // No results yet, keep polling
//         } else {
//           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
//         }
//       }
//       const result = await response.json();
//       setDashboardData(result);
//       console.log('Model results fetched:', result);
//       setModelTrained(true);
//       return result;
//     } catch (error) {
//       console.error('Error fetching model results:', error);
//       return null;
//     }
//   };

//   const pollModelResults = async () => {
//     setPolling(true);
//     const interval = setInterval(async () => {
//       const result = await fetchModelResults();
//       if (result) {
//         clearInterval(interval);
//         setPolling(false);
//       }
//     }, 90000); // poll every 90 seconds
//   };

//   const handleTrainModel = async () => {
//     console.log('NotebookLayout: Training model with:', {
//       file_url,
//       target_column,
//       user_id,
//       chat_id,
//       features,
//       entity_column,
//     });

//     navigate('/training', {
//       state: {
//         file_url,
//         target_column,
//         user_id,
//         chat_id,
//         features,
//         entity_column,
//         notebooks,
//       },
//     });

//     // Wait 5 minutes before polling
//     setTimeout(() => {
//       console.log('Starting polling after 5 minutes...');
//       pollModelResults();
//     }, 300000); // 5 minutes
//   };

//   const handleTabChange = (tabId: string) => {
//     setActiveTab(tabId);
//   };

//   // ---------------
//   // PARSE NOTEBOOKS
//   // ---------------
//   // If time_based_notebook is present => we parse that:
//   const timeBasedNotebookCells = notebooks?.time_based_notebook
//     ? JSON.parse(notebooks.time_based_notebook).cells
//     : [];

//   // For non-time-based, we parse entity_target_notebook and features_notebook:
//   const entityTargetNotebookCells = notebooks?.entity_target_notebook
//     ? JSON.parse(notebooks.entity_target_notebook).cells
//     : [];
//   const featuresNotebookCells = notebooks?.features_notebook
//     ? JSON.parse(notebooks.features_notebook).cells
//     : [];

//   // We will show EITHER the time-based notebook OR the old approach, depending on what is returned
//   const navbarNotebooks = [
//     {
//       id: 'notebook',
//       title: 'Notebook',
//       icon: <FiBook size={18} />,
//       onClick: () => handleTabChange('notebook'),
//     },
//     {
//       id: 'dashboard',
//       title: 'Dashboard',
//       icon: <FiBarChart2 size={18} />,
//       onClick: () => handleTabChange('dashboard'),
//     },
//     {
//       id: 'predict',
//       title: 'Predict',
//       icon: <FiFlag size={18} />,
//       onClick: () => handleTabChange('predict'),
//     },
//   ];

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'notebook':
//         // 1) If timeBasedNotebookCells exist, show them
//         if (timeBasedNotebookCells.length > 0) {
//           return (
//             <div className="space-y-8">
//               <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
//               <SQLNotebook
//                 activeTab="time_based_notebook"
//                 notebookContent={{
//                   file_url,
//                   entity_column,
//                   target_column,
//                   features,
//                   user_id,
//                   chat_id,
//                   isTrained,
//                   handleTrainModel,
//                   cells: timeBasedNotebookCells,
//                 }}
//               />
//             </div>
//           );
//         }
//         // 2) Otherwise, fallback to the non-time-based approach
//         return (
//           <div className="space-y-8">
//             <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
//             <SQLNotebook
//               activeTab="entity_target_notebook"
//               notebookContent={{
//                 file_url,
//                 entity_column,
//                 target_column,
//                 features,
//                 user_id,
//                 chat_id,
//                 isTrained,
//                 handleTrainModel,
//                 cells: entityTargetNotebookCells,
//               }}
//             />
//             <SQLNotebook
//               activeTab="features_notebook"
//               notebookContent={{
//                 file_url,
//                 entity_column,
//                 target_column,
//                 features,
//                 user_id,
//                 chat_id,
//                 isTrained,
//                 handleTrainModel,
//                 cells: featuresNotebookCells,
//               }}
//             />
//           </div>
//         );

//       case 'dashboard':
//         if (!isTrained) {
//           return (
//             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
//               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
//                 <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
//                 <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
//                 <p className="text-gray-600">
//                   Please train your model first to view the dashboard metrics.
//                 </p>
//               </div>
//             </div>
//           );
//         }
//         return loadingDashboard ? (
//           <div>Loading Dashboard...</div>
//         ) : (
//           <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
//         );

//       case 'predict':
//         if (!isTrained) {
//           return (
//             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
//               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
//                 <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
//                 <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
//                 <p className="text-gray-600">
//                   Please train your model first to make predictions.
//                 </p>
//               </div>
//             </div>
//           );
//         }
//         return <PredictionsUI />;

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="relative h-screen overflow-hidden">
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <Navbar
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//           notebooks={navbarNotebooks}
//           activeTab={activeTab}
//         />
//       </div>
//       <div
//         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
//         }`}
//         style={{ width: '16rem' }}
//       >
//         <Sidebar isOpen={isSidebarOpen} />
//       </div>
//       {!isTrained && (
//         <motion.div
//           initial={{ opacity: 0, y: 20, x: -20 }}
//           animate={{ opacity: 1, y: 0, x: 0 }}
//           transition={{ duration: 0.5, ease: 'easeOut' }}
//           className="fixed top-20 right-4 z-50"
//         >
//           <button
//             onClick={handleTrainModel}
//             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
//             aria-label="Train your predictive model"
//           >
//             Train Model
//           </button>
//         </motion.div>
//       )}
//       <div
//         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
//           isSidebarOpen ? 'left-64' : 'left-0'
//         }`}
//       >
//         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
//           <div className="p-4">
//             <div className="w-full max-w-6xl mx-auto">{renderContent()}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotebookLayout;











import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../NotebookUI/Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import SQLNotebook from '../NotebookUI/Notebook/Notebook';
import Dashboard from '../Dashboard/Dashboard';
import PredictionsUI from '../Predict/PredictNewData';
import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
import { motion } from 'framer-motion';

// If you have additional type definitions or interfaces, keep them:
interface Metrics {
  rmse: number;
  r2_score: number;
  mae: number;
}

interface ModelMetrics {
  training: Metrics;
  testing: Metrics;
  assessment: string;
}

interface MetricsData {
  model_metrics: ModelMetrics;
  feature_importance: Record<string, number>;
  predictions: {
    actual: number[];
    predicted: number[];
  };
  user_id: string;
  chat_id: string;
}

interface NotebookState {
  notebooks: {
    entity_target_notebook?: string;
    features_notebook?: string;
    time_based_notebook?: string; // For time-based approach
  };
  file_url: string;
  entity_column: string;
  target_column: string;
  features: string[];
  user_id: string;
  chat_id: string;
  isTrained: boolean;
  time_column?: string;
  time_frame?: string;
}

// -------------
// 1) Import the ref interface from your forwardRef in SQLNotebook
//    e.g. import type { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
import type { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';

const NotebookLayout: React.FC = () => {
  console.log('NotebookLayout: Component mounting');
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('notebook');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [modelTrained, setModelTrained] = useState(false);
  const [polling, setPolling] = useState(false);

  // 2) A ref to call runAllCellsAndGetResults from the child
  const notebookRef = useRef<SQLNotebookRef | null>(null);

  // Pull data from location.state
  const {
    notebooks,
    file_url,
    entity_column,
    target_column,
    features,
    user_id,
    chat_id,
    isTrained = false,
    // time_column, time_frame
  } = (location.state as NotebookState) || {};

  // Polling / Model training logic remains the same
  const fetchModelResults = async () => {
    try {
      console.log('Fetching model results...');
      const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          console.log('Model results not found yet. Retrying...');
          return null; // No results yet, keep polling
        } else {
          throw new Error(
            `Failed to fetch model results. Status: ${response.status}`
          );
        }
      }
      const result = await response.json();
      setDashboardData(result);
      console.log('Model results fetched:', result);
      setModelTrained(true);
      return result;
    } catch (error) {
      console.error('Error fetching model results:', error);
      return null;
    }
  };

  const pollModelResults = async () => {
    setPolling(true);
    const interval = setInterval(async () => {
      const result = await fetchModelResults();
      if (result) {
        clearInterval(interval);
        setPolling(false);
      }
    }, 90000); // poll every 90 seconds
  };

  const handleTrainModel = async () => {
    console.log('NotebookLayout: Training model with:', {
      file_url,
      target_column,
      user_id,
      chat_id,
      features,
      entity_column,
    });

    navigate('/training', {
      state: {
        file_url,
        target_column,
        user_id,
        chat_id,
        features,
        entity_column,
        notebooks,
      },
    });

    // Wait 5 minutes before polling
    setTimeout(() => {
      console.log('Starting polling after 5 minutes...');
      pollModelResults();
    }, 300000); // 5 minutes
  };

  // 3) Our new Save Notebooks function
  const [savingNotebooks, setSavingNotebooks] = useState(false);

  const handleSaveNotebooks = async () => {
    if (!user_id || !chat_id) {
      alert('user_id or chat_id is missing, cannot save notebooks.');
      return;
    }
    if (!notebookRef.current) {
      alert('Notebook reference not found.');
      return;
    }

    setSavingNotebooks(true);
    try {
      // 3a) Instruct the child to run all cells, collecting results
      const cellResults = await notebookRef.current.runAllCellsAndGetResults();
      // 3b) POST them to /api/save-notebooks
      const resp = await fetch('http://localhost:8000/api/save-notebooks/', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
        },
        body: JSON.stringify({
          user_id,
          chat_id,
          cells: cellResults, // array of { cellId, query, columns, rows }
        }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to save notebooks.');
      }
      const data = await resp.json();
      console.log('Save notebooks success:', data);
      alert('Notebooks saved successfully!');
    } catch (err: any) {
      console.error('Error saving notebooks:', err);
      alert(`Error saving notebooks: ${err.message}`);
    } finally {
      setSavingNotebooks(false);
    }
  };

  // handleTabChange for the Nav
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  // We parse the notebooks from JSON
  const timeBasedNotebookCells = notebooks?.time_based_notebook
    ? JSON.parse(notebooks.time_based_notebook).cells
    : [];
  const entityTargetNotebookCells = notebooks?.entity_target_notebook
    ? JSON.parse(notebooks.entity_target_notebook).cells
    : [];
  const featuresNotebookCells = notebooks?.features_notebook
    ? JSON.parse(notebooks.features_notebook).cells
    : [];

  const navbarNotebooks = [
    {
      id: 'notebook',
      title: 'Notebook',
      icon: <FiBook size={18} />,
      onClick: () => handleTabChange('notebook'),
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <FiBarChart2 size={18} />,
      onClick: () => handleTabChange('dashboard'),
    },
    {
      id: 'predict',
      title: 'Predict',
      icon: <FiFlag size={18} />,
      onClick: () => handleTabChange('predict'),
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'notebook':
        // If timeBasedNotebookCells exist, we show them
        if (timeBasedNotebookCells.length > 0) {
          return (
            <div className="space-y-8">
              <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
              {/* 4) Attach the ref to this notebook so we can runAllCellsAndGetResults */}
              <SQLNotebook
                ref={notebookRef}
                activeTab="time_based_notebook"
                notebookContent={{
                  file_url,
                  entity_column,
                  target_column,
                  features,
                  user_id,
                  chat_id,
                  isTrained,
                  handleTrainModel,
                  cells: timeBasedNotebookCells,
                }}
              />
            </div>
          );
        } else {
          // Otherwise, show the two standard notebooks
          return (
            <div className="space-y-8">
              <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
              {/* We'll attach the ref to just the first one for demonstration */}
              <SQLNotebook
                ref={notebookRef}
                activeTab="entity_target_notebook"
                notebookContent={{
                  file_url,
                  entity_column,
                  target_column,
                  features,
                  user_id,
                  chat_id,
                  isTrained,
                  handleTrainModel,
                  cells: entityTargetNotebookCells,
                }}
              />
              <SQLNotebook
                activeTab="features_notebook"
                notebookContent={{
                  file_url,
                  entity_column,
                  target_column,
                  features,
                  user_id,
                  chat_id,
                  isTrained,
                  handleTrainModel,
                  cells: featuresNotebookCells,
                }}
              />
            </div>
          );
        }

      case 'dashboard':
        if (!isTrained) {
          return (
            <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
              <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
                <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
                <p className="text-gray-600">
                  Please train your model first to view the dashboard metrics.
                </p>
              </div>
            </div>
          );
        }
        return loadingDashboard ? (
          <div>Loading Dashboard...</div>
        ) : (
          <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
        );

      case 'predict':
        if (!isTrained) {
          return (
            <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
              <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
                <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
                <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
                <p className="text-gray-600">
                  Please train your model first to make predictions.
                </p>
              </div>
            </div>
          );
        }
        return <PredictionsUI />;

      default:
        return null;
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          notebooks={navbarNotebooks}
          activeTab={activeTab}
        />
      </div>

      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
        style={{ width: '16rem' }}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* 5) Both "Train Model" and "Save Notebooks" buttons if not isTrained */}
      {!isTrained && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
        >
          <button
            onClick={handleTrainModel}
            className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
            aria-label="Train your predictive model"
          >
            Train Model
          </button>

          {/* Save Notebooks button */}
          <button
            onClick={handleSaveNotebooks}
            disabled={savingNotebooks}
            className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
            aria-label="Save Notebooks"
          >
            {savingNotebooks ? (
              <>
                <FiLoader className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Notebooks'
            )}
          </button>
        </motion.div>
      )}

      <div
        className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
          isSidebarOpen ? 'left-64' : 'left-0'
        }`}
      >
        <div className="h-[calc(100vh-7rem)] overflow-y-auto">
          <div className="p-4">
            <div className="w-full max-w-6xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotebookLayout;
