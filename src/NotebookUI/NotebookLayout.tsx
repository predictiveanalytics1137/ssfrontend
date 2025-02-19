







// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useLocation, useNavigate } from 'react-router-dom';
// // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // import Sidebar from './Sidebar/Sidebar';
// // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // import Dashboard from '../Dashboard/Dashboard';
// // // import PredictionsUI from '../Predict/PredictNewData';
// // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // import { motion } from 'framer-motion';

// // // // If you have additional type definitions or interfaces, keep them:
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
// // //     entity_target_notebook?: string;
// // //     features_notebook?: string;
// // //     time_based_notebook?: string; // For time-based approach
// // //   };
// // //   file_url: string;
// // //   entity_column: string;
// // //   target_column: string;
// // //   features: string[];
// // //   user_id: string;
// // //   chat_id: string;
// // //   isTrained: boolean;
// // //   time_column?: string;
// // //   time_frame?: string;
// // // }

// // // // -------------
// // // // 1) Import the ref interface from your forwardRef in SQLNotebook
// // // //    e.g. import type { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // // import type { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';

// // // const NotebookLayout: React.FC = () => {
// // //   console.log('NotebookLayout: Component mounting');
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   const [activeTab, setActiveTab] = useState('notebook');
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
// // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // //   const [modelTrained, setModelTrained] = useState(false);
// // //   const [polling, setPolling] = useState(false);

// // //   // 2) A ref to call runAllCellsAndGetResults from the child
// // //   const notebookRef = useRef<SQLNotebookRef | null>(null);

// // //   // Pull data from location.state
// // //   const {
// // //     notebooks,
// // //     file_url,
// // //     entity_column,
// // //     target_column,
// // //     features,
// // //     user_id,
// // //     chat_id,
// // //     isTrained = false,
// // //     // time_column, time_frame
// // //   } = (location.state as NotebookState) || {};

// // //   // Polling / Model training logic remains the same
// // //   const fetchModelResults = async () => {
// // //     try {
// // //       console.log('Fetching model results...');
// // //       const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // //       const response = await fetch(url);
// // //       if (!response.ok) {
// // //         if (response.status === 404) {
// // //           console.log('Model results not found yet. Retrying...');
// // //           return null; // No results yet, keep polling
// // //         } else {
// // //           throw new Error(
// // //             `Failed to fetch model results. Status: ${response.status}`
// // //           );
// // //         }
// // //       }
// // //       const result = await response.json();
// // //       setDashboardData(result);
// // //       console.log('Model results fetched:', result);
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
// // //     }, 90000); // poll every 90 seconds
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

// // //     // Wait 5 minutes before polling
// // //     setTimeout(() => {
// // //       console.log('Starting polling after 5 minutes...');
// // //       pollModelResults();
// // //     }, 300000); // 5 minutes
// // //   };

// // //   // 3) Our new Save Notebooks function
// // //   const [savingNotebooks, setSavingNotebooks] = useState(false);

// // //   const handleSaveNotebooks = async () => {
// // //     if (!user_id || !chat_id) {
// // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // //       return;
// // //     }
// // //     if (!notebookRef.current) {
// // //       alert('Notebook reference not found.');
// // //       return;
// // //     }

// // //     setSavingNotebooks(true);
// // //     try {
// // //       // 3a) Instruct the child to run all cells, collecting results
// // //       const cellResults = await notebookRef.current.runAllCellsAndGetResults();
// // //       // 3b) POST them to /api/save-notebooks
// // //       const resp = await fetch('http://localhost:8000/api/save-notebooks/', {
// // //         method: 'POST',
// // //         headers: { 
// // //           'Content-Type': 'application/json', 
// // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // //         },
// // //         body: JSON.stringify({
// // //           user_id,
// // //           chat_id,
// // //           cells: cellResults, // array of { cellId, query, columns, rows }
// // //         }),
// // //       });

// // //       if (!resp.ok) {
// // //         const errData = await resp.json().catch(() => ({}));
// // //         throw new Error(errData.error || 'Failed to save notebooks.');
// // //       }
// // //       const data = await resp.json();
// // //       console.log('Save notebooks success:', data);
// // //       alert('Notebooks saved successfully!');
// // //     } catch (err: any) {
// // //       console.error('Error saving notebooks:', err);
// // //       alert(`Error saving notebooks: ${err.message}`);
// // //     } finally {
// // //       setSavingNotebooks(false);
// // //     }
// // //   };

// // //   // handleTabChange for the Nav
// // //   const handleTabChange = (tabId: string) => {
// // //     setActiveTab(tabId);
// // //   };

// // //   // We parse the notebooks from JSON
// // //   const timeBasedNotebookCells = notebooks?.time_based_notebook
// // //     ? JSON.parse(notebooks.time_based_notebook).cells
// // //     : [];
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
// // //         // If timeBasedNotebookCells exist, we show them
// // //         if (timeBasedNotebookCells.length > 0) {
// // //           return (
// // //             <div className="space-y-8">
// // //               <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
// // //               {/* 4) Attach the ref to this notebook so we can runAllCellsAndGetResults */}
// // //               <SQLNotebook
// // //                 ref={notebookRef}
// // //                 activeTab="time_based_notebook"
// // //                 notebookContent={{
// // //                   file_url,
// // //                   entity_column,
// // //                   target_column,
// // //                   features,
// // //                   user_id,
// // //                   chat_id,
// // //                   isTrained,
// // //                   handleTrainModel,
// // //                   cells: timeBasedNotebookCells,
// // //                 }}
// // //               />
// // //             </div>
// // //           );
// // //         } else {
// // //           // Otherwise, show the two standard notebooks
// // //           return (
// // //             <div className="space-y-8">
// // //               <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // //               {/* We'll attach the ref to just the first one for demonstration */}
// // //               <SQLNotebook
// // //                 ref={notebookRef}
// // //                 activeTab="entity_target_notebook"
// // //                 notebookContent={{
// // //                   file_url,
// // //                   entity_column,
// // //                   target_column,
// // //                   features,
// // //                   user_id,
// // //                   chat_id,
// // //                   isTrained,
// // //                   handleTrainModel,
// // //                   cells: entityTargetNotebookCells,
// // //                 }}
// // //               />
// // //               <SQLNotebook
// // //                 activeTab="features_notebook"
// // //                 notebookContent={{
// // //                   file_url,
// // //                   entity_column,
// // //                   target_column,
// // //                   features,
// // //                   user_id,
// // //                   chat_id,
// // //                   isTrained,
// // //                   handleTrainModel,
// // //                   cells: featuresNotebookCells,
// // //                 }}
// // //               />
// // //             </div>
// // //           );
// // //         }

// // //       case 'dashboard':
// // //         if (!isTrained) {
// // //           return (
// // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // //                 <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// // //                 <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// // //                 <p className="text-gray-600">
// // //                   Please train your model first to view the dashboard metrics.
// // //                 </p>
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
// // //         if (!isTrained) {
// // //           return (
// // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // //                 <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // //                 <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// // //                 <p className="text-gray-600">
// // //                   Please train your model first to make predictions.
// // //                 </p>
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

// // //       {/* 5) Both "Train Model" and "Save Notebooks" buttons if not isTrained */}
// // //       {!isTrained && (
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
// // //         >
// // //           <button
// // //             onClick={handleTrainModel}
// // //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // //             aria-label="Train your predictive model"
// // //           >
// // //             Train Model
// // //           </button>

// // //           {/* Save Notebooks button */}
// // //           <button
// // //             onClick={handleSaveNotebooks}
// // //             disabled={savingNotebooks}
// // //             className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
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

// // //       <div
// // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // //           isSidebarOpen ? 'left-64' : 'left-0'
// // //         }`}
// // //       >
// // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto">
// // //           <div className="p-4">
// // //             <div className="w-full max-w-6xl mx-auto">
// // //               {renderContent()}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NotebookLayout;














// // // working


// // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { useLocation, useNavigate } from 'react-router-dom';
// // // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // import Sidebar from './Sidebar/Sidebar';
// // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';
// // // import Dashboard from '../Dashboard/Dashboard';
// // // import PredictionsUI from '../Predict/PredictNewData';
// // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // import { motion } from 'framer-motion';

// // // // If you have additional type definitions or interfaces, keep them:
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

// // // // We no longer rely on a 'NotebookState' that includes "notebooks" JSON
// // // // because we will fetch them from the API. We'll keep the rest if needed.

// // // // 1) Import the ref interface from your forwardRef in SQLNotebook
// // // import type { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';

