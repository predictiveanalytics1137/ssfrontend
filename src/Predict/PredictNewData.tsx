


// import React, { useState } from 'react';

// interface PredictionData {
//   startTime: string;
//   runId: string;
//   status: string;
//   duration: string;
//   entityCount: number;
// }

// const PredictionsUI: React.FC = () => {
//   const [predictionsData, setPredictionsData] = useState<PredictionData>({
//     startTime: '2024-11-28, 01:54',
//     runId: '268145',
//     status: 'Success',
//     duration: 'Few seconds',
//     entityCount: 701,
//   });

//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handlePredict = async () => {
//     if (selectedFile) {
//       const responsePayload = {
//         file_url: "s3://pa-documents-storage-bucket/uploads/4a87aeba/Test.csv",
//         bucket_name: "artifacts1137",
//       };

//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(responsePayload),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           alert(`Prediction initiated successfully: ${JSON.stringify(data)}`);
//         } else {
//           const errorText = await response.text();
//           alert(`Error in prediction: ${errorText}`);
//         }
//       } catch (error) {
//         console.error("Error while making prediction:", error);
//         alert(`An error occurred: ${error}`);
//       }
//     } else {
//       alert("Please select a file first.");
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-teal-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
//         <h1 className="text-xl font-semibold">Trial ends on Dec 19, 2024</h1>
//         <button className="bg-teal-700 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded shadow">
//           Predicting Store Sales (2024-11-27 19:53:21 UTC)
//         </button>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col md:flex-row">
//         {/* Sidebar */}
//         <aside className="bg-teal-50 p-6 w-full md:w-1/3 lg:w-1/4 border-r border-gray-300">
//           <h2 className="text-teal-900 font-semibold text-lg mb-4">Quick Prediction</h2>
//           <p className="text-gray-700 mb-4">
//             Upload a CSV and use your model for one-time prediction.
//           </p>
//           <input
//             type="file"
//             accept=".csv"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg py-2 px-3 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-teal-100 file:text-teal-900 hover:file:bg-teal-200"
//           />
//           <button
//             onClick={handlePredict}
//             className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded mb-6 shadow"
//           >
//             One-Time Predict
//           </button>

//           <h2 className="text-teal-900 font-semibold text-lg mb-4">Scheduled Prediction</h2>
//           <p className="text-gray-700 mb-4">
//             Set up periodic predictions by scheduling and updating queries.
//           </p>
//           <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded shadow">
//             Schedule Predictions
//           </button>
//         </aside>

//         {/* Main Panel */}
//         <main className="flex-1 p-6">
//           <h2 className="text-teal-900 font-semibold text-xl mb-4">Prediction Runs</h2>
//           <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 overflow-auto">
//             {/* Header Row */}
//             <div className="grid grid-cols-5 gap-4 text-teal-800 font-medium mb-4">
//               <div>Start Time</div>
//               <div>Run ID</div>
//               <div>Status</div>
//               <div>Duration</div>
//               <div>Entity Count</div>
//             </div>

//             {/* Data Row */}
//             <div className="grid grid-cols-5 gap-4 text-gray-700">
//               <div>{predictionsData.startTime}</div>
//               <div>{predictionsData.runId}</div>
//               <div>{predictionsData.status}</div>
//               <div>{predictionsData.duration}</div>
//               <div>{predictionsData.entityCount.toLocaleString()}</div>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-gray-200 py-4 px-6 text-center">
//         &copy; 2024 Your Company. All Rights Reserved.
//       </footer>
//     </div>
//   );
// };

// export default PredictionsUI;







// import React, { useState, useEffect } from 'react';

// interface PredictionMetadata {
//   prediction_id: string;
//   start_time: string;
//   chat_id: string;
//   user_id: string;
//   status: string;
//   duration: number | null;
//   entity_count: number;
//   predictions_csv_path: string | null;
// }

// const PredictionsUI: React.FC = () => {
//   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);

//   // Fetch prediction metadata
//   useEffect(() => {
//     const fetchPredictions = async () => {
//       try {
//         // const response = await fetch("http://127.0.0.1:8000/api/get_prediction_metadata/?chat_id=IDSH938749&user_id=9938938HHDU", {
//           const response = await fetch("http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9938938HHDU", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setPredictionsData(data.metadata);
//         } else {
//           console.error("Failed to fetch prediction metadata");
//         }
//       } catch (error) {
//         console.error("Error while fetching predictions:", error);
//       }
//     };

//     fetchPredictions();
//   }, []);

//   const bucket_name = "artifacts1137";

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       setSelectedFile(event.target.files[0]);
//     }
//   };

//   const handlePredict = async () => {
//     if (selectedFile) {
//       const responsePayload = {
//         file_url: "s3://pa-documents-storage-bucket/uploads/4a87aeba/Test.csv",
//         bucket_name: "artifacts1137",
//       };

//       try {
//         const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(responsePayload),
//         });

