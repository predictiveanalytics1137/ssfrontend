







// // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // // // // // // // import Dashboard from '../Dashboard/Dashboard';
// // // // // // // // // import PredictionsUI from '../Predict/PredictNewData';
// // // // // // // // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // // // // // // // import { motion } from 'framer-motion';

// // // // // // // // // // If you have additional type definitions or interfaces, keep them:
// // // // // // // // // interface Metrics {
// // // // // // // // //   rmse: number;
// // // // // // // // //   r2_score: number;
// // // // // // // // //   mae: number;
// // // // // // // // // }

// // // // // // // // // interface ModelMetrics {
// // // // // // // // //   training: Metrics;
// // // // // // // // //   testing: Metrics;
// // // // // // // // //   assessment: string;
// // // // // // // // // }

// // // // // // // // // interface MetricsData {
// // // // // // // // //   model_metrics: ModelMetrics;
// // // // // // // // //   feature_importance: Record<string, number>;
// // // // // // // // //   predictions: {
// // // // // // // // //     actual: number[];
// // // // // // // // //     predicted: number[];
// // // // // // // // //   };
// // // // // // // // //   user_id: string;
// // // // // // // // //   chat_id: string;
// // // // // // // // // }

// // // // // // // // // interface NotebookState {
// // // // // // // // //   notebooks: {
// // // // // // // // //     entity_target_notebook?: string;
// // // // // // // // //     features_notebook?: string;
// // // // // // // // //     time_based_notebook?: string; // For time-based approach
// // // // // // // // //   };
// // // // // // // // //   file_url: string;
// // // // // // // // //   entity_column: string;
// // // // // // // // //   target_column: string;
// // // // // // // // //   features: string[];
// // // // // // // // //   user_id: string;
// // // // // // // // //   chat_id: string;
// // // // // // // // //   isTrained: boolean;
// // // // // // // // //   time_column?: string;
// // // // // // // // //   time_frame?: string;
// // // // // // // // // }

// // // // // // // // // // -------------
// // // // // // // // // // 1) Import the ref interface from your forwardRef in SQLNotebook
// // // // // // // // // //    e.g. import type { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // // // // // // // // import type { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';

// // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // //   console.log('NotebookLayout: Component mounting');
// // // // // // // // //   const location = useLocation();
// // // // // // // // //   const navigate = useNavigate();

// // // // // // // // //   const [activeTab, setActiveTab] = useState('notebook');
// // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
// // // // // // // // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // // // // // // // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // // // // // // // //   const [modelTrained, setModelTrained] = useState(false);
// // // // // // // // //   const [polling, setPolling] = useState(false);

// // // // // // // // //   // 2) A ref to call runAllCellsAndGetResults from the child
// // // // // // // // //   const notebookRef = useRef<SQLNotebookRef | null>(null);

// // // // // // // // //   // Pull data from location.state
// // // // // // // // //   const {
// // // // // // // // //     notebooks,
// // // // // // // // //     file_url,
// // // // // // // // //     entity_column,
// // // // // // // // //     target_column,
// // // // // // // // //     features,
// // // // // // // // //     user_id,
// // // // // // // // //     chat_id,
// // // // // // // // //     isTrained = false,
// // // // // // // // //     // time_column, time_frame
// // // // // // // // //   } = (location.state as NotebookState) || {};

// // // // // // // // //   // Polling / Model training logic remains the same
// // // // // // // // //   const fetchModelResults = async () => {
// // // // // // // // //     try {
// // // // // // // // //       console.log('Fetching model results...');
// // // // // // // // //       const url = ` http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // // // // // // // //       const response = await fetch(url);
// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         if (response.status === 404) {
// // // // // // // // //           console.log('Model results not found yet. Retrying...');
// // // // // // // // //           return null; // No results yet, keep polling
// // // // // // // // //         } else {
// // // // // // // // //           throw new Error(
// // // // // // // // //             `Failed to fetch model results. Status: ${response.status}`
// // // // // // // // //           );
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //       const result = await response.json();
// // // // // // // // //       setDashboardData(result);
// // // // // // // // //       console.log('Model results fetched:', result);
// // // // // // // // //       setModelTrained(true);
// // // // // // // // //       return result;
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error fetching model results:', error);
// // // // // // // // //       return null;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const pollModelResults = async () => {
// // // // // // // // //     setPolling(true);
// // // // // // // // //     const interval = setInterval(async () => {
// // // // // // // // //       const result = await fetchModelResults();
// // // // // // // // //       if (result) {
// // // // // // // // //         clearInterval(interval);
// // // // // // // // //         setPolling(false);
// // // // // // // // //       }
// // // // // // // // //     }, 90000); // poll every 90 seconds
// // // // // // // // //   };

// // // // // // // // //   const handleTrainModel = async () => {
// // // // // // // // //     console.log('NotebookLayout: Training model with:', {
// // // // // // // // //       file_url,
// // // // // // // // //       target_column,
// // // // // // // // //       user_id,
// // // // // // // // //       chat_id,
// // // // // // // // //       features,
// // // // // // // // //       entity_column,
// // // // // // // // //     });

// // // // // // // // //     navigate('/training', {
// // // // // // // // //       state: {
// // // // // // // // //         file_url,
// // // // // // // // //         target_column,
// // // // // // // // //         user_id,
// // // // // // // // //         chat_id,
// // // // // // // // //         features,
// // // // // // // // //         entity_column,
// // // // // // // // //         notebooks,
// // // // // // // // //       },
// // // // // // // // //     });

// // // // // // // // //     // Wait 5 minutes before polling
// // // // // // // // //     setTimeout(() => {
// // // // // // // // //       console.log('Starting polling after 5 minutes...');
// // // // // // // // //       pollModelResults();
// // // // // // // // //     }, 300000); // 5 minutes
// // // // // // // // //   };

// // // // // // // // //   // 3) Our new Save Notebooks function
// // // // // // // // //   const [savingNotebooks, setSavingNotebooks] = useState(false);

// // // // // // // // //   const handleSaveNotebooks = async () => {
// // // // // // // // //     if (!user_id || !chat_id) {
// // // // // // // // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // // // // // // // //       return;
// // // // // // // // //     }
// // // // // // // // //     if (!notebookRef.current) {
// // // // // // // // //       alert('Notebook reference not found.');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setSavingNotebooks(true);
// // // // // // // // //     try {
// // // // // // // // //       // 3a) Instruct the child to run all cells, collecting results
// // // // // // // // //       const cellResults = await notebookRef.current.runAllCellsAndGetResults();
// // // // // // // // //       // 3b) POST them to /api/save-notebooks
// // // // // // // // //       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: { 
// // // // // // // // //           'Content-Type': 'application/json', 
// // // // // // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // // // // // // //         },
// // // // // // // // //         body: JSON.stringify({
// // // // // // // // //           user_id,
// // // // // // // // //           chat_id,
// // // // // // // // //           cells: cellResults, // array of { cellId, query, columns, rows }
// // // // // // // // //         }),
// // // // // // // // //       });

// // // // // // // // //       if (!resp.ok) {
// // // // // // // // //         const errData = await resp.json().catch(() => ({}));
// // // // // // // // //         throw new Error(errData.error || 'Failed to save notebooks.');
// // // // // // // // //       }
// // // // // // // // //       const data = await resp.json();
// // // // // // // // //       console.log('Save notebooks success:', data);
// // // // // // // // //       alert('Notebooks saved successfully!');
// // // // // // // // //     } catch (err: any) {
// // // // // // // // //       console.error('Error saving notebooks:', err);
// // // // // // // // //       alert(`Error saving notebooks: ${err.message}`);
// // // // // // // // //     } finally {
// // // // // // // // //       setSavingNotebooks(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // handleTabChange for the Nav
// // // // // // // // //   const handleTabChange = (tabId: string) => {
// // // // // // // // //     setActiveTab(tabId);
// // // // // // // // //   };

// // // // // // // // //   // We parse the notebooks from JSON
// // // // // // // // //   const timeBasedNotebookCells = notebooks?.time_based_notebook
// // // // // // // // //     ? JSON.parse(notebooks.time_based_notebook).cells
// // // // // // // // //     : [];
// // // // // // // // //   const entityTargetNotebookCells = notebooks?.entity_target_notebook
// // // // // // // // //     ? JSON.parse(notebooks.entity_target_notebook).cells
// // // // // // // // //     : [];
// // // // // // // // //   const featuresNotebookCells = notebooks?.features_notebook
// // // // // // // // //     ? JSON.parse(notebooks.features_notebook).cells
// // // // // // // // //     : [];

// // // // // // // // //   const navbarNotebooks = [
// // // // // // // // //     {
// // // // // // // // //       id: 'notebook',
// // // // // // // // //       title: 'Notebook',
// // // // // // // // //       icon: <FiBook size={18} />,
// // // // // // // // //       onClick: () => handleTabChange('notebook'),
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       id: 'dashboard',
// // // // // // // // //       title: 'Dashboard',
// // // // // // // // //       icon: <FiBarChart2 size={18} />,
// // // // // // // // //       onClick: () => handleTabChange('dashboard'),
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       id: 'predict',
// // // // // // // // //       title: 'Predict',
// // // // // // // // //       icon: <FiFlag size={18} />,
// // // // // // // // //       onClick: () => handleTabChange('predict'),
// // // // // // // // //     },
// // // // // // // // //   ];

// // // // // // // // //   const renderContent = () => {
// // // // // // // // //     switch (activeTab) {
// // // // // // // // //       case 'notebook':
// // // // // // // // //         // If timeBasedNotebookCells exist, we show them
// // // // // // // // //         if (timeBasedNotebookCells.length > 0) {
// // // // // // // // //           return (
// // // // // // // // //             <div className="space-y-8">
// // // // // // // // //               <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
// // // // // // // // //               {/* 4) Attach the ref to this notebook so we can runAllCellsAndGetResults */}
// // // // // // // // //               <SQLNotebook
// // // // // // // // //                 ref={notebookRef}
// // // // // // // // //                 activeTab="time_based_notebook"
// // // // // // // // //                 notebookContent={{
// // // // // // // // //                   file_url,
// // // // // // // // //                   entity_column,
// // // // // // // // //                   target_column,
// // // // // // // // //                   features,
// // // // // // // // //                   user_id,
// // // // // // // // //                   chat_id,
// // // // // // // // //                   isTrained,
// // // // // // // // //                   handleTrainModel,
// // // // // // // // //                   cells: timeBasedNotebookCells,
// // // // // // // // //                 }}
// // // // // // // // //               />
// // // // // // // // //             </div>
// // // // // // // // //           );
// // // // // // // // //         } else {
// // // // // // // // //           // Otherwise, show the two standard notebooks
// // // // // // // // //           return (
// // // // // // // // //             <div className="space-y-8">
// // // // // // // // //               <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // // // //               {/* We'll attach the ref to just the first one for demonstration */}
// // // // // // // // //               <SQLNotebook
// // // // // // // // //                 ref={notebookRef}
// // // // // // // // //                 activeTab="entity_target_notebook"
// // // // // // // // //                 notebookContent={{
// // // // // // // // //                   file_url,
// // // // // // // // //                   entity_column,
// // // // // // // // //                   target_column,
// // // // // // // // //                   features,
// // // // // // // // //                   user_id,
// // // // // // // // //                   chat_id,
// // // // // // // // //                   isTrained,
// // // // // // // // //                   handleTrainModel,
// // // // // // // // //                   cells: entityTargetNotebookCells,
// // // // // // // // //                 }}
// // // // // // // // //               />
// // // // // // // // //               <SQLNotebook
// // // // // // // // //                 activeTab="features_notebook"
// // // // // // // // //                 notebookContent={{
// // // // // // // // //                   file_url,
// // // // // // // // //                   entity_column,
// // // // // // // // //                   target_column,
// // // // // // // // //                   features,
// // // // // // // // //                   user_id,
// // // // // // // // //                   chat_id,
// // // // // // // // //                   isTrained,
// // // // // // // // //                   handleTrainModel,
// // // // // // // // //                   cells: featuresNotebookCells,
// // // // // // // // //                 }}
// // // // // // // // //               />
// // // // // // // // //             </div>
// // // // // // // // //           );
// // // // // // // // //         }

// // // // // // // // //       case 'dashboard':
// // // // // // // // //         if (!isTrained) {
// // // // // // // // //           return (
// // // // // // // // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // // // // // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // // // // // //                 <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // // // //                 <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // //                   Please train your model first to view the dashboard metrics.
// // // // // // // // //                 </p>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           );
// // // // // // // // //         }
// // // // // // // // //         return loadingDashboard ? (
// // // // // // // // //           <div>Loading Dashboard...</div>
// // // // // // // // //         ) : (
// // // // // // // // //           <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // // // // // // // //         );

// // // // // // // // //       case 'predict':
// // // // // // // // //         if (!isTrained) {
// // // // // // // // //           return (
// // // // // // // // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // // // // // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // // // // // //                 <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // // // //                 <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // //                   Please train your model first to make predictions.
// // // // // // // // //                 </p>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           );
// // // // // // // // //         }
// // // // // // // // //         return <PredictionsUI />;

// // // // // // // // //       default:
// // // // // // // // //         return null;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="relative h-screen overflow-hidden">
// // // // // // // // //       <div className="fixed top-0 left-0 right-0 z-50">
// // // // // // // // //         <Navbar
// // // // // // // // //           isSidebarOpen={isSidebarOpen}
// // // // // // // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // //           notebooks={navbarNotebooks}
// // // // // // // // //           activeTab={activeTab}
// // // // // // // // //         />
// // // // // // // // //       </div>

// // // // // // // // //       <div
// // // // // // // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // // // // // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // // // // // // //         }`}
// // // // // // // // //         style={{ width: '16rem' }}
// // // // // // // // //       >
// // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // // //       </div>

// // // // // // // // //       {/* 5) Both "Train Model" and "Save Notebooks" buttons if not isTrained */}
// // // // // // // // //       {!isTrained && (
// // // // // // // // //         <motion.div
// // // // // // // // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // // // // // // // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // // // // // // // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // // // // // // // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
// // // // // // // // //         >
// // // // // // // // //           <button
// // // // // // // // //             onClick={handleTrainModel}
// // // // // // // // //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // // // // //             aria-label="Train your predictive model"
// // // // // // // // //           >
// // // // // // // // //             Train Model
// // // // // // // // //           </button>

// // // // // // // // //           {/* Save Notebooks button */}
// // // // // // // // //           <button
// // // // // // // // //             onClick={handleSaveNotebooks}
// // // // // // // // //             disabled={savingNotebooks}
// // // // // // // // //             className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // // // // //             aria-label="Save Notebooks"
// // // // // // // // //           >
// // // // // // // // //             {savingNotebooks ? (
// // // // // // // // //               <>
// // // // // // // // //                 <FiLoader className="mr-2 animate-spin" />
// // // // // // // // //                 Saving...
// // // // // // // // //               </>
// // // // // // // // //             ) : (
// // // // // // // // //               'Save Notebooks'
// // // // // // // // //             )}
// // // // // // // // //           </button>
// // // // // // // // //         </motion.div>
// // // // // // // // //       )}

// // // // // // // // //       <div
// // // // // // // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // // // // // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // // // // // // //         }`}
// // // // // // // // //       >
// // // // // // // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
// // // // // // // // //           <div className="p-4">
// // // // // // // // //             <div className="w-full max-w-6xl mx-auto">
// // // // // // // // //               {renderContent()}
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default NotebookLayout;














// // // // // // // // // working


// // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // // // // // // // import Dashboard from '../Dashboard/Dashboard';
// // // // // // // // // import PredictionsUI from '../Predict/PredictNewData';
// // // // // // // // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // // // // // // // import { motion } from 'framer-motion';

// // // // // // // // // // If you have additional type definitions or interfaces, keep them:
// // // // // // // // // interface Metrics {
// // // // // // // // //   rmse: number;
// // // // // // // // //   r2_score: number;
// // // // // // // // //   mae: number;
// // // // // // // // // }

// // // // // // // // // interface ModelMetrics {
// // // // // // // // //   training: Metrics;
// // // // // // // // //   testing: Metrics;
// // // // // // // // //   assessment: string;
// // // // // // // // // }

// // // // // // // // // interface MetricsData {
// // // // // // // // //   model_metrics: ModelMetrics;
// // // // // // // // //   feature_importance: Record<string, number>;
// // // // // // // // //   predictions: {
// // // // // // // // //     actual: number[];
// // // // // // // // //     predicted: number[];
// // // // // // // // //   };
// // // // // // // // //   user_id: string;
// // // // // // // // //   chat_id: string;
// // // // // // // // // }

// // // // // // // // // // We no longer rely on a 'NotebookState' that includes "notebooks" JSON
// // // // // // // // // // because we will fetch them from the API. We'll keep the rest if needed.

// // // // // // // // // // 1) Import the ref interface from your forwardRef in SQLNotebook
// // // // // // // // // import type { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';

// // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // //   const { user_id = '', chat_id = '' } = useParams();
// // // // // // // // //   console.log('NotebookLayout: Component mounting');
// // // // // // // // //   const location = useLocation();
// // // // // // // // //   const navigate = useNavigate();

// // // // // // // // //   // We only expect user_id, chat_id, and isTrained from location.state.
// // // // // // // // //   const {
// // // // // // // // //     // user_id,
// // // // // // // // //     // chat_id,
// // // // // // // // //     isTrained = false,
// // // // // // // // //   } = (location.state as any) || {};

// // // // // // // // //   console.log('User ID:', user_id);
// // // // // // // // //   console.log('Chat ID:', chat_id);

// // // // // // // // //   // Local states
// // // // // // // // //   const [activeTab, setActiveTab] = useState('notebook');
// // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
// // // // // // // // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // // // // // // // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // // // // // // // //   const [modelTrained, setModelTrained] = useState(false);
// // // // // // // // //   const [polling, setPolling] = useState(false);
// // // // // // // // //   const [savingNotebooks, setSavingNotebooks] = useState(false);

// // // // // // // // //   // ---- NEW: We'll store the fetched notebook(s) from /api/notebooks
// // // // // // // // //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// // // // // // // // //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// // // // // // // // //   const [fetchError, setFetchError] = useState<string | null>(null);

// // // // // // // // //   // For demonstration, if your backend can return multiple notebooks,
// // // // // // // // //   // you can handle them however you want. We'll parse them below.
// // // // // // // // //   // We'll just assume if there's a time-based approach, it has a "time_based_notebook" key, etc.

// // // // // // // // //   // 2) A ref to call runAllCellsAndGetResults from the child
// // // // // // // // //   const notebookRef = useRef<SQLNotebookRef | null>(null);

// // // // // // // // //   // ------------------------------------------------------------------
// // // // // // // // //   // (A) Fetch the notebooks from the backend if user_id & chat_id exist
// // // // // // // // //   // ------------------------------------------------------------------
// // // // // // // // //   // useEffect(() => {
// // // // // // // // //   //   if (!user_id || !chat_id) return;

// // // // // // // // //   //   const fetchNotebooks = async () => {
// // // // // // // // //   //     setLoadingNotebook(true);
// // // // // // // // //   //     setFetchError(null);
// // // // // // // // //   //     try {
// // // // // // // // //   //       const res = await fetch(
// // // // // // // // //   //         `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // // // // // // // //   //       );
// // // // // // // // //   //       if (!res.ok) {
// // // // // // // // //   //         throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // // // // // // // //   //       }
// // // // // // // // //   //       const data = await res.json();
// // // // // // // // //   //       console.log('[DEBUG] /api/notebooks response:', data);

// // // // // // // // //   //       if (!data.notebooks || !data.notebooks.length) {
// // // // // // // // //   //         setFetchedNotebooks([]);
// // // // // // // // //   //         setFetchError('No notebooks found for this user/chat.');
// // // // // // // // //   //       } else {
// // // // // // // // //   //         setFetchedNotebooks(data.notebooks);
// // // // // // // // //   //       }
// // // // // // // // //   //     } catch (err: any) {
// // // // // // // // //   //       console.error('Error fetching notebooks:', err);
// // // // // // // // //   //       setFetchError(err.message);
// // // // // // // // //   //     } finally {
// // // // // // // // //   //       setLoadingNotebook(false);
// // // // // // // // //   //     }
// // // // // // // // //   //   };

// // // // // // // // //   //   fetchNotebooks();
// // // // // // // // //   // }, [user_id, chat_id]);


// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!user_id || !chat_id) return;
  
// // // // // // // // //     const fetchNotebooks = async () => {
// // // // // // // // //       setLoadingNotebook(true);
// // // // // // // // //       setFetchError(null);
// // // // // // // // //       try {
// // // // // // // // //         const res = await fetch(
// // // // // // // // //           `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // // // // // // // //         );
// // // // // // // // //         if (!res.ok) {
// // // // // // // // //           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // // // // // // // //         }
// // // // // // // // //         const data = await res.json();
// // // // // // // // //         console.log('[DEBUG] /api/notebooks response:', data);
  
// // // // // // // // //         if (!data.notebooks || !data.notebooks.length) {
// // // // // // // // //           setFetchedNotebooks([]);
// // // // // // // // //           setFetchError('No notebooks found for this user/chat.');
// // // // // // // // //         } else {
// // // // // // // // //           setFetchedNotebooks(data.notebooks);
  
// // // // // // // // //           // Trigger cell execution after fetching notebooks
// // // // // // // // //           if (notebookRef.current) {
// // // // // // // // //             console.log('Executing all cells...');
// // // // // // // // //             const cellResults = await notebookRef.current.runAllCellsAndGetResults();
// // // // // // // // //             console.log('Cell execution results:', cellResults);
// // // // // // // // //           } else {
// // // // // // // // //             console.warn('Notebook reference not found; skipping cell execution.');
// // // // // // // // //           }
// // // // // // // // //         }
// // // // // // // // //       } catch (err: any) {
// // // // // // // // //         console.error('Error fetching notebooks:', err);
// // // // // // // // //         setFetchError(err.message);
// // // // // // // // //       } finally {
// // // // // // // // //         setLoadingNotebook(false);
// // // // // // // // //       }
// // // // // // // // //     };
  
// // // // // // // // //     fetchNotebooks();
// // // // // // // // //   }, [user_id, chat_id]);
  

// // // // // // // // //   // ------------------------------------------------------------------
// // // // // // // // //   // (B) Extract the relevant fields from the fetched notebooks
// // // // // // // // //   //     So we can keep the same logic as before: timeBasedNotebookCells, etc.
// // // // // // // // //   // ------------------------------------------------------------------

// // // // // // // // //   // For a time-based approach, your code originally expected:
// // // // // // // // //   //   notebooks.time_based_notebook, notebooks.entity_target_notebook, ...
// // // // // // // // //   // But now we have an array of notebooks from the DB. We'll parse them:
// // // // // // // // //   let timeBasedNotebookCells: any[] = [];
// // // // // // // // //   let entityTargetNotebookCells: any[] = [];
// // // // // // // // //   let featuresNotebookCells: any[] = [];

// // // // // // // // //   // Also get file_url, entity_column, target_column, features, etc.
// // // // // // // // //   // We'll just pick from the first fetched notebook if it exists.
// // // // // // // // //   let file_url = '';
// // // // // // // // //   let entity_column = '';
// // // // // // // // //   let target_column = '';
// // // // // // // // //   let features: string[] = [];

// // // // // // // // //   if (fetchedNotebooks && fetchedNotebooks.length > 0) {
// // // // // // // // //     // For demonstration, let's assume the first item might be time-based:
// // // // // // // // //     const nb0 = fetchedNotebooks[0];

// // // // // // // // //     // Common fields:
// // // // // // // // //     file_url = nb0.file_url;
// // // // // // // // //     entity_column = nb0.entity_column;
// // // // // // // // //     target_column = nb0.target_column;
// // // // // // // // //     features = nb0.features || [];

// // // // // // // // //     // We check if nb0 might be a "time-based" approach if it has time_column
// // // // // // // // //     // or we see if the backend has separate notebooks for entity-target, features, etc.
// // // // // // // // //     // If your backend returns separate records, you can parse them individually.
// // // // // // // // //     // For example:
// // // // // // // // //     fetchedNotebooks.forEach((nb) => {
// // // // // // // // //       try {
// // // // // // // // //         if (!nb.notebook_json) return;
// // // // // // // // //         const parsed = JSON.parse(nb.notebook_json);
// // // // // // // // //         const cells = parsed?.cells || [];

// // // // // // // // //         // We'll guess which notebook is which based on time_column presence
// // // // // // // // //         if (nb.time_column) {
// // // // // // // // //           timeBasedNotebookCells = cells;
// // // // // // // // //         } else if (
// // // // // // // // //           nb.entity_column &&
// // // // // // // // //           nb.target_column &&
// // // // // // // // //           !nb.time_column &&
// // // // // // // // //           !timeBasedNotebookCells.length
// // // // // // // // //         ) {
// // // // // // // // //           // We might treat the first one as entity-target
// // // // // // // // //           entityTargetNotebookCells = cells;
// // // // // // // // //         } else {
// // // // // // // // //           // If there's a third one, assume it's features
// // // // // // // // //           featuresNotebookCells = cells;
// // // // // // // // //         }
// // // // // // // // //       } catch (err) {
// // // // // // // // //         console.error('Error parsing notebook JSON:', err);
// // // // // // // // //       }
// // // // // // // // //     });
// // // // // // // // //   }

// // // // // // // // //   // ------------------------------------------------------------------
// // // // // // // // //   // (C) Polling / Model training logic (unchanged)
// // // // // // // // //   // ------------------------------------------------------------------
// // // // // // // // //   const fetchModelResults = async () => {
// // // // // // // // //     try {
// // // // // // // // //       console.log('Fetching model results...');
// // // // // // // // //       const url = ` http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // // // // // // // //       const response = await fetch(url);
// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         if (response.status === 404) {
// // // // // // // // //           console.log('Model results not found yet. Retrying...');
// // // // // // // // //           return null; // No results yet, keep polling
// // // // // // // // //         } else {
// // // // // // // // //           throw new Error(
// // // // // // // // //             `Failed to fetch model results. Status: ${response.status}`
// // // // // // // // //           );
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //       const result = await response.json();
// // // // // // // // //       setDashboardData(result);
// // // // // // // // //       console.log('Model results fetched:', result);
// // // // // // // // //       setModelTrained(true);
// // // // // // // // //       return result;
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error fetching model results:', error);
// // // // // // // // //       return null;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const pollModelResults = async () => {
// // // // // // // // //     setPolling(true);
// // // // // // // // //     const interval = setInterval(async () => {
// // // // // // // // //       const result = await fetchModelResults();
// // // // // // // // //       if (result) {
// // // // // // // // //         clearInterval(interval);
// // // // // // // // //         setPolling(false);
// // // // // // // // //       }
// // // // // // // // //     }, 90000); // poll every 90 seconds
// // // // // // // // //   };

// // // // // // // // //   const handleTrainModel = async () => {
// // // // // // // // //     console.log('NotebookLayout: Training model with:', {
// // // // // // // // //       file_url,
// // // // // // // // //       target_column,
// // // // // // // // //       user_id,
// // // // // // // // //       chat_id,
// // // // // // // // //       features,
// // // // // // // // //       entity_column,
// // // // // // // // //     });

// // // // // // // // //     navigate('/training', {
// // // // // // // // //       state: {
// // // // // // // // //         file_url,
// // // // // // // // //         target_column,
// // // // // // // // //         user_id,
// // // // // // // // //         chat_id,
// // // // // // // // //         features,
// // // // // // // // //         entity_column,
// // // // // // // // //         // We are not storing full notebook JSON anymore
// // // // // // // // //         // but if your training page needs them, handle accordingly
// // // // // // // // //       },
// // // // // // // // //     });

// // // // // // // // //     // Wait 5 minutes before polling
// // // // // // // // //     setTimeout(() => {
// // // // // // // // //       console.log('Starting polling after 5 minutes...');
// // // // // // // // //       pollModelResults();
// // // // // // // // //     }, 300000); // 5 minutes
// // // // // // // // //   };

// // // // // // // // //   // 3) Our new Save Notebooks function
// // // // // // // // //   const handleSaveNotebooks = async () => {
// // // // // // // // //     if (!user_id || !chat_id) {
// // // // // // // // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // // // // // // // //       return;
// // // // // // // // //     }
// // // // // // // // //     if (!notebookRef.current) {
// // // // // // // // //       alert('Notebook reference not found.');
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setSavingNotebooks(true);
// // // // // // // // //     try {
// // // // // // // // //       // 3a) Instruct the child to run all cells, collecting results
// // // // // // // // //       const cellResults = await notebookRef.current.runAllCellsAndGetResults();
// // // // // // // // //       // 3b) POST them to /api/save-notebooks
// // // // // // // // //       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: {
// // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // //           // Use your own auth token if needed
// // // // // // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // // // // // // //         },
// // // // // // // // //         body: JSON.stringify({
// // // // // // // // //           user_id,
// // // // // // // // //           chat_id,
// // // // // // // // //           cells: cellResults, // array of { cellId, query, columns, rows }
// // // // // // // // //         }),
// // // // // // // // //       });

// // // // // // // // //       if (!resp.ok) {
// // // // // // // // //         const errData = await resp.json().catch(() => ({}));
// // // // // // // // //         throw new Error(errData.error || 'Failed to save notebooks.');
// // // // // // // // //       }
// // // // // // // // //       const data = await resp.json();
// // // // // // // // //       console.log('Save notebooks success:', data);
// // // // // // // // //       alert('Notebooks saved successfully!');
// // // // // // // // //     } catch (err: any) {
// // // // // // // // //       console.error('Error saving notebooks:', err);
// // // // // // // // //       alert(`Error saving notebooks: ${err.message}`);
// // // // // // // // //     } finally {
// // // // // // // // //       setSavingNotebooks(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // handleTabChange for the Nav
// // // // // // // // //   const handleTabChange = (tabId: string) => {
// // // // // // // // //     setActiveTab(tabId);
// // // // // // // // //   };

// // // // // // // // //   // 4) We set up the Nav config
// // // // // // // // //   const navbarNotebooks = [
// // // // // // // // //     {
// // // // // // // // //       id: 'notebook',
// // // // // // // // //       title: 'Notebook',
// // // // // // // // //       icon: <FiBook size={18} />,
// // // // // // // // //       onClick: () => handleTabChange('notebook'),
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       id: 'dashboard',
// // // // // // // // //       title: 'Dashboard',
// // // // // // // // //       icon: <FiBarChart2 size={18} />,
// // // // // // // // //       onClick: () => handleTabChange('dashboard'),
// // // // // // // // //     },
// // // // // // // // //     {
// // // // // // // // //       id: 'predict',
// // // // // // // // //       title: 'Predict',
// // // // // // // // //       icon: <FiFlag size={18} />,
// // // // // // // // //       onClick: () => handleTabChange('predict'),
// // // // // // // // //     },
// // // // // // // // //   ];