// // // const NotebookLayout: React.FC = () => {
// // //   const { user_id = '', chat_id = '' } = useParams();
// // //   console.log('NotebookLayout: Component mounting');
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   // We only expect user_id, chat_id, and isTrained from location.state.
// // //   const {
// // //     // user_id,
// // //     // chat_id,
// // //     isTrained = false,
// // //   } = (location.state as any) || {};

// // //   console.log('User ID:', user_id);
// // //   console.log('Chat ID:', chat_id);

// // //   // Local states
// // //   const [activeTab, setActiveTab] = useState('notebook');
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
// // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // //   const [modelTrained, setModelTrained] = useState(false);
// // //   const [polling, setPolling] = useState(false);
// // //   const [savingNotebooks, setSavingNotebooks] = useState(false);

// // //   // ---- NEW: We'll store the fetched notebook(s) from /api/notebooks
// // //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// // //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// // //   const [fetchError, setFetchError] = useState<string | null>(null);

// // //   // For demonstration, if your backend can return multiple notebooks,
// // //   // you can handle them however you want. We'll parse them below.
// // //   // We'll just assume if there's a time-based approach, it has a "time_based_notebook" key, etc.

// // //   // 2) A ref to call runAllCellsAndGetResults from the child
// // //   const notebookRef = useRef<SQLNotebookRef | null>(null);

// // //   // ------------------------------------------------------------------
// // //   // (A) Fetch the notebooks from the backend if user_id & chat_id exist
// // //   // ------------------------------------------------------------------
// // //   // useEffect(() => {
// // //   //   if (!user_id || !chat_id) return;

// // //   //   const fetchNotebooks = async () => {
// // //   //     setLoadingNotebook(true);
// // //   //     setFetchError(null);
// // //   //     try {
// // //   //       const res = await fetch(
// // //   //         `http://localhost:8000/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // //   //       );
// // //   //       if (!res.ok) {
// // //   //         throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // //   //       }
// // //   //       const data = await res.json();
// // //   //       console.log('[DEBUG] /api/notebooks response:', data);

// // //   //       if (!data.notebooks || !data.notebooks.length) {
// // //   //         setFetchedNotebooks([]);
// // //   //         setFetchError('No notebooks found for this user/chat.');
// // //   //       } else {
// // //   //         setFetchedNotebooks(data.notebooks);
// // //   //       }
// // //   //     } catch (err: any) {
// // //   //       console.error('Error fetching notebooks:', err);
// // //   //       setFetchError(err.message);
// // //   //     } finally {
// // //   //       setLoadingNotebook(false);
// // //   //     }
// // //   //   };

// // //   //   fetchNotebooks();
// // //   // }, [user_id, chat_id]);


// // //   useEffect(() => {
// // //     if (!user_id || !chat_id) return;
  
// // //     const fetchNotebooks = async () => {
// // //       setLoadingNotebook(true);
// // //       setFetchError(null);
// // //       try {
// // //         const res = await fetch(
// // //           `http://localhost:8000/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
// // //         );
// // //         if (!res.ok) {
// // //           throw new Error(`Failed to fetch notebooks: ${res.statusText}`);
// // //         }
// // //         const data = await res.json();
// // //         console.log('[DEBUG] /api/notebooks response:', data);
  
// // //         if (!data.notebooks || !data.notebooks.length) {
// // //           setFetchedNotebooks([]);
// // //           setFetchError('No notebooks found for this user/chat.');
// // //         } else {
// // //           setFetchedNotebooks(data.notebooks);
  
// // //           // Trigger cell execution after fetching notebooks
// // //           if (notebookRef.current) {
// // //             console.log('Executing all cells...');
// // //             const cellResults = await notebookRef.current.runAllCellsAndGetResults();
// // //             console.log('Cell execution results:', cellResults);
// // //           } else {
// // //             console.warn('Notebook reference not found; skipping cell execution.');
// // //           }
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
  

// // //   // ------------------------------------------------------------------
// // //   // (B) Extract the relevant fields from the fetched notebooks
// // //   //     So we can keep the same logic as before: timeBasedNotebookCells, etc.
// // //   // ------------------------------------------------------------------

// // //   // For a time-based approach, your code originally expected:
// // //   //   notebooks.time_based_notebook, notebooks.entity_target_notebook, ...
// // //   // But now we have an array of notebooks from the DB. We'll parse them:
// // //   let timeBasedNotebookCells: any[] = [];
// // //   let entityTargetNotebookCells: any[] = [];
// // //   let featuresNotebookCells: any[] = [];

// // //   // Also get file_url, entity_column, target_column, features, etc.
// // //   // We'll just pick from the first fetched notebook if it exists.
// // //   let file_url = '';
// // //   let entity_column = '';
// // //   let target_column = '';
// // //   let features: string[] = [];

// // //   if (fetchedNotebooks && fetchedNotebooks.length > 0) {
// // //     // For demonstration, let's assume the first item might be time-based:
// // //     const nb0 = fetchedNotebooks[0];

// // //     // Common fields:
// // //     file_url = nb0.file_url;
// // //     entity_column = nb0.entity_column;
// // //     target_column = nb0.target_column;
// // //     features = nb0.features || [];

// // //     // We check if nb0 might be a "time-based" approach if it has time_column
// // //     // or we see if the backend has separate notebooks for entity-target, features, etc.
// // //     // If your backend returns separate records, you can parse them individually.
// // //     // For example:
// // //     fetchedNotebooks.forEach((nb) => {
// // //       try {
// // //         if (!nb.notebook_json) return;
// // //         const parsed = JSON.parse(nb.notebook_json);
// // //         const cells = parsed?.cells || [];

// // //         // We'll guess which notebook is which based on time_column presence
// // //         if (nb.time_column) {
// // //           timeBasedNotebookCells = cells;
// // //         } else if (
// // //           nb.entity_column &&
// // //           nb.target_column &&
// // //           !nb.time_column &&
// // //           !timeBasedNotebookCells.length
// // //         ) {
// // //           // We might treat the first one as entity-target
// // //           entityTargetNotebookCells = cells;
// // //         } else {
// // //           // If there's a third one, assume it's features
// // //           featuresNotebookCells = cells;
// // //         }
// // //       } catch (err) {
// // //         console.error('Error parsing notebook JSON:', err);
// // //       }
// // //     });
// // //   }

// // //   // ------------------------------------------------------------------
// // //   // (C) Polling / Model training logic (unchanged)
// // //   // ------------------------------------------------------------------
// // //   const fetchModelResults = async () => {
// // //     try {
// // //       console.log('Fetching model results...');
// // //       const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
// // //       const response = await fetch(url);
// // //       if (!response.ok) {
// // //         if (response.status === 404) {
// // //           console.log('Model results not found yet. Retrying...');
// // //           return null; // No results yet, keep polling
// // //         } else {
// // //           throw new Error(
// // //             `Failed to fetch model results. Status: ${response.status}`
// // //           );
// // //         }
// // //       }
// // //       const result = await response.json();
// // //       setDashboardData(result);
// // //       console.log('Model results fetched:', result);
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
// // //     }, 90000); // poll every 90 seconds
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
// // //         // We are not storing full notebook JSON anymore
// // //         // but if your training page needs them, handle accordingly
// // //       },
// // //     });

// // //     // Wait 5 minutes before polling
// // //     setTimeout(() => {
// // //       console.log('Starting polling after 5 minutes...');
// // //       pollModelResults();
// // //     }, 300000); // 5 minutes
// // //   };

// // //   // 3) Our new Save Notebooks function
// // //   const handleSaveNotebooks = async () => {
// // //     if (!user_id || !chat_id) {
// // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // //       return;
// // //     }
// // //     if (!notebookRef.current) {
// // //       alert('Notebook reference not found.');
// // //       return;
// // //     }

// // //     setSavingNotebooks(true);
// // //     try {
// // //       // 3a) Instruct the child to run all cells, collecting results
// // //       const cellResults = await notebookRef.current.runAllCellsAndGetResults();
// // //       // 3b) POST them to /api/save-notebooks
// // //       const resp = await fetch('http://localhost:8000/api/save-notebooks/', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           // Use your own auth token if needed
// // //           'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
// // //         },
// // //         body: JSON.stringify({
// // //           user_id,
// // //           chat_id,
// // //           cells: cellResults, // array of { cellId, query, columns, rows }
// // //         }),
// // //       });

