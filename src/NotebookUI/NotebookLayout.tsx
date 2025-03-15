


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
import { API_BASE_URL } from '../constants';

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
        const res = await fetch(`${API_BASE_URL}/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`);
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
          `${API_BASE_URL}/api/predictive-settings/${user_id}/${chat_id}/`
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
          `${API_BASE_URL}/api/notebooks/?user_id=${user_id}&chat_id=${chat_id}`
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
      const url = `${API_BASE_URL}/model/modelget/?user_id=${user_id}&chat_id=${chat_id}`;
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
      const resp = await fetch(`${API_BASE_URL}/api/save-notebooks/`, {
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
        const trainResponse = await fetch(`${API_BASE_URL}/api/automation/`, {
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
        const statusResponse = await fetch(`${API_BASE_URL}/api/automation/status/${taskId}/`, {
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
      const resp = await fetch(`${API_BASE_URL}/api/save-notebooks/`, {
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

        const trainResponse = await fetch(`${API_BASE_URL}/api/automation/`, {
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