// // // // // // // // //   // ------------------------------------------------------------------
// // // // // // // // //   // (D) Render content logic (unchanged except for loading/fetchError check)
// // // // // // // // //   // ------------------------------------------------------------------
// // // // // // // // //   const renderContent = () => {
// // // // // // // // //     if (loadingNotebook) {
// // // // // // // // //       return <div className="p-4">Loading notebook data...</div>;
// // // // // // // // //     }
// // // // // // // // //     if (fetchError) {
// // // // // // // // //       return <div className="p-4 text-red-600">Error: {fetchError}</div>;
// // // // // // // // //     }

// // // // // // // // //     switch (activeTab) {
// // // // // // // // //       case 'notebook':
// // // // // // // // //         // If timeBasedNotebookCells exist, we show them
// // // // // // // // //         if (timeBasedNotebookCells.length > 0) {
// // // // // // // // //           return (
// // // // // // // // //             <div className="space-y-8">
// // // // // // // // //               <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
// // // // // // // // //               {/* Attach the ref to this notebook so we can runAllCellsAndGetResults */}
// // // // // // // // //               <SQLNotebook
// // // // // // // // //                 ref={notebookRef}
// // // // // // // // //                 activeTab="time_based_notebook"
// // // // // // // // //                 notebookContent={{
// // // // // // // // //                   file_url,
// // // // // // // // //                   entity_column,
// // // // // // // // //                   target_column,
// // // // // // // // //                   features,
// // // // // // // // //                   user_id,
// // // // // // // // //                   chat_id,
// // // // // // // // //                   isTrained,
// // // // // // // // //                   handleTrainModel,
// // // // // // // // //                   cells: timeBasedNotebookCells,
// // // // // // // // //                 }}
// // // // // // // // //               />
// // // // // // // // //             </div>
// // // // // // // // //           );
// // // // // // // // //         } else {
// // // // // // // // //           // Otherwise, show the two standard notebooks (entity-target & features)
// // // // // // // // //           return (
// // // // // // // // //             <div className="space-y-8">
// // // // // // // // //               <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // // // //               <SQLNotebook
// // // // // // // // //                 ref={notebookRef}
// // // // // // // // //                 activeTab="entity_target_notebook"
// // // // // // // // //                 notebookContent={{
// // // // // // // // //                   file_url,
// // // // // // // // //                   entity_column,
// // // // // // // // //                   target_column,
// // // // // // // // //                   features,
// // // // // // // // //                   user_id,
// // // // // // // // //                   chat_id,
// // // // // // // // //                   isTrained,
// // // // // // // // //                   handleTrainModel,
// // // // // // // // //                   cells: entityTargetNotebookCells,
// // // // // // // // //                 }}
// // // // // // // // //               />
// // // // // // // // //               <SQLNotebook
// // // // // // // // //                 activeTab="features_notebook"
// // // // // // // // //                 notebookContent={{
// // // // // // // // //                   file_url,
// // // // // // // // //                   entity_column,
// // // // // // // // //                   target_column,
// // // // // // // // //                   features,
// // // // // // // // //                   user_id,
// // // // // // // // //                   chat_id,
// // // // // // // // //                   isTrained,
// // // // // // // // //                   handleTrainModel,
// // // // // // // // //                   cells: featuresNotebookCells,
// // // // // // // // //                 }}
// // // // // // // // //               />
// // // // // // // // //             </div>
// // // // // // // // //           );
// // // // // // // // //         }

// // // // // // // // //       case 'dashboard':
// // // // // // // // //         if (!isTrained) {
// // // // // // // // //           return (
// // // // // // // // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // // // // // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // // // // // //                 <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // // // //                 <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // //                   Please train your model first to view the dashboard metrics.
// // // // // // // // //                 </p>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           );
// // // // // // // // //         }
// // // // // // // // //         return loadingDashboard ? (
// // // // // // // // //           <div>Loading Dashboard...</div>
// // // // // // // // //         ) : (
// // // // // // // // //           <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // // // // // // // //         );

// // // // // // // // //       case 'predict':
// // // // // // // // //         if (!isTrained) {
// // // // // // // // //           return (
// // // // // // // // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // // // // // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // // // // // //                 <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // // // //                 <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// // // // // // // // //                 <p className="text-gray-600">
// // // // // // // // //                   Please train your model first to make predictions.
// // // // // // // // //                 </p>
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           );
// // // // // // // // //         }
// // // // // // // // //         return <PredictionsUI />;

// // // // // // // // //       default:
// // // // // // // // //         return null;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ------------------------------------------------------------------
// // // // // // // // //   // (E) Return the same JSX
// // // // // // // // //   // ------------------------------------------------------------------
// // // // // // // // //   return (
// // // // // // // // //     <div className="relative h-screen overflow-hidden">
// // // // // // // // //       <div className="fixed top-0 left-0 right-0 z-50">
// // // // // // // // //         <Navbar
// // // // // // // // //           isSidebarOpen={isSidebarOpen}
// // // // // // // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // //           notebooks={navbarNotebooks}
// // // // // // // // //           activeTab={activeTab}
// // // // // // // // //         />
// // // // // // // // //       </div>

// // // // // // // // //       <div
// // // // // // // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // // // // // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // // // // // // //         }`}
// // // // // // // // //         style={{ width: '16rem' }}
// // // // // // // // //       >
// // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // // //       </div>

// // // // // // // // //       {/* Both "Train Model" and "Save Notebooks" buttons if not isTrained */}
// // // // // // // // //       {!isTrained && (
// // // // // // // // //         <motion.div
// // // // // // // // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // // // // // // // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // // // // // // // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // // // // // // // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
// // // // // // // // //         >
// // // // // // // // //           <button
// // // // // // // // //             onClick={handleTrainModel}
// // // // // // // // //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // // // // //             aria-label="Train your predictive model"
// // // // // // // // //           >
// // // // // // // // //             Train Model
// // // // // // // // //           </button>

// // // // // // // // //           {/* Save Notebooks button */}
// // // // // // // // //           <button
// // // // // // // // //             onClick={handleSaveNotebooks}
// // // // // // // // //             disabled={savingNotebooks}
// // // // // // // // //             className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // // // // //             aria-label="Save Notebooks"
// // // // // // // // //           >
// // // // // // // // //             {savingNotebooks ? (
// // // // // // // // //               <>
// // // // // // // // //                 <FiLoader className="mr-2 animate-spin" />
// // // // // // // // //                 Saving...
// // // // // // // // //               </>
// // // // // // // // //             ) : (
// // // // // // // // //               'Save Notebooks'
// // // // // // // // //             )}
// // // // // // // // //           </button>
// // // // // // // // //         </motion.div>
// // // // // // // // //       )}

// // // // // // // // //       <div
// // // // // // // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // // // // // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // // // // // // //         }`}
// // // // // // // // //       >
// // // // // // // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
// // // // // // // // //           <div className="p-4">
// // // // // // // // //             <div className="w-full max-w-6xl mx-auto">{renderContent()}</div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default NotebookLayout;











// // // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // // // // // // // // import Dashboard from '../Dashboard/Dashboard';
// // // // // // // // // import PredictionsUI from '../Predict/PredictNewData';
// // // // // // // // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // // // // // // // import { motion } from 'framer-motion';

// // // // // // // // // // Types for model results, etc.
// // // // // // // // // interface Metrics {
// // // // // // // // //   rmse: number;
// // // // // // // // //   r2_score: number;
// // // // // // // // //   mae: number;
// // // // // // // // // }

// // // // // // // // // interface ModelMetrics {
// // // // // // // // //   training: Metrics;
// // // // // // // // //   testing: Metrics;
// // // // // // // // //   assessment: string;
// // // // // // // // // }

// // // // // // // // // interface MetricsData {
// // // // // // // // //   model_metrics: ModelMetrics;
// // // // // // // // //   feature_importance: Record<string, number>;
// // // // // // // // //   predictions: {
// // // // // // // // //     actual: number[];
// // // // // // // // //     predicted: number[];
// // // // // // // // //   };
// // // // // // // // //   user_id: string;
// // // // // // // // //   chat_id: string;
// // // // // // // // // }

// // // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // // //   // If you need user_id/chat_id from route params:
// // // // // // // // //   const { user_id = '', chat_id = '' } = useParams();
// // // // // // // // //   const location = useLocation();
// // // // // // // // //   const navigate = useNavigate();

// // // // // // // // //   // If also from location.state, combine as needed:
// // // // // // // // //   const { isTrained = false } = (location.state as any) || {};

// // // // // // // // //   // Basic local states
// // // // // // // // //   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// // // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // // // // // // // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // // // // // // // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // // // // // // // //   const [modelTrained, setModelTrained] = useState(false);
// // // // // // // // //   const [polling, setPolling] = useState(false);
// // // // // // // // //   const [savingNotebooks, setSavingNotebooks] = useState(false);

// // // // // // // // //   // Notebook data from /api/notebooks
// // // // // // // // //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// // // // // // // // //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// // // // // // // // //   const [fetchError, setFetchError] = useState<string | null>(null);

// // // // // // // // //   // Refs for each notebook (if you want to run or save them individually)
// // // // // // // // //   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
// // // // // // // // //   const entityNotebookRef = useRef<SQLNotebookRef | null>(null);
// // // // // // // // //   const featuresNotebookRef = useRef<SQLNotebookRef | null>(null);

// // // // // // // // //   // ------------------------------------------
// // // // // // // // //   // A) Fetch notebooks from the backend
// // // // // // // // //   // ------------------------------------------
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     if (!user_id || !chat_id) return;

// // // // // // // // //     const fetchNotebooks = async () => {
// // // // // // // // //       setLoadingNotebook(true);
// // // // // // // // //       setFetchError(null);
// // // // // // // // //       try {
// // // // // // // // //         const res = await fetch(
// // // // // // // // //           `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // // // // // // // //         );
// // // // // // // // //         if (!res.ok) {
// // // // // // // // //           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // // // // // // // //         }
// // // // // // // // //         const data = await res.json();
// // // // // // // // //         if (!data.notebooks || !data.notebooks.length) {
// // // // // // // // //           setFetchedNotebooks([]);
// // // // // // // // //           setFetchError('No notebooks found for this user/chat.');
// // // // // // // // //         } else {
// // // // // // // // //           setFetchedNotebooks(data.notebooks);
// // // // // // // // //         }
// // // // // // // // //       } catch (err: any) {
// // // // // // // // //         console.error('Error fetching notebooks:', err);
// // // // // // // // //         setFetchError(err.message);
// // // // // // // // //       } finally {
// // // // // // // // //         setLoadingNotebook(false);
// // // // // // // // //       }
// // // // // // // // //     };

// // // // // // // // //     fetchNotebooks();
// // // // // // // // //   }, [user_id, chat_id]);

// // // // // // // // //   // ------------------------------------------
// // // // // // // // //   // B) Parse notebooks => time/entity/features
// // // // // // // // //   // ------------------------------------------
// // // // // // // // //   let timeBasedNotebookCells: any[] = [];
// // // // // // // // //   let entityTargetNotebookCells: any[] = [];
// // // // // // // // //   let featuresNotebookCells: any[] = [];

// // // // // // // // //   let file_url = '';
// // // // // // // // //   let entity_column = '';
// // // // // // // // //   let target_column = '';
// // // // // // // // //   let features: string[] = [];

// // // // // // // // //   if (fetchedNotebooks.length > 0) {
// // // // // // // // //     // We'll take the first notebook's metadata as common fields
// // // // // // // // //     const nb0 = fetchedNotebooks[0];
// // // // // // // // //     file_url = nb0.file_url;
// // // // // // // // //     entity_column = nb0.entity_column;
// // // // // // // // //     target_column = nb0.target_column;
// // // // // // // // //     features = nb0.features || [];

// // // // // // // // //     fetchedNotebooks.forEach((nb) => {
// // // // // // // // //       if (!nb.notebook_json) return;
// // // // // // // // //       try {
// // // // // // // // //         const parsed = JSON.parse(nb.notebook_json);
// // // // // // // // //         const cells = parsed?.cells || [];
// // // // // // // // //         if (nb.time_column) {
// // // // // // // // //           timeBasedNotebookCells = cells;
// // // // // // // // //         } else if (nb.entity_column && nb.target_column && !timeBasedNotebookCells.length) {
// // // // // // // // //           entityTargetNotebookCells = cells;
// // // // // // // // //         } else {
// // // // // // // // //           featuresNotebookCells = cells;
// // // // // // // // //         }
// // // // // // // // //       } catch (err) {
// // // // // // // // //         console.error('Error parsing notebook JSON:', err);
// // // // // // // // //       }
// // // // // // // // //     });
// // // // // // // // //   }