// // //       if (!resp.ok) {
// // //         const errData = await resp.json().catch(() => ({}));
// // //         throw new Error(errData.error || 'Failed to save notebooks.');
// // //       }
// // //       const data = await resp.json();
// // //       console.log('Save notebooks success:', data);
// // //       alert('Notebooks saved successfully!');
// // //     } catch (err: any) {
// // //       console.error('Error saving notebooks:', err);
// // //       alert(`Error saving notebooks: ${err.message}`);
// // //     } finally {
// // //       setSavingNotebooks(false);
// // //     }
// // //   };

// // //   // handleTabChange for the Nav
// // //   const handleTabChange = (tabId: string) => {
// // //     setActiveTab(tabId);
// // //   };

// // //   // 4) We set up the Nav config
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

// // //   // ------------------------------------------------------------------
// // //   // (D) Render content logic (unchanged except for loading/fetchError check)
// // //   // ------------------------------------------------------------------
// // //   const renderContent = () => {
// // //     if (loadingNotebook) {
// // //       return <div className="p-4">Loading notebook data...</div>;
// // //     }
// // //     if (fetchError) {
// // //       return <div className="p-4 text-red-600">Error: {fetchError}</div>;
// // //     }

// // //     switch (activeTab) {
// // //       case 'notebook':
// // //         // If timeBasedNotebookCells exist, we show them
// // //         if (timeBasedNotebookCells.length > 0) {
// // //           return (
// // //             <div className="space-y-8">
// // //               <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
// // //               {/* Attach the ref to this notebook so we can runAllCellsAndGetResults */}
// // //               <SQLNotebook
// // //                 ref={notebookRef}
// // //                 activeTab="time_based_notebook"
// // //                 notebookContent={{
// // //                   file_url,
// // //                   entity_column,
// // //                   target_column,
// // //                   features,
// // //                   user_id,
// // //                   chat_id,
// // //                   isTrained,
// // //                   handleTrainModel,
// // //                   cells: timeBasedNotebookCells,
// // //                 }}
// // //               />
// // //             </div>
// // //           );
// // //         } else {
// // //           // Otherwise, show the two standard notebooks (entity-target & features)
// // //           return (
// // //             <div className="space-y-8">
// // //               <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // //               <SQLNotebook
// // //                 ref={notebookRef}
// // //                 activeTab="entity_target_notebook"
// // //                 notebookContent={{
// // //                   file_url,
// // //                   entity_column,
// // //                   target_column,
// // //                   features,
// // //                   user_id,
// // //                   chat_id,
// // //                   isTrained,
// // //                   handleTrainModel,
// // //                   cells: entityTargetNotebookCells,
// // //                 }}
// // //               />
// // //               <SQLNotebook
// // //                 activeTab="features_notebook"
// // //                 notebookContent={{
// // //                   file_url,
// // //                   entity_column,
// // //                   target_column,
// // //                   features,
// // //                   user_id,
// // //                   chat_id,
// // //                   isTrained,
// // //                   handleTrainModel,
// // //                   cells: featuresNotebookCells,
// // //                 }}
// // //               />
// // //             </div>
// // //           );
// // //         }

// // //       case 'dashboard':
// // //         if (!isTrained) {
// // //           return (
// // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // //                 <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// // //                 <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// // //                 <p className="text-gray-600">
// // //                   Please train your model first to view the dashboard metrics.
// // //                 </p>
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
// // //         if (!isTrained) {
// // //           return (
// // //             <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // //               <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // //                 <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // //                 <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// // //                 <p className="text-gray-600">
// // //                   Please train your model first to make predictions.
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           );
// // //         }
// // //         return <PredictionsUI />;

// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   // ------------------------------------------------------------------
// // //   // (E) Return the same JSX
// // //   // ------------------------------------------------------------------
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

// // //       {/* Both "Train Model" and "Save Notebooks" buttons if not isTrained */}
// // //       {!isTrained && (
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
// // //         >
// // //           <button
// // //             onClick={handleTrainModel}
// // //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // //             aria-label="Train your predictive model"
// // //           >
// // //             Train Model
// // //           </button>

// // //           {/* Save Notebooks button */}
// // //           <button
// // //             onClick={handleSaveNotebooks}
// // //             disabled={savingNotebooks}
// // //             className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
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











// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // // import Navbar from '../NotebookUI/Navbar/Navbar';
// // // import Sidebar from './Sidebar/Sidebar';
// // // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // // import Dashboard from '../Dashboard/Dashboard';
// // // import PredictionsUI from '../Predict/PredictNewData';
// // // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // // import { motion } from 'framer-motion';

// // // // Types for model results, etc.
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

// // // const NotebookLayout: React.FC = () => {
// // //   // If you need user_id/chat_id from route params:
// // //   const { user_id = '', chat_id = '' } = useParams();
// // //   const location = useLocation();
// // //   const navigate = useNavigate();

// // //   // If also from location.state, combine as needed:
// // //   const { isTrained = false } = (location.state as any) || {};

// // //   // Basic local states
// // //   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// // //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// // //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// // //   const [modelTrained, setModelTrained] = useState(false);
// // //   const [polling, setPolling] = useState(false);
// // //   const [savingNotebooks, setSavingNotebooks] = useState(false);

// // //   // Notebook data from /api/notebooks
// // //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// // //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// // //   const [fetchError, setFetchError] = useState<string | null>(null);

// // //   // Refs for each notebook (if you want to run or save them individually)
// // //   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
// // //   const entityNotebookRef = useRef<SQLNotebookRef | null>(null);
// // //   const featuresNotebookRef = useRef<SQLNotebookRef | null>(null);

// // //   // ------------------------------------------
// // //   // A) Fetch notebooks from the backend
// // //   // ------------------------------------------
// // //   useEffect(() => {
// // //     if (!user_id || !chat_id) return;

// // //     const fetchNotebooks = async () => {
// // //       setLoadingNotebook(true);
// // //       setFetchError(null);
// // //       try {
// // //         const res = await fetch(
// // //           `http://localhost:8000/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
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

// // //   // ------------------------------------------
// // //   // B) Parse notebooks => time/entity/features
// // //   // ------------------------------------------
// // //   let timeBasedNotebookCells: any[] = [];
// // //   let entityTargetNotebookCells: any[] = [];
// // //   let featuresNotebookCells: any[] = [];

// // //   let file_url = '';
// // //   let entity_column = '';
// // //   let target_column = '';
// // //   let features: string[] = [];

// // //   if (fetchedNotebooks.length > 0) {
// // //     // We'll take the first notebook's metadata as common fields
// // //     const nb0 = fetchedNotebooks[0];
// // //     file_url = nb0.file_url;
// // //     entity_column = nb0.entity_column;
// // //     target_column = nb0.target_column;
// // //     features = nb0.features || [];

// // //     fetchedNotebooks.forEach((nb) => {
// // //       if (!nb.notebook_json) return;
// // //       try {
// // //         const parsed = JSON.parse(nb.notebook_json);
// // //         const cells = parsed?.cells || [];
// // //         if (nb.time_column) {
// // //           timeBasedNotebookCells = cells;
// // //         } else if (nb.entity_column && nb.target_column && !timeBasedNotebookCells.length) {
// // //           entityTargetNotebookCells = cells;
// // //         } else {
// // //           featuresNotebookCells = cells;
// // //         }
// // //       } catch (err) {
// // //         console.error('Error parsing notebook JSON:', err);
// // //       }
// // //     });
// // //   }

// // //   // ------------------------------------------
// // //   // C) Polling / model training logic
// // //   // ------------------------------------------
// // //   const fetchModelResults = async () => {
// // //     try {
// // //       const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
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
// // //       state: {
// // //         user_id,
// // //         chat_id,
// // //         file_url,
// // //         entity_column,
// // //         target_column,
// // //         features,
// // //       },
// // //     });
// // //     setTimeout(() => {
// // //       pollModelResults();
// // //     }, 300000);
// // //   };

// // //   // ------------------------------------------
// // //   // D) Save Notebooks => runAllCells
// // //   // ------------------------------------------
// // //   const handleSaveNotebooks = async () => {
// // //     if (!user_id || !chat_id) {
// // //       alert('user_id or chat_id is missing, cannot save notebooks.');
// // //       return;
// // //     }
// // //     // For simplicity, run time-based cells if present, else entity
// // //     const activeNotebookRef = timeBasedNotebookCells.length
// // //       ? timeNotebookRef
// // //       : entityNotebookRef;