//         if (response.ok) {
//           const data = await response.json();
//           alert(`Prediction initiated successfully: ${JSON.stringify(data)}`);
//         } else {
//           const errorText = await response.text();
//           alert(`Error in prediction: ${errorText}`);
//         }
//       } catch (error) {
//         console.error("Error while making prediction:", error);
//         alert(`An error occurred: ${error}`);
//       }
//     } else {
//       alert("Please select a file first.");
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gray-100">
//       {/* Header */}
//       <header className="bg-teal-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
//         <h1 className="text-xl font-semibold">Trial ends on Dec 19, 2024</h1>
//         <button className="bg-teal-700 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded shadow">
//           Predicting Store Sales (2024-11-27 19:53:21 UTC)
//         </button>
//       </header>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col md:flex-row">
//         {/* Sidebar */}
//         <aside className="bg-teal-50 p-6 w-full md:w-1/3 lg:w-1/4 border-r border-gray-300">
//           <h2 className="text-teal-900 font-semibold text-lg mb-4">Quick Prediction</h2>
//           <p className="text-gray-700 mb-4">
//             Upload a CSV and use your model for one-time prediction.
//           </p>
//           <input
//             type="file"
//             accept=".csv"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg py-2 px-3 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-teal-100 file:text-teal-900 hover:file:bg-teal-200"
//           />
//           <button
//             onClick={handlePredict}
//             className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded mb-6 shadow"
//           >
//             One-Time Predict
//           </button>

//           <h2 className="text-teal-900 font-semibold text-lg mb-4">Scheduled Prediction</h2>
//           <p className="text-gray-700 mb-4">
//             Set up periodic predictions by scheduling and updating queries.
//           </p>
//           <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded shadow">
//             Schedule Predictions
//           </button>
//         </aside>

//         {/* Main Panel */}
//         <main className="flex-1 p-6">
//           <h2 className="text-teal-900 font-semibold text-xl mb-4">Prediction Runs</h2>
//           <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 overflow-auto">
//             {/* Header Row */}
//             <div className="grid grid-cols-6 gap-4 text-teal-800 font-medium mb-4">
//               <div>Prediction ID</div>
//               <div>Start Time</div>
//               <div>Status</div>
//               <div>Duration</div>
//               <div>Entity Count</div>
//               <div>CSV Path</div>
//             </div>

//             {/* Data Rows */}
//             {predictionsData.map((data) => (
//               <div key={data.prediction_id} className="grid grid-cols-6 gap-4 text-gray-700 mb-2">
//                 <div>{data.prediction_id}</div>
//                 <div>{new Date(data.start_time).toLocaleString()}</div>
//                 <div>{data.status}</div>
//                 <div>{data.duration ? `${data.duration.toFixed(2)} sec` : "N/A"}</div>
//                 <div>{data.entity_count}</div>
//                 <div>
//                   {data.predictions_csv_path ? (
//                     <a
//                       href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="text-teal-600 underline"
//                     >
//                       Download
//                     </a>
//                   ) : (
//                     "N/A"
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </main>
//       </div>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-gray-200 py-4 px-6 text-center">
//         &copy; 2024 Your Company. All Rights Reserved.
//       </footer>
//     </div>
//   );
// };

// export default PredictionsUI;









import React, { useState, useEffect } from 'react';
import { Upload, Clock, AlertCircle } from 'lucide-react';

interface PredictionMetadata {
  prediction_id: string;
  start_time: string;
  chat_id: string;
  user_id: string;
  status: string;
  duration: number | null;
  entity_count: number;
  predictions_csv_path: string | null;
}

const PredictionsUI: React.FC = () => {
  const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const bucket_name = "artifacts1137";

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9938938HHDU", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPredictionsData(data.metadata);
      } else {
        console.error("Failed to fetch prediction metadata");
      }
    } catch (error) {
      console.error("Error while fetching predictions:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handlePredict = async () => {
    if (!selectedFile) {
      return;
    }

    setIsLoading(true);
    const responsePayload = {
      file_url: "s3://pa-documents-storage-bucket/uploads/4a87aeba/Test.csv",
      bucket_name: "artifacts1137",
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(responsePayload),
      });

      if (response.ok) {
        const data = await response.json();
        fetchPredictions(); // Refresh the predictions list
      } else {
        const errorText = await response.text();
        throw new Error(errorText);
      }
    } catch (error) {
      console.error("Error while making prediction:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-600';
      case 'failed':
        return 'text-red-600';
      case 'running':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Predictions Dashboard</h1>
            <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span>Trial ends on Dec 19, 2024</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Prediction Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Upload className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
              </div>
              <div className="space-y-4">
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <button
                  onClick={handlePredict}
                  disabled={!selectedFile || isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  {isLoading ? 'Processing...' : 'Run Prediction'}
                </button>
              </div>
            </div>

            {/* Scheduled Predictions Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
              </div>
              <button
                className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Configure Schedule
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity Count</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Results</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {predictionsData.map((data) => (
                      <tr key={data.prediction_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">{data.prediction_id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(data.start_time).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`${getStatusColor(data.status)}`}>
                            {data.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.duration ? `${data.duration.toFixed(2)}s` : "−"}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.entity_count}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {data.predictions_csv_path ? (
                            <a
                              href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              Download CSV
                            </a>
                          ) : "−"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionsUI;