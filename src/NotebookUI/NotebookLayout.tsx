



// // // // import React, { useState } from 'react';
// // // // import { FileText, Settings, Database } from 'lucide-react';
// // // // import Navbar from './Navbar/Navbar';
// // // // import Sidebar from './Sidebar/Sidebar';

// // // // import { NotebookTab } from './types';
// // // // import SQLNotebook from './Notebook/Notebook';

// // // // const NotebookLayout: React.FC = () => {
// // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // // //   const [activeTab, setActiveTab] = useState('notebook1');

// // // //   const notebooks: NotebookTab[] = [
// // // //     { id: 'notebook1', title: 'Data Analysis', icon: <FileText className="w-4 h-4" /> },
// // // //     { id: 'notebook2', title: 'Model Training', icon: <Settings className="w-4 h-4" /> },
// // // //     { id: 'notebook3', title: 'Predictions', icon: <Database className="w-4 h-4" /> },
// // // //   ];

// // // //   return (
// // // //     <div className="h-screen flex flex-col bg-gray-50">
// // // //       <Navbar
// // // //         isSidebarOpen={isSidebarOpen}
// // // //         setIsSidebarOpen={setIsSidebarOpen}
// // // //         notebooks={notebooks}
// // // //         activeTab={activeTab}
// // // //         setActiveTab={setActiveTab}
// // // //       />
// // // //       <div className="flex flex-1 overflow-hidden">
// // // //         <Sidebar isOpen={isSidebarOpen} />
// // // //         <div className="flex-1 flex justify-center items-start overflow-y-auto">
// // // //           <div className="w-full max-w-6xl">
// // // //             <SQLNotebook activeTab={activeTab} />
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default NotebookLayout;



// // // import React, { useState } from 'react';
// // // import { FileText, Settings } from 'lucide-react';
// // // import Navbar from './Navbar/Navbar';
// // // import Sidebar from './Sidebar/Sidebar';
// // // import { useLocation } from 'react-router-dom';

// // // import { NotebookTab } from './types';
// // // import SQLNotebook from './Notebook/Notebook';

// // // const NotebookLayout: React.FC = () => {
// // //   const location = useLocation();
// // //   const notebooksData = location.state?.notebooks || {};

// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// // //   const notebooks: NotebookTab[] = [
// // //     { id: 'entity_target_notebook', title: 'Entity & Target Analysis', icon: <FileText className="w-4 h-4" /> },
// // //     { id: 'features_notebook', title: 'Features Analysis', icon: <Settings className="w-4 h-4" /> },
// // //   ];

// // //   const notebookContent = notebooksData[activeTab];

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
// // //             <SQLNotebook activeTab={activeTab} notebookContent={notebookContent} />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NotebookLayout;


// // // import React, { useState } from 'react';
// // // import { FileText, Settings } from 'lucide-react';
// // // import Navbar from './Navbar/Navbar';
// // // import Sidebar from './Sidebar/Sidebar';
// // // import { useLocation } from 'react-router-dom';

// // // import { NotebookTab } from './types';
// // // import SQLNotebook from './Notebook/Notebook';

// // // const NotebookLayout: React.FC = () => {
// // //   const location = useLocation();
// // //   const notebooksData = location.state?.notebooks || {};

// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// // //   const notebooks: NotebookTab[] = [
// // //     { id: 'entity_target_notebook', title: 'Entity & Target Analysis', icon: <FileText className="w-4 h-4" /> },
// // //     { id: 'features_notebook', title: 'Features Analysis', icon: <Settings className="w-4 h-4" /> },
// // //   ];

// // //   const notebookContent = notebooksData[activeTab];

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
// // //             <SQLNotebook activeTab={activeTab} notebookContent={notebookContent} />
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NotebookLayout;



// // // NotebookLayout.tsx

// // import React, { useState } from 'react';
// // import { useLocation } from 'react-router-dom';
// // import SQLNotebook from './Notebook/Notebook'; // Adjust the import path as needed

// // interface NotebookTab {
// //   id: string;
// //   title: string;
// // }

// // const NotebookLayout: React.FC = () => {
// //   const location = useLocation();
// //   const notebooksData = location.state?.notebooks || {};

// //   const [activeTab, setActiveTab] = useState('entity_target_notebook');

// //   const notebooks: NotebookTab[] = [
// //     {
// //       id: 'entity_target_notebook',
// //       title: 'Entity & Target Analysis',
// //     },
// //     {
// //       id: 'features_notebook',
// //       title: 'Features Analysis',
// //     },
// //   ];

// //   const notebookContent = notebooksData[activeTab];

// //   return (
// //     <div className="flex">
// //       {/* Sidebar or Tab Navigation */}
// //       <div className="w-64 bg-gray-100 p-4">
// //         {notebooks.map((tab) => (
// //           <button
// //             key={tab.id}
// //             onClick={() => setActiveTab(tab.id)}
// //             className={`block w-full text-left px-4 py-2 mb-2 rounded ${
// //               activeTab === tab.id
// //                 ? 'bg-teal-600 text-white'
// //                 : 'bg-white text-gray-700'
// //             }`}
// //           >
// //             {tab.title}
// //           </button>
// //         ))}
// //       </div>
// //       {/* Main Content */}
// //       <div className="flex-1">
// //         <SQLNotebook
// //           activeTab={activeTab}
// //           notebookContent={notebookContent}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default NotebookLayout;



// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import Navbar from './Navbar/Navbar';
// import Sidebar from './Sidebar/Sidebar';
// import SQLNotebook from './Notebook/Notebook'; // Adjust the import path as needed

// interface NotebookTab {
//   id: string;
//   title: string;
//   icon: string;
// }

// const NotebookLayout: React.FC = () => {
//   const location = useLocation();
//   const notebooksData = location.state?.notebooks || {};

//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [activeTab, setActiveTab] = useState('entity_target_notebook');

//   const notebooks: NotebookTab[] = [
//     {
//       id: 'entity_target_notebook',
//       title: 'Entity & Target Analysis',
//       icon: 'icon-entity',
//     },
//     {
//       id: 'features_notebook',
//       title: 'Features Analysis',
//       icon: 'icon-features', 
//     },
//   ];

//   // const notebookContent = notebooksData[activeTab];

//   return (
//     <div className="h-screen flex flex-col bg-gray-50">
//       <Navbar
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen}
//         notebooks={notebooks}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />
//       <div className="flex flex-1 overflow-hidden">
//         <Sidebar isOpen={isSidebarOpen} />
//         <div className="flex-1 flex flex-col justify-start items-center overflow-y-auto p-10">
//           <div className="w-full max-w-6xl">
//             <SQLNotebook
//               activeTab="entity_target_notebook"
//               notebookContent={notebooksData['entity_target_notebook']}
//             />
//             <SQLNotebook
//               activeTab="features_notebook"
//               notebookContent={notebooksData['features_notebook']}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotebookLayout;



import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Sidebar from './Sidebar/Sidebar';
import SQLNotebook from './Notebook/Notebook';

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

  const [entityTargetQuery, setEntityTargetQuery] = useState('');
  const [featuresQuery, setFeaturesQuery] = useState('');
  const [entityTargetData, setEntityTargetData] = useState([]);
  const [featuresData, setFeaturesData] = useState([]);

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

  // Function to fetch data from the backend API
  const fetchDataForAutomation = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/automation/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Extract SQL queries and data, limiting to 10 for presentation
      setEntityTargetQuery(`SELECT * FROM (${data.entity_target_query}) LIMIT 10;`);
      setFeaturesQuery(`SELECT * FROM (${data.features_query}) LIMIT 10;`);

      // Set data with LIMIT 10 for presentation
      setEntityTargetData(data.entity_target_data.slice(0, 10));
      setFeaturesData(data.features_data.slice(0, 10));

      console.log('[DEBUG] Entity & Target Data:', data.entity_target_data.slice(0, 10));
      console.log('[DEBUG] Features Data:', data.features_data.slice(0, 10));
    } catch (error) {
      console.error('Error fetching data for automation:', error);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 relative">
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

      {/* Floating Button */}
      <button
        onClick={fetchDataForAutomation}
        className="fixed bottom-10 right-10 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none"
      >
        Train Model
      </button>

      {/* Display SQL Queries and Data */}
      <div className="fixed bottom-20 right-10 w-96 bg-white p-4 shadow-lg rounded-md overflow-y-auto">
        <h3 className="text-lg font-semibold mb-2">SQL Queries</h3>
        <div className="mb-4">
          <strong>Entity & Target Query:</strong>
          <pre className="bg-gray-100 p-2 rounded">{entityTargetQuery}</pre>
        </div>
        <div>
          <strong>Features Query:</strong>
          <pre className="bg-gray-100 p-2 rounded">{featuresQuery}</pre>
        </div>
        <h3 className="text-lg font-semibold mt-4">Sample Data</h3>
        <div>
          <strong>Entity & Target Data:</strong>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(entityTargetData, null, 2)}
          </pre>
        </div>
        <div>
          <strong>Features Data:</strong>
          <pre className="bg-gray-100 p-2 rounded">
            {JSON.stringify(featuresData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default NotebookLayout;