// // //     if (!activeNotebookRef.current) {
// // //       alert('No notebook to save. Notebook reference not found.');
// // //       return;
// // //     }
// // //     setSavingNotebooks(true);
// // //     try {
// // //       const cellResults = await activeNotebookRef.current.runAllCellsAndGetResults();
// // //       const resp = await fetch('http://localhost:8000/api/save-notebooks/', {
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

// // //   // ------------------------------------------
// // //   // E) Show/hide tabs without unmounting
// // //   // ------------------------------------------
// // //   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
// // //     setActiveTab(tabId);
// // //   };

// // //   // *Time-based Notebook*
// // //   const timeNotebook = timeBasedNotebookCells.length > 0 && (
// // //     <div className="space-y-8">
// // //       <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
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
// // //           isTrained,
// // //           handleTrainModel,
// // //           cells: timeBasedNotebookCells,
// // //         }}
// // //       />
// // //     </div>
// // //   );

// // //   // *Entity + Features Notebook*
// // //   const entityAndFeaturesNotebooks = (
// // //     <div className="space-y-8">
// // //       <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// // //       <SQLNotebook
// // //         ref={entityNotebookRef}
// // //         activeTab="entity_target_notebook"
// // //         notebookContent={{
// // //           file_url,
// // //           entity_column,
// // //           target_column,
// // //           features,
// // //           user_id,
// // //           chat_id,
// // //           isTrained,
// // //           handleTrainModel,
// // //           cells: entityTargetNotebookCells,
// // //         }}
// // //       />
// // //       <SQLNotebook
// // //         ref={featuresNotebookRef}
// // //         activeTab="features_notebook"
// // //         notebookContent={{
// // //           file_url,
// // //           entity_column,
// // //           target_column,
// // //           features,
// // //           user_id,
// // //           chat_id,
// // //           isTrained,
// // //           handleTrainModel,
// // //           cells: featuresNotebookCells,
// // //         }}
// // //       />
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="relative h-screen overflow-hidden">
// // //       {/* Top Navbar */}
// // //       <div className="fixed top-0 left-0 right-0 z-50">
// // //         <Navbar
// // //           isSidebarOpen={isSidebarOpen}
// // //           setIsSidebarOpen={setIsSidebarOpen}
// // //           notebooks={[
// // //             {
// // //               id: 'notebook',
// // //               title: 'Notebook',
// // //               icon: <FiBook size={18} />,
// // //               onClick: () => handleTabChange('notebook'),
// // //             },
// // //             {
// // //               id: 'dashboard',
// // //               title: 'Dashboard',
// // //               icon: <FiBarChart2 size={18} />,
// // //               onClick: () => handleTabChange('dashboard'),
// // //             },
// // //             {
// // //               id: 'predict',
// // //               title: 'Predict',
// // //               icon: <FiFlag size={18} />,
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

// // //       {/* Train & Save if not isTrained */}
// // //       {!isTrained && (
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20, x: -20 }}
// // //           animate={{ opacity: 1, y: 0, x: 0 }}
// // //           transition={{ duration: 0.5, ease: 'easeOut' }}
// // //           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
// // //         >
// // //           <button
// // //             onClick={handleTrainModel}
// // //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// // //             aria-label="Train your predictive model"
// // //           >
// // //             Train Model
// // //           </button>

// // //           <button
// // //             onClick={handleSaveNotebooks}
// // //             disabled={savingNotebooks}
// // //             className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
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

// // //       {/* Main Content Area (Notebook / Dashboard / Predict) */}
// // //       <div
// // //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// // //           isSidebarOpen ? 'left-64' : 'left-0'
// // //         }`}
// // //       >
// // //         <div className="h-[calc(100vh-7rem)] overflow-y-auto p-4">
// // //           <div className="w-full max-w-6xl mx-auto">
// // //             {/* Notebook Tab (always mounted, hidden with display) */}
// // //             <div style={{ display: activeTab === 'notebook' ? 'block' : 'none' }}>
// // //               {loadingNotebook ? (
// // //                 <div className="p-4">Loading notebook data...</div>
// // //               ) : fetchError ? (
// // //                 <div className="p-4 text-red-600">Error: {fetchError}</div>
// // //               ) : (
// // //                 <>
// // //                   {timeBasedNotebookCells.length > 0 ? timeNotebook : entityAndFeaturesNotebooks}
// // //                 </>
// // //               )}
// // //             </div>