// // // // // // // // //   // ------------------------------------------
// // // // // // // // //   // C) Polling / model training logic
// // // // // // // // //   // ------------------------------------------
// // // // // // // // //   const fetchModelResults = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const url = ` http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // // // // // // // //       const response = await fetch(url);
// // // // // // // // //       if (!response.ok) {
// // // // // // // // //         if (response.status === 404) {
// // // // // // // // //           console.log('Model results not found yet. Retrying...');
// // // // // // // // //           return null;
// // // // // // // // //         } else {
// // // // // // // // //           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
// // // // // // // // //         }
// // // // // // // // //       }
// // // // // // // // //       const result = await response.json();
// // // // // // // // //       setDashboardData(result);
// // // // // // // // //       setModelTrained(true);
// // // // // // // // //       return result;
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error('Error fetching model results:', error);
// // // // // // // // //       return null;
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const pollModelResults = async () => {
// // // // // // // // //     setPolling(true);
// // // // // // // // //     const interval = setInterval(async () => {
// // // // // // // // //       const result = await fetchModelResults();
// // // // // // // // //       if (result) {
// // // // // // // // //         clearInterval(interval);
// // // // // // // // //         setPolling(false);
// // // // // // // // //       }
// // // // // // // // //     }, 90000);
// // // // // // // // //   };

// // // // // // // // //   const handleTrainModel = async () => {
// // // // // // // // //     navigate('/training', {
// // // // // // // // //       state: {
// // // // // // // // //         user_id,
// // // // // // // // //         chat_id,
// // // // // // // // //         file_url,
// // // // // // // // //         entity_column,
// // // // // // // // //         target_column,
// // // // // // // // //         features,
// // // // // // // // //       },
// // // // // // // // //     });
// // // // // // // // //     setTimeout(() => {
// // // // // // // // //       pollModelResults();
// // // // // // // // //     }, 300000);
// // // // // // // // //   };

// // // // // // // // //   // ------------------------------------------
// // // // // // // // //   // D) Save Notebooks => runAllCells
// // // // // // // // //   // ------------------------------------------
// // // // // // // // //   const handleSaveNotebooks = async () => {
// // // // // // // // //     if (!user_id || !chat_id) {
// // // // // // // // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // // // // // // // //       return;
// // // // // // // // //     }
// // // // // // // // //     // For simplicity, run time-based cells if present, else entity
// // // // // // // // //     const activeNotebookRef = timeBasedNotebookCells.length
// // // // // // // // //       ? timeNotebookRef
// // // // // // // // //       : entityNotebookRef;

// // // // // // // // //     if (!activeNotebookRef.current) {
// // // // // // // // //       alert('No notebook to save. Notebook reference not found.');
// // // // // // // // //       return;
// // // // // // // // //     }
// // // // // // // // //     setSavingNotebooks(true);
// // // // // // // // //     try {
// // // // // // // // //       const cellResults = await activeNotebookRef.current.runAllCellsAndGetResults();
// // // // // // // // //       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// // // // // // // // //         method: 'POST',
// // // // // // // // //         headers: {
// // // // // // // // //           'Content-Type': 'application/json',
// // // // // // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // // // // // // //         },
// // // // // // // // //         body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
// // // // // // // // //       });

// // // // // // // // //       if (!resp.ok) {
// // // // // // // // //         const errData = await resp.json().catch(() => ({}));
// // // // // // // // //         throw new Error(errData.error || 'Failed to save notebooks.');
// // // // // // // // //       }
// // // // // // // // //       alert('Notebooks saved successfully!');
// // // // // // // // //     } catch (err: any) {
// // // // // // // // //       console.error('Error saving notebooks:', err);
// // // // // // // // //       alert(`Error saving notebooks: ${err.message}`);
// // // // // // // // //     } finally {
// // // // // // // // //       setSavingNotebooks(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // ------------------------------------------
// // // // // // // // //   // E) Show/hide tabs without unmounting
// // // // // // // // //   // ------------------------------------------
// // // // // // // // //   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
// // // // // // // // //     setActiveTab(tabId);
// // // // // // // // //   };

// // // // // // // // //   // *Time-based Notebook*
// // // // // // // // //   const timeNotebook = timeBasedNotebookCells.length > 0 && (
// // // // // // // // //     <div className="space-y-8">
// // // // // // // // //       <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
// // // // // // // // //       <SQLNotebook
// // // // // // // // //         ref={timeNotebookRef}
// // // // // // // // //         activeTab="time_based_notebook"
// // // // // // // // //         notebookContent={{
// // // // // // // // //           file_url,
// // // // // // // // //           entity_column,
// // // // // // // // //           target_column,
// // // // // // // // //           features,
// // // // // // // // //           user_id,
// // // // // // // // //           chat_id,
// // // // // // // // //           isTrained,
// // // // // // // // //           handleTrainModel,
// // // // // // // // //           cells: timeBasedNotebookCells,
// // // // // // // // //         }}
// // // // // // // // //       />
// // // // // // // // //     </div>
// // // // // // // // //   );

// // // // // // // // //   // *Entity + Features Notebook*
// // // // // // // // //   const entityAndFeaturesNotebooks = (
// // // // // // // // //     <div className="space-y-8">
// // // // // // // // //       <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // // // //       <SQLNotebook
// // // // // // // // //         ref={entityNotebookRef}
// // // // // // // // //         activeTab="entity_target_notebook"
// // // // // // // // //         notebookContent={{
// // // // // // // // //           file_url,
// // // // // // // // //           entity_column,
// // // // // // // // //           target_column,
// // // // // // // // //           features,
// // // // // // // // //           user_id,
// // // // // // // // //           chat_id,
// // // // // // // // //           isTrained,
// // // // // // // // //           handleTrainModel,
// // // // // // // // //           cells: entityTargetNotebookCells,
// // // // // // // // //         }}
// // // // // // // // //       />
// // // // // // // // //       <SQLNotebook
// // // // // // // // //         ref={featuresNotebookRef}
// // // // // // // // //         activeTab="features_notebook"
// // // // // // // // //         notebookContent={{
// // // // // // // // //           file_url,
// // // // // // // // //           entity_column,
// // // // // // // // //           target_column,
// // // // // // // // //           features,
// // // // // // // // //           user_id,
// // // // // // // // //           chat_id,
// // // // // // // // //           isTrained,
// // // // // // // // //           handleTrainModel,
// // // // // // // // //           cells: featuresNotebookCells,
// // // // // // // // //         }}
// // // // // // // // //       />
// // // // // // // // //     </div>
// // // // // // // // //   );

// // // // // // // // //   return (
// // // // // // // // //     <div className="relative h-screen overflow-hidden">
// // // // // // // // //       {/* Top Navbar */}
// // // // // // // // //       <div className="fixed top-0 left-0 right-0 z-50">
// // // // // // // // //         <Navbar
// // // // // // // // //           isSidebarOpen={isSidebarOpen}
// // // // // // // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // // //           notebooks={[
// // // // // // // // //             {
// // // // // // // // //               id: 'notebook',
// // // // // // // // //               title: 'Notebook',
// // // // // // // // //               icon: <FiBook size={18} />,
// // // // // // // // //               onClick: () => handleTabChange('notebook'),
// // // // // // // // //             },
// // // // // // // // //             {
// // // // // // // // //               id: 'dashboard',
// // // // // // // // //               title: 'Dashboard',
// // // // // // // // //               icon: <FiBarChart2 size={18} />,
// // // // // // // // //               onClick: () => handleTabChange('dashboard'),
// // // // // // // // //             },
// // // // // // // // //             {
// // // // // // // // //               id: 'predict',
// // // // // // // // //               title: 'Predict',
// // // // // // // // //               icon: <FiFlag size={18} />,
// // // // // // // // //               onClick: () => handleTabChange('predict'),
// // // // // // // // //             },
// // // // // // // // //           ]}
// // // // // // // // //           activeTab={activeTab}
// // // // // // // // //         />
// // // // // // // // //       </div>

// // // // // // // // //       {/* Left Sidebar */}
// // // // // // // // //       <div
// // // // // // // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // // // // // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // // // // // // //         }`}
// // // // // // // // //         style={{ width: '16rem' }}
// // // // // // // // //       >
// // // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // // //       </div>

// // // // // // // // //       {/* Train & Save if not isTrained */}
// // // // // // // // //       {!isTrained && (
// // // // // // // // //         <motion.div
// // // // // // // // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // // // // // // // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // // // // // // // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // // // // // // // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
// // // // // // // // //         >
// // // // // // // // //           <button
// // // // // // // // //             onClick={handleTrainModel}
// // // // // // // // //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // // // // //             aria-label="Train your predictive model"
// // // // // // // // //           >
// // // // // // // // //             Train Model
// // // // // // // // //           </button>

// // // // // // // // //           <button
// // // // // // // // //             onClick={handleSaveNotebooks}
// // // // // // // // //             disabled={savingNotebooks}
// // // // // // // // //             className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // // // // //             aria-label="Save Notebooks"
// // // // // // // // //           >
// // // // // // // // //             {savingNotebooks ? (
// // // // // // // // //               <>
// // // // // // // // //                 <FiLoader className="mr-2 animate-spin" />
// // // // // // // // //                 Saving...
// // // // // // // // //               </>
// // // // // // // // //             ) : (
// // // // // // // // //               'Save Notebooks'
// // // // // // // // //             )}
// // // // // // // // //           </button>
// // // // // // // // //         </motion.div>
// // // // // // // // //       )}

// // // // // // // // //       {/* Main Content Area (Notebook / Dashboard / Predict) */}
// // // // // // // // //       <div
// // // // // // // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // // // // // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // // // // // // //         }`}
// // // // // // // // //       >
// // // // // // // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto p-4">
// // // // // // // // //           <div className="w-full max-w-6xl mx-auto">
// // // // // // // // //             {/* Notebook Tab (always mounted, hidden with display) */}
// // // // // // // // //             <div style={{ display: activeTab === 'notebook' ? 'block' : 'none' }}>
// // // // // // // // //               {loadingNotebook ? (
// // // // // // // // //                 <div className="p-4">Loading notebook data...</div>
// // // // // // // // //               ) : fetchError ? (
// // // // // // // // //                 <div className="p-4 text-red-600">Error: {fetchError}</div>
// // // // // // // // //               ) : (
// // // // // // // // //                 <>
// // // // // // // // //                   {timeBasedNotebookCells.length > 0 ? timeNotebook : entityAndFeaturesNotebooks}
// // // // // // // // //                 </>
// // // // // // // // //               )}
// // // // // // // // //             </div>

// // // // // // // // //             {/* Dashboard Tab (always mounted) */}
// // // // // // // // //             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
// // // // // // // // //               {!isTrained ? (
// // // // // // // // //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // // // // // //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // // // // // //                     <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // // // //                     <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// // // // // // // // //                     <p className="text-gray-600">
// // // // // // // // //                       Please train your model first to view the dashboard metrics.
// // // // // // // // //                     </p>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               ) : loadingDashboard ? (
// // // // // // // // //                 <div>Loading Dashboard...</div>
// // // // // // // // //               ) : (
// // // // // // // // //                 <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // // // // // // // //               )}
// // // // // // // // //             </div>

// // // // // // // // //             {/* Predict Tab (always mounted) */}
// // // // // // // // //             <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
// // // // // // // // //               {!isTrained ? (
// // // // // // // // //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // // // // // //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // // // // // //                     <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // // // //                     <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// // // // // // // // //                     <p className="text-gray-600">
// // // // // // // // //                       Please train your model first to make predictions.
// // // // // // // // //                     </p>
// // // // // // // // //                   </div>
// // // // // // // // //                 </div>
// // // // // // // // //               ) : (
// // // // // // // // //                 <PredictionsUI />
// // // // // // // // //               )}
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default NotebookLayout;











// // // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // // // // // // // import Dashboard from '../Dashboard/Dashboard';
// // // // // // // // import PredictionsUI from '../Predict/PredictNewData';
// // // // // // // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // // // // // // import { motion } from 'framer-motion';

// // // // // // // // // Types for model results, etc.
// // // // // // // // interface Metrics {
// // // // // // // //   rmse: number;
// // // // // // // //   r2_score: number;
// // // // // // // //   mae: number;
// // // // // // // // }

// // // // // // // // interface ModelMetrics {
// // // // // // // //   training: Metrics;
// // // // // // // //   testing: Metrics;
// // // // // // // //   assessment: string;
// // // // // // // // }

// // // // // // // // interface MetricsData {
// // // // // // // //   model_metrics: ModelMetrics;
// // // // // // // //   feature_importance: Record<string, number>;
// // // // // // // //   predictions: {
// // // // // // // //     actual: number[];
// // // // // // // //     predicted: number[];
// // // // // // // //   };
// // // // // // // //   user_id: string;
// // // // // // // //   chat_id: string;
// // // // // // // // }

// // // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // // //   // We read user_id, chat_id from the route params
// // // // // // // //   const { user_id = '', chat_id = '' } = useParams();
// // // // // // // //   const location = useLocation();
// // // // // // // //   const navigate = useNavigate();

// // // // // // // //   // If also from location.state, combine as needed:
// // // // // // // //   const { isTrained = false } = (location.state as any) || {};

// // // // // // // //   // Local states
// // // // // // // //   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// // // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // // // // // // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // // // // // // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // // // // // // //   const [modelTrained, setModelTrained] = useState(false);
// // // // // // // //   const [polling, setPolling] = useState(false);
// // // // // // // //   const [savingNotebooks, setSavingNotebooks] = useState(false);

// // // // // // // //   // Notebook data from /api/notebooks
// // // // // // // //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// // // // // // // //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// // // // // // // //   const [fetchError, setFetchError] = useState<string | null>(null);

// // // // // // // //   // Refs for each notebook so we can run them
// // // // // // // //   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
// // // // // // // //   const entityNotebookRef = useRef<SQLNotebookRef | null>(null);
// // // // // // // //   const featuresNotebookRef = useRef<SQLNotebookRef | null>(null);

// // // // // // // //   // A ref so we only auto-run once
// // // // // // // //   const autoRunDoneRef = useRef(false);

// // // // // // // //   // ------------------------------------------
// // // // // // // //   // A) Fetch notebooks from the backend
// // // // // // // //   // ------------------------------------------
// // // // // // // //   useEffect(() => {
// // // // // // // //     if (!user_id || !chat_id) return;

// // // // // // // //     const fetchNotebooks = async () => {
// // // // // // // //       setLoadingNotebook(true);
// // // // // // // //       setFetchError(null);
// // // // // // // //       try {
// // // // // // // //         const res = await fetch(
// // // // // // // //           `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // // // // // // //         );
// // // // // // // //         if (!res.ok) {
// // // // // // // //           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // // // // // // //         }
// // // // // // // //         const data = await res.json();
// // // // // // // //         if (!data.notebooks || !data.notebooks.length) {
// // // // // // // //           setFetchedNotebooks([]);
// // // // // // // //           setFetchError('No notebooks found for this user/chat.');
// // // // // // // //         } else {
// // // // // // // //           setFetchedNotebooks(data.notebooks);
// // // // // // // //         }
// // // // // // // //       } catch (err: any) {
// // // // // // // //         console.error('Error fetching notebooks:', err);
// // // // // // // //         setFetchError(err.message);
// // // // // // // //       } finally {
// // // // // // // //         setLoadingNotebook(false);
// // // // // // // //       }
// // // // // // // //     };

// // // // // // // //     fetchNotebooks();
// // // // // // // //   }, [user_id, chat_id]);

// // // // // // // //   // // ------------------------------------------
// // // // // // // //   // // B) Parse notebooks => time/entity/features
// // // // // // // //   // // ------------------------------------------
// // // // // // // //   // let timeBasedNotebookCells: any[] = [];
// // // // // // // //   // let entityTargetNotebookCells: any[] = [];
// // // // // // // //   // let featuresNotebookCells: any[] = [];

// // // // // // // //   // let file_url = '';
// // // // // // // //   // let entity_column = '';
// // // // // // // //   // let target_column = '';
// // // // // // // //   // let features: string[] = [];

// // // // // // // //   // if (fetchedNotebooks.length > 0) {
// // // // // // // //   //   // We'll take the first notebook's metadata as common fields
// // // // // // // //   //   const nb0 = fetchedNotebooks[0];
// // // // // // // //   //   file_url = nb0.file_url;
// // // // // // // //   //   entity_column = nb0.entity_column;
// // // // // // // //   //   target_column = nb0.target_column;
// // // // // // // //   //   features = nb0.features || [];

// // // // // // // //   //   fetchedNotebooks.forEach((nb) => {
// // // // // // // //   //     if (!nb.notebook_json) return;
// // // // // // // //   //     try {
// // // // // // // //   //       const parsed = JSON.parse(nb.notebook_json);
// // // // // // // //   //       const cells = parsed?.cells || [];
// // // // // // // //   //       if (nb.time_column) {
// // // // // // // //   //         timeBasedNotebookCells = cells;
// // // // // // // //   //       } else if (nb.entity_column && nb.target_column && !timeBasedNotebookCells.length) {
// // // // // // // //   //         entityTargetNotebookCells = cells;
// // // // // // // //   //       } else {
// // // // // // // //   //         featuresNotebookCells = cells;
// // // // // // // //   //       }
// // // // // // // //   //     } catch (err) {
// // // // // // // //   //       console.error('Error parsing notebook JSON:', err);
// // // // // // // //   //     }
// // // // // // // //   //   });
// // // // // // // //   // }

// // // // // // // //   // ------------------------------------------
// // // // // // // // // B) Parse notebooks => time/entity/features (using order)
// // // // // // // // // ------------------------------------------
// // // // // // // // let timeBasedNotebookCells: any[] = [];
// // // // // // // // let entityTargetNotebookCells: any[] = [];
// // // // // // // // let featuresNotebookCells: any[] = [];

// // // // // // // // let file_url = '';
// // // // // // // // let entity_column = '';
// // // // // // // // let target_column = '';
// // // // // // // // let features: string[] = [];

// // // // // // // // // Proceed only if we have fetched notebooks
// // // // // // // // if (fetchedNotebooks.length > 0) {
// // // // // // // //   // We'll take the first notebook's metadata as common fields
// // // // // // // //   const nb0 = fetchedNotebooks[0];
// // // // // // // //   file_url = nb0.file_url;
// // // // // // // //   entity_column = nb0.entity_column;
// // // // // // // //   target_column = nb0.target_column;
// // // // // // // //   features = nb0.features || [];

// // // // // // // //   // Filter out non-time-based notebooks
// // // // // // // //   const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
// // // // // // // //   if (nonTimeBasedNotebooks.length >= 2) {
// // // // // // // //     try {
// // // // // // // //       // Assume the first is entity-target and the second is features
// // // // // // // //       entityTargetNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// // // // // // // //       featuresNotebookCells = JSON.parse(nonTimeBasedNotebooks[1].notebook_json).cells;
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Error parsing non-time-based notebook JSON:', err);
// // // // // // // //     }
// // // // // // // //   } else if (nonTimeBasedNotebooks.length === 1) {
// // // // // // // //     try {
// // // // // // // //       entityTargetNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// // // // // // // //       featuresNotebookCells = [];
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Error parsing non-time-based notebook JSON:', err);
// // // // // // // //     }
// // // // // // // //   }

// // // // // // // //   // Additionally, check if there is a time-based notebook
// // // // // // // //   const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
// // // // // // // //   if (timeBasedNotebooks.length > 0) {
// // // // // // // //     try {
// // // // // // // //       timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error('Error parsing time-based notebook JSON:', err);
// // // // // // // //     }
// // // // // // // //   }
// // // // // // // // }


// // // // // // // //   // ------------------------------------------
// // // // // // // //   // C) Polling / model training logic
// // // // // // // //   // ------------------------------------------
// // // // // // // //   const fetchModelResults = async () => {
// // // // // // // //     try {
// // // // // // // //       const url = ` http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // // // // // // //       const response = await fetch(url);
// // // // // // // //       if (!response.ok) {
// // // // // // // //         if (response.status === 404) {
// // // // // // // //           console.log('Model results not found yet. Retrying...');
// // // // // // // //           return null;
// // // // // // // //         } else {
// // // // // // // //           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
// // // // // // // //         }
// // // // // // // //       }
// // // // // // // //       const result = await response.json();
// // // // // // // //       setDashboardData(result);
// // // // // // // //       setModelTrained(true);
// // // // // // // //       return result;
// // // // // // // //     } catch (error) {
// // // // // // // //       console.error('Error fetching model results:', error);
// // // // // // // //       return null;
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const pollModelResults = async () => {
// // // // // // // //     setPolling(true);
// // // // // // // //     const interval = setInterval(async () => {
// // // // // // // //       const result = await fetchModelResults();
// // // // // // // //       if (result) {
// // // // // // // //         clearInterval(interval);
// // // // // // // //         setPolling(false);
// // // // // // // //       }
// // // // // // // //     }, 90000);
// // // // // // // //   };

// // // // // // // //   const handleTrainModel = async () => {
// // // // // // // //     navigate('/training', {
// // // // // // // //       state: {
// // // // // // // //         user_id,
// // // // // // // //         chat_id,
// // // // // // // //         file_url,
// // // // // // // //         entity_column,
// // // // // // // //         target_column,
// // // // // // // //         features,
// // // // // // // //       },
// // // // // // // //     });
// // // // // // // //     setTimeout(() => {
// // // // // // // //       pollModelResults();
// // // // // // // //     }, 300000);
// // // // // // // //   };

// // // // // // // //   // ------------------------------------------
// // // // // // // //   // D) Save Notebooks => runAllCells
// // // // // // // //   // ------------------------------------------
// // // // // // // //   const handleSaveNotebooks = async () => {
// // // // // // // //     if (!user_id || !chat_id) {
// // // // // // // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     // For simplicity, run time-based cells if present, else entity
// // // // // // // //     const activeNotebookRef = timeBasedNotebookCells.length
// // // // // // // //       ? timeNotebookRef
// // // // // // // //       : entityNotebookRef;

// // // // // // // //     if (!activeNotebookRef.current) {
// // // // // // // //       alert('No notebook to save. Notebook reference not found.');
// // // // // // // //       return;
// // // // // // // //     }
// // // // // // // //     setSavingNotebooks(true);
// // // // // // // //     try {
// // // // // // // //       const cellResults = await activeNotebookRef.current.runAllCellsAndGetResults();
// // // // // // // //       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// // // // // // // //         method: 'POST',
// // // // // // // //         headers: {
// // // // // // // //           'Content-Type': 'application/json',
// // // // // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // // // // // //         },
// // // // // // // //         body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
// // // // // // // //       });

// // // // // // // //       if (!resp.ok) {
// // // // // // // //         const errData = await resp.json().catch(() => ({}));
// // // // // // // //         throw new Error(errData.error || 'Failed to save notebooks.');
// // // // // // // //       }
// // // // // // // //       alert('Notebooks saved successfully!');
// // // // // // // //     } catch (err: any) {
// // // // // // // //       console.error('Error saving notebooks:', err);
// // // // // // // //       alert(`Error saving notebooks: ${err.message}`);
// // // // // // // //     } finally {
// // // // // // // //       setSavingNotebooks(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // ------------------------------------------
// // // // // // // //   // E) Auto-run all notebooks once they load
// // // // // // // //   // ------------------------------------------
// // // // // // // //   useEffect(() => {
// // // // // // // //     // If no error, not loading, have notebooks, and we haven't auto-run yet...
// // // // // // // //     if (!autoRunDoneRef.current && !loadingNotebook && !fetchError && fetchedNotebooks.length > 0) {
// // // // // // // //       autoRunDoneRef.current = true; // Mark that we've done it
// // // // // // // //       console.log('Auto-running all notebook cells...');
// // // // // // // //       setTimeout(async () => {
// // // // // // // //         try {
// // // // // // // //           if (timeNotebookRef.current) {
// // // // // // // //             await timeNotebookRef.current.runAllCellsAndGetResults();
// // // // // // // //           }
// // // // // // // //           if (entityNotebookRef.current) {
// // // // // // // //             await entityNotebookRef.current.runAllCellsAndGetResults();
// // // // // // // //           }
// // // // // // // //           if (featuresNotebookRef.current) {
// // // // // // // //             await featuresNotebookRef.current.runAllCellsAndGetResults();
// // // // // // // //           }
// // // // // // // //           console.log('Auto-run complete.');
// // // // // // // //         } catch (err) {
// // // // // // // //           console.error('Error auto-running cells:', err);
// // // // // // // //         }
// // // // // // // //       }, 1000); // small delay ensures child refs are set
// // // // // // // //     }
// // // // // // // //   }, [loadingNotebook, fetchError, fetchedNotebooks]);

// // // // // // // //   // ------------------------------------------
// // // // // // // //   // F) Show/hide tabs (never unmount)
// // // // // // // //   // ------------------------------------------
// // // // // // // //   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
// // // // // // // //     setActiveTab(tabId);
// // // // // // // //   };

// // // // // // // //   // *Time-based Notebook*
// // // // // // // //   const timeNotebook = timeBasedNotebookCells.length > 0 && (
// // // // // // // //     <div className="space-y-8">
// // // // // // // //       <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
// // // // // // // //       <SQLNotebook
// // // // // // // //         ref={timeNotebookRef}
// // // // // // // //         activeTab="time_based_notebook"
// // // // // // // //         notebookContent={{
// // // // // // // //           file_url,
// // // // // // // //           entity_column,
// // // // // // // //           target_column,
// // // // // // // //           features,
// // // // // // // //           user_id,
// // // // // // // //           chat_id,
// // // // // // // //           isTrained,
// // // // // // // //           handleTrainModel,
// // // // // // // //           cells: timeBasedNotebookCells,
// // // // // // // //         }}
// // // // // // // //       />
// // // // // // // //     </div>
// // // // // // // //   );

// // // // // // // //   // *Entity + Features Notebook*
// // // // // // // //   const entityAndFeaturesNotebooks = (
// // // // // // // //     <div className="space-y-8">
// // // // // // // //       <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // // //       <SQLNotebook
// // // // // // // //         ref={entityNotebookRef}
// // // // // // // //         activeTab="entity_target_notebook"
// // // // // // // //         notebookContent={{
// // // // // // // //           file_url,
// // // // // // // //           entity_column,
// // // // // // // //           target_column,
// // // // // // // //           features,
// // // // // // // //           user_id,
// // // // // // // //           chat_id,
// // // // // // // //           isTrained,
// // // // // // // //           handleTrainModel,
// // // // // // // //           cells: entityTargetNotebookCells,
// // // // // // // //         }}
// // // // // // // //       />
// // // // // // // //       <SQLNotebook
// // // // // // // //         ref={featuresNotebookRef}
// // // // // // // //         activeTab="features_notebook"
// // // // // // // //         notebookContent={{
// // // // // // // //           file_url,
// // // // // // // //           entity_column,
// // // // // // // //           target_column,
// // // // // // // //           features,
// // // // // // // //           user_id,
// // // // // // // //           chat_id,
// // // // // // // //           isTrained,
// // // // // // // //           handleTrainModel,
// // // // // // // //           cells: featuresNotebookCells,
// // // // // // // //         }}
// // // // // // // //       />
// // // // // // // //     </div>
// // // // // // // //   );

// // // // // // // //   return (
// // // // // // // //     <div className="relative h-screen overflow-hidden">
// // // // // // // //       {/* Top Navbar */}
// // // // // // // //       <div className="fixed top-0 left-0 right-0 z-50">
// // // // // // // //         <Navbar
// // // // // // // //           isSidebarOpen={isSidebarOpen}
// // // // // // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // // // // // //           notebooks={[
// // // // // // // //             {
// // // // // // // //               id: 'notebook',
// // // // // // // //               title: 'Notebook',
// // // // // // // //               icon: <FiBook size={18} />,
// // // // // // // //               onClick: () => handleTabChange('notebook'),
// // // // // // // //             },
// // // // // // // //             {
// // // // // // // //               id: 'dashboard',
// // // // // // // //               title: 'Dashboard',
// // // // // // // //               icon: <FiBarChart2 size={18} />,
// // // // // // // //               onClick: () => handleTabChange('dashboard'),
// // // // // // // //             },
// // // // // // // //             {
// // // // // // // //               id: 'predict',
// // // // // // // //               title: 'Predict',
// // // // // // // //               icon: <FiFlag size={18} />,
// // // // // // // //               onClick: () => handleTabChange('predict'),
// // // // // // // //             },
// // // // // // // //           ]}
// // // // // // // //           activeTab={activeTab}
// // // // // // // //         />
// // // // // // // //       </div>

// // // // // // // //       {/* Left Sidebar */}
// // // // // // // //       <div
// // // // // // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // // // // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // // // // // //         }`}
// // // // // // // //         style={{ width: '16rem' }}
// // // // // // // //       >
// // // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // // //       </div>

// // // // // // // //       {/* Train & Save if not isTrained */}
// // // // // // // //       {!isTrained && (
// // // // // // // //         <motion.div
// // // // // // // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // // // // // // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // // // // // // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // // // // // // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
// // // // // // // //         >
// // // // // // // //           <button
// // // // // // // //             onClick={handleTrainModel}
// // // // // // // //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // // // //             aria-label="Train your predictive model"
// // // // // // // //           >
// // // // // // // //             Train Model
// // // // // // // //           </button>

// // // // // // // //           <button
// // // // // // // //             onClick={handleSaveNotebooks}
// // // // // // // //             disabled={savingNotebooks}
// // // // // // // //             className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // // // //             aria-label="Save Notebooks"
// // // // // // // //           >
// // // // // // // //             {savingNotebooks ? (
// // // // // // // //               <>
// // // // // // // //                 <FiLoader className="mr-2 animate-spin" />
// // // // // // // //                 Saving...
// // // // // // // //               </>
// // // // // // // //             ) : (
// // // // // // // //               'Save Notebooks'
// // // // // // // //             )}
// // // // // // // //           </button>
// // // // // // // //         </motion.div>
// // // // // // // //       )}

// // // // // // // //       {/* Main Content Area (Notebook / Dashboard / Predict) */}
// // // // // // // //       <div
// // // // // // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // // // // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // // // // // //         }`}
// // // // // // // //       >
// // // // // // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto p-4">
// // // // // // // //           <div className="w-full max-w-6xl mx-auto">
// // // // // // // //             {/* Notebook Tab (always mounted, hidden with display) */}
// // // // // // // //             <div style={{ display: activeTab === 'notebook' ? 'block' : 'none' }}>
// // // // // // // //               {loadingNotebook ? (
// // // // // // // //                 <div className="p-4">Loading notebook data...</div>
// // // // // // // //               ) : fetchError ? (
// // // // // // // //                 <div className="p-4 text-red-600">Error: {fetchError}</div>
// // // // // // // //               ) : (
// // // // // // // //                 <>
// // // // // // // //                   {timeBasedNotebookCells.length > 0 ? timeNotebook : entityAndFeaturesNotebooks}
// // // // // // // //                 </>
// // // // // // // //               )}
// // // // // // // //             </div>

// // // // // // // //             {/* <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} /> */}

// // // // // // // //             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
// // // // // // // //   <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // // // // // // // </div>

// // // // // // // //             {/* Dashboard Tab (always mounted)
// // // // // // // //             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
// // // // // // // //               {!isTrained ? (
// // // // // // // //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // // // // //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // // // // //                     <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // // //                     <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// // // // // // // //                     <p className="text-gray-600">
// // // // // // // //                       Please train your model first to view the dashboard metrics.
// // // // // // // //                     </p>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               ) : loadingDashboard ? (
// // // // // // // //                 <div>Loading Dashboard...</div>
// // // // // // // //               ) : (
// // // // // // // //                 <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // // // // // // //               )}
// // // // // // // //             </div> */}

// // // // // // // //             {/* Predict Tab (always mounted) */}
// // // // // // // //             <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
// // // // // // // //               {!isTrained ? (
// // // // // // // //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // // // // //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // // // // //                     <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // // //                     <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// // // // // // // //                     <p className="text-gray-600">
// // // // // // // //                       Please train your model first to make predictions.
// // // // // // // //                     </p>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               ) : (
// // // // // // // //                 <PredictionsUI />
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default NotebookLayout;




// // // // // // // // NotebookLayout.tsx
// // // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // import Sidebar from './Sidebar/Sidebar';
// // // // // // // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // // // // // // import Dashboard from '../Dashboard/Dashboard';
// // // // // // // import PredictionsUI from '../Predict/PredictNewData';
// // // // // // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // // // // // import { motion } from 'framer-motion';

// // // // // // // interface Metrics {
// // // // // // //   rmse: number;
// // // // // // //   r2_score: number;
// // // // // // //   mae: number;
// // // // // // // }

// // // // // // // interface ModelMetrics {
// // // // // // //   training: Metrics;
// // // // // // //   testing: Metrics;
// // // // // // //   assessment: string;
// // // // // // // }

// // // // // // // interface MetricsData {
// // // // // // //   model_metrics: ModelMetrics;
// // // // // // //   feature_importance: Record<string, number>;
// // // // // // //   predictions: {
// // // // // // //     actual: number[];
// // // // // // //     predicted: number[];
// // // // // // //   };
// // // // // // //   user_id: string;
// // // // // // //   chat_id: string;
// // // // // // // }

// // // // // // // const NotebookLayout: React.FC = () => {
// // // // // // //   // Read user_id and chat_id from route params.
// // // // // // //   const { user_id = '', chat_id = '' } = useParams();
// // // // // // //   const location = useLocation();
// // // // // // //   const navigate = useNavigate();

// // // // // // //   // Instead of receiving predictive settings from navigation state,
// // // // // // //   // we fetch them directly when this page loads.
// // // // // // //   const [predictiveSettings, setPredictiveSettings] = useState<any>(null);

// // // // // // //   // Local states for tabs, sidebar, model, and notebooks.
// // // // // // //   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// // // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // // // // // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // // // // // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // // // // // //   const [modelTrained, setModelTrained] = useState(false);
// // // // // // //   const [polling, setPolling] = useState(false);
// // // // // // //   const [savingNotebooks, setSavingNotebooks] = useState(false);

// // // // // // //   // Notebook data from backend (/api/notebooks).
// // // // // // //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// // // // // // //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// // // // // // //   const [fetchError, setFetchError] = useState<string | null>(null);

// // // // // // //   // Refs for each notebook so we can run all cells, etc.
// // // // // // //   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
// // // // // // //   const entityNotebookRef = useRef<SQLNotebookRef | null>(null);
// // // // // // //   const featuresNotebookRef = useRef<SQLNotebookRef | null>(null);

// // // // // // //   // A ref so we only auto-run once.
// // // // // // //   const autoRunDoneRef = useRef(false);

// // // // // // //   // ------------------------------------------
// // // // // // //   // (New) Fetch predictive settings when the page loads.
// // // // // // //   // ------------------------------------------
// // // // // // //   useEffect(() => {
// // // // // // //     if (!user_id || !chat_id) return;
// // // // // // //     const fetchPredictiveSettings = async () => {
// // // // // // //       try {
// // // // // // //         const response = await fetch(
// // // // // // //           `http://98.70.25.52/api/predictive-settings/${user_id}/${chat_id}/`
// // // // // // //         );
// // // // // // //         if (!response.ok) {
// // // // // // //           throw new Error(`Failed to fetch predictive settings: ${response.statusText}`);
// // // // // // //         }
// // // // // // //         const data = await response.json();
// // // // // // //         setPredictiveSettings(data);
// // // // // // //       } catch (error: any) {
// // // // // // //         console.error("Error fetching predictive settings:", error);
// // // // // // //       }
// // // // // // //     };
// // // // // // //     fetchPredictiveSettings();
// // // // // // //   }, [user_id, chat_id]);

// // // // // // //   // ------------------------------------------
// // // // // // //   // A) Fetch notebooks from the backend.
// // // // // // //   // ------------------------------------------
// // // // // // //   useEffect(() => {
// // // // // // //     if (!user_id || !chat_id) return;

// // // // // // //     const fetchNotebooks = async () => {
// // // // // // //       setLoadingNotebook(true);
// // // // // // //       setFetchError(null);
// // // // // // //       try {
// // // // // // //         const res = await fetch(
// // // // // // //           `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // // // // // //         );
// // // // // // //         if (!res.ok) {
// // // // // // //           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // // // // // //         }
// // // // // // //         const data = await res.json();
// // // // // // //         if (!data.notebooks || !data.notebooks.length) {
// // // // // // //           setFetchedNotebooks([]);
// // // // // // //           setFetchError('No notebooks found for this user/chat.');
// // // // // // //         } else {
// // // // // // //           setFetchedNotebooks(data.notebooks);
// // // // // // //         }
// // // // // // //       } catch (err: any) {
// // // // // // //         console.error('Error fetching notebooks:', err);
// // // // // // //         setFetchError(err.message);
// // // // // // //       } finally {
// // // // // // //         setLoadingNotebook(false);
// // // // // // //       }
// // // // // // //     };

// // // // // // //     fetchNotebooks();
// // // // // // //   }, [user_id, chat_id]);

// // // // // // //   // ------------------------------------------
// // // // // // //   // B) Parse notebooks into time-based and non-time-based (entity/target & features).
// // // // // // //   // ------------------------------------------
// // // // // // //   let timeBasedNotebookCells: any[] = [];
// // // // // // //   let entityTargetNotebookCells: any[] = [];
// // // // // // //   let featuresNotebookCells: any[] = [];

// // // // // // //   let file_url = '';
// // // // // // //   let entity_column = '';
// // // // // // //   let target_column = '';
// // // // // // //   let features: string[] = [];

// // // // // // //   if (fetchedNotebooks.length > 0) {
// // // // // // //     // Use the first notebook's metadata as common fields.
// // // // // // //     const nb0 = fetchedNotebooks[0];
// // // // // // //     file_url = nb0.file_url;
// // // // // // //     entity_column = nb0.entity_column;
// // // // // // //     target_column = nb0.target_column;
// // // // // // //     features = nb0.features || [];

// // // // // // //     // Filter out non-time-based notebooks.
// // // // // // //     const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
// // // // // // //     if (nonTimeBasedNotebooks.length >= 2) {
// // // // // // //       try {
// // // // // // //         // Assume the first notebook is entity-target and the second is features.
// // // // // // //         entityTargetNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// // // // // // //         featuresNotebookCells = JSON.parse(nonTimeBasedNotebooks[1].notebook_json).cells;
// // // // // // //       } catch (err) {
// // // // // // //         console.error('Error parsing non-time-based notebook JSON:', err);
// // // // // // //       }
// // // // // // //     } else if (nonTimeBasedNotebooks.length === 1) {
// // // // // // //       try {
// // // // // // //         entityTargetNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// // // // // // //         featuresNotebookCells = [];
// // // // // // //       } catch (err) {
// // // // // // //         console.error('Error parsing non-time-based notebook JSON:', err);
// // // // // // //       }
// // // // // // //     }

// // // // // // //     // Check if there is a time-based notebook.
// // // // // // //     const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
// // // // // // //     if (timeBasedNotebooks.length > 0) {
// // // // // // //       try {
// // // // // // //         timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
// // // // // // //       } catch (err) {
// // // // // // //         console.error('Error parsing time-based notebook JSON:', err);
// // // // // // //       }
// // // // // // //     }
// // // // // // //   }

// // // // // // //   // ------------------------------------------
// // // // // // //   // C) Polling / model training logic.
// // // // // // //   // ------------------------------------------
// // // // // // //   const fetchModelResults = async () => {
// // // // // // //     try {
// // // // // // //       const url = ` http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // // // // // //       const response = await fetch(url);
// // // // // // //       if (!response.ok) {
// // // // // // //         if (response.status === 404) {
// // // // // // //           console.log('Model results not found yet. Retrying...');
// // // // // // //           return null;
// // // // // // //         } else {
// // // // // // //           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
// // // // // // //         }
// // // // // // //       }
// // // // // // //       const result = await response.json();
// // // // // // //       setDashboardData(result);
// // // // // // //       setModelTrained(true);
// // // // // // //       return result;
// // // // // // //     } catch (error) {
// // // // // // //       console.error('Error fetching model results:', error);
// // // // // // //       return null;
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const pollModelResults = async () => {
// // // // // // //     setPolling(true);
// // // // // // //     const interval = setInterval(async () => {
// // // // // // //       const result = await fetchModelResults();
// // // // // // //       if (result) {
// // // // // // //         clearInterval(interval);
// // // // // // //         setPolling(false);
// // // // // // //       }
// // // // // // //     }, 90000);
// // // // // // //   };

// // // // // // //   const handleTrainModel = async () => {
// // // // // // //     navigate('/training', {
// // // // // // //       state: {
// // // // // // //         user_id,
// // // // // // //         chat_id,
// // // // // // //         file_url,
// // // // // // //         entity_column,
// // // // // // //         target_column,
// // // // // // //         features,
// // // // // // //       },
// // // // // // //     });
// // // // // // //     setTimeout(() => {
// // // // // // //       pollModelResults();
// // // // // // //     }, 300000);
// // // // // // //   };

// // // // // // //   // ------------------------------------------
// // // // // // //   // D) Save Notebooks – run all cells and persist via API.
// // // // // // //   // ------------------------------------------
// // // // // // //   // const handleSaveNotebooks = async () => {
// // // // // // //   //   if (!user_id || !chat_id) {
// // // // // // //   //     alert('user_id or chat_id is missing, cannot save notebooks.');
// // // // // // //   //     return;
// // // // // // //   //   }
// // // // // // //   //   // Choose time-based cells if available; otherwise, use entity-target cells.
// // // // // // //   //   const activeNotebookRef = timeBasedNotebookCells.length ? timeNotebookRef : (entityTargetNotebookCells.length ? entityNotebookRef : featuresNotebookRef);

// // // // // // //   //   if (!activeNotebookRef.current) {
// // // // // // //   //     alert('No notebook to save. Notebook reference not found.');
// // // // // // //   //     return;
// // // // // // //   //   }
// // // // // // //   //   setSavingNotebooks(true);
// // // // // // //   //   try {
// // // // // // //   //     const cellResults = await activeNotebookRef.current.runAllCellsAndGetResults();
// // // // // // //   //     // console.log('Cell results being sent to SaveNotebooksView:', cellResults);
// // // // // // //   //     const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// // // // // // //   //       method: 'POST',
// // // // // // //   //       headers: {
// // // // // // //   //         'Content-Type': 'application/json',
// // // // // // //   //         'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // // // // //   //       },
// // // // // // //   //       body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
// // // // // // //   //     });

// // // // // // //   //     if (!resp.ok) {
// // // // // // //   //       const errData = await resp.json().catch(() => ({}));
// // // // // // //   //       throw new Error(errData.error || 'Failed to save notebooks.');
// // // // // // //   //     }
// // // // // // //   //     alert('Notebooks saved successfully!');
// // // // // // //   //   } catch (err: any) {
// // // // // // //   //     console.error('Error saving notebooks:', err);
// // // // // // //   //     alert(`Error saving notebooks: ${err.message}`);
// // // // // // //   //   } finally {
// // // // // // //   //     setSavingNotebooks(false);
// // // // // // //   //   }
// // // // // // //   // };

// // // // // // //   // In NotebookLayout.tsx

// // // // // // // const handleSaveNotebooks = async () => {
// // // // // // //   if (!user_id || !chat_id) {
// // // // // // //     alert('user_id or chat_id is missing, cannot save notebooks.');
// // // // // // //     return;
// // // // // // //   }

// // // // // // //   let cellResults: any[] = [];
  
// // // // // // //   // If time-based cells exist, run them.
// // // // // // //   if (timeNotebookRef.current) {
// // // // // // //     const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
// // // // // // //     cellResults = cellResults.concat(timeCells);
// // // // // // //   }

// // // // // // //   // For non time-based queries, combine both entity_target and features notebook cells.
// // // // // // //   if (entityNotebookRef.current) {
// // // // // // //     const entityCells = await entityNotebookRef.current.runAllCellsAndGetResults();
// // // // // // //     cellResults = cellResults.concat(entityCells);
// // // // // // //   }
// // // // // // //   if (featuresNotebookRef.current) {
// // // // // // //     const featuresCells = await featuresNotebookRef.current.runAllCellsAndGetResults();
// // // // // // //     cellResults = cellResults.concat(featuresCells);
// // // // // // //   }

// // // // // // //   console.log('Cell results being sent to SaveNotebooksView:', cellResults);
// // // // // // //   // Now cellResults should contain cells from all rendered notebook components

// // // // // // //   setSavingNotebooks(true);
// // // // // // //   try {
// // // // // // //     const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// // // // // // //       method: 'POST',
// // // // // // //       headers: {
// // // // // // //         'Content-Type': 'application/json',
// // // // // // //         // Replace with your auth token as needed.
// // // // // // //         'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // // // // //       },
// // // // // // //       body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
// // // // // // //     });

// // // // // // //     if (!resp.ok) {
// // // // // // //       const errData = await resp.json().catch(() => ({}));
// // // // // // //       throw new Error(errData.error || 'Failed to save notebooks.');
// // // // // // //     }
// // // // // // //     alert('Notebooks saved successfully!');
// // // // // // //   } catch (err: any) {
// // // // // // //     console.error('Error saving notebooks:', err);
// // // // // // //     alert(`Error saving notebooks: ${err.message}`);
// // // // // // //   } finally {
// // // // // // //     setSavingNotebooks(false);
// // // // // // //   }
// // // // // // // };


// // // // // // //   // ------------------------------------------
// // // // // // //   // E) Auto-run all notebooks once they load.
// // // // // // //   // ------------------------------------------
// // // // // // //   useEffect(() => {
// // // // // // //     if (!autoRunDoneRef.current && !loadingNotebook && !fetchError && fetchedNotebooks.length > 0) {
// // // // // // //       autoRunDoneRef.current = true;
// // // // // // //       console.log('Auto-running all notebook cells...');
// // // // // // //       setTimeout(async () => {
// // // // // // //         try {
// // // // // // //           if (timeNotebookRef.current) {
// // // // // // //             await timeNotebookRef.current.runAllCellsAndGetResults();
// // // // // // //           }
// // // // // // //           if (entityNotebookRef.current) {
// // // // // // //             await entityNotebookRef.current.runAllCellsAndGetResults();
// // // // // // //           }
// // // // // // //           if (featuresNotebookRef.current) {
// // // // // // //             await featuresNotebookRef.current.runAllCellsAndGetResults();
// // // // // // //           }
// // // // // // //           console.log('Auto-run complete.');
// // // // // // //         } catch (err) {
// // // // // // //           console.error('Error auto-running cells:', err);
// // // // // // //         }
// // // // // // //       }, 1000);
// // // // // // //     }
// // // // // // //   }, [loadingNotebook, fetchError, fetchedNotebooks]);

// // // // // // //   // ------------------------------------------
// // // // // // //   // F) Handle tab changes for Notebook / Dashboard / Predict.
// // // // // // //   // ------------------------------------------
// // // // // // //   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
// // // // // // //     setActiveTab(tabId);
// // // // // // //   };

// // // // // // //   // ------------------------------------------
// // // // // // //   // Render notebooks using the parsed cell arrays.
// // // // // // //   // ------------------------------------------
// // // // // // //   const timeNotebook = timeBasedNotebookCells.length > 0 && (
// // // // // // //     <div className="space-y-8">
// // // // // // //       <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
// // // // // // //       <SQLNotebook
// // // // // // //         ref={timeNotebookRef}
// // // // // // //         activeTab="time_based_notebook"
// // // // // // //         notebookContent={{
// // // // // // //           file_url,
// // // // // // //           entity_column,
// // // // // // //           target_column,
// // // // // // //           features,
// // // // // // //           user_id,
// // // // // // //           chat_id,
// // // // // // //           isTrained: modelTrained,
// // // // // // //           handleTrainModel,
// // // // // // //           cells: timeBasedNotebookCells,
// // // // // // //         }}
// // // // // // //       />
// // // // // // //     </div>
// // // // // // //   );

// // // // // // //   const entityAndFeaturesNotebooks = (
// // // // // // //     <div className="space-y-8">
// // // // // // //       <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // // // // // //       <SQLNotebook
// // // // // // //         ref={entityNotebookRef}
// // // // // // //         activeTab="entity_target_notebook"
// // // // // // //         notebookContent={{
// // // // // // //           file_url,
// // // // // // //           entity_column,
// // // // // // //           target_column,
// // // // // // //           features,
// // // // // // //           user_id,
// // // // // // //           chat_id,
// // // // // // //           isTrained: modelTrained,
// // // // // // //           handleTrainModel,
// // // // // // //           cells: entityTargetNotebookCells,
// // // // // // //         }}
// // // // // // //       />
// // // // // // //       <SQLNotebook
// // // // // // //         ref={featuresNotebookRef}
// // // // // // //         activeTab="features_notebook"
// // // // // // //         notebookContent={{
// // // // // // //           file_url,
// // // // // // //           entity_column,
// // // // // // //           target_column,
// // // // // // //           features,
// // // // // // //           user_id,
// // // // // // //           chat_id,
// // // // // // //           isTrained: modelTrained,
// // // // // // //           handleTrainModel,
// // // // // // //           cells: featuresNotebookCells,
// // // // // // //         }}
// // // // // // //       />
// // // // // // //     </div>
// // // // // // //   );

// // // // // // //   return (
// // // // // // //     <div className="relative h-screen overflow-hidden">
// // // // // // //       {/* Top Navbar */}
// // // // // // //       <div className="fixed top-0 left-0 right-0 z-50">
// // // // // // //         <Navbar
// // // // // // //           isSidebarOpen={isSidebarOpen}
// // // // // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // // // // //           notebooks={[
// // // // // // //             {
// // // // // // //               id: 'notebook',
// // // // // // //               title: 'Notebook',
// // // // // // //               icon: <FiBook size={18} />,
// // // // // // //               onClick: () => handleTabChange('notebook'),
// // // // // // //             },
// // // // // // //             {
// // // // // // //               id: 'dashboard',
// // // // // // //               title: 'Dashboard',
// // // // // // //               icon: <FiBarChart2 size={18} />,
// // // // // // //               onClick: () => handleTabChange('dashboard'),
// // // // // // //             },
// // // // // // //             {
// // // // // // //               id: 'predict',
// // // // // // //               title: 'Predict',
// // // // // // //               icon: <FiFlag size={18} />,
// // // // // // //               onClick: () => handleTabChange('predict'),
// // // // // // //             },
// // // // // // //           ]}
// // // // // // //           activeTab={activeTab}
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       {/* Left Sidebar */}
// // // // // // //       <div
// // // // // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // // // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // // // // //         }`}
// // // // // // //         style={{ width: '16rem' }}
// // // // // // //       >
// // // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // // //       </div>

// // // // // // //       {/* Train & Save Buttons (if model not trained) */}
// // // // // // //       {!modelTrained && (
// // // // // // //         <motion.div
// // // // // // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // // // // // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // // // // // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // // // // // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
// // // // // // //         >
// // // // // // //           <button
// // // // // // //             onClick={handleTrainModel}
// // // // // // //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // // //             aria-label="Train your predictive model"
// // // // // // //           >
// // // // // // //             Train Model
// // // // // // //           </button>

// // // // // // //           <button
// // // // // // //             onClick={handleSaveNotebooks}
// // // // // // //             disabled={savingNotebooks}
// // // // // // //             className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // // //             aria-label="Save Notebooks"
// // // // // // //           >
// // // // // // //             {savingNotebooks ? (
// // // // // // //               <>
// // // // // // //                 <FiLoader className="mr-2 animate-spin" />
// // // // // // //                 Saving...
// // // // // // //               </>
// // // // // // //             ) : (
// // // // // // //               'Save Notebooks'
// // // // // // //             )}
// // // // // // //           </button>
// // // // // // //         </motion.div>
// // // // // // //       )}

// // // // // // //       {/* Main Content Area */}
// // // // // // //       <div
// // // // // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // // // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // // // // //         }`}
// // // // // // //       >
// // // // // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto p-4">
// // // // // // //           <div className="w-full max-w-6xl mx-auto">
// // // // // // //             {/* Display Predictive Settings above the notebook shells */}
// // // // // // //             {predictiveSettings && (
// // // // // // //               <div className="p-4 border rounded-lg bg-gray-50 mb-4">
// // // // // // //                 <h2 className="text-lg font-bold mb-2">Predictive Settings</h2>
// // // // // // //                 <ul className="list-disc list-inside">
// // // // // // //                   <li>
// // // // // // //                     <strong>Target Column:</strong>{' '}
// // // // // // //                     {predictiveSettings.target_column || 'Null'}
// // // // // // //                   </li>
// // // // // // //                   <li>
// // // // // // //                     <strong>Entity Column:</strong>{' '}
// // // // // // //                     {predictiveSettings.entity_column || 'Null'}
// // // // // // //                   </li>
// // // // // // //                   <li>
// // // // // // //                     <strong>Time Column:</strong>{' '}
// // // // // // //                     {predictiveSettings.time_column || 'Null'}
// // // // // // //                   </li>
// // // // // // //                   <li>
// // // // // // //                     <strong>Predictive Question:</strong>{' '}
// // // // // // //                     {predictiveSettings.predictive_question || 'Null'}
// // // // // // //                   </li>
// // // // // // //                   <li>
// // // // // // //                     <strong>Time Frame:</strong>{' '}
// // // // // // //                     {predictiveSettings.time_frame || 'Null'}
// // // // // // //                   </li>
// // // // // // //                   <li>
// // // // // // //                     <strong>Time Frequency:</strong>{' '}
// // // // // // //                     {predictiveSettings.time_frequency || 'Null'}
// // // // // // //                   </li>
// // // // // // //                   <li>
// // // // // // //                     <strong>Machine Learning Type:</strong>{' '}
// // // // // // //                     {predictiveSettings.machine_learning_type || 'Null'}
// // // // // // //                   </li>
// // // // // // //                 </ul>
// // // // // // //               </div>
// // // // // // //             )}

// // // // // // //             {/* Notebook Tab */}
// // // // // // //             <div style={{ display: activeTab === 'notebook' ? 'block' : 'none' }}>
// // // // // // //               {loadingNotebook ? (
// // // // // // //                 <div className="p-4">Loading notebook data...</div>
// // // // // // //               ) : fetchError ? (
// // // // // // //                 <div className="p-4 text-red-600">Error: {fetchError}</div>
// // // // // // //               ) : (
// // // // // // //                 <>
// // // // // // //                   {timeBasedNotebookCells.length > 0 ? timeNotebook : entityAndFeaturesNotebooks}
// // // // // // //                 </>
// // // // // // //               )}
// // // // // // //             </div>

// // // // // // //             {/* Dashboard Tab */}
// // // // // // //             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
// // // // // // //               <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // // // // // //             </div>

// // // // // // //             {/* Predict Tab */}
// // // // // // //             <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
// // // // // // //               {!modelTrained ? (
// // // // // // //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // // // //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // // // //                     <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // //                     <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// // // // // // //                     <p className="text-gray-600">
// // // // // // //                       Please train your model first to make predictions.
// // // // // // //                     </p>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               ) : (
// // // // // // //                 <PredictionsUI />
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default NotebookLayout;







// // // // // // // NotebookLayout.tsx
// // // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // // // import Sidebar from './components/Sidebar/Sidebar';
// // // // // // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // // // // // import Dashboard from '../Dashboard/Dashboard';
// // // // // // import PredictionsUI from '../Predict/PredictNewData';
// // // // // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // // // // import { motion } from 'framer-motion';
// // // // // // import Sidebar from '../NotebookUI/Sidebar/Sidebar';

// // // // // // interface Metrics {
// // // // // //   rmse: number;
// // // // // //   r2_score: number;
// // // // // //   mae: number;
// // // // // // }

// // // // // // interface ModelMetrics {
// // // // // //   training: Metrics;
// // // // // //   testing: Metrics;
// // // // // //   assessment: string;
// // // // // // }

// // // // // // interface MetricsData {
// // // // // //   model_metrics: ModelMetrics;
// // // // // //   feature_importance: Record<string, number>;
// // // // // //   predictions: {
// // // // // //     actual: number[];
// // // // // //     predicted: number[];
// // // // // //   };
// // // // // //   user_id: string;
// // // // // //   chat_id: string;
// // // // // //   feature_analysis?: any; // Add appropriate type
// // // // // //   model_metadata?: any; // Add appropriate type
// // // // // //   data_characteristics?: any; // Add appropriate type
// // // // // //   core_statistics?: any; // Add appropriate type
// // // // // //   attribute_statistics?: any; // Add appropriate type
// // // // // // }

// // // // // // const NotebookLayout: React.FC = () => {
// // // // // //   // Read user_id and chat_id from route params.
// // // // // //   const { user_id = '', chat_id = '' } = useParams();
// // // // // //   const location = useLocation();
// // // // // //   const navigate = useNavigate();

// // // // // //   // Instead of receiving predictive settings from navigation state,
// // // // // //   // we fetch them directly when this page loads.
// // // // // //   const [predictiveSettings, setPredictiveSettings] = useState<any>(null);

// // // // // //   // Local states for tabs, sidebar, model, and notebooks.
// // // // // //   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// // // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // // // // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // // // // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // // // // //   const [modelTrained, setModelTrained] = useState(false);
// // // // // //   const [polling, setPolling] = useState(false);
// // // // // //   const [savingNotebooks, setSavingNotebooks] = useState(false);

// // // // // //   // Notebook data from backend (/api/notebooks).
// // // // // //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// // // // // //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// // // // // //   const [fetchError, setFetchError] = useState<string | null>(null);

// // // // // //   // Updated Notebook refs: one for time‐based and one for non–time‐based (combined) notebooks.
// // // // // //   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
// // // // // //   const nonTimeBasedNotebookRef = useRef<SQLNotebookRef | null>(null);

// // // // // //   // A ref so we only auto-run once.
// // // // // //   const autoRunDoneRef = useRef(false);

// // // // // //   // ------------------------------------------
// // // // // //   // (New) Fetch predictive settings when the page loads.
// // // // // //   // ------------------------------------------
// // // // // //   useEffect(() => {
// // // // // //     if (!user_id || !chat_id) return;
// // // // // //     const fetchPredictiveSettings = async () => {
// // // // // //       try {
// // // // // //         const response = await fetch(
// // // // // //           `http://98.70.25.52/api/predictive-settings/${user_id}/${chat_id}/`
// // // // // //         );
// // // // // //         if (!response.ok) {
// // // // // //           throw new Error(`Failed to fetch predictive settings: ${response.statusText}`);
// // // // // //         }
// // // // // //         const data = await response.json();
// // // // // //         setPredictiveSettings(data);
// // // // // //       } catch (error: any) {
// // // // // //         console.error("Error fetching predictive settings:", error);
// // // // // //       }
// // // // // //     };
// // // // // //     fetchPredictiveSettings();
// // // // // //   }, [user_id, chat_id]);

// // // // // //   // ------------------------------------------
// // // // // //   // A) Fetch notebooks from the backend.
// // // // // //   // ------------------------------------------
// // // // // //   useEffect(() => {
// // // // // //     if (!user_id || !chat_id) return;

// // // // // //     const fetchNotebooks = async () => {
// // // // // //       setLoadingNotebook(true);
// // // // // //       setFetchError(null);
// // // // // //       try {
// // // // // //         const res = await fetch(
// // // // // //           `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // // // // //         );
// // // // // //         if (!res.ok) {
// // // // // //           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // // // // //         }
// // // // // //         const data = await res.json();
// // // // // //         if (!data.notebooks || !data.notebooks.length) {
// // // // // //           setFetchedNotebooks([]);
// // // // // //           setFetchError('No notebooks found for this user/chat.');
// // // // // //         } else {
// // // // // //           setFetchedNotebooks(data.notebooks);
// // // // // //         }
// // // // // //       } catch (err: any) {
// // // // // //         console.error('Error fetching notebooks:', err);
// // // // // //         setFetchError(err.message);
// // // // // //       } finally {
// // // // // //         setLoadingNotebook(false);
// // // // // //       }
// // // // // //     };

// // // // // //     fetchNotebooks();
// // // // // //   }, [user_id, chat_id]);

// // // // // //   // ------------------------------------------
// // // // // //   // B) Parse notebooks into time-based and non–time-based.
// // // // // //   // ------------------------------------------
// // // // // //   let timeBasedNotebookCells: any[] = [];
// // // // // //   let nonTimeBasedNotebookCells: any[] = [];
// // // // // //   let file_url = '';
// // // // // //   let entity_column = '';
// // // // // //   let target_column = '';
// // // // // //   let features: string[] = [];

// // // // // //   if (fetchedNotebooks.length > 0) {
// // // // // //     // Use the first notebook's metadata as common fields.
// // // // // //     const nb0 = fetchedNotebooks[0];
// // // // // //     file_url = nb0.file_url;
// // // // // //     entity_column = nb0.entity_column;
// // // // // //     target_column = nb0.target_column;
// // // // // //     features = nb0.features || [];

// // // // // //     // Filter out non–time-based notebooks.
// // // // // //     // (Now the backend returns a single combined notebook for non time-based queries.)
// // // // // //     const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
// // // // // //     if (nonTimeBasedNotebooks.length > 0) {
// // // // // //       try {
// // // // // //         nonTimeBasedNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// // // // // //       } catch (err) {
// // // // // //         console.error('Error parsing non–time-based notebook JSON:', err);
// // // // // //       }
// // // // // //     }

// // // // // //     // Check if there is a time–based notebook.
// // // // // //     const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
// // // // // //     if (timeBasedNotebooks.length > 0) {
// // // // // //       try {
// // // // // //         timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
// // // // // //       } catch (err) {
// // // // // //         console.error('Error parsing time–based notebook JSON:', err);
// // // // // //       }
// // // // // //     }
// // // // // //   }

// // // // // //   // ------------------------------------------
// // // // // //   // C) Polling / model training logic.
// // // // // //   // ------------------------------------------
// // // // // //   const fetchModelResults = async () => {
// // // // // //     try {
// // // // // //       const url = ` http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // // // // //       const response = await fetch(url);
// // // // // //       if (!response.ok) {
// // // // // //         if (response.status === 404) {
// // // // // //           console.log('Model results not found yet. Retrying...');
// // // // // //           return null;
// // // // // //         } else {
// // // // // //           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
// // // // // //         }
// // // // // //       }
// // // // // //       const result = await response.json();
// // // // // //       setDashboardData(result);
// // // // // //       setModelTrained(true);
// // // // // //       return result;
// // // // // //     } catch (error) {
// // // // // //       console.error('Error fetching model results:', error);
// // // // // //       return null;
// // // // // //     }
// // // // // //   };

// // // // // //   const pollModelResults = async () => {
// // // // // //     setPolling(true);
// // // // // //     const interval = setInterval(async () => {
// // // // // //       const result = await fetchModelResults();
// // // // // //       if (result) {
// // // // // //         clearInterval(interval);
// // // // // //         setPolling(false);
// // // // // //       }
// // // // // //     }, 90000);
// // // // // //   };

// // // // // //   const handleTrainModel = async () => {
// // // // // //     navigate('/training', {
// // // // // //       state: {
// // // // // //         user_id,
// // // // // //         chat_id,
// // // // // //         file_url,
// // // // // //         entity_column,
// // // // // //         target_column,
// // // // // //         features,
// // // // // //       },
// // // // // //     });
// // // // // //     setTimeout(() => {
// // // // // //       pollModelResults();
// // // // // //     }, 300000);
// // // // // //   };

// // // // // //   // ------------------------------------------
// // // // // //   // D) Save Notebooks – run all cells and persist via API.
// // // // // //   // ------------------------------------------
// // // // // //   const handleSaveNotebooks = async () => {
// // // // // //     if (!user_id || !chat_id) {
// // // // // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // // // // //       return;
// // // // // //     }
// // // // // //     let cellResults: any[] = [];
// // // // // //     if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// // // // // //       const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
// // // // // //       cellResults = cellResults.concat(timeCells);
// // // // // //     } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
// // // // // //       const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// // // // // //       cellResults = cellResults.concat(nonTimeCells);
// // // // // //     }
// // // // // //     console.log('Cell results being sent to SaveNotebooksView:', cellResults);
// // // // // //     setSavingNotebooks(true);
// // // // // //     try {
// // // // // //       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// // // // // //         method: 'POST',
// // // // // //         headers: {
// // // // // //           'Content-Type': 'application/json',
// // // // // //           // Replace with your auth token as needed.
// // // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // // // //         },
// // // // // //         body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
// // // // // //       });

// // // // // //       if (!resp.ok) {
// // // // // //         const errData = await resp.json().catch(() => ({}));
// // // // // //         throw new Error(errData.error || 'Failed to save notebooks.');
// // // // // //       }
// // // // // //       alert('Notebooks saved successfully!');
// // // // // //     } catch (err: any) {
// // // // // //       console.error('Error saving notebooks:', err);
// // // // // //       alert(`Error saving notebooks: ${err.message}`);
// // // // // //     } finally {
// // // // // //       setSavingNotebooks(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // ------------------------------------------
// // // // // //   // E) Auto-run all notebooks once they load.
// // // // // //   // ------------------------------------------
// // // // // //   useEffect(() => {
// // // // // //     if (
// // // // // //       !autoRunDoneRef.current &&
// // // // // //       !loadingNotebook &&
// // // // // //       !fetchError &&
// // // // // //       fetchedNotebooks.length > 0
// // // // // //     ) {
// // // // // //       autoRunDoneRef.current = true;
// // // // // //       console.log('Auto-running all notebook cells...');
// // // // // //       setTimeout(async () => {
// // // // // //         try {
// // // // // //           if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// // // // // //             await timeNotebookRef.current.runAllCellsAndGetResults();
// // // // // //           } else if (
// // // // // //             nonTimeBasedNotebookCells.length > 0 &&
// // // // // //             nonTimeBasedNotebookRef.current
// // // // // //           ) {
// // // // // //             await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// // // // // //           }
// // // // // //           console.log('Auto-run complete.');
// // // // // //         } catch (err) {
// // // // // //           console.error('Error auto-running cells:', err);
// // // // // //         }
// // // // // //       }, 1000);
// // // // // //     }
// // // // // //   }, [loadingNotebook, fetchError, fetchedNotebooks, timeBasedNotebookCells, nonTimeBasedNotebookCells]);

// // // // // //   // ------------------------------------------
// // // // // //   // F) Handle tab changes for Notebook / Dashboard / Predict.
// // // // // //   // ------------------------------------------
// // // // // //   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
// // // // // //     setActiveTab(tabId);
// // // // // //   };

// // // // // //   // ------------------------------------------
// // // // // //   // Render notebooks using the parsed cell arrays.
// // // // // //   // ------------------------------------------
// // // // // //   const timeNotebook = timeBasedNotebookCells.length > 0 && (
// // // // // //     <div className="space-y-8">
// // // // // //       <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
// // // // // //       <SQLNotebook
// // // // // //         ref={timeNotebookRef}
// // // // // //         activeTab="time_based_notebook"
// // // // // //         notebookContent={{
// // // // // //           file_url,
// // // // // //           entity_column,
// // // // // //           target_column,
// // // // // //           features,
// // // // // //           user_id,
// // // // // //           chat_id,
// // // // // //           isTrained: modelTrained,
// // // // // //           handleTrainModel,
// // // // // //           cells: timeBasedNotebookCells,
// // // // // //         }}
// // // // // //       />
// // // // // //     </div>
// // // // // //   );

// // // // // //   const nonTimeBasedNotebook = nonTimeBasedNotebookCells.length > 0 && (
// // // // // //     <div className="space-y-8">
// // // // // //       <h2 className="text-xl font-bold mb-4">Analysis Notebook</h2>
// // // // // //       <SQLNotebook
// // // // // //         ref={nonTimeBasedNotebookRef}
// // // // // //         activeTab="non_time_based_notebook"
// // // // // //         notebookContent={{
// // // // // //           file_url,
// // // // // //           entity_column,
// // // // // //           target_column,
// // // // // //           features,
// // // // // //           user_id,
// // // // // //           chat_id,
// // // // // //           isTrained: modelTrained,
// // // // // //           handleTrainModel,
// // // // // //           cells: nonTimeBasedNotebookCells,
// // // // // //         }}
// // // // // //       />
// // // // // //     </div>
// // // // // //   );

// // // // // //   return (
// // // // // //     <div className="relative h-screen overflow-hidden">
// // // // // //       {/* Top Navbar */}
// // // // // //       <div className="fixed top-0 left-0 right-0 z-50">
// // // // // //         <Navbar
// // // // // //           isSidebarOpen={isSidebarOpen}
// // // // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // // // //           notebooks={[
// // // // // //             {
// // // // // //               id: 'notebook',
// // // // // //               title: 'Notebook',
// // // // // //               icon: <FiBook size={18} />,
// // // // // //               onClick: () => handleTabChange('notebook'),
// // // // // //             },
// // // // // //             {
// // // // // //               id: 'dashboard',
// // // // // //               title: 'Dashboard',
// // // // // //               icon: <FiBarChart2 size={18} />,
// // // // // //               onClick: () => handleTabChange('dashboard'),
// // // // // //             },
// // // // // //             {
// // // // // //               id: 'predict',
// // // // // //               title: 'Predict',
// // // // // //               icon: <FiFlag size={18} />,
// // // // // //               onClick: () => handleTabChange('predict'),
// // // // // //             },
// // // // // //           ]}
// // // // // //           activeTab={activeTab}
// // // // // //         />
// // // // // //       </div>

// // // // // //       {/* Left Sidebar */}
// // // // // //       <div
// // // // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // // // //         }`}
// // // // // //         style={{ width: '16rem' }}
// // // // // //       >
// // // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // // //       </div>

// // // // // //       {/* Train & Save Buttons (if model not trained) */}
// // // // // //       {!modelTrained && (
// // // // // //         <motion.div
// // // // // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // // // // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // // // // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // // // // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
// // // // // //         >
// // // // // //           <button
// // // // // //             onClick={handleTrainModel}
// // // // // //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // //             aria-label="Train your predictive model"
// // // // // //           >
// // // // // //             Train Model
// // // // // //           </button>

// // // // // //           <button
// // // // // //             onClick={handleSaveNotebooks}
// // // // // //             disabled={savingNotebooks}
// // // // // //             className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // // // // //             aria-label="Save Notebooks"
// // // // // //           >
// // // // // //             {savingNotebooks ? (
// // // // // //               <>
// // // // // //                 <FiLoader className="mr-2 animate-spin" />
// // // // // //                 Saving...
// // // // // //               </>
// // // // // //             ) : (
// // // // // //               'Save Notebooks'
// // // // // //             )}
// // // // // //           </button>
// // // // // //         </motion.div>
// // // // // //       )}

// // // // // //       {/* Main Content Area */}
// // // // // //       <div
// // // // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // // // //         }`}
// // // // // //       >
// // // // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto p-4">
// // // // // //           <div className="w-full max-w-6xl mx-auto">
// // // // // //             {/* Display Predictive Settings above the notebook shells */}
// // // // // //             {predictiveSettings && (
// // // // // //               <div className="p-4 border rounded-lg bg-gray-50 mb-4">
// // // // // //                 <h2 className="text-lg font-bold mb-2">Predictive Settings</h2>
// // // // // //                 <ul className="list-disc list-inside">
// // // // // //                   <li>
// // // // // //                     <strong>Target Column:</strong>{' '}
// // // // // //                     {predictiveSettings.target_column || 'Null'}
// // // // // //                   </li>
// // // // // //                   <li>
// // // // // //                     <strong>Entity Column:</strong>{' '}
// // // // // //                     {predictiveSettings.entity_column || 'Null'}
// // // // // //                   </li>
// // // // // //                   <li>
// // // // // //                     <strong>Time Column:</strong>{' '}
// // // // // //                     {predictiveSettings.time_column || 'Null'}
// // // // // //                   </li>
// // // // // //                   <li>
// // // // // //                     <strong>Predictive Question:</strong>{' '}
// // // // // //                     {predictiveSettings.predictive_question || 'Null'}
// // // // // //                   </li>
// // // // // //                   <li>
// // // // // //                     <strong>Time Frame:</strong>{' '}
// // // // // //                     {predictiveSettings.time_frame || 'Null'}
// // // // // //                   </li>
// // // // // //                   <li>
// // // // // //                     <strong>Time Frequency:</strong>{' '}
// // // // // //                     {predictiveSettings.time_frequency || 'Null'}
// // // // // //                   </li>
// // // // // //                   <li>
// // // // // //                     <strong>Machine Learning Type:</strong>{' '}
// // // // // //                     {predictiveSettings.machine_learning_type || 'Null'}
// // // // // //                   </li>
// // // // // //                 </ul>
// // // // // //               </div>
// // // // // //             )}

// // // // // //             {/* Notebook Tab */}
// // // // // //             <div style={{ display: activeTab === 'notebook' ? 'block' : 'none' }}>
// // // // // //               {loadingNotebook ? (
// // // // // //                 <div className="p-4">Loading notebook data...</div>
// // // // // //               ) : fetchError ? (
// // // // // //                 <div className="p-4 text-red-600">Error: {fetchError}</div>
// // // // // //               ) : (
// // // // // //                 <>
// // // // // //                   {timeBasedNotebookCells.length > 0
// // // // // //                     ? timeNotebook
// // // // // //                     : nonTimeBasedNotebook}
// // // // // //                 </>
// // // // // //               )}
// // // // // //             </div>

// // // // // //             {/* Dashboard Tab */}
// // // // // //             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
// // // // // //               <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // // // // //             </div>

// // // // // //             {/* Predict Tab */}
// // // // // //             <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
// // // // // //               {!modelTrained ? (
// // // // // //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // // //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // // //                     <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // //                     <h3 className="text-xl font-semibold mb-2">
// // // // // //                       Predictions Not Available
// // // // // //                     </h3>
// // // // // //                     <p className="text-gray-600">
// // // // // //                       Please train your model first to make predictions.
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               ) : (
// // // // // //                 <PredictionsUI />
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default NotebookLayout;





// // // // // import React, { useState, useEffect, useRef } from 'react';
// // // // // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // // // // import Dashboard from '../Dashboard/Dashboard';
// // // // // import PredictionsUI from '../Predict/PredictNewData';
// // // // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // // // import { motion } from 'framer-motion';
// // // // // import Sidebar from '../NotebookUI/Sidebar/Sidebar';

// // // // // interface Metrics {
// // // // //   rmse: number;
// // // // //   r2_score: number;
// // // // //   mae: number;
// // // // // }

// // // // // interface ModelMetrics {
// // // // //   training: Metrics;
// // // // //   testing: Metrics;
// // // // //   assessment: string;
// // // // // }

// // // // // interface MetricsData {
// // // // //   model_metrics: ModelMetrics;
// // // // //   feature_importance: Record<string, number>;
// // // // //   predictions: {
// // // // //     actual: number[];
// // // // //     predicted: number[];
// // // // //   };
// // // // //   user_id: string;
// // // // //   chat_id: string;
// // // // //   feature_analysis?: any;
// // // // //   model_metadata?: any;
// // // // //   data_characteristics?: any;
// // // // //   core_statistics?: any;
// // // // //   attribute_statistics?: any;
// // // // // }

// // // // // const NotebookLayout: React.FC = () => {
// // // // //   const { user_id = '', chat_id = '' } = useParams();
// // // // //   const location = useLocation();
// // // // //   const navigate = useNavigate();

// // // // //   const [predictiveSettings, setPredictiveSettings] = useState<any>(null);
// // // // //   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// // // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // // // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // // // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // // // //   const [modelTrained, setModelTrained] = useState(false);
// // // // //   const [polling, setPolling] = useState(false);
// // // // //   const [savingNotebooks, setSavingNotebooks] = useState(false);
// // // // //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// // // // //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// // // // //   const [fetchError, setFetchError] = useState<string | null>(null);

// // // // //   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
// // // // //   const nonTimeBasedNotebookRef = useRef<SQLNotebookRef | null>(null);
// // // // //   const autoRunDoneRef = useRef(false);

// // // // //   // Fetch predictive settings
// // // // //   useEffect(() => {
// // // // //     if (!user_id || !chat_id) return;
// // // // //     const fetchPredictiveSettings = async () => {
// // // // //       try {
// // // // //         const response = await fetch(
// // // // //           `http://98.70.25.52/api/predictive-settings/${user_id}/${chat_id}/`
// // // // //         );
// // // // //         if (!response.ok) {
// // // // //           throw new Error(`Failed to fetch predictive settings: ${response.statusText}`);
// // // // //         }
// // // // //         const data = await response.json();
// // // // //         setPredictiveSettings(data);
// // // // //       } catch (error: any) {
// // // // //         console.error("Error fetching predictive settings:", error);
// // // // //       }
// // // // //     };
// // // // //     fetchPredictiveSettings();
// // // // //   }, [user_id, chat_id]);

// // // // //   // Fetch notebooks
// // // // //   useEffect(() => {
// // // // //     if (!user_id || !chat_id) return;
// // // // //     const fetchNotebooks = async () => {
// // // // //       setLoadingNotebook(true);
// // // // //       setFetchError(null);
// // // // //       try {
// // // // //         const res = await fetch(
// // // // //           `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // // // //         );
// // // // //         if (!res.ok) {
// // // // //           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // // // //         }
// // // // //         const data = await res.json();
// // // // //         if (!data.notebooks || !data.notebooks.length) {
// // // // //           setFetchedNotebooks([]);
// // // // //           setFetchError('No notebooks found for this user/chat.');
// // // // //         } else {
// // // // //           setFetchedNotebooks(data.notebooks);
// // // // //         }
// // // // //       } catch (err: any) {
// // // // //         console.error('Error fetching notebooks:', err);
// // // // //         setFetchError(err.message);
// // // // //       } finally {
// // // // //         setLoadingNotebook(false);
// // // // //       }
// // // // //     };
// // // // //     fetchNotebooks();
// // // // //   }, [user_id, chat_id]);

// // // // //   // Parse notebooks
// // // // //   let timeBasedNotebookCells: any[] = [];
// // // // //   let nonTimeBasedNotebookCells: any[] = [];
// // // // //   let file_url = '';
// // // // //   let entity_column = '';
// // // // //   let target_column = '';
// // // // //   let features: string[] = [];

// // // // //   if (fetchedNotebooks.length > 0) {
// // // // //     const nb0 = fetchedNotebooks[0];
// // // // //     file_url = nb0.file_url;
// // // // //     entity_column = nb0.entity_column;
// // // // //     target_column = nb0.target_column;
// // // // //     features = nb0.features || [];
// // // // //     const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
// // // // //     if (nonTimeBasedNotebooks.length > 0) {
// // // // //       try {
// // // // //         nonTimeBasedNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// // // // //       } catch (err) {
// // // // //         console.error('Error parsing non–time-based notebook JSON:', err);
// // // // //       }
// // // // //     }
// // // // //     const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
// // // // //     if (timeBasedNotebooks.length > 0) {
// // // // //       try {
// // // // //         timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
// // // // //       } catch (err) {
// // // // //         console.error('Error parsing time–based notebook JSON:', err);
// // // // //       }
// // // // //     }
// // // // //   }

// // // // //   // Polling / model training
// // // // //   const fetchModelResults = async () => {
// // // // //     try {
// // // // //       const url = ` http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // // // //       const response = await fetch(url);
// // // // //       if (!response.ok) {
// // // // //         if (response.status === 404) {
// // // // //           console.log('Model results not found yet. Retrying...');
// // // // //           return null;
// // // // //         } else {
// // // // //           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
// // // // //         }
// // // // //       }
// // // // //       const result = await response.json();
// // // // //       setDashboardData(result);
// // // // //       setModelTrained(true);
// // // // //       return result;
// // // // //     } catch (error) {
// // // // //       console.error('Error fetching model results:', error);
// // // // //       return null;
// // // // //     }
// // // // //   };

// // // // //   const pollModelResults = async () => {
// // // // //     setPolling(true);
// // // // //     const interval = setInterval(async () => {
// // // // //       const result = await fetchModelResults();
// // // // //       if (result) {
// // // // //         clearInterval(interval);
// // // // //         setPolling(false);
// // // // //       }
// // // // //     }, 90000);
// // // // //   };

// // // // //   const handleTrainModel = async () => {
// // // // //     navigate('/training', {
// // // // //       state: { user_id, chat_id, file_url, entity_column, target_column, features },
// // // // //     });
// // // // //     setTimeout(() => {
// // // // //       pollModelResults();
// // // // //     }, 300000);
// // // // //   };

// // // // //   // Save notebooks
// // // // //   const handleSaveNotebooks = async () => {
// // // // //     if (!user_id || !chat_id) {
// // // // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // // // //       return;
// // // // //     }
// // // // //     let cellResults: any[] = [];
// // // // //     if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// // // // //       const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
// // // // //       cellResults = cellResults.concat(timeCells);
// // // // //     } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
// // // // //       const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// // // // //       cellResults = cellResults.concat(nonTimeCells);
// // // // //     }
// // // // //     console.log('Cell results being sent to SaveNotebooksView:', cellResults);
// // // // //     setSavingNotebooks(true);
// // // // //     try {
// // // // //       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// // // // //         method: 'POST',
// // // // //         headers: {
// // // // //           'Content-Type': 'application/json',
// // // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // // //         },
// // // // //         body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
// // // // //       });
// // // // //       if (!resp.ok) {
// // // // //         const errData = await resp.json().catch(() => ({}));
// // // // //         throw new Error(errData.error || 'Failed to save notebooks.');
// // // // //       }
// // // // //       alert('Notebooks saved successfully!');
// // // // //     } catch (err: any) {
// // // // //       console.error('Error saving notebooks:', err);
// // // // //       alert(`Error saving notebooks: ${err.message}`);
// // // // //     } finally {
// // // // //       setSavingNotebooks(false);
// // // // //     }
// // // // //   };

// // // // //   // Auto-run notebooks
// // // // //   useEffect(() => {
// // // // //     if (
// // // // //       !autoRunDoneRef.current &&
// // // // //       !loadingNotebook &&
// // // // //       !fetchError &&
// // // // //       fetchedNotebooks.length > 0
// // // // //     ) {
// // // // //       autoRunDoneRef.current = true;
// // // // //       console.log('Auto-running all notebook cells...');
// // // // //       setTimeout(async () => {
// // // // //         try {
// // // // //           if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// // // // //             await timeNotebookRef.current.runAllCellsAndGetResults();
// // // // //           } else if (
// // // // //             nonTimeBasedNotebookCells.length > 0 &&
// // // // //             nonTimeBasedNotebookRef.current
// // // // //           ) {
// // // // //             await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// // // // //           }
// // // // //           console.log('Auto-run complete.');
// // // // //         } catch (err) {
// // // // //           console.error('Error auto-running cells:', err);
// // // // //         }
// // // // //       }, 1000);
// // // // //     }
// // // // //   }, [loadingNotebook, fetchError, fetchedNotebooks, timeBasedNotebookCells, nonTimeBasedNotebookCells]);

// // // // //   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
// // // // //     setActiveTab(tabId);
// // // // //   };

// // // // //   const timeNotebook = timeBasedNotebookCells.length > 0 && (
// // // // //     <div className="space-y-8">
// // // // //       <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
// // // // //       <SQLNotebook
// // // // //         ref={timeNotebookRef}
// // // // //         activeTab="time_based_notebook"
// // // // //         notebookContent={{
// // // // //           file_url,
// // // // //           entity_column,
// // // // //           target_column,
// // // // //           features,
// // // // //           user_id,
// // // // //           chat_id,
// // // // //           isTrained: modelTrained,
// // // // //           handleTrainModel,
// // // // //           cells: timeBasedNotebookCells,
// // // // //         }}
// // // // //       />
// // // // //     </div>
// // // // //   );

// // // // //   const nonTimeBasedNotebook = nonTimeBasedNotebookCells.length > 0 && (
// // // // //     <div className="space-y-8">
// // // // //       <h2 className="text-xl font-bold mb-4">Analysis Notebook</h2>
// // // // //       <SQLNotebook
// // // // //         ref={nonTimeBasedNotebookRef}
// // // // //         activeTab="non_time_based_notebook"
// // // // //         notebookContent={{
// // // // //           file_url,
// // // // //           entity_column,
// // // // //           target_column,
// // // // //           features,
// // // // //           user_id,
// // // // //           chat_id,
// // // // //           isTrained: modelTrained,
// // // // //           handleTrainModel,
// // // // //           cells: nonTimeBasedNotebookCells,
// // // // //         }}
// // // // //       />
// // // // //     </div>
// // // // //   );

// // // // //   return (
// // // // //     <div className="relative h-screen overflow-hidden bg-gray-100">
// // // // //       {/* Top Navbar */}
// // // // //       <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-purple-900 shadow-sm">
// // // // //         <Navbar
// // // // //           isSidebarOpen={isSidebarOpen}
// // // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // // //           notebooks={[
// // // // //             { id: 'notebook', title: 'Notebook', icon: <FiBook size={18} className="text-purple-900" />, onClick: () => handleTabChange('notebook') },
// // // // //             { id: 'dashboard', title: 'Dashboard', icon: <FiBarChart2 size={18} className="text-purple-900" />, onClick: () => handleTabChange('dashboard') },
// // // // //             { id: 'predict', title: 'Predict', icon: <FiFlag size={18} className="text-purple-900" />, onClick: () => handleTabChange('predict') },
// // // // //           ]}
// // // // //           activeTab={activeTab}
// // // // //         />
// // // // //       </div>

// // // // //       {/* Left Sidebar */}
// // // // //       <div
// // // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // // //         }`}
// // // // //         style={{ width: '16rem' }}
// // // // //       >
// // // // //         <Sidebar isOpen={isSidebarOpen} />
// // // // //       </div>

// // // // //       {/* Train & Save Buttons */}
// // // // //       {!modelTrained && (
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // // // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // // // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // // // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
// // // // //         >
// // // // //           <button
// // // // //             onClick={handleTrainModel}
// // // // //             className="flex items-center px-4 py-2 bg-purple-900 text-white rounded-md shadow-md hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
// // // // //             aria-label="Train your predictive model"
// // // // //           >
// // // // //             Train Model
// // // // //           </button>
// // // // //           <button
// // // // //             onClick={handleSaveNotebooks}
// // // // //             disabled={savingNotebooks}
// // // // //             className="flex items-center px-4 py-2 border border-purple-900 text-purple-900 text-sm rounded-md shadow-md hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
// // // // //             aria-label="Save Notebooks"
// // // // //           >
// // // // //             {savingNotebooks ? (
// // // // //               <>
// // // // //                 <FiLoader className="mr-2 animate-spin" />
// // // // //                 Saving...
// // // // //               </>
// // // // //             ) : (
// // // // //               'Save Notebooks'
// // // // //             )}
// // // // //           </button>
// // // // //         </motion.div>
// // // // //       )}

// // // // //       {/* Main Content Area */}
// // // // //       <div
// // // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // // //         }`}
// // // // //       >
// // // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto p-6">
// // // // //           <div className="w-full max-w-6xl mx-auto">
// // // // //             {/* Predictive Settings UI - Only on Notebook tab */}
// // // // //             {activeTab === 'notebook' && predictiveSettings && (
// // // // //               <div className="mb-8">
// // // // //                 {/* Predictive Question as Heading */}
// // // // //                 <motion.div
// // // // //                   initial={{ opacity: 0, y: -10 }}
// // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // //                   transition={{ duration: 0.4, ease: 'easeOut' }}
// // // // //                   className="mb-6"
// // // // //                 >
// // // // //                   <h1 className="text-2xl font-semibold  border-b-2 border-purple-300 pb-2">
// // // // //                     {predictiveSettings.predictive_question || 'No Predictive Question Set'}
// // // // //                   </h1>
// // // // //                 </motion.div>

// // // // //                 {/* Other Settings in a Horizontal List */}
// // // // //                 <motion.div
// // // // //                   initial={{ opacity: 0, y: 10 }}
// // // // //                   animate={{ opacity: 1, y: 0 }}
// // // // //                   transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
// // // // //                   className="flex flex-wrap gap-4"
// // // // //                 >
// // // // //                   {/* Target Column */}
// // // // //                   <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm hover:border-purple-700 transition-colors">
// // // // //                     <span className=" font-medium text-gray-600">Target:</span>{' '}
// // // // //                     <span className="font-medium text-purple-900">{predictiveSettings.target_column || 'Null'}</span>
// // // // //                   </div>

// // // // //                   {/* Entity Column */}
// // // // //                   <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm hover:border-purple-700 transition-colors">
// // // // //                     <span className="font-medium text-gray-600">Entity:</span>{' '}
// // // // //                     <span className="font-medium text-purple-900">{predictiveSettings.entity_column || 'Null'}</span>
// // // // //                   </div>

// // // // //                   {/* Time Column */}
// // // // //                   <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm hover:border-purple-700 transition-colors">
// // // // //                     <span className="font-medium text-gray-600">Time:</span>{' '}
// // // // //                     <span className=" font-medium text-purple-900">{predictiveSettings.time_column || 'Null'}</span>
// // // // //                   </div>

// // // // //                   {/* Time Frame */}
// // // // //                   <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm hover:border-purple-700 transition-colors">
// // // // //                     <span className="font-medium text-gray-600">Frame:</span>{' '}
// // // // //                     <span className="font-medium text-purple-900">{predictiveSettings.time_frame || 'Null'}</span>
// // // // //                   </div>

// // // // //                   {/* Time Frequency */}
// // // // //                   <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm hover:border-purple-700 transition-colors">
// // // // //                     <span className="font-medium text-gray-600">Frequency:</span>{' '}
// // // // //                     <span className="font-medium text-purple-900">{predictiveSettings.time_frequency || 'Null'}</span>
// // // // //                   </div>

// // // // //                   {/* Machine Learning Type */}
// // // // //                   <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-sm hover:border-purple-700 transition-colors">
// // // // //                     <span className="font-medium text-gray-600">ML Type:</span>{' '}
// // // // //                     <span className=" font-medium text-purple-900">{predictiveSettings.machine_learning_type || 'Null'}</span>
// // // // //                   </div>
// // // // //                 </motion.div>
// // // // //               </div>
// // // // //             )}

// // // // //             {/* Notebook Tab */}
// // // // //             <div style={{ display: activeTab === 'notebook' ? 'block' : 'none' }}>
// // // // //               {loadingNotebook ? (
// // // // //                 <div className="p-4">Loading notebook data...</div>
// // // // //               ) : fetchError ? (
// // // // //                 <div className="p-4 text-red-600">Error: {fetchError}</div>
// // // // //               ) : (
// // // // //                 <>
// // // // //                   {timeBasedNotebookCells.length > 0
// // // // //                     ? timeNotebook
// // // // //                     : nonTimeBasedNotebook}
// // // // //                 </>
// // // // //               )}
// // // // //             </div>

// // // // //             {/* Dashboard Tab */}
// // // // //             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
// // // // //               <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // // // //             </div>

// // // // //             {/* Predict Tab */}
// // // // //             <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
// // // // //               {!modelTrained ? (
// // // // //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // // // //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // // // //                     <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // // // //                     <h3 className="text-xl font-semibold mb-2">
// // // // //                       Predictions Not Available
// // // // //                     </h3>
// // // // //                     <p className="text-gray-600">
// // // // //                       Please train your model first to make predictions.
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               ) : (
// // // // //                 <PredictionsUI />
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default NotebookLayout;





// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // // // import Dashboard from '../Dashboard/Dashboard';
// // // // import PredictionsUI from '../Predict/PredictNewData';
// // // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // // import { motion } from 'framer-motion';
// // // // import Sidebar from '../NotebookUI/Sidebar/Sidebar';

// // // // interface Metrics {
// // // //   rmse: number;
// // // //   r2_score: number;
// // // //   mae: number;
// // // // }

// // // // interface ModelMetrics {
// // // //   training: Metrics;
// // // //   testing: Metrics;
// // // //   assessment: string;
// // // // }

// // // // interface MetricsData {
// // // //   model_metrics: ModelMetrics;
// // // //   feature_importance: Record<string, number>;
// // // //   predictions: {
// // // //     actual: number[];
// // // //     predicted: number[];
// // // //   };
// // // //   user_id: string;
// // // //   chat_id: string;
// // // //   feature_analysis?: any;
// // // //   model_metadata?: any;
// // // //   data_characteristics?: any;
// // // //   core_statistics?: any;
// // // //   attribute_statistics?: any;
// // // // }

// // // // const NotebookLayout: React.FC = () => {
// // // //   const { user_id = '', chat_id = '' } = useParams();
// // // //   const location = useLocation();
// // // //   const navigate = useNavigate();

// // // //   const [predictiveSettings, setPredictiveSettings] = useState<any>(null);
// // // //   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// // // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // // //   const [modelTrained, setModelTrained] = useState(false);
// // // //   const [polling, setPolling] = useState(false);
// // // //   const [savingNotebooks, setSavingNotebooks] = useState(false);
// // // //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// // // //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// // // //   const [fetchError, setFetchError] = useState<string | null>(null);

// // // //   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
// // // //   const nonTimeBasedNotebookRef = useRef<SQLNotebookRef | null>(null);
// // // //   const autoRunDoneRef = useRef(false);

// // // //   // Fetch predictive settings
// // // //   useEffect(() => {
// // // //     if (!user_id || !chat_id) return;
// // // //     const fetchPredictiveSettings = async () => {
// // // //       try {
// // // //         const response = await fetch(
// // // //           `http://98.70.25.52/api/predictive-settings/${user_id}/${chat_id}/`
// // // //         );
// // // //         if (!response.ok) {
// // // //           throw new Error(`Failed to fetch predictive settings: ${response.statusText}`);
// // // //         }
// // // //         const data = await response.json();
// // // //         setPredictiveSettings(data);
// // // //       } catch (error: any) {
// // // //         console.error("Error fetching predictive settings:", error);
// // // //       }
// // // //     };
// // // //     fetchPredictiveSettings();
// // // //   }, [user_id, chat_id]);

// // // //   // Fetch notebooks
// // // //   useEffect(() => {
// // // //     if (!user_id || !chat_id) return;
// // // //     const fetchNotebooks = async () => {
// // // //       setLoadingNotebook(true);
// // // //       setFetchError(null);
// // // //       try {
// // // //         const res = await fetch(
// // // //           `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // // //         );
// // // //         if (!res.ok) {
// // // //           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // // //         }
// // // //         const data = await res.json();
// // // //         if (!data.notebooks || !data.notebooks.length) {
// // // //           setFetchedNotebooks([]);
// // // //           setFetchError('No notebooks found for this user/chat.');
// // // //         } else {
// // // //           setFetchedNotebooks(data.notebooks);
// // // //         }
// // // //       } catch (err: any) {
// // // //         console.error('Error fetching notebooks:', err);
// // // //         setFetchError(err.message);
// // // //       } finally {
// // // //         setLoadingNotebook(false);
// // // //       }
// // // //     };
// // // //     fetchNotebooks();
// // // //   }, [user_id, chat_id]);

// // // //   // Parse notebooks
// // // //   let timeBasedNotebookCells: any[] = [];
// // // //   let nonTimeBasedNotebookCells: any[] = [];
// // // //   let file_url = '';
// // // //   let entity_column = '';
// // // //   let target_column = '';
// // // //   let features: string[] = [];

// // // //   if (fetchedNotebooks.length > 0) {
// // // //     const nb0 = fetchedNotebooks[0];
// // // //     file_url = nb0.file_url;
// // // //     entity_column = nb0.entity_column;
// // // //     target_column = nb0.target_column;
// // // //     features = nb0.features || [];
// // // //     const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
// // // //     if (nonTimeBasedNotebooks.length > 0) {
// // // //       try {
// // // //         nonTimeBasedNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// // // //       } catch (err) {
// // // //         console.error('Error parsing non–time-based notebook JSON:', err);
// // // //       }
// // // //     }
// // // //     const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
// // // //     if (timeBasedNotebooks.length > 0) {
// // // //       try {
// // // //         timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
// // // //       } catch (err) {
// // // //         console.error('Error parsing time–based notebook JSON:', err);
// // // //       }
// // // //     }
// // // //   }

// // // //   // Polling / model training
// // // //   const fetchModelResults = async () => {
// // // //     try {
// // // //       const url = ` http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // // //       const response = await fetch(url);
// // // //       if (!response.ok) {
// // // //         if (response.status === 404) {
// // // //           console.log('Model results not found yet. Retrying...');
// // // //           return null;
// // // //         } else {
// // // //           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
// // // //         }
// // // //       }
// // // //       const result = await response.json();
// // // //       setDashboardData(result);
// // // //       setModelTrained(true);
// // // //       return result;
// // // //     } catch (error) {
// // // //       console.error('Error fetching model results:', error);
// // // //       return null;
// // // //     }
// // // //   };

// // // //   const pollModelResults = async () => {
// // // //     setPolling(true);
// // // //     const interval = setInterval(async () => {
// // // //       const result = await fetchModelResults();
// // // //       if (result) {
// // // //         clearInterval(interval);
// // // //         setPolling(false);
// // // //       }
// // // //     }, 90000);
// // // //   };

// // // //   const handleTrainModel = async () => {
// // // //     navigate('/training', {
// // // //       state: { user_id, chat_id, file_url, entity_column, target_column, features },
// // // //     });
// // // //     setTimeout(() => {
// // // //       pollModelResults();
// // // //     }, 300000);
// // // //   };

// // // //   // Save notebooks
// // // //   const handleSaveNotebooks = async () => {
// // // //     if (!user_id || !chat_id) {
// // // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // // //       return;
// // // //     }
// // // //     let cellResults: any[] = [];
// // // //     if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// // // //       const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
// // // //       cellResults = cellResults.concat(timeCells);
// // // //     } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
// // // //       const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// // // //       cellResults = cellResults.concat(nonTimeCells);
// // // //     }
// // // //     console.log('Cell results being sent to SaveNotebooksView:', cellResults);
// // // //     setSavingNotebooks(true);
// // // //     try {
// // // //       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// // // //         method: 'POST',
// // // //         headers: {
// // // //           'Content-Type': 'application/json',
// // // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // // //         },
// // // //         body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
// // // //       });
// // // //       if (!resp.ok) {
// // // //         const errData = await resp.json().catch(() => ({}));
// // // //         throw new Error(errData.error || 'Failed to save notebooks.');
// // // //       }
// // // //       alert('Notebooks saved successfully!');
// // // //     } catch (err: any) {
// // // //       console.error('Error saving notebooks:', err);
// // // //       alert(`Error saving notebooks: ${err.message}`);
// // // //     } finally {
// // // //       setSavingNotebooks(false);
// // // //     }
// // // //   };

// // // //   // Auto-run notebooks
// // // //   useEffect(() => {
// // // //     if (
// // // //       !autoRunDoneRef.current &&
// // // //       !loadingNotebook &&
// // // //       !fetchError &&
// // // //       fetchedNotebooks.length > 0
// // // //     ) {
// // // //       autoRunDoneRef.current = true;
// // // //       console.log('Auto-running all notebook cells...');
// // // //       setTimeout(async () => {
// // // //         try {
// // // //           if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// // // //             await timeNotebookRef.current.runAllCellsAndGetResults();
// // // //           } else if (
// // // //             nonTimeBasedNotebookCells.length > 0 &&
// // // //             nonTimeBasedNotebookRef.current
// // // //           ) {
// // // //             await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// // // //           }
// // // //           console.log('Auto-run complete.');
// // // //         } catch (err) {
// // // //           console.error('Error auto-running cells:', err);
// // // //         }
// // // //       }, 1000);
// // // //     }
// // // //   }, [loadingNotebook, fetchError, fetchedNotebooks, timeBasedNotebookCells, nonTimeBasedNotebookCells]);

// // // //   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
// // // //     setActiveTab(tabId);
// // // //   };

// // // //   const timeNotebook = timeBasedNotebookCells.length > 0 && (
// // // //     <div className="space-y-12">
// // // //       <h2 className="text-2xl font-bold mb-6">Time-Based Analysis Notebook</h2>
// // // //       <SQLNotebook
// // // //         ref={timeNotebookRef}
// // // //         activeTab="time_based_notebook"
// // // //         notebookContent={{
// // // //           file_url,
// // // //           entity_column,
// // // //           target_column,
// // // //           features,
// // // //           user_id,
// // // //           chat_id,
// // // //           isTrained: modelTrained,
// // // //           handleTrainModel,
// // // //           cells: timeBasedNotebookCells,
// // // //         }}
// // // //       />
// // // //     </div>
// // // //   );

// // // //   const nonTimeBasedNotebook = nonTimeBasedNotebookCells.length > 0 && (
// // // //     <div className="space-y-12">
// // // //       <h2 className="text-2xl font-bold mb-6">Analysis Notebook</h2>
// // // //       <SQLNotebook
// // // //         ref={nonTimeBasedNotebookRef}
// // // //         activeTab="non_time_based_notebook"
// // // //         notebookContent={{
// // // //           file_url,
// // // //           entity_column,
// // // //           target_column,
// // // //           features,
// // // //           user_id,
// // // //           chat_id,
// // // //           isTrained: modelTrained,
// // // //           handleTrainModel,
// // // //           cells: nonTimeBasedNotebookCells,
// // // //         }}
// // // //       />
// // // //     </div>
// // // //   );

// // // //   return (
// // // //     <div className="relative h-screen overflow-hidden bg-gray-100">
// // // //       {/* Top Navbar */}
// // // //       <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-purple-900 shadow-sm">
// // // //         <Navbar
// // // //           isSidebarOpen={isSidebarOpen}
// // // //           setIsSidebarOpen={setIsSidebarOpen}
// // // //           notebooks={[
// // // //             { id: 'notebook', title: 'Notebook', icon: <FiBook size={18} className="text-purple-900" />, onClick: () => handleTabChange('notebook') },
// // // //             { id: 'dashboard', title: 'Dashboard', icon: <FiBarChart2 size={18} className="text-purple-900" />, onClick: () => handleTabChange('dashboard') },
// // // //             { id: 'predict', title: 'Predict', icon: <FiFlag size={18} className="text-purple-900" />, onClick: () => handleTabChange('predict') },
// // // //           ]}
// // // //           activeTab={activeTab}
// // // //         />
// // // //       </div>

// // // //       {/* Left Sidebar */}
// // // //       <div
// // // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // // //         }`}
// // // //         style={{ width: '16rem' }}
// // // //       >
// // // //         <Sidebar isOpen={isSidebarOpen} />
// // // //       </div>

// // // //       {/* Train & Save Buttons */}
// // // //       {!modelTrained && (
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-4"
// // // //         >
// // // //           <button
// // // //             onClick={handleTrainModel}
// // // //             className="flex items-center px-6 py-3 bg-purple-900 text-white rounded-md shadow-md hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
// // // //             aria-label="Train your predictive model"
// // // //           >
// // // //             Train Model
// // // //           </button>
// // // //           <button
// // // //             onClick={handleSaveNotebooks}
// // // //             disabled={savingNotebooks}
// // // //             className="flex items-center px-6 py-3 border border-purple-900 text-purple-900 text-sm rounded-md shadow-md hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
// // // //             aria-label="Save Notebooks"
// // // //           >
// // // //             {savingNotebooks ? (
// // // //               <>
// // // //                 <FiLoader className="mr-2 animate-spin" />
// // // //                 Saving...
// // // //               </>
// // // //             ) : (
// // // //               'Save Notebooks'
// // // //             )}
// // // //           </button>
// // // //         </motion.div>
// // // //       )}

// // // //       {/* Main Content Area */}
// // // //       <div
// // // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // // //           isSidebarOpen ? 'left-64' : 'left-0'
// // // //         }`}
// // // //       >
// // // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto p-8">
// // // //           <div className="w-full max-w-6xl mx-auto">
// // // //             {/* Predictive Settings UI - Only on Notebook tab */}
// // // //             {activeTab === 'notebook' && predictiveSettings && (
// // // //               <div className="mb-12">
// // // //                 {/* Predictive Question as Heading */}
// // // //                 <motion.div
// // // //                   initial={{ opacity: 0, y: -10 }}
// // // //                   animate={{ opacity: 1, y: 0 }}
// // // //                   transition={{ duration: 0.4, ease: 'easeOut' }}
// // // //                   className="mb-8"
// // // //                 >
// // // //                   <h1 className="text-2xl font-semibold border-b border-purple-200 pb-4">
// // // //                     {predictiveSettings.predictive_question || 'No Predictive Question Set'}
// // // //                   </h1>
// // // //                 </motion.div>

// // // //                 {/* Other Settings in a Horizontal List with more spacing */}
// // // //                 <motion.div
// // // //                   initial={{ opacity: 0, y: 10 }}
// // // //                   animate={{ opacity: 1, y: 0 }}
// // // //                   transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
// // // //                   className="flex flex-wrap gap-6"
// // // //                 >
// // // //                   {/* Target Column */}
// // // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // // //                     <span className="font-medium text-gray-600">Target:</span>{' '}
// // // //                     <span className="font-medium text-purple-900">{predictiveSettings.target_column || 'Null'}</span>
// // // //                   </div>

// // // //                   {/* Entity Column */}
// // // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // // //                     <span className="font-medium text-gray-600">Entity:</span>{' '}
// // // //                     <span className="font-medium text-purple-900">{predictiveSettings.entity_column || 'Null'}</span>
// // // //                   </div>

// // // //                   {/* Time Column */}
// // // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // // //                     <span className="font-medium text-gray-600">Time:</span>{' '}
// // // //                     <span className="font-medium text-purple-900">{predictiveSettings.time_column || 'Null'}</span>
// // // //                   </div>

// // // //                   {/* Time Frame */}
// // // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // // //                     <span className="font-medium text-gray-600">Frame:</span>{' '}
// // // //                     <span className="font-medium text-purple-900">{predictiveSettings.time_frame || 'Null'}</span>
// // // //                   </div>

// // // //                   {/* Time Frequency */}
// // // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // // //                     <span className="font-medium text-gray-600">Frequency:</span>{' '}
// // // //                     <span className="font-medium text-purple-900">{predictiveSettings.time_frequency || 'Null'}</span>
// // // //                   </div>

// // // //                   {/* Machine Learning Type */}
// // // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // // //                     <span className="font-medium text-gray-600">ML Type:</span>{' '}
// // // //                     <span className="font-medium text-purple-900">{predictiveSettings.machine_learning_type || 'Null'}</span>
// // // //                   </div>
// // // //                 </motion.div>
// // // //               </div>
// // // //             )}

// // // //             {/* Notebook Tab */}
// // // //             <div style={{ display: activeTab === 'notebook' ? 'block' : 'none' }}>
// // // //               {loadingNotebook ? (
// // // //                 <div className="p-8 text-center">Loading notebook data...</div>
// // // //               ) : fetchError ? (
// // // //                 <div className="p-8 text-center text-red-600">Error: {fetchError}</div>
// // // //               ) : (
// // // //                 <>
// // // //                   {timeBasedNotebookCells.length > 0
// // // //                     ? timeNotebook
// // // //                     : nonTimeBasedNotebook}
// // // //                 </>
// // // //               )}
// // // //             </div>

// // // //             {/* Dashboard Tab */}
// // // //             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
// // // //               <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // // //             </div>

// // // //             {/* Predict Tab */}
// // // //             <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
// // // //               {!modelTrained ? (
// // // //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)] p-8">
// // // //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md w-full max-w-2xl">
// // // //                     <FiFlag className="mx-auto mb-6 text-gray-400" size={48} />
// // // //                     <h3 className="text-2xl font-semibold mb-4">
// // // //                       Predictions Not Available
// // // //                     </h3>
// // // //                     <p className="text-lg text-gray-600">
// // // //                       Please train your model first to make predictions.
// // // //                     </p>
// // // //                   </div>
// // // //                 </div>
// // // //               ) : (
// // // //                 <PredictionsUI />
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default NotebookLayout;






// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // // import Dashboard from '../Dashboard/Dashboard';
// // // import PredictionsUI from '../Predict/PredictNewData';
// // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // import { motion } from 'framer-motion';
// // // import Sidebar from '../NotebookUI/Sidebar/Sidebar';
// // // import { Monitor } from 'lucide-react';

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
// // //   feature_analysis?: any;
// // //   model_metadata?: any;
// // //   data_characteristics?: any;
// // //   core_statistics?: any;
// // //   attribute_statistics?: any;
// // // }

// // // const NotebookLayout: React.FC = () => {
// // //   const { user_id = '', chat_id = '' } = useParams();
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   const [predictiveSettings, setPredictiveSettings] = useState<any>(null);
// // //   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // //   const [modelTrained, setModelTrained] = useState(false);
// // //   const [polling, setPolling] = useState(false);
// // //   const [savingNotebooks, setSavingNotebooks] = useState(false);
// // //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// // //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// // //   const [fetchError, setFetchError] = useState<string | null>(null);

// // //   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
// // //   const nonTimeBasedNotebookRef = useRef<SQLNotebookRef | null>(null);
// // //   const autoRunDoneRef = useRef(false);

// // //   // Fetch predictive settings
// // //   useEffect(() => {
// // //     if (!user_id || !chat_id) return;
// // //     const fetchPredictiveSettings = async () => {
// // //       try {
// // //         const response = await fetch(
// // //           `http://98.70.25.52/api/predictive-settings/${user_id}/${chat_id}/`
// // //         );
// // //         if (!response.ok) {
// // //           throw new Error(`Failed to fetch predictive settings: ${response.statusText}`);
// // //         }
// // //         const data = await response.json();
// // //         setPredictiveSettings(data);
// // //       } catch (error: any) {
// // //         console.error("Error fetching predictive settings:", error);
// // //       }
// // //     };
// // //     fetchPredictiveSettings();
// // //   }, [user_id, chat_id]);

// // //   // Fetch notebooks
// // //   useEffect(() => {
// // //     if (!user_id || !chat_id) return;
// // //     const fetchNotebooks = async () => {
// // //       setLoadingNotebook(true);
// // //       setFetchError(null);
// // //       try {
// // //         const res = await fetch(
// // //           `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // //         );
// // //         if (!res.ok) {
// // //           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // //         }
// // //         const data = await res.json();
// // //         if (!data.notebooks || !data.notebooks.length) {
// // //           setFetchedNotebooks([]);
// // //           setFetchError('No notebooks found for this user/chat.');
// // //         } else {
// // //           setFetchedNotebooks(data.notebooks);
// // //         }
// // //       } catch (err: any) {
// // //         console.error('Error fetching notebooks:', err);
// // //         setFetchError(err.message);
// // //       } finally {
// // //         setLoadingNotebook(false);
// // //       }
// // //     };
// // //     fetchNotebooks();
// // //   }, [user_id, chat_id]);

// // //   // Parse notebooks
// // //   let timeBasedNotebookCells: any[] = [];
// // //   let nonTimeBasedNotebookCells: any[] = [];
// // //   let file_url = '';
// // //   let entity_column = '';
// // //   let target_column = '';
// // //   let features: string[] = [];

// // //   if (fetchedNotebooks.length > 0) {
// // //     const nb0 = fetchedNotebooks[0];
// // //     file_url = nb0.file_url;
// // //     entity_column = nb0.entity_column;
// // //     target_column = nb0.target_column;
// // //     features = nb0.features || [];
// // //     const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
// // //     if (nonTimeBasedNotebooks.length > 0) {
// // //       try {
// // //         nonTimeBasedNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// // //       } catch (err) {
// // //         console.error('Error parsing non–time-based notebook JSON:', err);
// // //       }
// // //     }
// // //     const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
// // //     if (timeBasedNotebooks.length > 0) {
// // //       try {
// // //         timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
// // //       } catch (err) {
// // //         console.error('Error parsing time–based notebook JSON:', err);
// // //       }
// // //     }
// // //   }

// // //   // Polling / model training
// // //   const fetchModelResults = async () => {
// // //     try {
// // //       const url = ` http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // //       const response = await fetch(url);
// // //       if (!response.ok) {
// // //         if (response.status === 404) {
// // //           console.log('Model results not found yet. Retrying...');
// // //           return null;
// // //         } else {
// // //           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
// // //         }
// // //       }
// // //       const result = await response.json();
// // //       setDashboardData(result);
// // //       setModelTrained(true);
// // //       return result;
// // //     } catch (error) {
// // //       console.error('Error fetching model results:', error);
// // //       return null;
// // //     }
// // //   };

// // //   const pollModelResults = async () => {
// // //     setPolling(true);
// // //     const interval = setInterval(async () => {
// // //       const result = await fetchModelResults();
// // //       if (result) {
// // //         clearInterval(interval);
// // //         setPolling(false);
// // //       }
// // //     }, 90000);
// // //   };

// // //   const handleTrainModel = async () => {
// // //     navigate('/training', {
// // //       state: { user_id, chat_id, file_url, entity_column, target_column, features },
// // //     });
// // //     setTimeout(() => {
// // //       pollModelResults();
// // //     }, 300000);
// // //   };

// // //   // Save notebooks
// // //   const handleSaveNotebooks = async () => {
// // //     if (!user_id || !chat_id) {
// // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // //       return;
// // //     }
// // //     let cellResults: any[] = [];
// // //     if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// // //       const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
// // //       cellResults = cellResults.concat(timeCells);
// // //     } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
// // //       const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// // //       cellResults = cellResults.concat(nonTimeCells);
// // //     }
// // //     console.log('Cell results being sent to SaveNotebooksView:', cellResults);
// // //     setSavingNotebooks(true);
// // //     try {
// // //       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // //         },
// // //         body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
// // //       });
// // //       if (!resp.ok) {
// // //         const errData = await resp.json().catch(() => ({}));
// // //         throw new Error(errData.error || 'Failed to save notebooks.');
// // //       }
// // //       alert('Notebooks saved successfully!');
// // //     } catch (err: any) {
// // //       console.error('Error saving notebooks:', err);
// // //       alert(`Error saving notebooks: ${err.message}`);
// // //     } finally {
// // //       setSavingNotebooks(false);
// // //     }
// // //   };

// // //   // Auto-run notebooks
// // //   useEffect(() => {
// // //     if (
// // //       !autoRunDoneRef.current &&
// // //       !loadingNotebook &&
// // //       !fetchError &&
// // //       fetchedNotebooks.length > 0
// // //     ) {
// // //       autoRunDoneRef.current = true;
// // //       console.log('Auto-running all notebook cells...');
// // //       setTimeout(async () => {
// // //         try {
// // //           if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// // //             await timeNotebookRef.current.runAllCellsAndGetResults();
// // //           } else if (
// // //             nonTimeBasedNotebookCells.length > 0 &&
// // //             nonTimeBasedNotebookRef.current
// // //           ) {
// // //             await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// // //           }
// // //           console.log('Auto-run complete.');
// // //         } catch (err) {
// // //           console.error('Error auto-running cells:', err);
// // //         }
// // //       }, 1000);
// // //     }
// // //   }, [loadingNotebook, fetchError, fetchedNotebooks, timeBasedNotebookCells, nonTimeBasedNotebookCells]);

// // //   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
// // //     setActiveTab(tabId);
// // //   };

// // //   const timeNotebook = timeBasedNotebookCells.length > 0 && (
// // //     <div className="space-y-12">
// // //       <h2 className="text-2xl font-bold mb-6">Time-Based Analysis Notebook</h2>
// // //       <SQLNotebook
// // //         ref={timeNotebookRef}
// // //         activeTab="time_based_notebook"
// // //         notebookContent={{
// // //           file_url,
// // //           entity_column,
// // //           target_column,
// // //           features,
// // //           user_id,
// // //           chat_id,
// // //           isTrained: modelTrained,
// // //           handleTrainModel,
// // //           cells: timeBasedNotebookCells,
// // //         }}
// // //       />
// // //     </div>
// // //   );

// // //   const nonTimeBasedNotebook = nonTimeBasedNotebookCells.length > 0 && (
// // //     <div className="space-y-12">
// // //       <h2 className="text-2xl font-bold mb-6">Analysis Notebook</h2>
// // //       <SQLNotebook
// // //         ref={nonTimeBasedNotebookRef}
// // //         activeTab="non_time_based_notebook"
// // //         notebookContent={{
// // //           file_url,
// // //           entity_column,
// // //           target_column,
// // //           features,
// // //           user_id,
// // //           chat_id,
// // //           isTrained: modelTrained,
// // //           handleTrainModel,
// // //           cells: nonTimeBasedNotebookCells,
// // //         }}
// // //       />
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="relative h-screen overflow-hidden bg-gray-100">
// // //       {/* Top Navbar */}
// // //       <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-purple-900 shadow-sm">
// // //         <Navbar
// // //           isSidebarOpen={isSidebarOpen}
// // //           setIsSidebarOpen={setIsSidebarOpen}
// // //           notebooks={[
// // //             { id: 'notebook', title: 'Notebook', icon: <FiBook size={18} className="text-purple-900" />, onClick: () => handleTabChange('notebook') },
// // //             { id: 'dashboard', title: 'Dashboard', icon: <FiBarChart2 size={18} className="text-purple-900" />, onClick: () => handleTabChange('dashboard') },
// // //             { id: 'predict', title: 'Predict', icon: <FiFlag size={18} className="text-purple-900" />, onClick: () => handleTabChange('predict') },
// // //           ]}
// // //           activeTab={activeTab}
// // //         />
// // //       </div>

// // //       {/* Left Sidebar */}
// // //       <div
// // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // //         }`}
// // //         style={{ width: '16rem' }}
// // //       >
// // //         <Sidebar isOpen={isSidebarOpen} />
// // //       </div>

// // //       {/* Train & Save Buttons - Only shown in 'notebook' tab before model is trained */}
// // //       {activeTab === 'notebook' && !modelTrained && (
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-4"
// // //         >
// // //           <button
// // //             onClick={handleTrainModel}
// // //             className="flex items-center px-6 py-3 bg-purple-900 text-white rounded-md shadow-md hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
// // //             aria-label="Train your predictive model"
// // //           >
// // //             Train Model
// // //           </button>
// // //           <button
// // //             onClick={handleSaveNotebooks}
// // //             disabled={savingNotebooks}
// // //             className="flex items-center px-6 py-3 border border-purple-900 text-purple-900 text-sm rounded-md shadow-md hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
// // //             aria-label="Save Notebooks"
// // //           >
// // //             {savingNotebooks ? (
// // //               <>
// // //                 <FiLoader className="mr-2 animate-spin" />
// // //                 Saving...
// // //               </>
// // //             ) : (
// // //               'Save Notebooks'
// // //             )}
// // //           </button>
// // //         </motion.div>
// // //       )}

// // //       {/* Main Content Area */}
// // //       <div
// // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // //           isSidebarOpen ? 'left-64' : 'left-0'
// // //         }`}
// // //       >
// // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto p-8">
// // //           <div className="w-full max-w-6xl mx-auto">
// // //             {/* Predictive Settings UI - Only on Notebook tab */}
// // //             {activeTab === 'notebook' && predictiveSettings && (
// // //               <div className="mb-12">
// // //                 {/* Predictive Question as Heading */}
// // //                 <motion.div
// // //                   initial={{ opacity: 0, y: -10 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   transition={{ duration: 0.4, ease: 'easeOut' }}
// // //                   className="mb-8"
// // //                 >
// // //                   <h1 className="text-2xl font-semibold border-b border-purple-200 pb-4">
// // //                     {predictiveSettings.predictive_question || 'No Predictive Question Set'}
// // //                   </h1>
// // //                 </motion.div>

// // //                 {/* Other Settings in a Horizontal List with more spacing */}
// // //                 <motion.div
// // //                   initial={{ opacity: 0, y: 10 }}
// // //                   animate={{ opacity: 1, y: 0 }}
// // //                   transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
// // //                   className="flex flex-wrap gap-6"
// // //                 >
// // //                   {/* Target Column */}
// // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                     <span className="font-medium text-gray-600">Target:</span>{' '}
// // //                     <span className="font-medium text-purple-900">{predictiveSettings.target_column || 'Null'}</span>
// // //                   </div>

// // //                   {/* Entity Column */}
// // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                     <span className="font-medium text-gray-600">Entity:</span>{' '}
// // //                     <span className="font-medium text-purple-900">{predictiveSettings.entity_column || 'Null'}</span>
// // //                   </div>

// // //                   {/* Time Column */}
// // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                     <span className="font-medium text-gray-600">Time:</span>{' '}
// // //                     <span className="font-medium text-purple-900">{predictiveSettings.time_column || 'Null'}</span>
// // //                   </div>

// // //                   {/* Time Frame */}
// // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                     <span className="font-medium text-gray-600">Frame:</span>{' '}
// // //                     <span className="font-medium text-purple-900">{predictiveSettings.time_frame || 'Null'}</span>
// // //                   </div>

// // //                   {/* Time Frequency */}
// // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                     <span className="font-medium text-gray-600">Frequency:</span>{' '}
// // //                     <span className="font-medium text-purple-900">{predictiveSettings.time_frequency || 'Null'}</span>
// // //                   </div>

// // //                   {/* Machine Learning Type */}
// // //                   <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                     <span className="font-medium text-gray-600">ML Type:</span>{' '}
// // //                     <span className="font-medium text-purple-900">{predictiveSettings.machine_learning_type || 'Null'}</span>
// // //                   </div>
// // //                 </motion.div>
// // //               </div>
// // //             )}

// // //             {/* Notebook Tab */}
// // //             <div style={{ display: activeTab === 'notebook' ? 'block' : 'none' }}>
// // //               {loadingNotebook ? (
// // //                 <div className="p-8 text-center">Loading notebook data...</div>
// // //               ) : fetchError ? (
// // //                 <div className="p-8 text-center text-red-600">Error: {fetchError}</div>
// // //               ) : (
// // //                 <>
// // //                   {timeBasedNotebookCells.length > 0
// // //                     ? timeNotebook
// // //                     : nonTimeBasedNotebook}
// // //                 </>
// // //               )}
// // //             </div>

// // //             {/* Dashboard Tab */}
// // //             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
// // //               <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // //             </div>

// // //            <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
// // //               <PredictionsUI user_id={user_id} chat_id={chat_id}  />
// // //             </div>





// // //             {/* Predict Tab
// // //             <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
// // //   {!modelTrained ? (
// // //     <div className="flex items-center justify-center h-[calc(100vh-8rem)] p-8 bg-gray-100">
// // //       <div className="text-center">
// // //         <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
// // //         <p className="text-lg font-medium text-gray-600">
// // //           Predictions will only be available after you train your model
// // //         </p>
// // //       </div>
// // //     </div>
// // //   ) : (
// // //     <PredictionsUI user_id={''} chat_id={''} />
// // //   )}
// // // </div> */}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NotebookLayout;





// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // // import Dashboard from '../Dashboard/Dashboard';
// // // import PredictionsUI from '../Predict/PredictNewData';
// // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // import { motion } from 'framer-motion';
// // // import Sidebar from '../NotebookUI/Sidebar/Sidebar';
// // // import { Monitor } from 'lucide-react';

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
// // //   feature_analysis?: any;
// // //   model_metadata?: any;
// // //   data_characteristics?: any;
// // //   core_statistics?: any;
// // //   attribute_statistics?: any;
// // // }

// // // const NotebookLayout: React.FC = () => {
// // //   const { user_id = '', chat_id = '' } = useParams();
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   const [predictiveSettings, setPredictiveSettings] = useState<any>(null);
// // //   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // //   const [modelTrained, setModelTrained] = useState(false);
// // //   const [polling, setPolling] = useState(false);
// // //   const [savingNotebooks, setSavingNotebooks] = useState(false);
// // //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// // //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// // //   const [fetchError, setFetchError] = useState<string | null>(null);

// // //   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
// // //   const nonTimeBasedNotebookRef = useRef<SQLNotebookRef | null>(null);
// // //   const autoRunDoneRef = useRef(false);

// // //   // Fetch predictive settings
// // //   useEffect(() => {
// // //     if (!user_id || !chat_id) return;
// // //     const fetchPredictiveSettings = async () => {
// // //       try {
// // //         const response = await fetch(
// // //           `http://98.70.25.52/api/predictive-settings/${user_id}/${chat_id}/`
// // //         );
// // //         if (!response.ok) {
// // //           throw new Error(`Failed to fetch predictive settings: ${response.statusText}`);
// // //         }
// // //         const data = await response.json();
// // //         setPredictiveSettings(data);
// // //       } catch (error: any) {
// // //         console.error("Error fetching predictive settings:", error);
// // //       }
// // //     };
// // //     fetchPredictiveSettings();
// // //   }, [user_id, chat_id]);

// // //   // Fetch notebooks
// // //   useEffect(() => {
// // //     if (!user_id || !chat_id) return;
// // //     const fetchNotebooks = async () => {
// // //       setLoadingNotebook(true);
// // //       setFetchError(null);
// // //       try {
// // //         const res = await fetch(
// // //           `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // //         );
// // //         if (!res.ok) {
// // //           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // //         }
// // //         const data = await res.json();
// // //         if (!data.notebooks || !data.notebooks.length) {
// // //           setFetchedNotebooks([]);
// // //           setFetchError('No notebooks found for this user/chat.');
// // //         } else {
// // //           setFetchedNotebooks(data.notebooks);
// // //         }
// // //       } catch (err: any) {
// // //         console.error('Error fetching notebooks:', err);
// // //         setFetchError(err.message);
// // //       } finally {
// // //         setLoadingNotebook(false);
// // //       }
// // //     };
// // //     fetchNotebooks();
// // //   }, [user_id, chat_id]);

// // //   // Parse notebooks
// // //   let timeBasedNotebookCells: any[] = [];
// // //   let nonTimeBasedNotebookCells: any[] = [];
// // //   let file_url = '';
// // //   let entity_column = '';
// // //   let target_column = '';
// // //   let features: string[] = [];

// // //   if (fetchedNotebooks.length > 0) {
// // //     const nb0 = fetchedNotebooks[0];
// // //     file_url = nb0.file_url;
// // //     entity_column = nb0.entity_column;
// // //     target_column = nb0.target_column;
// // //     features = nb0.features || [];

// // //     const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
// // //     if (nonTimeBasedNotebooks.length > 0) {
// // //       try {
// // //         nonTimeBasedNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// // //       } catch (err) {
// // //         console.error('Error parsing non–time-based notebook JSON:', err);
// // //       }
// // //     }

// // //     const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
// // //     if (timeBasedNotebooks.length > 0) {
// // //       try {
// // //         timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
// // //       } catch (err) {
// // //         console.error('Error parsing time–based notebook JSON:', err);
// // //       }
// // //     }
// // //   }

// // //   // Polling / model training
// // //   const fetchModelResults = async () => {
// // //     try {
// // //       const url = ` http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // //       const response = await fetch(url);
// // //       if (!response.ok) {
// // //         if (response.status === 404) {
// // //           console.log('Model results not found yet. Retrying...');
// // //           return null;
// // //         } else {
// // //           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
// // //         }
// // //       }
// // //       const result = await response.json();
// // //       setDashboardData(result);
// // //       setModelTrained(true);
// // //       return result;
// // //     } catch (error) {
// // //       console.error('Error fetching model results:', error);
// // //       return null;
// // //     }
// // //   };

// // //   const pollModelResults = async () => {
// // //     setPolling(true);
// // //     const interval = setInterval(async () => {
// // //       const result = await fetchModelResults();
// // //       if (result) {
// // //         clearInterval(interval);
// // //         setPolling(false);
// // //       }
// // //     }, 90000);
// // //   };

// // //   const handleTrainModel = async () => {

// // //   };

// // //   // Save notebooks
// // //   const handleSaveNotebooks = async () => {
// // //     if (!user_id || !chat_id) {
// // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // //       return;
// // //     }
// // //     let cellResults: any[] = [];
// // //     if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// // //       const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
// // //       cellResults = cellResults.concat(timeCells);
// // //     } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
// // //       const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// // //       cellResults = cellResults.concat(nonTimeCells);
// // //     }
// // //     console.log('Cell results being sent to SaveNotebooksView:', cellResults);
// // //     setSavingNotebooks(true);
// // //     try {
// // //       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // //         },
// // //         body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
// // //       });
// // //       if (!resp.ok) {
// // //         const errData = await resp.json().catch(() => ({}));
// // //         throw new Error(errData.error || 'Failed to save notebooks.');
// // //       }
// // //       alert('Notebooks saved successfully!');
// // //     } catch (err: any) {
// // //       console.error('Error saving notebooks:', err);
// // //       alert(`Error saving notebooks: ${err.message}`);
// // //     } finally {
// // //       setSavingNotebooks(false);
// // //     }
// // //   };

// // //   // Auto-run notebooks
// // //   useEffect(() => {
// // //     if (
// // //       !autoRunDoneRef.current &&
// // //       !loadingNotebook &&
// // //       !fetchError &&
// // //       fetchedNotebooks.length > 0
// // //     ) {
// // //       autoRunDoneRef.current = true;
// // //       console.log('Auto-running all notebook cells...');
// // //       setTimeout(async () => {
// // //         try {
// // //           if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// // //             await timeNotebookRef.current.runAllCellsAndGetResults();
// // //           } else if (
// // //             nonTimeBasedNotebookCells.length > 0 &&
// // //             nonTimeBasedNotebookRef.current
// // //           ) {
// // //             await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// // //           }
// // //           console.log('Auto-run complete.');
// // //         } catch (err) {
// // //           console.error('Error auto-running cells:', err);
// // //         }
// // //       }, 1000);
// // //     }
// // //   }, [loadingNotebook, fetchError, fetchedNotebooks, timeBasedNotebookCells, nonTimeBasedNotebookCells]);

// // //   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
// // //     setActiveTab(tabId);
// // //   };

// // //   const timeNotebook = timeBasedNotebookCells.length > 0 && (
// // //     <div className="space-y-12">
// // //       <h2 className="text-2xl font-bold mb-6">Time-Based Analysis Notebook</h2>
// // //       <SQLNotebook
// // //         ref={timeNotebookRef}
// // //         activeTab="time_based_notebook"
// // //         notebookContent={{
// // //           file_url,
// // //           entity_column,
// // //           target_column,
// // //           features,
// // //           user_id,
// // //           chat_id,
// // //           isTrained: modelTrained,
// // //           handleTrainModel,
// // //           cells: timeBasedNotebookCells,
// // //         }}
// // //       />
// // //     </div>
// // //   );

// // //   const nonTimeBasedNotebook = nonTimeBasedNotebookCells.length > 0 && (
// // //     <div className="space-y-12">
// // //       <h2 className="text-2xl font-bold mb-6">Analysis Notebook</h2>
// // //       <SQLNotebook
// // //         ref={nonTimeBasedNotebookRef}
// // //         activeTab="non_time_based_notebook"
// // //         notebookContent={{
// // //           file_url,
// // //           entity_column,
// // //           target_column,
// // //           features,
// // //           user_id,
// // //           chat_id,
// // //           isTrained: modelTrained,
// // //           handleTrainModel,
// // //           cells: nonTimeBasedNotebookCells,
// // //         }}
// // //       />
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="relative h-screen overflow-hidden bg-gray-100">
// // //       {/* Top Navbar */}
// // //       <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-purple-900 shadow-sm">
// // //         <Navbar
// // //           isSidebarOpen={isSidebarOpen}
// // //           setIsSidebarOpen={setIsSidebarOpen}
// // //           notebooks={[
// // //             {
// // //               id: 'notebook',
// // //               title: 'Notebook',
// // //               icon: <FiBook size={18} className="text-purple-900" />,
// // //               onClick: () => handleTabChange('notebook'),
// // //             },
// // //             {
// // //               id: 'dashboard',
// // //               title: 'Dashboard',
// // //               icon: <FiBarChart2 size={18} className="text-purple-900" />,
// // //               onClick: () => handleTabChange('dashboard'),
// // //             },
// // //             {
// // //               id: 'predict',
// // //               title: 'Predict',
// // //               icon: <FiFlag size={18} className="text-purple-900" />,
// // //               onClick: () => handleTabChange('predict'),
// // //             },
// // //           ]}
// // //           activeTab={activeTab}
// // //         />
// // //       </div>

// // //       {/* Left Sidebar */}
// // //       <div
// // //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// // //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// // //         }`}
// // //         style={{ width: '16rem' }}
// // //       >
// // //         <Sidebar isOpen={isSidebarOpen} />
// // //       </div>

// // //       {/* Train & Save Buttons - Only shown in 'notebook' tab before model is trained */}
// // //       {activeTab === 'notebook' && !modelTrained && (
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-4"
// // //         >
// // //           <button
// // //             onClick={handleTrainModel}
// // //             className="flex items-center px-6 py-3 bg-purple-900 text-white rounded-md shadow-md hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
// // //             aria-label="Train your predictive model"
// // //           >
// // //             Train Model
// // //           </button>
// // //           <button
// // //             onClick={handleSaveNotebooks}
// // //             disabled={savingNotebooks}
// // //             className="flex items-center px-6 py-3 border border-purple-900 text-purple-900 text-sm rounded-md shadow-md hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
// // //             aria-label="Save Notebooks"
// // //           >
// // //             {savingNotebooks ? (
// // //               <>
// // //                 <FiLoader className="mr-2 animate-spin" />
// // //                 Saving...
// // //               </>
// // //             ) : (
// // //               'Save Notebooks'
// // //             )}
// // //           </button>
// // //         </motion.div>
// // //       )}

// // //       {/* Main Content Area */}
// // //       <div
// // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // //           isSidebarOpen ? 'left-64' : 'left-0'
// // //         }`}
// // //       >
// // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
// // //           {/* Notebook Tab */}
// // //           {activeTab === 'notebook' && (
// // //             <div className="p-8 w-full max-w-6xl mx-auto">
// // //               {/* Predictive Settings UI */}
// // //               {predictiveSettings && (
// // //                 <div className="mb-12">
// // //                   {/* Predictive Question as Heading */}
// // //                   <motion.div
// // //                     initial={{ opacity: 0, y: -10 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     transition={{ duration: 0.4, ease: 'easeOut' }}
// // //                     className="mb-8"
// // //                   >
// // //                     <h1 className="text-2xl font-semibold border-b border-purple-200 pb-4">
// // //                       {predictiveSettings.predictive_question || 'No Predictive Question Set'}
// // //                     </h1>
// // //                   </motion.div>

// // //                   {/* Other Settings in a Horizontal List with more spacing */}
// // //                   <motion.div
// // //                     initial={{ opacity: 0, y: 10 }}
// // //                     animate={{ opacity: 1, y: 0 }}
// // //                     transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
// // //                     className="flex flex-wrap gap-6"
// // //                   >
// // //                     {/* Target Column */}
// // //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                       <span className="font-medium text-gray-600">Target:</span>{' '}
// // //                       <span className="font-medium text-purple-900">
// // //                         {predictiveSettings.target_column || 'Null'}
// // //                       </span>
// // //                     </div>

// // //                     {/* Entity Column */}
// // //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                       <span className="font-medium text-gray-600">Entity:</span>{' '}
// // //                       <span className="font-medium text-purple-900">
// // //                         {predictiveSettings.entity_column || 'Null'}
// // //                       </span>
// // //                     </div>

// // //                     {/* Time Column */}
// // //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                       <span className="font-medium text-gray-600">Time:</span>{' '}
// // //                       <span className="font-medium text-purple-900">
// // //                         {predictiveSettings.time_column || 'Null'}
// // //                       </span>
// // //                     </div>

// // //                     {/* Time Frame */}
// // //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                       <span className="font-medium text-gray-600">Frame:</span>{' '}
// // //                       <span className="font-medium text-purple-900">
// // //                         {predictiveSettings.time_frame || 'Null'}
// // //                       </span>
// // //                     </div>

// // //                     {/* Time Frequency */}
// // //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                       <span className="font-medium text-gray-600">Frequency:</span>{' '}
// // //                       <span className="font-medium text-purple-900">
// // //                         {predictiveSettings.time_frequency || 'Null'}
// // //                       </span>
// // //                     </div>

// // //                     {/* Machine Learning Type */}
// // //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// // //                       <span className="font-medium text-gray-600">ML Type:</span>{' '}
// // //                       <span className="font-medium text-purple-900">
// // //                         {predictiveSettings.machine_learning_type || 'Null'}
// // //                       </span>
// // //                     </div>
// // //                   </motion.div>
// // //                 </div>
// // //               )}

// // //               {/* Notebook(s) Content */}
// // //               {loadingNotebook ? (
// // //                 <div className="p-8 text-center">Loading notebook data...</div>
// // //               ) : fetchError ? (
// // //                 <div className="p-8 text-center text-red-600">Error: {fetchError}</div>
// // //               ) : (
// // //                 <>
// // //                   {timeBasedNotebookCells.length > 0
// // //                     ? timeNotebook
// // //                     : nonTimeBasedNotebook}
// // //                 </>
// // //               )}
// // //             </div>
// // //           )}

// // //           {/* Dashboard Tab */}
// // //           {activeTab === 'dashboard' && (
// // //             <div className="p-8 w-full max-w-6xl mx-auto">
// // //               <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // //             </div>
// // //           )}

// // //           {/* Predict Tab - now full width (no max-w-6xl) */}
// // //           {activeTab === 'predict' && (
// // //             <div className="w-full h-full">
// // //               <PredictionsUI user_id={user_id} chat_id={chat_id} />
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NotebookLayout;



// // import React, { useState, useEffect, useRef } from 'react';
// // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // import Navbar from '../NotebookUI/Navbar/Navbar';
// // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // import Dashboard from '../Dashboard/Dashboard';
// // import PredictionsUI from '../Predict/PredictNewData';
// // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // import { motion } from 'framer-motion';
// // import Sidebar from '../NotebookUI/Sidebar/Sidebar';
// // import { Monitor } from 'lucide-react';
// // import { time } from 'console';
// // import { machine } from 'os';

// // interface Metrics {
// //   rmse: number;
// //   r2_score: number;
// //   mae: number;
// // }

// // interface ModelMetrics {
// //   training: Metrics;
// //   testing: Metrics;
// //   validation: Metrics;
// //   assessment: string;
// // }

// // interface MetricsData {
// //   model_metrics: ModelMetrics;
// //   feature_importance: Record<string, number>;
// //   predictions: {
// //     actual: number[];
// //     predicted: number[];
// //     product_id: string[];
// //     analysis_time: string[];
// //   };
// //   user_id: string;
// //   chat_id: string;
// //   feature_analysis?: any;
// //   model_metadata?: any;
// //   data_characteristics?: any;
// //   core_statistics?: any;
// //   attribute_statistics?: any;
// // }

// // interface Notebook {
// //   id: number;
// //   user_id: number | string;
// //   chat_id: string;
// //   entity_column: string;
// //   target_column: string;
// //   time_column: string;
// //   time_frame: string;
// //   time_frequency: string;
// //   features: string[];
// //   file_url: string;
// //   notebook_json: string;
// //   cell_s3_links: Record<string, string>;
// //   created_at: string;
// // }

// // const NotebookLayout: React.FC = () => {
// //   const { user_id = '', chat_id = '' } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const [predictiveSettings, setPredictiveSettings] = useState<any>(null);
// //   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// //   const [modelTrained, setModelTrained] = useState(false);
// //   const [polling, setPolling] = useState(false);
// //   const [savingNotebooks, setSavingNotebooks] = useState(false);
// //   const [fetchedNotebooks, setFetchedNotebooks] = useState<Notebook[]>([]);
// //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// //   const [fetchError, setFetchError] = useState<string | null>(null);

// //   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
// //   const nonTimeBasedNotebookRef = useRef<SQLNotebookRef | null>(null);
// //   const autoRunDoneRef = useRef(false);

// //   // Fetch predictive settings
// //   useEffect(() => {
// //     if (!user_id || !chat_id) return;
// //     const fetchPredictiveSettings = async () => {
// //       try {
// //         const response = await fetch(
// //           `http://98.70.25.52/api/predictive-settings/${user_id}/${chat_id}/`
// //         );
// //         if (!response.ok) {
// //           throw new Error(`Failed to fetch predictive settings: ${response.statusText}`);
// //         }
// //         const data = await response.json();
// //         console.log('Predictive settings:', data);
// //         setPredictiveSettings(data);
// //       } catch (error: any) {
// //         console.error("Error fetching predictive settings:", error);
// //       }
// //     };
// //     fetchPredictiveSettings();
// //   }, [user_id, chat_id]);

// //   // Fetch notebooks
// //   useEffect(() => {
// //     if (!user_id || !chat_id) return;
// //     const fetchNotebooks = async () => {
// //       setLoadingNotebook(true);
// //       setFetchError(null);
// //       try {
// //         const res = await fetch(
// //           `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// //         );
// //         if (!res.ok) {
// //           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// //         }
// //         const data = await res.json();
// //         if (!data.notebooks || !data.notebooks.length) {
// //           setFetchedNotebooks([]);
// //           setFetchError('No notebooks found for this user/chat.');
// //         } else {
// //           setFetchedNotebooks(data.notebooks);
// //         }
// //       } catch (err: any) {
// //         console.error('Error fetching notebooks:', err);
// //         setFetchError(err.message);
// //       } finally {
// //         setLoadingNotebook(false);
// //       }
// //     };
// //     fetchNotebooks();
// //   }, [user_id, chat_id]);

// //   // Parse notebooks
// //   let timeBasedNotebookCells: any[] = [];
// //   let nonTimeBasedNotebookCells: any[] = [];
// //   let file_url = '';
// //   let entity_column = '';
// //   let target_column = '';
// //   let features: string[] = [];

// //   if (fetchedNotebooks.length > 0) {
// //     const nb0 = fetchedNotebooks[0];
// //     file_url = nb0.file_url;
// //     entity_column = nb0.entity_column;
// //     target_column = nb0.target_column;
// //     features = nb0.features || [];

// //     const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
// //     if (nonTimeBasedNotebooks.length > 0) {
// //       try {
// //         nonTimeBasedNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// //       } catch (err) {
// //         console.error('Error parsing non–time-based notebook JSON:', err);
// //       }
// //     }

// //     const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
// //     if (timeBasedNotebooks.length > 0) {
// //       try {
// //         timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
// //       } catch (err) {
// //         console.error('Error parsing time–based notebook JSON:', err);
// //       }
// //     }
// //   }

// //   // Polling / model training
// //   const fetchModelResults = async () => {
// //     try {
// //       const url = ` http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// //       const response = await fetch(url);
// //       if (!response.ok) {
// //         if (response.status === 404) {
// //           console.log('Model results not found yet. Retrying...');
// //           return null;
// //         } else {
// //           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
// //         }
// //       }
// //       const result = await response.json();
// //       setDashboardData(result);
// //       setModelTrained(true);
// //       return result;
// //     } catch (error) {
// //       console.error('Error fetching model results:', error);
// //       return null;
// //     }
// //   };

// //   const pollModelResults = async () => {
// //     setPolling(true);
// //     const interval = setInterval(async () => {
// //       const result = await fetchModelResults();
// //       if (result) {
// //         clearInterval(interval);
// //         setPolling(false);
// //       }
// //     }, 90000);
// //   };

// //   const handleTrainModel = async () => {

// //     if (!user_id || !chat_id) {
// //       alert('user_id or chat_id is missing, cannot save notebooks.');
// //       return;
// //     }
// //     let cellResults: any[] = [];
// //     if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// //       const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
// //       cellResults = cellResults.concat(timeCells);
// //     } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
// //       const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// //       cellResults = cellResults.concat(nonTimeCells);
// //     }
// //     console.log('Cell results being sent to SaveNotebooksView:', cellResults);
// //     setSavingNotebooks(true);
// //     try {
// //       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// //         },
// //         body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
// //       });
// //       if (!resp.ok) {
// //         const errData = await resp.json().catch(() => ({}));
// //         throw new Error(errData.error || 'Failed to save notebooks.');
// //       }
// //       const saveResult = await resp.json();
// //       alert('Notebooks saved successfully!');

// //       // Use the saved S3 links (cell8 URL) for training
// //       if (fetchedNotebooks.length > 0) {
// //         const nb0 = fetchedNotebooks[0];
// //         // const cell8Url = nb0.cell_s3_links['cell8'] || nb0.file_url || "s3://testingfiles-pacx/cell_8_2c46f7.csv";
// //         const cell8Url = "s3://pa-documents-storage-bucket/notebook_saves/9/43062c6d-278b-4e61-9e2f-e3dc426280b3/cell_8_0756d5.csv"
// //         if (!predictiveSettings) {
// //           alert('Predictive settings are not loaded yet. Please wait.');
// //           return;
// //         }

// //         // const payload = {
// //         //   file_url: cell8Url, // Use cell8 S3 link or fallback
// //         //   target_column: predictiveSettings.target_column || "target_within_30_days_after",
// //         //   user_id: user_id || "000000",
// //         //   chat_id: chat_id || "000000",
// //         //   entity_column: predictiveSettings.entity_column || "product_id_",
// //         //   prediction_type: predictiveSettings.machine_learning_type ?? false,
// //         //   time_column:predictiveSettings.time_column || "date",
// //         //   time_frame:predictiveSettings.time_frame || "30 days",
// //         //   time_frequency:predictiveSettings.time_frequency || "weekly",
// //         //   machine_learning_type: predictiveSettings.machine_learning_type || "regression",
// //         //   // ml_type: predictiveSettings.machine_learning_type === "true" || predictiveSettings.machine_learning_type === true,
// //         //   // ml_type: true
// //         // };
// //         const payload = {
// //           file_url: cell8Url, // Use cell8 S3 link or fallback
// //           target_column: predictiveSettings.target_column || "target_within_30_days_after",
// //           user_id: user_id || "000000",
// //           chat_id: chat_id || "000000",
// //           entity_column: predictiveSettings.entity_column || "product_id_",
// //           prediction_type: predictiveSettings.prediction_type ?? false,
// //           time_frame:predictiveSettings.time_frame || "30 days",
// //           time_frequency:predictiveSettings.time_frequency || "weekly",
// //           machine_learning_type: predictiveSettings.machine_learning_type || "regression",
// //           time_column:predictiveSettings.time_column || "date",
// //           new_target_column:predictiveSettings.new_target_column || "target_within_60_days_after",
// //           // ml_type: predictiveSettings.machine_learning_type === "true" || predictiveSettings.machine_learning_type === true,
// //           // ml_type: true
// //         };

// //         const trainResponse = await fetch(' http://98.70.25.52/api/automation/', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// //           },
// //           body: JSON.stringify(payload),
// //         });

// //         if (!trainResponse.ok) {
// //           const errorText = await trainResponse.text();
// //           throw new Error(`Failed to train model: ${errorText}`);
// //         }

// //         const trainResult = await trainResponse.json();
// //         console.log('Train model response:', trainResult);

// //         // Navigate to training page with a delay for polling
// //         // navigate('/training', {
// //         //   state: { user_id, chat_id, file_url: cell8Url, entity_column, target_column, features },
// //         // });
// //         // setTimeout(() => {
// //         //   pollModelResults();
// //         // }, 300000); // 5-minute delay
// //       }
// //     } catch (err: any) {
// //       console.error('Error saving notebooks or training model:', err);
// //       alert(`Error: ${err.message}`);
// //     } finally {
// //       // setSavingNotebooks(false);
// //       console.log('Notebooks saved successfully!');
// //     }

// //   };

// //   // Save notebooks
// //   const handleSaveNotebooks = async () => {
// //     if (!user_id || !chat_id) {
// //       alert('user_id or chat_id is missing, cannot save notebooks.');
// //       return;
// //     }
// //     let cellResults: any[] = [];
// //     if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// //       const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
// //       cellResults = cellResults.concat(timeCells);
// //     } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
// //       const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// //       cellResults = cellResults.concat(nonTimeCells);
// //     }
// //     console.log('Cell results being sent to SaveNotebooksView:', cellResults);
// //     setSavingNotebooks(true);
// //     try {
// //       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// //         },
// //         body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
// //       });
// //       if (!resp.ok) {
// //         const errData = await resp.json().catch(() => ({}));
// //         throw new Error(errData.error || 'Failed to save notebooks.');
// //       }
// //       const saveResult = await resp.json();
// //       alert('Notebooks saved successfully!');

// //       // Use the saved S3 links (cell8 URL) for training
// //       if (fetchedNotebooks.length > 0) {
// //         const nb0 = fetchedNotebooks[0];
// //         // const cell8Url = nb0.cell_s3_links['cell8'] || nb0.file_url || "s3://testingfiles-pacx/cell_8_2c46f7.csv";
// //         const cell8Url = "s3://pa-documents-storage-bucket/notebook_saves/9/20013515-73c7-492c-a02d-242414eb59b3/cell_8_a2a8c3.csv"
// //         if (!predictiveSettings) {
// //           alert('Predictive settings are not loaded yet. Please wait.');
// //           return;
// //         }

// //         const payload = {
// //           file_url: cell8Url, // Use cell8 S3 link or fallback
// //           target_column: predictiveSettings.target_column || "target_within_30_days_after",
// //           user_id: user_id || "17236",
// //           chat_id: chat_id || "7236390",
// //           column_id: predictiveSettings.entity_column || "product_id",
// //           // ml_type: predictiveSettings.machine_learning_type === "true" || predictiveSettings.machine_learning_type === true,
// //           ml_type: true
// //         };

// //         const trainResponse = await fetch(' http://98.70.25.52/api/automation/', {
// //           method: 'POST',
// //           headers: {
// //             'Content-Type': 'application/json',
// //             'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// //           },
// //           body: JSON.stringify(payload),
// //         });

// //         if (!trainResponse.ok) {
// //           const errorText = await trainResponse.text();
// //           throw new Error(`Failed to train model: ${errorText}`);
// //         }

// //         const trainResult = await trainResponse.json();
// //         console.log('Train model response:', trainResult);

// //         // Navigate to training page with a delay for polling
// //         // navigate('/training', {
// //         //   state: { user_id, chat_id, file_url: cell8Url, entity_column, target_column, features },
// //         // });
// //         // setTimeout(() => {
// //         //   pollModelResults();
// //         // }, 300000); // 5-minute delay
// //       }
// //     } catch (err: any) {
// //       console.error('Error saving notebooks or training model:', err);
// //       alert(`Error: ${err.message}`);
// //     } finally {
// //       setSavingNotebooks(false);
// //     }
// //   };

// //   // Auto-run notebooks
// //   useEffect(() => {
// //     if (
// //       !autoRunDoneRef.current &&
// //       !loadingNotebook &&
// //       !fetchError &&
// //       fetchedNotebooks.length > 0
// //     ) {
// //       autoRunDoneRef.current = true;
// //       console.log('Auto-running all notebook cells...');
// //       setTimeout(async () => {
// //         try {
// //           if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
// //             await timeNotebookRef.current.runAllCellsAndGetResults();
// //           } else if (
// //             nonTimeBasedNotebookCells.length > 0 &&
// //             nonTimeBasedNotebookRef.current
// //           ) {
// //             await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
// //           }
// //           console.log('Auto-run complete.');
// //         } catch (err) {
// //           console.error('Error auto-running cells:', err);
// //         }
// //       }, 1000);
// //     }
// //   }, [loadingNotebook, fetchError, fetchedNotebooks, timeBasedNotebookCells, nonTimeBasedNotebookCells]);

// //   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
// //     setActiveTab(tabId);
// //   };

// //   const timeNotebook = timeBasedNotebookCells.length > 0 && (
// //     <div className="space-y-12">
// //       <h2 className="text-2xl font-bold mb-6">Time-Based Analysis Notebook</h2>
// //       <SQLNotebook
// //         ref={timeNotebookRef}
// //         activeTab="time_based_notebook"
// //         notebookContent={{
// //           file_url,
// //           entity_column,
// //           target_column,
// //           features,
// //           user_id,
// //           chat_id,
// //           isTrained: modelTrained,
// //           handleTrainModel: () => {}, // Disable train button functionality
// //           cells: timeBasedNotebookCells,
// //         }}
// //       />
// //     </div>
// //   );

// //   const nonTimeBasedNotebook = nonTimeBasedNotebookCells.length > 0 && (
// //     <div className="space-y-12">
// //       <h2 className="text-2xl font-bold mb-6">Analysis Notebook</h2>
// //       <SQLNotebook
// //         ref={nonTimeBasedNotebookRef}
// //         activeTab="non_time_based_notebook"
// //         notebookContent={{
// //           file_url,
// //           entity_column,
// //           target_column,
// //           features,
// //           user_id,
// //           chat_id,
// //           isTrained: modelTrained,
// //           handleTrainModel: () => {}, // Disable train button functionality
// //           cells: nonTimeBasedNotebookCells,
// //         }}
// //       />
// //     </div>
// //   );

// //   return (
// //     <div className="relative h-screen overflow-hidden bg-gray-100">
// //       {/* Top Navbar */}
// //       <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-purple-900 shadow-sm">
// //         <Navbar
// //           isSidebarOpen={isSidebarOpen}
// //           setIsSidebarOpen={setIsSidebarOpen}
// //           notebooks={[
// //             {
// //               id: 'notebook',
// //               title: 'Notebook',
// //               icon: <FiBook size={18} className="text-purple-900" />,
// //               onClick: () => handleTabChange('notebook'),
// //             },
// //             {
// //               id: 'dashboard',
// //               title: 'Dashboard',
// //               icon: <FiBarChart2 size={18} className="text-purple-900" />,
// //               onClick: () => handleTabChange('dashboard'),
// //             },
// //             {
// //               id: 'predict',
// //               title: 'Predict',
// //               icon: <FiFlag size={18} className="text-purple-900" />,
// //               onClick: () => handleTabChange('predict'),
// //             },
// //           ]}
// //           activeTab={activeTab}
// //         />
// //       </div>

// //       {/* Left Sidebar */}
// //       <div
// //         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
// //           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
// //         }`}
// //         style={{ width: '16rem' }}
// //       >
// //         <Sidebar isOpen={isSidebarOpen} />
// //       </div>

// //       {/* Train & Save Buttons - Only shown in 'notebook' tab before model is trained */}
// //       {activeTab === 'notebook' && !modelTrained && (
// //         <motion.div
// //           initial={{ opacity: 0, y: 20, x: -20 }}
// //           animate={{ opacity: 1, y: 0, x: 0 }}
// //           transition={{ duration: 0.5, ease: 'easeOut' }}
// //           className="fixed top-20 right-10 z-50 flex flex-col space-y-4"
// //         >
// //           <button
// //             onClick={handleTrainModel}
// //             className="flex items-center px-6 py-3 bg-purple-900 text-white rounded-md shadow-md hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
// //             aria-label="Train your predictive model"
// //           >
// //             Train Model
// //           </button>
// //           {/* commenting it for productions same functionality used on train button */}
// //           {/* <button
// //             onClick={handleSaveNotebooks}
// //             disabled={savingNotebooks}
// //             className="flex items-center px-6 py-3 border border-purple-900 text-purple-900 text-sm rounded-md shadow-md hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
// //             aria-label="Save Notebooks and Train Model"
// //           >
// //             {savingNotebooks ? (
// //               <>
// //                 <FiLoader className="mr-2 animate-spin" />
// //                 Saving...
// //               </>
// //             ) : (
// //               'Save Notebooks & Train'
// //             )}
// //           </button> */}
// //         </motion.div>
// //       )}

// //       {/* Main Content Area */}
// //       <div
// //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// //           isSidebarOpen ? 'left-64' : 'left-0'
// //         }`}
// //       >
// //         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
// //           {/* Notebook Tab */}
// //           {activeTab === 'notebook' && (
// //             <div className="p-8 w-full max-w-6xl mx-auto">
// //               {/* Predictive Settings UI */}
// //               {predictiveSettings && (
// //                 <div className="mb-12">
// //                   {/* Predictive Question as Heading */}
// //                   <motion.div
// //                     initial={{ opacity: 0, y: -10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.4, ease: 'easeOut' }}
// //                     className="mb-8"
// //                   >
// //                     <h1 className="text-2xl font-semibold border-b border-purple-200 pb-4">
// //                       {predictiveSettings.predictive_question || 'No Predictive Question Set'}
// //                     </h1>
// //                   </motion.div>

// //                   {/* Other Settings in a Horizontal List with more spacing */}
// //                   <motion.div
// //                     initial={{ opacity: 0, y: 10 }}
// //                     animate={{ opacity: 1, y: 0 }}
// //                     transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
// //                     className="flex flex-wrap gap-6"
// //                   >
// //                     {/* Target Column */}
// //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// //                       <span className="font-medium text-gray-600">Target:</span>{' '}
// //                       <span className="font-medium text-purple-900">
// //                         {predictiveSettings.target_column || 'Null'}
// //                       </span>
// //                     </div>

// //                     {/* Entity Column */}
// //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// //                       <span className="font-medium text-gray-600">Entity:</span>{' '}
// //                       <span className="font-medium text-purple-900">
// //                         {predictiveSettings.entity_column || 'Null'}
// //                       </span>
// //                     </div>

// //                     {/* Time Column */}
// //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// //                       <span className="font-medium text-gray-600">Time:</span>{' '}
// //                       <span className="font-medium text-purple-900">
// //                         {predictiveSettings.time_column || 'Null'}
// //                       </span>
// //                     </div>

// //                     {/* Time Frame */}
// //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// //                       <span className="font-medium text-gray-600">Frame:</span>{' '}
// //                       <span className="font-medium text-purple-900">
// //                         {predictiveSettings.time_frame || 'Null'}
// //                       </span>
// //                     </div>

// //                     {/* Time Frequency */}
// //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// //                       <span className="font-medium text-gray-600">Frequency:</span>{' '}
// //                       <span className="font-medium text-purple-900">
// //                         {predictiveSettings.time_frequency || 'Null'}
// //                       </span>
// //                     </div>

// //                     {/* Machine Learning Type */}
// //                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
// //                       <span className="font-medium text-gray-600">ML Type:</span>{' '}
// //                       <span className="font-medium text-purple-900">
// //                         {predictiveSettings.machine_learning_type || 'Null'}
// //                       </span>
// //                     </div>
// //                   </motion.div>
// //                 </div>
// //               )}

// //               {/* Notebook(s) Content */}
// //               {loadingNotebook ? (
// //                 <div className="p-8 text-center">Loading notebook data...</div>
// //               ) : fetchError ? (
// //                 <div className="p-8 text-center text-red-600">Error: {fetchError}</div>
// //               ) : (
// //                 <>
// //                   {timeBasedNotebookCells.length > 0
// //                     ? timeNotebook
// //                     : nonTimeBasedNotebook}
// //                 </>
// //               )}
// //             </div>
// //           )}

// //           {/* Dashboard Tab */}
// //           {activeTab === 'dashboard' && (
// //             <div className="p-8 w-full max-w-7xl mx-auto">
// //               <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// //             </div>
// //           )}

// //           {/* Predict Tab - now full width (no max-w-6xl) */}
// //           {activeTab === 'predict' && (
// //             <div className="w-full h-full">
// //               <PredictionsUI user_id={user_id} chat_id={chat_id} />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NotebookLayout;




// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import Navbar from '../NotebookUI/Navbar/Navbar';
// import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// import Dashboard from '../Dashboard/Dashboard';
// import PredictionsUI from '../Predict/PredictNewData';
// import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// import { motion } from 'framer-motion';
// import Sidebar from '../NotebookUI/Sidebar/Sidebar';
// import { Monitor } from 'lucide-react';

// interface Metrics {
//   rmse: number;
//   r2_score: number;
//   mae: number;
// }

// interface ModelMetrics {
//   training: Metrics;
//   testing: Metrics;
//   validation: Metrics;
//   assessment: string;
// }

// interface MetricsData {
//   model_metrics: ModelMetrics;
//   feature_importance: Record<string, number>;
//   predictions: {
//     actual: number[];
//     predicted: number[];
//     product_id: string[];
//     analysis_time: string[];
//   };
//   user_id: string;
//   chat_id: string;
//   feature_analysis?: any;
//   model_metadata?: any;
//   data_characteristics?: any;
//   core_statistics?: any;
//   attribute_statistics?: any;
// }

// interface Notebook {
//   id: number;
//   user_id: number | string;
//   chat_id: string;
//   entity_column: string;
//   target_column: string;
//   time_column: string;
//   time_frame: string;
//   time_frequency: string;
//   features: string[];
//   file_url: string;
//   notebook_json: string;
//   cell_s3_links: Record<string, string>;
//   created_at: string;
// }

// const NotebookLayout: React.FC = () => {
//   const { user_id = '', chat_id = '', tab = 'notebook' } = useParams<{ user_id: string; chat_id: string; tab?: string }>();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [predictiveSettings, setPredictiveSettings] = useState<any>(null);
//   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
//   const [loadingDashboard, setLoadingDashboard] = useState(false);
//   const [modelTrained, setModelTrained] = useState(false);
//   const [polling, setPolling] = useState(false);
//   const [savingNotebooks, setSavingNotebooks] = useState(false);
//   const [fetchedNotebooks, setFetchedNotebooks] = useState<Notebook[]>([]);
//   const [loadingNotebook, setLoadingNotebook] = useState(false);
//   const [fetchError, setFetchError] = useState<string | null>(null);

//   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
//   const nonTimeBasedNotebookRef = useRef<SQLNotebookRef | null>(null);
//   const autoRunDoneRef = useRef(false);

//   // Set active tab based on URL parameter on mount
//   useEffect(() => {
//     const validTabs = ['notebook', 'dashboard', 'predict'];
//     const tabFromUrl = tab?.toLowerCase() as 'notebook' | 'dashboard' | 'predict';
//     if (validTabs.includes(tabFromUrl)) {
//       setActiveTab(tabFromUrl);
//     } else {
//       setActiveTab('notebook'); // Default to notebook if invalid tab
//       navigate(`/notebook/${user_id}/${chat_id}/notebook`, { replace: true });
//     }
//   }, [tab, user_id, chat_id, navigate]);

//   // Fetch predictive settings
//   useEffect(() => {
//     if (!user_id || !chat_id) return;
//     const fetchPredictiveSettings = async () => {
//       try {
//         const response = await fetch(
//           `http://98.70.25.52/api/predictive-settings/${user_id}/${chat_id}/`
//         );
//         if (!response.ok) {
//           throw new Error(`Failed to fetch predictive settings: ${response.statusText}`);
//         }
//         const data = await response.json();
//         console.log('Predictive settings:', data);
//         setPredictiveSettings(data);
//       } catch (error: any) {
//         console.error("Error fetching predictive settings:", error);
//       }
//     };
//     fetchPredictiveSettings();
//   }, [user_id, chat_id]);

//   // Fetch notebooks
//   useEffect(() => {
//     if (!user_id || !chat_id) return;
//     const fetchNotebooks = async () => {
//       setLoadingNotebook(true);
//       setFetchError(null);
//       try {
//         const res = await fetch(
//           `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
//         );
//         if (!res.ok) {
//           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
//         }
//         const data = await res.json();
//         if (!data.notebooks || !data.notebooks.length) {
//           setFetchedNotebooks([]);
//           setFetchError('No notebooks found for this user/chat.');
//         } else {
//           setFetchedNotebooks(data.notebooks);
//         }
//       } catch (err: any) {
//         console.error('Error fetching notebooks:', err);
//         setFetchError(err.message);
//       } finally {
//         setLoadingNotebook(false);
//       }
//     };
//     fetchNotebooks();
//   }, [user_id, chat_id]);

//   // Parse notebooks
//   let timeBasedNotebookCells: any[] = [];
//   let nonTimeBasedNotebookCells: any[] = [];
//   let file_url = '';
//   let entity_column = '';
//   let target_column = '';
//   let features: string[] = [];

//   if (fetchedNotebooks.length > 0) {
//     const nb0 = fetchedNotebooks[0];
//     file_url = nb0.file_url;
//     entity_column = nb0.entity_column;
//     target_column = nb0.target_column;
//     features = nb0.features || [];

//     const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
//     if (nonTimeBasedNotebooks.length > 0) {
//       try {
//         nonTimeBasedNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
//       } catch (err) {
//         console.error('Error parsing non–time-based notebook JSON:', err);
//       }
//     }

//     const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
//     if (timeBasedNotebooks.length > 0) {
//       try {
//         timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
//       } catch (err) {
//         console.error('Error parsing time–based notebook JSON:', err);
//       }
//     }
//   }

//   // Polling / model training
//   const fetchModelResults = async () => {
//     try {
//       const url = `http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
//       const response = await fetch(url);
//       if (!response.ok) {
//         if (response.status === 404) {
//           console.log('Model results not found yet. Retrying...');
//           return null;
//         } else {
//           throw new Error(`Failed to fetch model results. Status: ${response.status}`);
//         }
//       }
//       const result = await response.json();
//       setDashboardData(result);
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
//     }, 90000);
//   };

//   // const handleTrainModel = async () => {
//   //   if (!user_id || !chat_id) {
//   //     alert('user_id or chat_id is missing, cannot save notebooks.');
//   //     return;
//   //   }
//   //   let cellResults: any[] = [];
//   //   if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
//   //     const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
//   //     cellResults = cellResults.concat(timeCells);
//   //   } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
//   //     const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
//   //     cellResults = cellResults.concat(nonTimeCells);
//   //   }
//   //   console.log('Cell results being sent to SaveNotebooksView:', cellResults);
//   //   setSavingNotebooks(true);
//   //   try {
//   //     const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
//   //       },
//   //       body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
//   //     });
//   //     if (!resp.ok) {
//   //       const errData = await resp.json().catch(() => ({}));
//   //       throw new Error(errData.error || 'Failed to save notebooks.');
//   //     }
//   //     const saveResult = await resp.json();
//   //     alert('Notebooks saved successfully!');

//   //     // Use the saved S3 links (cell8 URL) for training
//   //     if (fetchedNotebooks.length > 0) {
//   //       const nb0 = fetchedNotebooks[0];
//   //       const cell8Url = nb0.cell_s3_links['cell8'] || nb0.file_url || "s3://testingfiles-pacx/cell_8_2c46f7.csv";
//   //       // const cell8Url = "s3://pa-documents-storage-bucket/notebook_saves/9/43062c6d-278b-4e61-9e2f-e3dc426280b3/cell_8_0756d5.csv"
//   //       if (!predictiveSettings) {
//   //         alert('Predictive settings are not loaded yet. Please wait.');
//   //         return;
//   //       }

//   //       const payload = {
//   //         file_url: cell8Url,
//   //         target_column: predictiveSettings.target_column || "target_within_30_days_after",
//   //         user_id: user_id || "000000",
//   //         chat_id: chat_id || "000000",
//   //         entity_column: predictiveSettings.entity_column || "product_id_",
//   //         prediction_type: predictiveSettings.prediction_type ?? false,
//   //         time_frame: predictiveSettings.time_frame || "30 days",
//   //         time_frequency: predictiveSettings.time_frequency || "weekly",
//   //         machine_learning_type: predictiveSettings.machine_learning_type || "regression",
//   //         time_column: predictiveSettings.time_column || "date",
//   //         new_target_column: predictiveSettings.new_target_column || "target_within_60_days_after",
//   //       };
//   //       console.log('Train model payload:', payload);

//   //       const trainResponse = await fetch('http://98.70.25.52/api/automation/', {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
//   //         },
//   //         body: JSON.stringify(payload),
//   //       });

//   //       if (!trainResponse.ok) {
//   //         const errorText = await trainResponse.text();
//   //         throw new Error(`Failed to train model: ${errorText}`);
//   //       }

//   //       const trainResult = await trainResponse.json();
//   //       console.log('Train model response:', trainResult);
//   //       // Navigate to the dashboard tab after training is initiated
//   //       navigate(`/notebook/${user_id}/${chat_id}/dashboard`);

//   //     // Optional: Set up polling for training status using task_id (uncomment if needed)
//   //     if (trainResult.task_id) {
//   //       pollTrainingStatus(trainResult.task_id);
//   //     }
//   //     }
//   //   } catch (err: any) {
//   //     console.error('Error saving notebooks or training model:', err);
//   //     alert(`Error: ${err.message}`);
//   //   } finally {
//   //     // setSavingNotebooks(false);
//   //     console.log('Notebooks saved successfully!');
//   //   }
//   // };


//   const handleTrainModel = async () => {
//     console.log("DEBUG: handleTrainModel invoked with user_id:", user_id, " chat_id:", chat_id);
  
//     if (!user_id || !chat_id) {
//       alert('user_id or chat_id is missing, cannot save notebooks.');
//       console.log("DEBUG: Missing user_id or chat_id. Exiting handleTrainModel.");
//       return;
//     }
  
//     // Gather all cell results
//     let cellResults: any[] = [];
//     console.log("DEBUG: timeBasedNotebookCells length:", timeBasedNotebookCells.length);
//     console.log("DEBUG: nonTimeBasedNotebookCells length:", nonTimeBasedNotebookCells.length);
  
//     if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
//       console.log("DEBUG: Running all time-based notebook cells...");
//       const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
//       console.log("DEBUG: timeCells result =>", timeCells);
//       cellResults = cellResults.concat(timeCells);
//     } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
//       console.log("DEBUG: Running all non-time-based notebook cells...");
//       const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
//       console.log("DEBUG: nonTimeCells result =>", nonTimeCells);
//       cellResults = cellResults.concat(nonTimeCells);
//     }
  
//     console.log('DEBUG: cellResults to be sent to /api/save-notebooks =>', cellResults);
  
//     setSavingNotebooks(true);
//     try {
//       console.log("DEBUG: About to call /api/save-notebooks/ with payload:", {
//         user_id,
//         chat_id,
//         cells: cellResults
//       });
  
//       // 1) Save notebooks
//       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
//         },
//         body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
//       });
  
//       console.log("DEBUG: /api/save-notebooks/ response status:", resp.status);
  
//       if (!resp.ok) {
//         const errData = await resp.json().catch(() => ({}));
//         throw new Error(errData.error || 'Failed to save notebooks.');
//       }
  
//       const saveResult = await resp.json();
//       console.log("DEBUG: /api/save-notebooks/ returned =>", saveResult);
//       alert('Notebooks saved successfully!');
  
//       // 2) Trigger training if we have at least one notebook
//       if (fetchedNotebooks.length > 0) {
//         const nb0 = fetchedNotebooks[0];
//         // You can adjust this logic as needed
//         const cell8Url = nb0.cell_s3_links['cell8'] || nb0.file_url || "s3://testingfiles-pacx/cell_8_2c46f7.csv";
  
//         if (!predictiveSettings) {
//           alert('Predictive settings are not loaded yet. Please wait.');
//           console.log("DEBUG: predictiveSettings is null, skipping training.");
//           return;
//         }
  
//         // Build training payload
//         const payload = {
//           file_url: cell8Url,
//           target_column: predictiveSettings.target_column || "target_within_30_days_after",
//           user_id: user_id || "000000",
//           chat_id: chat_id || "000000",
//           entity_column: predictiveSettings.entity_column || "product_id_",
//           prediction_type: predictiveSettings.prediction_type ?? false,
//           time_frame: predictiveSettings.time_frame || "30 days",
//           time_frequency: predictiveSettings.time_frequency || "weekly",
//           machine_learning_type: predictiveSettings.machine_learning_type || "regression",
//           time_column: predictiveSettings.time_column || "date",
//           new_target_column: predictiveSettings.new_target_column || "target_within_60_days_after",
//         };
  
//         console.log("DEBUG: About to call /api/automation/ with payload =>", payload);
  
//         // 3) Start training
//         const trainResponse = await fetch('http://98.70.25.52/api/automation/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
//           },
//           body: JSON.stringify(payload),
//         });
  
//         console.log("DEBUG: /api/automation/ response status:", trainResponse.status);
  
//         if (!trainResponse.ok) {
//           const errorText = await trainResponse.text();
//           console.error("DEBUG: /api/automation/ returned error text =>", errorText);
//           throw new Error(`Failed to train model: ${errorText}`);
//         }
  
//         const trainResult = await trainResponse.json();
//         console.log('DEBUG: Train model response =>', trainResult);
  
//         // Navigate to the dashboard tab after training is initiated
//         navigate(`/notebook/${user_id}/${chat_id}/dashboard`);
  
//         // Optional: Set up polling for training status using task_id
//         if (trainResult.task_id) {
//           pollTrainingStatus(trainResult.task_id);
//         }
//       } else {
//         console.log("DEBUG: fetchedNotebooks is empty, skipping training request.");
//       }
//     } catch (err: any) {
//       console.error('Error saving notebooks or training model:', err);
//       alert(`Error: ${err.message}`);
//     } finally {
//       console.log('DEBUG: handleTrainModel finally block => Notebooks process complete.');
//       // setSavingNotebooks(false);
//     }
//   };
  


// // Optional polling function (uncomment and adjust if needed)
// const pollTrainingStatus = async (taskId: string) => {
//   setPolling(true);
//   const interval = setInterval(async () => {
//     try {
//       const statusResponse = await fetch(`http://98.70.25.52/api/automation/status/${taskId}/`, {
//         headers: {
//           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
//         },
//       });
//       const statusResult = await statusResponse.json();
//       if (statusResult.status === 'completed') {
//         clearInterval(interval);
//         setPolling(false);
//         setDashboardData(statusResult.data); // Update dashboard with results
//         setModelTrained(true);
//       } else if (statusResult.status === 'failed') {
//         clearInterval(interval);
//         setPolling(false);
//         alert('Training failed: ' + statusResult.message);
//       }
//     } catch (error) {
//       console.error('Error polling training status:', error);
//       clearInterval(interval);
//       setPolling(false);
//     }
//   }, 10000); // Poll every 10 seconds
// };

//   // Save notebooks
//   const handleSaveNotebooks = async () => {
//     if (!user_id || !chat_id) {
//       alert('user_id or chat_id is missing, cannot save notebooks.');
//       return;
//     }
//     let cellResults: any[] = [];
//     if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
//       const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
//       cellResults = cellResults.concat(timeCells);
//     } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
//       const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
//       cellResults = cellResults.concat(nonTimeCells);
//     }
//     console.log('Cell results being sent to SaveNotebooksView:', cellResults);
//     setSavingNotebooks(true);
//     try {
//       const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
//         },
//         body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
//       });
//       if (!resp.ok) {
//         const errData = await resp.json().catch(() => ({}));
//         throw new Error(errData.error || 'Failed to save notebooks.');
//       }
//       const saveResult = await resp.json();
//       alert('Notebooks saved successfully!');

//       // Use the saved S3 links (cell8 URL) for training
//       if (fetchedNotebooks.length > 0) {
//         const nb0 = fetchedNotebooks[0];
//         // const cell8Url = nb0.cell_s3_links['cell8'] || nb0.file_url || "s3://testingfiles-pacx/cell_8_2c46f7.csv";
//         const cell8Url = "s3://pa-documents-storage-bucket/notebook_saves/9/20013515-73c7-492c-a02d-242414eb59b3/cell_8_a2a8c3.csv"
//         if (!predictiveSettings) {
//           alert('Predictive settings are not loaded yet. Please wait.');
//           return;
//         }

//         const payload = {
//           file_url: cell8Url, // Use cell8 S3 link or fallback
//           target_column: predictiveSettings.target_column || "target_within_30_days_after",
//           user_id: user_id || "17236",
//           chat_id: chat_id || "7236390",
//           column_id: predictiveSettings.entity_column || "product_id",
//           ml_type: true,
//         };

//         const trainResponse = await fetch(' http://98.70.25.52/api/automation/', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
//           },
//           body: JSON.stringify(payload),
//         });

//         if (!trainResponse.ok) {
//           const errorText = await trainResponse.text();
//           throw new Error(`Failed to train model: ${errorText}`);
//         }

//         const trainResult = await trainResponse.json();
//         console.log('Train model response:', trainResult);

//         // Navigate to training page with a delay for polling
//         // navigate('/training', {
//         //   state: { user_id, chat_id, file_url: cell8Url, entity_column, target_column, features },
//         // });
//         // setTimeout(() => {
//         //   pollModelResults();
//         // }, 300000); // 5-minute delay
//       }
//     } catch (err: any) {
//       console.error('Error saving notebooks or training model:', err);
//       alert(`Error: ${err.message}`);
//     } finally {
//       setSavingNotebooks(false);
//     }
//   };

//   // Auto-run notebooks
//   useEffect(() => {
//     if (
//       !autoRunDoneRef.current &&
//       !loadingNotebook &&
//       !fetchError &&
//       fetchedNotebooks.length > 0
//     ) {
//       autoRunDoneRef.current = true;
//       console.log('Auto-running all notebook cells...');
//       setTimeout(async () => {
//         try {
//           if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
//             await timeNotebookRef.current.runAllCellsAndGetResults();
//           } else if (
//             nonTimeBasedNotebookCells.length > 0 &&
//             nonTimeBasedNotebookRef.current
//           ) {
//             await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
//           }
//           console.log('Auto-run complete.');
//         } catch (err) {
//           console.error('Error auto-running cells:', err);
//         }
//       }, 1000);
//     }
//   }, [loadingNotebook, fetchError, fetchedNotebooks, timeBasedNotebookCells, nonTimeBasedNotebookCells]);

//   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
//     setActiveTab(tabId);
//     navigate(`/notebook/${user_id}/${chat_id}/${tabId}`);
//   };

//   const timeNotebook = timeBasedNotebookCells.length > 0 && (
//     <div className="space-y-12">
//       <h2 className="text-2xl font-bold mb-6">Time-Based Analysis Notebook</h2>
//       <SQLNotebook
//         ref={timeNotebookRef}
//         activeTab="time_based_notebook"
//         notebookContent={{
//           file_url,
//           entity_column,
//           target_column,
//           features,
//           user_id,
//           chat_id,
//           isTrained: modelTrained,
//           handleTrainModel: () => {}, // Disable train button functionality
//           cells: timeBasedNotebookCells,
//         }}
//       />
//     </div>
//   );

//   const nonTimeBasedNotebook = nonTimeBasedNotebookCells.length > 0 && (
//     <div className="space-y-12">
//       <h2 className="text-2xl font-bold mb-6">Analysis Notebook</h2>
//       <SQLNotebook
//         ref={nonTimeBasedNotebookRef}
//         activeTab="non_time_based_notebook"
//         notebookContent={{
//           file_url,
//           entity_column,
//           target_column,
//           features,
//           user_id,
//           chat_id,
//           isTrained: modelTrained,
//           handleTrainModel: () => {}, // Disable train button functionality
//           cells: nonTimeBasedNotebookCells,
//         }}
//       />
//     </div>
//   );

//   return (
//     <div className="relative h-screen overflow-hidden bg-gray-100">
//       {/* Top Navbar */}
//       <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-purple-900 shadow-sm">
//         <Navbar
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//           notebooks={[
//             {
//               id: 'notebook',
//               title: 'Notebook',
//               icon: <FiBook size={18} className="text-purple-900" />,
//               onClick: () => handleTabChange('notebook'),
//             },
//             {
//               id: 'dashboard',
//               title: 'Dashboard',
//               icon: <FiBarChart2 size={18} className="text-purple-900" />,
//               onClick: () => handleTabChange('dashboard'),
//             },
//             {
//               id: 'predict',
//               title: 'Predict',
//               icon: <FiFlag size={18} className="text-purple-900" />,
//               onClick: () => handleTabChange('predict'),
//             },
//           ]}
//           activeTab={activeTab}
//         />
//       </div>

//       {/* Left Sidebar */}
//       <div
//         className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
//         }`}
//         style={{ width: '16rem' }}
//       >
//         <Sidebar isOpen={isSidebarOpen} />
//       </div>

//       {/* Train & Save Buttons */}
//       {activeTab === 'notebook' && !modelTrained && (
//         <motion.div
//           initial={{ opacity: 0, y: 20, x: -20 }}
//           animate={{ opacity: 1, y: 0, x: 0 }}
//           transition={{ duration: 0.5, ease: 'easeOut' }}
//           className="fixed top-20 right-10 z-50 flex flex-col space-y-4"
//         >
//           <button
//             onClick={handleTrainModel}
//             className="flex items-center px-6 py-3 bg-purple-900 text-white rounded-md shadow-md hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
//             aria-label="Train your predictive model"
//           >
//             Train Model
//           </button>
//           {/* commenting it for productions same functionality used on train button */}
//           {/* <button
//             onClick={handleSaveNotebooks}
//             disabled={savingNotebooks}
//             className="flex items-center px-6 py-3 border border-purple-900 text-purple-900 text-sm rounded-md shadow-md hover:bg-purple-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
//             aria-label="Save Notebooks and Train Model"
//           >
//             {savingNotebooks ? (
//               <>
//                 <FiLoader className="mr-2 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               'Save Notebooks & Train'
//             )}
//           </button> */}
//         </motion.div>
//       )}

//       {/* Main Content Area */}
//       <div
//         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
//           isSidebarOpen ? 'left-64' : 'left-0'
//         }`}
//       >
//         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
//           {/* Notebook Tab */}
//           {activeTab === 'notebook' && (
//             <div className="p-8 w-full max-w-6xl mx-auto">
//               {/* Predictive Settings UI */}
//               {predictiveSettings && (
//                 <div className="mb-12">
//                   {/* Predictive Question as Heading */}
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, ease: 'easeOut' }}
//                     className="mb-8"
//                   >
//                     <h1 className="text-2xl font-semibold border-b border-purple-200 pb-4">
//                       {predictiveSettings.predictive_question || 'No Predictive Question Set'}
//                     </h1>
//                   </motion.div>

//                   {/* Other Settings in a Horizontal List with more spacing */}
//                   <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
//                     className="flex flex-wrap gap-6"
//                   >
//                     {/* Target Column */}
//                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
//                       <span className="font-medium text-gray-600">Target:</span>{' '}
//                       <span className="font-medium text-purple-900">
//                         {predictiveSettings.target_column || 'Null'}
//                       </span>
//                     </div>

//                     {/* Entity Column */}
//                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
//                       <span className="font-medium text-gray-600">Entity:</span>{' '}
//                       <span className="font-medium text-purple-900">
//                         {predictiveSettings.entity_column || 'Null'}
//                       </span>
//                     </div>

//                     {/* Time Column */}
//                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
//                       <span className="font-medium text-gray-600">Time:</span>{' '}
//                       <span className="font-medium text-purple-900">
//                         {predictiveSettings.time_column || 'Null'}
//                       </span>
//                     </div>

//                     {/* Time Frame */}
//                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
//                       <span className="font-medium text-gray-600">Frame:</span>{' '}
//                       <span className="font-medium text-purple-900">
//                         {predictiveSettings.time_frame || 'Null'}
//                       </span>
//                     </div>

//                     {/* Time Frequency */}
//                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
//                       <span className="font-medium text-gray-600">Frequency:</span>{' '}
//                       <span className="font-medium text-purple-900">
//                         {predictiveSettings.time_frequency || 'Null'}
//                       </span>
//                     </div>

//                     {/* Machine Learning Type */}
//                     <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
//                       <span className="font-medium text-gray-600">ML Type:</span>{' '}
//                       <span className="font-medium text-purple-900">
//                         {predictiveSettings.machine_learning_type || 'Null'}
//                       </span>
//                     </div>
//                   </motion.div>
//                 </div>
//               )}

//               {/* Notebook(s) Content */}
//               {loadingNotebook ? (
//                 <div className="p-8 text-center">Loading notebook data...</div>
//               ) : fetchError ? (
//                 <div className="p-8 text-center text-red-600">Error: {fetchError}</div>
//               ) : (
//                 <>
//                   {timeBasedNotebookCells.length > 0
//                     ? timeNotebook
//                     : nonTimeBasedNotebook}
//                 </>
//               )}
//             </div>
//           )}

//           {/* Dashboard Tab */}
//           {activeTab === 'dashboard' && (
//             <div className="p-8 w-full max-w-7xl mx-auto">
//               <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
//             </div>
//           )}

//           {/* Predict Tab - now full width (no max-w-6xl) */}
//           {activeTab === 'predict' && (
//             <div className="w-full h-full">
//               <PredictionsUI user_id={user_id} chat_id={chat_id} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotebookLayout;





import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../NotebookUI/Navbar/Navbar';
import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
import Dashboard from '../Dashboard/Dashboard';
import PredictionsUI from '../Predict/PredictNewData';
import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Sidebar from '../NotebookUI/Sidebar/Sidebar';
import { Monitor } from 'lucide-react';

interface Metrics {
  rmse: number;
  r2_score: number;
  mae: number;
}

interface ModelMetrics {
  training: Metrics;
  testing: Metrics;
  validation: Metrics;
  assessment: string;
}

interface MetricsData {
  model_metrics: ModelMetrics;
  feature_importance: Record<string, number>;
  predictions: {
    actual: number[];
    predicted: number[];
    product_id: string[];
    analysis_time: string[];
  };
  user_id: string;
  chat_id: string;
  feature_analysis?: any;
  model_metadata?: any;
  data_characteristics?: any;
  core_statistics?: any;
  attribute_statistics?: any;
}

interface Notebook {
  id: number;
  user_id: number | string;
  chat_id: string;
  entity_column: string;
  target_column: string;
  time_column: string;
  time_frame: string;
  time_frequency: string;
  features: string[];
  file_url: string;
  notebook_json: string;
  cell_s3_links: Record<string, string>;
  created_at: string;
}

const NotebookLayout: React.FC = () => {
  const { user_id = '', chat_id = '', tab = 'notebook' } = useParams<{ user_id: string; chat_id: string; tab?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [predictiveSettings, setPredictiveSettings] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [modelTrained, setModelTrained] = useState(false);
  const [polling, setPolling] = useState(false);
  const [savingNotebooks, setSavingNotebooks] = useState(false);
  const [fetchedNotebooks, setFetchedNotebooks] = useState<Notebook[]>([]);
  const [loadingNotebook, setLoadingNotebook] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
  const nonTimeBasedNotebookRef = useRef<SQLNotebookRef | null>(null);
  const autoRunDoneRef = useRef(false);

  // Helper: Poll for cell8 link availability
  const waitForCell8Link = async (user_id: string, chat_id: string, maxWait = 30000, interval = 5000): Promise<string | null> => {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWait) {
      try {
        const res = await fetch(`http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch notebooks during polling: ${res.statusText}`);
        }
        const data = await res.json();
        if (data.notebooks && data.notebooks.length > 0) {
          const updatedNb = data.notebooks[0];
          if (updatedNb.cell_s3_links && updatedNb.cell_s3_links['cell8']) {
            return updatedNb.cell_s3_links['cell8'];
          }
        }
      } catch (error) {
        console.error("Polling error:", error);
      }
      await new Promise(resolve => setTimeout(resolve, interval));
    }
    return null;
  };

  // Set active tab based on URL parameter on mount
  useEffect(() => {
    const validTabs = ['notebook', 'dashboard', 'predict'];
    const tabFromUrl = tab?.toLowerCase() as 'notebook' | 'dashboard' | 'predict';
    if (validTabs.includes(tabFromUrl)) {
      setActiveTab(tabFromUrl);
    } else {
      setActiveTab('notebook'); // Default to notebook if invalid tab
      navigate(`/notebook/${user_id}/${chat_id}/notebook`, { replace: true });
    }
  }, [tab, user_id, chat_id, navigate]);

  // Fetch predictive settings
  useEffect(() => {
    if (!user_id || !chat_id) return;
    const fetchPredictiveSettings = async () => {
      try {
        const response = await fetch(
          `http://98.70.25.52/api/predictive-settings/${user_id}/${chat_id}/`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch predictive settings: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Predictive settings:', data);
        setPredictiveSettings(data);
      } catch (error: any) {
        console.error("Error fetching predictive settings:", error);
      }
    };
    fetchPredictiveSettings();
  }, [user_id, chat_id]);

  // Fetch notebooks
  useEffect(() => {
    if (!user_id || !chat_id) return;
    const fetchNotebooks = async () => {
      setLoadingNotebook(true);
      setFetchError(null);
      try {
        const res = await fetch(
          `http://98.70.25.52/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
        }
        const data = await res.json();
        if (!data.notebooks || !data.notebooks.length) {
          setFetchedNotebooks([]);
          setFetchError('No notebooks found for this user/chat.');
        } else {
          setFetchedNotebooks(data.notebooks);
        }
      } catch (err: any) {
        console.error('Error fetching notebooks:', err);
        setFetchError(err.message);
      } finally {
        setLoadingNotebook(false);
      }
    };
    fetchNotebooks();
  }, [user_id, chat_id]);

  // Parse notebooks
  let timeBasedNotebookCells: any[] = [];
  let nonTimeBasedNotebookCells: any[] = [];
  let file_url = '';
  let entity_column = '';
  let target_column = '';
  let features: string[] = [];

  if (fetchedNotebooks.length > 0) {
    const nb0 = fetchedNotebooks[0];
    file_url = nb0.file_url;
    entity_column = nb0.entity_column;
    target_column = nb0.target_column;
    features = nb0.features || [];

    const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
    if (nonTimeBasedNotebooks.length > 0) {
      try {
        nonTimeBasedNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
      } catch (err) {
        console.error('Error parsing non–time-based notebook JSON:', err);
      }
    }

    const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
    if (timeBasedNotebooks.length > 0) {
      try {
        timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
      } catch (err) {
        console.error('Error parsing time–based notebook JSON:', err);
      }
    }
  }

  // Polling / model training
  const fetchModelResults = async () => {
    try {
      const url = `http://98.70.25.52/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          console.log('Model results not found yet. Retrying...');
          return null;
        } else {
          throw new Error(`Failed to fetch model results. Status: ${response.status}`);
        }
      }
      const result = await response.json();
      setDashboardData(result);
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
    }, 90000);
  };

  const handleTrainModel = async () => {
    console.log("DEBUG: handleTrainModel invoked with user_id:", user_id, " chat_id:", chat_id);

    if (!user_id || !chat_id) {
      alert('user_id or chat_id is missing, cannot save notebooks.');
      console.log("DEBUG: Missing user_id or chat_id. Exiting handleTrainModel.");
      return;
    }

    // Gather all cell results
    let cellResults: any[] = [];
    console.log("DEBUG: timeBasedNotebookCells length:", timeBasedNotebookCells.length);
    console.log("DEBUG: nonTimeBasedNotebookCells length:", nonTimeBasedNotebookCells.length);

    if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
      console.log("DEBUG: Running all time-based notebook cells...");
      const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
      console.log("DEBUG: timeCells result =>", timeCells);
      cellResults = cellResults.concat(timeCells);
    } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
      console.log("DEBUG: Running all non-time-based notebook cells...");
      const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
      console.log("DEBUG: nonTimeCells result =>", nonTimeCells);
      cellResults = cellResults.concat(nonTimeCells);
    }

    console.log('DEBUG: cellResults to be sent to /api/save-notebooks =>', cellResults);

    setSavingNotebooks(true);
    try {
      console.log("DEBUG: About to call /api/save-notebooks/ with payload:", {
        user_id,
        chat_id,
        cells: cellResults
      });

      // 1) Save notebooks
      const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
        },
        body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
      });

      console.log("DEBUG: /api/save-notebooks/ response status:", resp.status);

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to save notebooks.');
      }

      const saveResult = await resp.json();
      console.log("DEBUG: /api/save-notebooks/ returned =>", saveResult);
      alert('Notebooks saved successfully!');

      // 2) Trigger training if we have at least one notebook
      if (fetchedNotebooks.length > 0) {
        const nb0 = fetchedNotebooks[0];
        // Instead of immediately accessing cell8, we check its availability:
        let cell8Url = null;
        if (nb0.cell_s3_links && nb0.cell_s3_links['cell8']) {
          cell8Url = nb0.cell_s3_links['cell8'];
          console.log("DEBUG: cell8 link found immediately:", cell8Url);
        } else {
          console.log("DEBUG: cell8 link not available yet. Polling for cell8 link...");
          cell8Url = await waitForCell8Link(user_id, chat_id);
          if (cell8Url) {
            console.log("DEBUG: cell8 link obtained after polling:", cell8Url);
          }
        }
        if (!cell8Url) {
          alert("S3 link for cell8 is still not available. Please wait a bit longer and try again.");
          return;
        }

        if (!predictiveSettings) {
          alert('Predictive settings are not loaded yet. Please wait.');
          console.log("DEBUG: predictiveSettings is null, skipping training.");
          return;
        }

        // Build training payload
        const payload = {
          file_url: cell8Url, // Use the valid cell8 S3 link
          target_column: predictiveSettings.target_column || "target_within_30_days_after",
          user_id: user_id || "000000",
          chat_id: chat_id || "000000",
          entity_column: predictiveSettings.entity_column || "product_id_",
          prediction_type: predictiveSettings.prediction_type ?? false,
          time_frame: predictiveSettings.time_frame || "30 days",
          time_frequency: predictiveSettings.time_frequency || "weekly",
          machine_learning_type: predictiveSettings.machine_learning_type || "regression",
          time_column: predictiveSettings.time_column || "date",
          new_target_column: predictiveSettings.new_target_column || "target_within_60_days_after",
        };

        console.log("DEBUG: About to call /api/automation/ with payload =>", payload);

        // 3) Start training
        const trainResponse = await fetch('http://98.70.25.52/api/automation/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
          },
          body: JSON.stringify(payload),
        });

        console.log("DEBUG: /api/automation/ response status:", trainResponse.status);

        if (!trainResponse.ok) {
          const errorText = await trainResponse.text();
          console.error("DEBUG: /api/automation/ returned error text =>", errorText);
          throw new Error(`Failed to train model: ${errorText}`);
        }

        const trainResult = await trainResponse.json();
        console.log('DEBUG: Train model response =>', trainResult);

        // Navigate to the dashboard tab after training is initiated
        navigate(`/notebook/${user_id}/${chat_id}/dashboard`);

        // Optional: Set up polling for training status using task_id
        if (trainResult.task_id) {
          pollTrainingStatus(trainResult.task_id);
        }
      } else {
        console.log("DEBUG: fetchedNotebooks is empty, skipping training request.");
      }
    } catch (err: any) {
      console.error('Error saving notebooks or training model:', err);
      alert(`Error: ${err.message}`);
    } finally {
      console.log('DEBUG: handleTrainModel finally block => Notebooks process complete.');
      setSavingNotebooks(false);
    }
  };

  // Optional polling function (uncomment and adjust if needed)
  const pollTrainingStatus = async (taskId: string) => {
    setPolling(true);
    const interval = setInterval(async () => {
      try {
        const statusResponse = await fetch(`http://98.70.25.52/api/automation/status/${taskId}/`, {
          headers: {
            'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
          },
        });
        const statusResult = await statusResponse.json();
        if (statusResult.status === 'completed') {
          clearInterval(interval);
          setPolling(false);
          setDashboardData(statusResult.data); // Update dashboard with results
          setModelTrained(true);
        } else if (statusResult.status === 'failed') {
          clearInterval(interval);
          setPolling(false);
          alert('Training failed: ' + statusResult.message);
        }
      } catch (error) {
        console.error('Error polling training status:', error);
        clearInterval(interval);
        setPolling(false);
      }
    }, 10000); // Poll every 10 seconds
  };

  // Save notebooks
  const handleSaveNotebooks = async () => {
    if (!user_id || !chat_id) {
      alert('user_id or chat_id is missing, cannot save notebooks.');
      return;
    }
    let cellResults: any[] = [];
    if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
      const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
      cellResults = cellResults.concat(timeCells);
    } else if (nonTimeBasedNotebookCells.length > 0 && nonTimeBasedNotebookRef.current) {
      const nonTimeCells = await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
      cellResults = cellResults.concat(nonTimeCells);
    }
    console.log('Cell results being sent to SaveNotebooksView:', cellResults);
    setSavingNotebooks(true);
    try {
      const resp = await fetch('http://98.70.25.52/api/save-notebooks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
        },
        body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
      });
      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to save notebooks.');
      }
      const saveResult = await resp.json();
      alert('Notebooks saved successfully!');

      // Use the saved S3 links (cell8 URL) for training
      if (fetchedNotebooks.length > 0) {
        const nb0 = fetchedNotebooks[0];
        const cell8Url = nb0.cell_s3_links['cell8'] || nb0.file_url || "s3://testingfiles-pacx/cell_8_2c46f7.csv";
        if (!predictiveSettings) {
          alert('Predictive settings are not loaded yet. Please wait.');
          return;
        }

        const payload = {
          file_url: cell8Url,
          target_column: predictiveSettings.target_column || "target_within_30_days_after",
          user_id: user_id || "17236",
          chat_id: chat_id || "7236390",
          column_id: predictiveSettings.entity_column || "product_id",
          ml_type: true,
        };

        const trainResponse = await fetch('http://98.70.25.52/api/automation/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
          },
          body: JSON.stringify(payload),
        });

        if (!trainResponse.ok) {
          const errorText = await trainResponse.text();
          throw new Error(`Failed to train model: ${errorText}`);
        }

        const trainResult = await trainResponse.json();
        console.log('Train model response:', trainResult);
      }
    } catch (err: any) {
      console.error('Error saving notebooks or training model:', err);
      alert(`Error: ${err.message}`);
    } finally {
      setSavingNotebooks(false);
    }
  };

  // Auto-run notebooks
  useEffect(() => {
    if (
      !autoRunDoneRef.current &&
      !loadingNotebook &&
      !fetchError &&
      fetchedNotebooks.length > 0
    ) {
      autoRunDoneRef.current = true;
      console.log('Auto-running all notebook cells...');
      setTimeout(async () => {
        try {
          if (timeBasedNotebookCells.length > 0 && timeNotebookRef.current) {
            await timeNotebookRef.current.runAllCellsAndGetResults();
          } else if (
            nonTimeBasedNotebookCells.length > 0 &&
            nonTimeBasedNotebookRef.current
          ) {
            await nonTimeBasedNotebookRef.current.runAllCellsAndGetResults();
          }
          console.log('Auto-run complete.');
        } catch (err) {
          console.error('Error auto-running cells:', err);
        }
      }, 1000);
    }
  }, [loadingNotebook, fetchError, fetchedNotebooks, timeBasedNotebookCells, nonTimeBasedNotebookCells]);

  const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
    setActiveTab(tabId);
    navigate(`/notebook/${user_id}/${chat_id}/${tabId}`);
  };

  const timeNotebook = timeBasedNotebookCells.length > 0 && (
    <div className="space-y-12">
      <h2 className="text-2xl font-bold mb-6">Time-Based Analysis Notebook</h2>
      <SQLNotebook
        ref={timeNotebookRef}
        activeTab="time_based_notebook"
        notebookContent={{
          file_url,
          entity_column,
          target_column,
          features,
          user_id,
          chat_id,
          isTrained: modelTrained,
          handleTrainModel: () => {}, // Disable train button functionality
          cells: timeBasedNotebookCells,
        }}
      />
    </div>
  );

  const nonTimeBasedNotebook = nonTimeBasedNotebookCells.length > 0 && (
    <div className="space-y-12">
      <h2 className="text-2xl font-bold mb-6">Analysis Notebook</h2>
      <SQLNotebook
        ref={nonTimeBasedNotebookRef}
        activeTab="non_time_based_notebook"
        notebookContent={{
          file_url,
          entity_column,
          target_column,
          features,
          user_id,
          chat_id,
          isTrained: modelTrained,
          handleTrainModel: () => {}, // Disable train button functionality
          cells: nonTimeBasedNotebookCells,
        }}
      />
    </div>
  );

  return (
    <div className="relative h-screen overflow-hidden bg-gray-100">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-purple-900 shadow-sm">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          notebooks={[
            {
              id: 'notebook',
              title: 'Notebook',
              icon: <FiBook size={18} className="text-purple-900" />,
              onClick: () => handleTabChange('notebook'),
            },
            {
              id: 'dashboard',
              title: 'Dashboard',
              icon: <FiBarChart2 size={18} className="text-purple-900" />,
              onClick: () => handleTabChange('dashboard'),
            },
            {
              id: 'predict',
              title: 'Predict',
              icon: <FiFlag size={18} className="text-purple-900" />,
              onClick: () => handleTabChange('predict'),
            },
          ]}
          activeTab={activeTab}
        />
      </div>

      {/* Left Sidebar */}
      <div
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-40 bg-white transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-64'
        }`}
        style={{ width: '16rem' }}
      >
        <Sidebar isOpen={isSidebarOpen} />
      </div>

      {/* Train & Save Buttons */}
      {activeTab === 'notebook' && !modelTrained && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="fixed top-20 right-10 z-50 flex flex-col space-y-4"
        >
          <button
            onClick={handleTrainModel}
            className="flex items-center px-6 py-3 bg-purple-900 text-white rounded-md shadow-md hover:bg-purple-950 focus:outline-none focus:ring-2 focus:ring-purple-800 transition-transform transform hover:scale-105"
            aria-label="Train your predictive model"
          >
            Train Model
          </button>
        </motion.div>
      )}

      {/* Main Content Area */}
      <div
        className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
          isSidebarOpen ? 'left-64' : 'left-0'
        }`}
      >
        <div className="h-[calc(100vh-7rem)] overflow-y-auto">
          {/* Notebook Tab */}
          {activeTab === 'notebook' && (
            <div className="p-8 w-full max-w-6xl mx-auto">
              {/* Predictive Settings UI */}
              {predictiveSettings && (
                <div className="mb-12">
                  {/* Predictive Question as Heading */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="mb-8"
                  >
                    <h1 className="text-2xl font-semibold border-b border-purple-200 pb-4">
                      {predictiveSettings.predictive_question || 'No Predictive Question Set'}
                    </h1>
                  </motion.div>

                  {/* Other Settings in a Horizontal List with more spacing */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
                    className="flex flex-wrap gap-6"
                  >
                    {/* Target Column */}
                    <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
                      <span className="font-medium text-gray-600">Target:</span>{' '}
                      <span className="font-medium text-purple-900">
                        {predictiveSettings.target_column || 'Null'}
                      </span>
                    </div>

                    {/* Entity Column */}
                    <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
                      <span className="font-medium text-gray-600">Entity:</span>{' '}
                      <span className="font-medium text-purple-900">
                        {predictiveSettings.entity_column || 'Null'}
                      </span>
                    </div>

                    {/* Time Column */}
                    <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
                      <span className="font-medium text-gray-600">Time:</span>{' '}
                      <span className="font-medium text-purple-900">
                        {predictiveSettings.time_column || 'Null'}
                      </span>
                    </div>

                    {/* Time Frame */}
                    <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
                      <span className="font-medium text-gray-600">Frame:</span>{' '}
                      <span className="font-medium text-purple-900">
                        {predictiveSettings.time_frame || 'Null'}
                      </span>
                    </div>

                    {/* Time Frequency */}
                    <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
                      <span className="font-medium text-gray-600">Frequency:</span>{' '}
                      <span className="font-medium text-purple-900">
                        {predictiveSettings.time_frequency || 'Null'}
                      </span>
                    </div>

                    {/* Machine Learning Type */}
                    <div className="bg-white border border-gray-300 rounded-md px-6 py-3 text-sm hover:border-purple-700 transition-colors">
                      <span className="font-medium text-gray-600">ML Type:</span>{' '}
                      <span className="font-medium text-purple-900">
                        {predictiveSettings.machine_learning_type || 'Null'}
                      </span>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Notebook(s) Content */}
              {loadingNotebook ? (
                <div className="p-8 text-center">Loading notebook data...</div>
              ) : fetchError ? (
                <div className="p-8 text-center text-red-600">Error: {fetchError}</div>
              ) : (
                <>
                  {timeBasedNotebookCells.length > 0
                    ? timeNotebook
                    : nonTimeBasedNotebook}
                </>
              )}
            </div>
          )}

          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="p-8 w-full max-w-7xl mx-auto">
              <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
            </div>
          )}

          {/* Predict Tab - now full width (no max-w-6xl) */}
          {activeTab === 'predict' && (
            <div className="w-full h-full">
              <PredictionsUI user_id={user_id} chat_id={chat_id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotebookLayout;