// // //             {/* Dashboard Tab (always mounted) */}
// // //             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
// // //               {!isTrained ? (
// // //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // //                     <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// // //                     <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// // //                     <p className="text-gray-600">
// // //                       Please train your model first to view the dashboard metrics.
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               ) : loadingDashboard ? (
// // //                 <div>Loading Dashboard...</div>
// // //               ) : (
// // //                 <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // //               )}
// // //             </div>

// // //             {/* Predict Tab (always mounted) */}
// // //             <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
// // //               {!isTrained ? (
// // //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// // //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// // //                     <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// // //                     <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// // //                     <p className="text-gray-600">
// // //                       Please train your model first to make predictions.
// // //                     </p>
// // //                   </div>
// // //                 </div>
// // //               ) : (
// // //                 <PredictionsUI />
// // //               )}
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default NotebookLayout;











// // import React, { useState, useEffect, useRef } from 'react';
// // import { useParams, useLocation, useNavigate } from 'react-router-dom';
// // import Navbar from '../NotebookUI/Navbar/Navbar';
// // import Sidebar from './Sidebar/Sidebar';
// // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// // import Dashboard from '../Dashboard/Dashboard';
// // import PredictionsUI from '../Predict/PredictNewData';
// // import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// // import { motion } from 'framer-motion';

// // // Types for model results, etc.
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

// // const NotebookLayout: React.FC = () => {
// //   // We read user_id, chat_id from the route params
// //   const { user_id = '', chat_id = '' } = useParams();
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   // If also from location.state, combine as needed:
// //   const { isTrained = false } = (location.state as any) || {};

// //   // Local states
// //   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
// //   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
// //   const [loadingDashboard, setLoadingDashboard] = useState(false);
// //   const [modelTrained, setModelTrained] = useState(false);
// //   const [polling, setPolling] = useState(false);
// //   const [savingNotebooks, setSavingNotebooks] = useState(false);

// //   // Notebook data from /api/notebooks
// //   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
// //   const [loadingNotebook, setLoadingNotebook] = useState(false);
// //   const [fetchError, setFetchError] = useState<string | null>(null);

// //   // Refs for each notebook so we can run them
// //   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
// //   const entityNotebookRef = useRef<SQLNotebookRef | null>(null);
// //   const featuresNotebookRef = useRef<SQLNotebookRef | null>(null);

// //   // A ref so we only auto-run once
// //   const autoRunDoneRef = useRef(false);

// //   // ------------------------------------------
// //   // A) Fetch notebooks from the backend
// //   // ------------------------------------------
// //   useEffect(() => {
// //     if (!user_id || !chat_id) return;

// //     const fetchNotebooks = async () => {
// //       setLoadingNotebook(true);
// //       setFetchError(null);
// //       try {
// //         const res = await fetch(
// //           `http://localhost:8000/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
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

// //   // // ------------------------------------------
// //   // // B) Parse notebooks => time/entity/features
// //   // // ------------------------------------------
// //   // let timeBasedNotebookCells: any[] = [];
// //   // let entityTargetNotebookCells: any[] = [];
// //   // let featuresNotebookCells: any[] = [];

// //   // let file_url = '';
// //   // let entity_column = '';
// //   // let target_column = '';
// //   // let features: string[] = [];

// //   // if (fetchedNotebooks.length > 0) {
// //   //   // We'll take the first notebook's metadata as common fields
// //   //   const nb0 = fetchedNotebooks[0];
// //   //   file_url = nb0.file_url;
// //   //   entity_column = nb0.entity_column;
// //   //   target_column = nb0.target_column;
// //   //   features = nb0.features || [];

// //   //   fetchedNotebooks.forEach((nb) => {
// //   //     if (!nb.notebook_json) return;
// //   //     try {
// //   //       const parsed = JSON.parse(nb.notebook_json);
// //   //       const cells = parsed?.cells || [];
// //   //       if (nb.time_column) {
// //   //         timeBasedNotebookCells = cells;
// //   //       } else if (nb.entity_column && nb.target_column && !timeBasedNotebookCells.length) {
// //   //         entityTargetNotebookCells = cells;
// //   //       } else {
// //   //         featuresNotebookCells = cells;
// //   //       }
// //   //     } catch (err) {
// //   //       console.error('Error parsing notebook JSON:', err);
// //   //     }
// //   //   });
// //   // }

// //   // ------------------------------------------
// // // B) Parse notebooks => time/entity/features (using order)
// // // ------------------------------------------
// // let timeBasedNotebookCells: any[] = [];
// // let entityTargetNotebookCells: any[] = [];
// // let featuresNotebookCells: any[] = [];

// // let file_url = '';
// // let entity_column = '';
// // let target_column = '';
// // let features: string[] = [];

// // // Proceed only if we have fetched notebooks
// // if (fetchedNotebooks.length > 0) {
// //   // We'll take the first notebook's metadata as common fields
// //   const nb0 = fetchedNotebooks[0];
// //   file_url = nb0.file_url;
// //   entity_column = nb0.entity_column;
// //   target_column = nb0.target_column;
// //   features = nb0.features || [];

// //   // Filter out non-time-based notebooks
// //   const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
// //   if (nonTimeBasedNotebooks.length >= 2) {
// //     try {
// //       // Assume the first is entity-target and the second is features
// //       entityTargetNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// //       featuresNotebookCells = JSON.parse(nonTimeBasedNotebooks[1].notebook_json).cells;
// //     } catch (err) {
// //       console.error('Error parsing non-time-based notebook JSON:', err);
// //     }
// //   } else if (nonTimeBasedNotebooks.length === 1) {
// //     try {
// //       entityTargetNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
// //       featuresNotebookCells = [];
// //     } catch (err) {
// //       console.error('Error parsing non-time-based notebook JSON:', err);
// //     }
// //   }

// //   // Additionally, check if there is a time-based notebook
// //   const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
// //   if (timeBasedNotebooks.length > 0) {
// //     try {
// //       timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
// //     } catch (err) {
// //       console.error('Error parsing time-based notebook JSON:', err);
// //     }
// //   }
// // }


// //   // ------------------------------------------
// //   // C) Polling / model training logic
// //   // ------------------------------------------
// //   const fetchModelResults = async () => {
// //     try {
// //       const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
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
// //     navigate('/training', {
// //       state: {
// //         user_id,
// //         chat_id,
// //         file_url,
// //         entity_column,
// //         target_column,
// //         features,
// //       },
// //     });
// //     setTimeout(() => {
// //       pollModelResults();
// //     }, 300000);
// //   };

// //   // ------------------------------------------
// //   // D) Save Notebooks => runAllCells
// //   // ------------------------------------------
// //   const handleSaveNotebooks = async () => {
// //     if (!user_id || !chat_id) {
// //       alert('user_id or chat_id is missing, cannot save notebooks.');
// //       return;
// //     }
// //     // For simplicity, run time-based cells if present, else entity
// //     const activeNotebookRef = timeBasedNotebookCells.length
// //       ? timeNotebookRef
// //       : entityNotebookRef;

// //     if (!activeNotebookRef.current) {
// //       alert('No notebook to save. Notebook reference not found.');
// //       return;
// //     }
// //     setSavingNotebooks(true);
// //     try {
// //       const cellResults = await activeNotebookRef.current.runAllCellsAndGetResults();
// //       const resp = await fetch('http://localhost:8000/api/save-notebooks/', {
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
// //       alert('Notebooks saved successfully!');
// //     } catch (err: any) {
// //       console.error('Error saving notebooks:', err);
// //       alert(`Error saving notebooks: ${err.message}`);
// //     } finally {
// //       setSavingNotebooks(false);
// //     }
// //   };

// //   // ------------------------------------------
// //   // E) Auto-run all notebooks once they load
// //   // ------------------------------------------
// //   useEffect(() => {
// //     // If no error, not loading, have notebooks, and we haven't auto-run yet...
// //     if (!autoRunDoneRef.current && !loadingNotebook && !fetchError && fetchedNotebooks.length > 0) {
// //       autoRunDoneRef.current = true; // Mark that we've done it
// //       console.log('Auto-running all notebook cells...');
// //       setTimeout(async () => {
// //         try {
// //           if (timeNotebookRef.current) {
// //             await timeNotebookRef.current.runAllCellsAndGetResults();
// //           }
// //           if (entityNotebookRef.current) {
// //             await entityNotebookRef.current.runAllCellsAndGetResults();
// //           }
// //           if (featuresNotebookRef.current) {
// //             await featuresNotebookRef.current.runAllCellsAndGetResults();
// //           }
// //           console.log('Auto-run complete.');
// //         } catch (err) {
// //           console.error('Error auto-running cells:', err);
// //         }
// //       }, 1000); // small delay ensures child refs are set
// //     }
// //   }, [loadingNotebook, fetchError, fetchedNotebooks]);

// //   // ------------------------------------------
// //   // F) Show/hide tabs (never unmount)
// //   // ------------------------------------------
// //   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
// //     setActiveTab(tabId);
// //   };

// //   // *Time-based Notebook*
// //   const timeNotebook = timeBasedNotebookCells.length > 0 && (
// //     <div className="space-y-8">
// //       <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
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
// //           isTrained,
// //           handleTrainModel,
// //           cells: timeBasedNotebookCells,
// //         }}
// //       />
// //     </div>
// //   );

// //   // *Entity + Features Notebook*
// //   const entityAndFeaturesNotebooks = (
// //     <div className="space-y-8">
// //       <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
// //       <SQLNotebook
// //         ref={entityNotebookRef}
// //         activeTab="entity_target_notebook"
// //         notebookContent={{
// //           file_url,
// //           entity_column,
// //           target_column,
// //           features,
// //           user_id,
// //           chat_id,
// //           isTrained,
// //           handleTrainModel,
// //           cells: entityTargetNotebookCells,
// //         }}
// //       />
// //       <SQLNotebook
// //         ref={featuresNotebookRef}
// //         activeTab="features_notebook"
// //         notebookContent={{
// //           file_url,
// //           entity_column,
// //           target_column,
// //           features,
// //           user_id,
// //           chat_id,
// //           isTrained,
// //           handleTrainModel,
// //           cells: featuresNotebookCells,
// //         }}
// //       />
// //     </div>
// //   );

// //   return (
// //     <div className="relative h-screen overflow-hidden">
// //       {/* Top Navbar */}
// //       <div className="fixed top-0 left-0 right-0 z-50">
// //         <Navbar
// //           isSidebarOpen={isSidebarOpen}
// //           setIsSidebarOpen={setIsSidebarOpen}
// //           notebooks={[
// //             {
// //               id: 'notebook',
// //               title: 'Notebook',
// //               icon: <FiBook size={18} />,
// //               onClick: () => handleTabChange('notebook'),
// //             },
// //             {
// //               id: 'dashboard',
// //               title: 'Dashboard',
// //               icon: <FiBarChart2 size={18} />,
// //               onClick: () => handleTabChange('dashboard'),
// //             },
// //             {
// //               id: 'predict',
// //               title: 'Predict',
// //               icon: <FiFlag size={18} />,
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

// //       {/* Train & Save if not isTrained */}
// //       {!isTrained && (
// //         <motion.div
// //           initial={{ opacity: 0, y: 20, x: -20 }}
// //           animate={{ opacity: 1, y: 0, x: 0 }}
// //           transition={{ duration: 0.5, ease: 'easeOut' }}
// //           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
// //         >
// //           <button
// //             onClick={handleTrainModel}
// //             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// //             aria-label="Train your predictive model"
// //           >
// //             Train Model
// //           </button>

// //           <button
// //             onClick={handleSaveNotebooks}
// //             disabled={savingNotebooks}
// //             className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
// //             aria-label="Save Notebooks"
// //           >
// //             {savingNotebooks ? (
// //               <>
// //                 <FiLoader className="mr-2 animate-spin" />
// //                 Saving...
// //               </>
// //             ) : (
// //               'Save Notebooks'
// //             )}
// //           </button>
// //         </motion.div>
// //       )}

// //       {/* Main Content Area (Notebook / Dashboard / Predict) */}
// //       <div
// //         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
// //           isSidebarOpen ? 'left-64' : 'left-0'
// //         }`}
// //       >
// //         <div className="h-[calc(100vh-7rem)] overflow-y-auto p-4">
// //           <div className="w-full max-w-6xl mx-auto">
// //             {/* Notebook Tab (always mounted, hidden with display) */}
// //             <div style={{ display: activeTab === 'notebook' ? 'block' : 'none' }}>
// //               {loadingNotebook ? (
// //                 <div className="p-4">Loading notebook data...</div>
// //               ) : fetchError ? (
// //                 <div className="p-4 text-red-600">Error: {fetchError}</div>
// //               ) : (
// //                 <>
// //                   {timeBasedNotebookCells.length > 0 ? timeNotebook : entityAndFeaturesNotebooks}
// //                 </>
// //               )}
// //             </div>

// //             {/* <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} /> */}

// //             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
// //   <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// // </div>

// //             {/* Dashboard Tab (always mounted)
// //             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
// //               {!isTrained ? (
// //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// //                     <FiBarChart2 className="mx-auto mb-4 text-gray-400" size={48} />
// //                     <h3 className="text-xl font-semibold mb-2">Dashboard Not Available</h3>
// //                     <p className="text-gray-600">
// //                       Please train your model first to view the dashboard metrics.
// //                     </p>
// //                   </div>
// //                 </div>
// //               ) : loadingDashboard ? (
// //                 <div>Loading Dashboard...</div>
// //               ) : (
// //                 <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
// //               )}
// //             </div> */}

// //             {/* Predict Tab (always mounted) */}
// //             <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
// //               {!isTrained ? (
// //                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
// //                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
// //                     <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
// //                     <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
// //                     <p className="text-gray-600">
// //                       Please train your model first to make predictions.
// //                     </p>
// //                   </div>
// //                 </div>
// //               ) : (
// //                 <PredictionsUI />
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default NotebookLayout;




// // NotebookLayout.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import Navbar from '../NotebookUI/Navbar/Navbar';
// import Sidebar from './Sidebar/Sidebar';
// import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
// import Dashboard from '../Dashboard/Dashboard';
// import PredictionsUI from '../Predict/PredictNewData';
// import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
// import { motion } from 'framer-motion';

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

// const NotebookLayout: React.FC = () => {
//   // Read user_id and chat_id from route params.
//   const { user_id = '', chat_id = '' } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Instead of receiving predictive settings from navigation state,
//   // we fetch them directly when this page loads.
//   const [predictiveSettings, setPredictiveSettings] = useState<any>(null);

//   // Local states for tabs, sidebar, model, and notebooks.
//   const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
//   const [loadingDashboard, setLoadingDashboard] = useState(false);
//   const [modelTrained, setModelTrained] = useState(false);
//   const [polling, setPolling] = useState(false);
//   const [savingNotebooks, setSavingNotebooks] = useState(false);

//   // Notebook data from backend (/api/notebooks).
//   const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
//   const [loadingNotebook, setLoadingNotebook] = useState(false);
//   const [fetchError, setFetchError] = useState<string | null>(null);

//   // Refs for each notebook so we can run all cells, etc.
//   const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
//   const entityNotebookRef = useRef<SQLNotebookRef | null>(null);
//   const featuresNotebookRef = useRef<SQLNotebookRef | null>(null);

//   // A ref so we only auto-run once.
//   const autoRunDoneRef = useRef(false);

//   // ------------------------------------------
//   // (New) Fetch predictive settings when the page loads.
//   // ------------------------------------------
//   useEffect(() => {
//     if (!user_id || !chat_id) return;
//     const fetchPredictiveSettings = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/api/predictive-settings/${user_id}/${chat_id}/`
//         );
//         if (!response.ok) {
//           throw new Error(`Failed to fetch predictive settings: ${response.statusText}`);
//         }
//         const data = await response.json();
//         setPredictiveSettings(data);
//       } catch (error: any) {
//         console.error("Error fetching predictive settings:", error);
//       }
//     };
//     fetchPredictiveSettings();
//   }, [user_id, chat_id]);

//   // ------------------------------------------
//   // A) Fetch notebooks from the backend.
//   // ------------------------------------------
//   useEffect(() => {
//     if (!user_id || !chat_id) return;

//     const fetchNotebooks = async () => {
//       setLoadingNotebook(true);
//       setFetchError(null);
//       try {
//         const res = await fetch(
//           `http://localhost:8000/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
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

//   // ------------------------------------------
//   // B) Parse notebooks into time-based and non-time-based (entity/target & features).
//   // ------------------------------------------
//   let timeBasedNotebookCells: any[] = [];
//   let entityTargetNotebookCells: any[] = [];
//   let featuresNotebookCells: any[] = [];

//   let file_url = '';
//   let entity_column = '';
//   let target_column = '';
//   let features: string[] = [];

//   if (fetchedNotebooks.length > 0) {
//     // Use the first notebook's metadata as common fields.
//     const nb0 = fetchedNotebooks[0];
//     file_url = nb0.file_url;
//     entity_column = nb0.entity_column;
//     target_column = nb0.target_column;
//     features = nb0.features || [];

//     // Filter out non-time-based notebooks.
//     const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
//     if (nonTimeBasedNotebooks.length >= 2) {
//       try {
//         // Assume the first notebook is entity-target and the second is features.
//         entityTargetNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
//         featuresNotebookCells = JSON.parse(nonTimeBasedNotebooks[1].notebook_json).cells;
//       } catch (err) {
//         console.error('Error parsing non-time-based notebook JSON:', err);
//       }
//     } else if (nonTimeBasedNotebooks.length === 1) {
//       try {
//         entityTargetNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
//         featuresNotebookCells = [];
//       } catch (err) {
//         console.error('Error parsing non-time-based notebook JSON:', err);
//       }
//     }

//     // Check if there is a time-based notebook.
//     const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
//     if (timeBasedNotebooks.length > 0) {
//       try {
//         timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
//       } catch (err) {
//         console.error('Error parsing time-based notebook JSON:', err);
//       }
//     }
//   }

//   // ------------------------------------------
//   // C) Polling / model training logic.
//   // ------------------------------------------
//   const fetchModelResults = async () => {
//     try {
//       const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
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

//   const handleTrainModel = async () => {
//     navigate('/training', {
//       state: {
//         user_id,
//         chat_id,
//         file_url,
//         entity_column,
//         target_column,
//         features,
//       },
//     });
//     setTimeout(() => {
//       pollModelResults();
//     }, 300000);
//   };

//   // ------------------------------------------
//   // D) Save Notebooks – run all cells and persist via API.
//   // ------------------------------------------
//   // const handleSaveNotebooks = async () => {
//   //   if (!user_id || !chat_id) {
//   //     alert('user_id or chat_id is missing, cannot save notebooks.');
//   //     return;
//   //   }
//   //   // Choose time-based cells if available; otherwise, use entity-target cells.
//   //   const activeNotebookRef = timeBasedNotebookCells.length ? timeNotebookRef : (entityTargetNotebookCells.length ? entityNotebookRef : featuresNotebookRef);

//   //   if (!activeNotebookRef.current) {
//   //     alert('No notebook to save. Notebook reference not found.');
//   //     return;
//   //   }
//   //   setSavingNotebooks(true);
//   //   try {
//   //     const cellResults = await activeNotebookRef.current.runAllCellsAndGetResults();
//   //     // console.log('Cell results being sent to SaveNotebooksView:', cellResults);
//   //     const resp = await fetch('http://localhost:8000/api/save-notebooks/', {
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
//   //     alert('Notebooks saved successfully!');
//   //   } catch (err: any) {
//   //     console.error('Error saving notebooks:', err);
//   //     alert(`Error saving notebooks: ${err.message}`);
//   //   } finally {
//   //     setSavingNotebooks(false);
//   //   }
//   // };

//   // In NotebookLayout.tsx

// const handleSaveNotebooks = async () => {
//   if (!user_id || !chat_id) {
//     alert('user_id or chat_id is missing, cannot save notebooks.');
//     return;
//   }

//   let cellResults: any[] = [];
  
//   // If time-based cells exist, run them.
//   if (timeNotebookRef.current) {
//     const timeCells = await timeNotebookRef.current.runAllCellsAndGetResults();
//     cellResults = cellResults.concat(timeCells);
//   }

//   // For non time-based queries, combine both entity_target and features notebook cells.
//   if (entityNotebookRef.current) {
//     const entityCells = await entityNotebookRef.current.runAllCellsAndGetResults();
//     cellResults = cellResults.concat(entityCells);
//   }
//   if (featuresNotebookRef.current) {
//     const featuresCells = await featuresNotebookRef.current.runAllCellsAndGetResults();
//     cellResults = cellResults.concat(featuresCells);
//   }

//   console.log('Cell results being sent to SaveNotebooksView:', cellResults);
//   // Now cellResults should contain cells from all rendered notebook components

//   setSavingNotebooks(true);
//   try {
//     const resp = await fetch('http://localhost:8000/api/save-notebooks/', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         // Replace with your auth token as needed.
//         'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
//       },
//       body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
//     });

//     if (!resp.ok) {
//       const errData = await resp.json().catch(() => ({}));
//       throw new Error(errData.error || 'Failed to save notebooks.');
//     }
//     alert('Notebooks saved successfully!');
//   } catch (err: any) {
//     console.error('Error saving notebooks:', err);
//     alert(`Error saving notebooks: ${err.message}`);
//   } finally {
//     setSavingNotebooks(false);
//   }
// };


//   // ------------------------------------------
//   // E) Auto-run all notebooks once they load.
//   // ------------------------------------------
//   useEffect(() => {
//     if (!autoRunDoneRef.current && !loadingNotebook && !fetchError && fetchedNotebooks.length > 0) {
//       autoRunDoneRef.current = true;
//       console.log('Auto-running all notebook cells...');
//       setTimeout(async () => {
//         try {
//           if (timeNotebookRef.current) {
//             await timeNotebookRef.current.runAllCellsAndGetResults();
//           }
//           if (entityNotebookRef.current) {
//             await entityNotebookRef.current.runAllCellsAndGetResults();
//           }
//           if (featuresNotebookRef.current) {
//             await featuresNotebookRef.current.runAllCellsAndGetResults();
//           }
//           console.log('Auto-run complete.');
//         } catch (err) {
//           console.error('Error auto-running cells:', err);
//         }
//       }, 1000);
//     }
//   }, [loadingNotebook, fetchError, fetchedNotebooks]);

//   // ------------------------------------------
//   // F) Handle tab changes for Notebook / Dashboard / Predict.
//   // ------------------------------------------
//   const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
//     setActiveTab(tabId);
//   };

//   // ------------------------------------------
//   // Render notebooks using the parsed cell arrays.
//   // ------------------------------------------
//   const timeNotebook = timeBasedNotebookCells.length > 0 && (
//     <div className="space-y-8">
//       <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
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
//           handleTrainModel,
//           cells: timeBasedNotebookCells,
//         }}
//       />
//     </div>
//   );

//   const entityAndFeaturesNotebooks = (
//     <div className="space-y-8">
//       <h2 className="text-xl font-bold mb-4">Entity & Target Analysis</h2>
//       <SQLNotebook
//         ref={entityNotebookRef}
//         activeTab="entity_target_notebook"
//         notebookContent={{
//           file_url,
//           entity_column,
//           target_column,
//           features,
//           user_id,
//           chat_id,
//           isTrained: modelTrained,
//           handleTrainModel,
//           cells: entityTargetNotebookCells,
//         }}
//       />
//       <SQLNotebook
//         ref={featuresNotebookRef}
//         activeTab="features_notebook"
//         notebookContent={{
//           file_url,
//           entity_column,
//           target_column,
//           features,
//           user_id,
//           chat_id,
//           isTrained: modelTrained,
//           handleTrainModel,
//           cells: featuresNotebookCells,
//         }}
//       />
//     </div>
//   );

//   return (
//     <div className="relative h-screen overflow-hidden">
//       {/* Top Navbar */}
//       <div className="fixed top-0 left-0 right-0 z-50">
//         <Navbar
//           isSidebarOpen={isSidebarOpen}
//           setIsSidebarOpen={setIsSidebarOpen}
//           notebooks={[
//             {
//               id: 'notebook',
//               title: 'Notebook',
//               icon: <FiBook size={18} />,
//               onClick: () => handleTabChange('notebook'),
//             },
//             {
//               id: 'dashboard',
//               title: 'Dashboard',
//               icon: <FiBarChart2 size={18} />,
//               onClick: () => handleTabChange('dashboard'),
//             },
//             {
//               id: 'predict',
//               title: 'Predict',
//               icon: <FiFlag size={18} />,
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

//       {/* Train & Save Buttons (if model not trained) */}
//       {!modelTrained && (
//         <motion.div
//           initial={{ opacity: 0, y: 20, x: -20 }}
//           animate={{ opacity: 1, y: 0, x: 0 }}
//           transition={{ duration: 0.5, ease: 'easeOut' }}
//           className="fixed top-20 right-10 z-50 flex flex-col space-y-2"
//         >
//           <button
//             onClick={handleTrainModel}
//             className="flex items-center px-4 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
//             aria-label="Train your predictive model"
//           >
//             Train Model
//           </button>

//           <button
//             onClick={handleSaveNotebooks}
//             disabled={savingNotebooks}
//             className="flex items-center px-4 py-2 border border-teal-600 text-teal-600 text-sm rounded-md shadow-lg hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-400 transition-transform transform hover:scale-105"
//             aria-label="Save Notebooks"
//           >
//             {savingNotebooks ? (
//               <>
//                 <FiLoader className="mr-2 animate-spin" />
//                 Saving...
//               </>
//             ) : (
//               'Save Notebooks'
//             )}
//           </button>
//         </motion.div>
//       )}

//       {/* Main Content Area */}
//       <div
//         className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
//           isSidebarOpen ? 'left-64' : 'left-0'
//         }`}
//       >
//         <div className="h-[calc(100vh-7rem)] overflow-y-auto p-4">
//           <div className="w-full max-w-6xl mx-auto">
//             {/* Display Predictive Settings above the notebook shells */}
//             {predictiveSettings && (
//               <div className="p-4 border rounded-lg bg-gray-50 mb-4">
//                 <h2 className="text-lg font-bold mb-2">Predictive Settings</h2>
//                 <ul className="list-disc list-inside">
//                   <li>
//                     <strong>Target Column:</strong>{' '}
//                     {predictiveSettings.target_column || 'Null'}
//                   </li>
//                   <li>
//                     <strong>Entity Column:</strong>{' '}
//                     {predictiveSettings.entity_column || 'Null'}
//                   </li>
//                   <li>
//                     <strong>Time Column:</strong>{' '}
//                     {predictiveSettings.time_column || 'Null'}
//                   </li>
//                   <li>
//                     <strong>Predictive Question:</strong>{' '}
//                     {predictiveSettings.predictive_question || 'Null'}
//                   </li>
//                   <li>
//                     <strong>Time Frame:</strong>{' '}
//                     {predictiveSettings.time_frame || 'Null'}
//                   </li>
//                   <li>
//                     <strong>Time Frequency:</strong>{' '}
//                     {predictiveSettings.time_frequency || 'Null'}
//                   </li>
//                   <li>
//                     <strong>Machine Learning Type:</strong>{' '}
//                     {predictiveSettings.machine_learning_type || 'Null'}
//                   </li>
//                 </ul>
//               </div>
//             )}

//             {/* Notebook Tab */}
//             <div style={{ display: activeTab === 'notebook' ? 'block' : 'none' }}>
//               {loadingNotebook ? (
//                 <div className="p-4">Loading notebook data...</div>
//               ) : fetchError ? (
//                 <div className="p-4 text-red-600">Error: {fetchError}</div>
//               ) : (
//                 <>
//                   {timeBasedNotebookCells.length > 0 ? timeNotebook : entityAndFeaturesNotebooks}
//                 </>
//               )}
//             </div>

//             {/* Dashboard Tab */}
//             <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
//               <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
//             </div>

//             {/* Predict Tab */}
//             <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
//               {!modelTrained ? (
//                 <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
//                   <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
//                     <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
//                     <h3 className="text-xl font-semibold mb-2">Predictions Not Available</h3>
//                     <p className="text-gray-600">
//                       Please train your model first to make predictions.
//                     </p>
//                   </div>
//                 </div>
//               ) : (
//                 <PredictionsUI />
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NotebookLayout;







// NotebookLayout.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../NotebookUI/Navbar/Navbar';
// import Sidebar from './components/Sidebar/Sidebar';
import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook';
import Dashboard from '../Dashboard/Dashboard';
import PredictionsUI from '../Predict/PredictNewData';
import { FiBook, FiBarChart2, FiFlag, FiLoader } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Sidebar from '../NotebookUI/Sidebar/Sidebar';

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
  feature_analysis?: any; // Add appropriate type
  model_metadata?: any; // Add appropriate type
  data_characteristics?: any; // Add appropriate type
  core_statistics?: any; // Add appropriate type
  attribute_statistics?: any; // Add appropriate type
}

const NotebookLayout: React.FC = () => {
  // Read user_id and chat_id from route params.
  const { user_id = '', chat_id = '' } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Instead of receiving predictive settings from navigation state,
  // we fetch them directly when this page loads.
  const [predictiveSettings, setPredictiveSettings] = useState<any>(null);

  // Local states for tabs, sidebar, model, and notebooks.
  const [activeTab, setActiveTab] = useState<'notebook' | 'dashboard' | 'predict'>('notebook');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dashboardData, setDashboardData] = useState<MetricsData | null>(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [modelTrained, setModelTrained] = useState(false);
  const [polling, setPolling] = useState(false);
  const [savingNotebooks, setSavingNotebooks] = useState(false);

  // Notebook data from backend (/api/notebooks).
  const [fetchedNotebooks, setFetchedNotebooks] = useState<any[]>([]);
  const [loadingNotebook, setLoadingNotebook] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Updated Notebook refs: one for time‐based and one for non–time‐based (combined) notebooks.
  const timeNotebookRef = useRef<SQLNotebookRef | null>(null);
  const nonTimeBasedNotebookRef = useRef<SQLNotebookRef | null>(null);

  // A ref so we only auto-run once.
  const autoRunDoneRef = useRef(false);

  // ------------------------------------------
  // (New) Fetch predictive settings when the page loads.
  // ------------------------------------------
  useEffect(() => {
    if (!user_id || !chat_id) return;
    const fetchPredictiveSettings = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/predictive-settings/${user_id}/${chat_id}/`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch predictive settings: ${response.statusText}`);
        }
        const data = await response.json();
        setPredictiveSettings(data);
      } catch (error: any) {
        console.error("Error fetching predictive settings:", error);
      }
    };
    fetchPredictiveSettings();
  }, [user_id, chat_id]);

  // ------------------------------------------
  // A) Fetch notebooks from the backend.
  // ------------------------------------------
  useEffect(() => {
    if (!user_id || !chat_id) return;

    const fetchNotebooks = async () => {
      setLoadingNotebook(true);
      setFetchError(null);
      try {
        const res = await fetch(
          `http://localhost:8000/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
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

  // ------------------------------------------
  // B) Parse notebooks into time-based and non–time-based.
  // ------------------------------------------
  let timeBasedNotebookCells: any[] = [];
  let nonTimeBasedNotebookCells: any[] = [];
  let file_url = '';
  let entity_column = '';
  let target_column = '';
  let features: string[] = [];

  if (fetchedNotebooks.length > 0) {
    // Use the first notebook's metadata as common fields.
    const nb0 = fetchedNotebooks[0];
    file_url = nb0.file_url;
    entity_column = nb0.entity_column;
    target_column = nb0.target_column;
    features = nb0.features || [];

    // Filter out non–time-based notebooks.
    // (Now the backend returns a single combined notebook for non time-based queries.)
    const nonTimeBasedNotebooks = fetchedNotebooks.filter(nb => !nb.time_column);
    if (nonTimeBasedNotebooks.length > 0) {
      try {
        nonTimeBasedNotebookCells = JSON.parse(nonTimeBasedNotebooks[0].notebook_json).cells;
      } catch (err) {
        console.error('Error parsing non–time-based notebook JSON:', err);
      }
    }

    // Check if there is a time–based notebook.
    const timeBasedNotebooks = fetchedNotebooks.filter(nb => nb.time_column);
    if (timeBasedNotebooks.length > 0) {
      try {
        timeBasedNotebookCells = JSON.parse(timeBasedNotebooks[0].notebook_json).cells;
      } catch (err) {
        console.error('Error parsing time–based notebook JSON:', err);
      }
    }
  }

  // ------------------------------------------
  // C) Polling / model training logic.
  // ------------------------------------------
  const fetchModelResults = async () => {
    try {
      const url = `http://127.0.0.1:8000/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
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
    navigate('/training', {
      state: {
        user_id,
        chat_id,
        file_url,
        entity_column,
        target_column,
        features,
      },
    });
    setTimeout(() => {
      pollModelResults();
    }, 300000);
  };

  // ------------------------------------------
  // D) Save Notebooks – run all cells and persist via API.
  // ------------------------------------------
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
      const resp = await fetch('http://localhost:8000/api/save-notebooks/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Replace with your auth token as needed.
          'Authorization': 'Token d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b',
        },
        body: JSON.stringify({ user_id, chat_id, cells: cellResults }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to save notebooks.');
      }
      alert('Notebooks saved successfully!');
    } catch (err: any) {
      console.error('Error saving notebooks:', err);
      alert(`Error saving notebooks: ${err.message}`);
    } finally {
      setSavingNotebooks(false);
    }
  };

  // ------------------------------------------
  // E) Auto-run all notebooks once they load.
  // ------------------------------------------
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

  // ------------------------------------------
  // F) Handle tab changes for Notebook / Dashboard / Predict.
  // ------------------------------------------
  const handleTabChange = (tabId: 'notebook' | 'dashboard' | 'predict') => {
    setActiveTab(tabId);
  };

  // ------------------------------------------
  // Render notebooks using the parsed cell arrays.
  // ------------------------------------------
  const timeNotebook = timeBasedNotebookCells.length > 0 && (
    <div className="space-y-8">
      <h2 className="text-xl font-bold mb-4">Time-Based Analysis Notebook</h2>
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
          handleTrainModel,
          cells: timeBasedNotebookCells,
        }}
      />
    </div>
  );

  const nonTimeBasedNotebook = nonTimeBasedNotebookCells.length > 0 && (
    <div className="space-y-8">
      <h2 className="text-xl font-bold mb-4">Analysis Notebook</h2>
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
          handleTrainModel,
          cells: nonTimeBasedNotebookCells,
        }}
      />
    </div>
  );

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          notebooks={[
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

      {/* Train & Save Buttons (if model not trained) */}
      {!modelTrained && (
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

      {/* Main Content Area */}
      <div
        className={`fixed top-16 bottom-0 right-0 transition-all duration-300 ease-in-out overflow-hidden ${
          isSidebarOpen ? 'left-64' : 'left-0'
        }`}
      >
        <div className="h-[calc(100vh-7rem)] overflow-y-auto p-4">
          <div className="w-full max-w-6xl mx-auto">
            {/* Display Predictive Settings above the notebook shells */}
            {predictiveSettings && (
              <div className="p-4 border rounded-lg bg-gray-50 mb-4">
                <h2 className="text-lg font-bold mb-2">Predictive Settings</h2>
                <ul className="list-disc list-inside">
                  <li>
                    <strong>Target Column:</strong>{' '}
                    {predictiveSettings.target_column || 'Null'}
                  </li>
                  <li>
                    <strong>Entity Column:</strong>{' '}
                    {predictiveSettings.entity_column || 'Null'}
                  </li>
                  <li>
                    <strong>Time Column:</strong>{' '}
                    {predictiveSettings.time_column || 'Null'}
                  </li>
                  <li>
                    <strong>Predictive Question:</strong>{' '}
                    {predictiveSettings.predictive_question || 'Null'}
                  </li>
                  <li>
                    <strong>Time Frame:</strong>{' '}
                    {predictiveSettings.time_frame || 'Null'}
                  </li>
                  <li>
                    <strong>Time Frequency:</strong>{' '}
                    {predictiveSettings.time_frequency || 'Null'}
                  </li>
                  <li>
                    <strong>Machine Learning Type:</strong>{' '}
                    {predictiveSettings.machine_learning_type || 'Null'}
                  </li>
                </ul>
              </div>
            )}

            {/* Notebook Tab */}
            <div style={{ display: activeTab === 'notebook' ? 'block' : 'none' }}>
              {loadingNotebook ? (
                <div className="p-4">Loading notebook data...</div>
              ) : fetchError ? (
                <div className="p-4 text-red-600">Error: {fetchError}</div>
              ) : (
                <>
                  {timeBasedNotebookCells.length > 0
                    ? timeNotebook
                    : nonTimeBasedNotebook}
                </>
              )}
            </div>

            {/* Dashboard Tab */}
            <div style={{ display: activeTab === 'dashboard' ? 'block' : 'none' }}>
              <Dashboard user_id={user_id} chat_id={chat_id} data={dashboardData} />
            </div>

            {/* Predict Tab */}
            <div style={{ display: activeTab === 'predict' ? 'block' : 'none' }}>
              {!modelTrained ? (
                <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
                  <div className="text-center p-8 bg-gray-50 rounded-lg shadow-md">
                    <FiFlag className="mx-auto mb-4 text-gray-400" size={48} />
                    <h3 className="text-xl font-semibold mb-2">
                      Predictions Not Available
                    </h3>
                    <p className="text-gray-600">
                      Please train your model first to make predictions.
                    </p>
                  </div>
                </div>
              ) : (
                <PredictionsUI />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotebookLayout;
