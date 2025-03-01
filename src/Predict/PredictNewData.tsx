


// // // // // // // // // // // import React, { useState } from 'react';

// // // // // // // // // // // interface PredictionData {
// // // // // // // // // // //   startTime: string;
// // // // // // // // // // //   runId: string;
// // // // // // // // // // //   status: string;
// // // // // // // // // // //   duration: string;
// // // // // // // // // // //   entityCount: number;
// // // // // // // // // // // }

// // // // // // // // // // // const PredictionsUI: React.FC = () => {
// // // // // // // // // // //   const [predictionsData, setPredictionsData] = useState<PredictionData>({
// // // // // // // // // // //     startTime: '2024-11-28, 01:54',
// // // // // // // // // // //     runId: '268145',
// // // // // // // // // // //     status: 'Success',
// // // // // // // // // // //     duration: 'Few seconds',
// // // // // // // // // // //     entityCount: 701,
// // // // // // // // // // //   });

// // // // // // // // // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);

// // // // // // // // // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // //     if (event.target.files && event.target.files[0]) {
// // // // // // // // // // //       setSelectedFile(event.target.files[0]);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handlePredict = async () => {
// // // // // // // // // // //     if (selectedFile) {
// // // // // // // // // // //       const responsePayload = {
// // // // // // // // // // //         file_url: "s3://pa-documents-storage-bucket/uploads/4a87aeba/Test.csv",
// // // // // // // // // // //         bucket_name: "artifacts1137",
// // // // // // // // // // //       };

// // // // // // // // // // //       try {
// // // // // // // // // // //         const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
// // // // // // // // // // //           method: "POST",
// // // // // // // // // // //           headers: {
// // // // // // // // // // //             "Content-Type": "application/json",
// // // // // // // // // // //           },
// // // // // // // // // // //           body: JSON.stringify(responsePayload),
// // // // // // // // // // //         });

// // // // // // // // // // //         if (response.ok) {
// // // // // // // // // // //           const data = await response.json();
// // // // // // // // // // //           alert(`Prediction initiated successfully: ${JSON.stringify(data)}`);
// // // // // // // // // // //         } else {
// // // // // // // // // // //           const errorText = await response.text();
// // // // // // // // // // //           alert(`Error in prediction: ${errorText}`);
// // // // // // // // // // //         }
// // // // // // // // // // //       } catch (error) {
// // // // // // // // // // //         console.error("Error while making prediction:", error);
// // // // // // // // // // //         alert(`An error occurred: ${error}`);
// // // // // // // // // // //       }
// // // // // // // // // // //     } else {
// // // // // // // // // // //       alert("Please select a file first.");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="flex flex-col h-screen bg-gray-100">
// // // // // // // // // // //       {/* Header */}
// // // // // // // // // // //       <header className="bg-teal-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
// // // // // // // // // // //         <h1 className="text-xl font-semibold">Trial ends on Dec 19, 2024</h1>
// // // // // // // // // // //         <button className="bg-teal-700 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded shadow">
// // // // // // // // // // //           Predicting Store Sales (2024-11-27 19:53:21 UTC)
// // // // // // // // // // //         </button>
// // // // // // // // // // //       </header>

// // // // // // // // // // //       {/* Main Content */}
// // // // // // // // // // //       <div className="flex-1 flex flex-col md:flex-row">
// // // // // // // // // // //         {/* Sidebar */}
// // // // // // // // // // //         <aside className="bg-teal-50 p-6 w-full md:w-1/3 lg:w-1/4 border-r border-gray-300">
// // // // // // // // // // //           <h2 className="text-teal-900 font-semibold text-lg mb-4">Quick Prediction</h2>
// // // // // // // // // // //           <p className="text-gray-700 mb-4">
// // // // // // // // // // //             Upload a CSV and use your model for one-time prediction.
// // // // // // // // // // //           </p>
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="file"
// // // // // // // // // // //             accept=".csv"
// // // // // // // // // // //             onChange={handleFileChange}
// // // // // // // // // // //             className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg py-2 px-3 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-teal-100 file:text-teal-900 hover:file:bg-teal-200"
// // // // // // // // // // //           />
// // // // // // // // // // //           <button
// // // // // // // // // // //             onClick={handlePredict}
// // // // // // // // // // //             className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded mb-6 shadow"
// // // // // // // // // // //           >
// // // // // // // // // // //             One-Time Predict
// // // // // // // // // // //           </button>

// // // // // // // // // // //           <h2 className="text-teal-900 font-semibold text-lg mb-4">Scheduled Prediction</h2>
// // // // // // // // // // //           <p className="text-gray-700 mb-4">
// // // // // // // // // // //             Set up periodic predictions by scheduling and updating queries.
// // // // // // // // // // //           </p>
// // // // // // // // // // //           <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded shadow">
// // // // // // // // // // //             Schedule Predictions
// // // // // // // // // // //           </button>
// // // // // // // // // // //         </aside>

// // // // // // // // // // //         {/* Main Panel */}
// // // // // // // // // // //         <main className="flex-1 p-6">
// // // // // // // // // // //           <h2 className="text-teal-900 font-semibold text-xl mb-4">Prediction Runs</h2>
// // // // // // // // // // //           <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 overflow-auto">
// // // // // // // // // // //             {/* Header Row */}
// // // // // // // // // // //             <div className="grid grid-cols-5 gap-4 text-teal-800 font-medium mb-4">
// // // // // // // // // // //               <div>Start Time</div>
// // // // // // // // // // //               <div>Run ID</div>
// // // // // // // // // // //               <div>Status</div>
// // // // // // // // // // //               <div>Duration</div>
// // // // // // // // // // //               <div>Entity Count</div>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {/* Data Row */}
// // // // // // // // // // //             <div className="grid grid-cols-5 gap-4 text-gray-700">
// // // // // // // // // // //               <div>{predictionsData.startTime}</div>
// // // // // // // // // // //               <div>{predictionsData.runId}</div>
// // // // // // // // // // //               <div>{predictionsData.status}</div>
// // // // // // // // // // //               <div>{predictionsData.duration}</div>
// // // // // // // // // // //               <div>{predictionsData.entityCount.toLocaleString()}</div>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </main>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* Footer */}
// // // // // // // // // // //       <footer className="bg-gray-800 text-gray-200 py-4 px-6 text-center">
// // // // // // // // // // //         &copy; 2024 Your Company. All Rights Reserved.
// // // // // // // // // // //       </footer>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default PredictionsUI;







// // // // // // // // // // // import React, { useState, useEffect } from 'react';

// // // // // // // // // // // interface PredictionMetadata {
// // // // // // // // // // //   prediction_id: string;
// // // // // // // // // // //   start_time: string;
// // // // // // // // // // //   chat_id: string;
// // // // // // // // // // //   user_id: string;
// // // // // // // // // // //   status: string;
// // // // // // // // // // //   duration: number | null;
// // // // // // // // // // //   entity_count: number;
// // // // // // // // // // //   predictions_csv_path: string | null;
// // // // // // // // // // // }

// // // // // // // // // // // const PredictionsUI: React.FC = () => {
// // // // // // // // // // //   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
// // // // // // // // // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);

// // // // // // // // // // //   // Fetch prediction metadata
// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     const fetchPredictions = async () => {
// // // // // // // // // // //       try {
// // // // // // // // // // //         // const response = await fetch("http://127.0.0.1:8000/api/get_prediction_metadata/?chat_id=IDSH938749&user_id=9938938HHDU", {
// // // // // // // // // // //           const response = await fetch("http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9938938HHDU", {
// // // // // // // // // // //           method: "GET",
// // // // // // // // // // //           headers: {
// // // // // // // // // // //             "Content-Type": "application/json",
// // // // // // // // // // //           },
// // // // // // // // // // //         });

// // // // // // // // // // //         if (response.ok) {
// // // // // // // // // // //           const data = await response.json();
// // // // // // // // // // //           setPredictionsData(data.metadata);
// // // // // // // // // // //         } else {
// // // // // // // // // // //           console.error("Failed to fetch prediction metadata");
// // // // // // // // // // //         }
// // // // // // // // // // //       } catch (error) {
// // // // // // // // // // //         console.error("Error while fetching predictions:", error);
// // // // // // // // // // //       }
// // // // // // // // // // //     };

// // // // // // // // // // //     fetchPredictions();
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   const bucket_name = "artifacts1137";

// // // // // // // // // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // // //     if (event.target.files && event.target.files[0]) {
// // // // // // // // // // //       setSelectedFile(event.target.files[0]);
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   const handlePredict = async () => {
// // // // // // // // // // //     if (selectedFile) {
// // // // // // // // // // //       const responsePayload = {
// // // // // // // // // // //         file_url: "s3://pa-documents-storage-bucket/uploads/4a87aeba/Test.csv",
// // // // // // // // // // //         bucket_name: "artifacts1137",
// // // // // // // // // // //       };

// // // // // // // // // // //       try {
// // // // // // // // // // //         const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
// // // // // // // // // // //           method: "POST",
// // // // // // // // // // //           headers: {
// // // // // // // // // // //             "Content-Type": "application/json",
// // // // // // // // // // //           },
// // // // // // // // // // //           body: JSON.stringify(responsePayload),
// // // // // // // // // // //         });

// // // // // // // // // // //         if (response.ok) {
// // // // // // // // // // //           const data = await response.json();
// // // // // // // // // // //           alert(`Prediction initiated successfully: ${JSON.stringify(data)}`);
// // // // // // // // // // //         } else {
// // // // // // // // // // //           const errorText = await response.text();
// // // // // // // // // // //           alert(`Error in prediction: ${errorText}`);
// // // // // // // // // // //         }
// // // // // // // // // // //       } catch (error) {
// // // // // // // // // // //         console.error("Error while making prediction:", error);
// // // // // // // // // // //         alert(`An error occurred: ${error}`);
// // // // // // // // // // //       }
// // // // // // // // // // //     } else {
// // // // // // // // // // //       alert("Please select a file first.");
// // // // // // // // // // //     }
// // // // // // // // // // //   };

// // // // // // // // // // //   return (
// // // // // // // // // // //     <div className="flex flex-col h-screen bg-gray-100">
// // // // // // // // // // //       {/* Header */}
// // // // // // // // // // //       <header className="bg-teal-800 text-white py-4 px-6 flex justify-between items-center shadow-md">
// // // // // // // // // // //         <h1 className="text-xl font-semibold">Trial ends on Dec 19, 2024</h1>
// // // // // // // // // // //         <button className="bg-teal-700 hover:bg-teal-600 text-white font-medium py-2 px-4 rounded shadow">
// // // // // // // // // // //           Predicting Store Sales (2024-11-27 19:53:21 UTC)
// // // // // // // // // // //         </button>
// // // // // // // // // // //       </header>

// // // // // // // // // // //       {/* Main Content */}
// // // // // // // // // // //       <div className="flex-1 flex flex-col md:flex-row">
// // // // // // // // // // //         {/* Sidebar */}
// // // // // // // // // // //         <aside className="bg-teal-50 p-6 w-full md:w-1/3 lg:w-1/4 border-r border-gray-300">
// // // // // // // // // // //           <h2 className="text-teal-900 font-semibold text-lg mb-4">Quick Prediction</h2>
// // // // // // // // // // //           <p className="text-gray-700 mb-4">
// // // // // // // // // // //             Upload a CSV and use your model for one-time prediction.
// // // // // // // // // // //           </p>
// // // // // // // // // // //           <input
// // // // // // // // // // //             type="file"
// // // // // // // // // // //             accept=".csv"
// // // // // // // // // // //             onChange={handleFileChange}
// // // // // // // // // // //             className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg py-2 px-3 mb-4 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:bg-teal-100 file:text-teal-900 hover:file:bg-teal-200"
// // // // // // // // // // //           />
// // // // // // // // // // //           <button
// // // // // // // // // // //             onClick={handlePredict}
// // // // // // // // // // //             className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded mb-6 shadow"
// // // // // // // // // // //           >
// // // // // // // // // // //             One-Time Predict
// // // // // // // // // // //           </button>

// // // // // // // // // // //           <h2 className="text-teal-900 font-semibold text-lg mb-4">Scheduled Prediction</h2>
// // // // // // // // // // //           <p className="text-gray-700 mb-4">
// // // // // // // // // // //             Set up periodic predictions by scheduling and updating queries.
// // // // // // // // // // //           </p>
// // // // // // // // // // //           <button className="w-full bg-teal-600 hover:bg-teal-500 text-white font-medium py-2 px-4 rounded shadow">
// // // // // // // // // // //             Schedule Predictions
// // // // // // // // // // //           </button>
// // // // // // // // // // //         </aside>

// // // // // // // // // // //         {/* Main Panel */}
// // // // // // // // // // //         <main className="flex-1 p-6">
// // // // // // // // // // //           <h2 className="text-teal-900 font-semibold text-xl mb-4">Prediction Runs</h2>
// // // // // // // // // // //           <div className="bg-white border border-gray-300 rounded-lg shadow-md p-4 overflow-auto">
// // // // // // // // // // //             {/* Header Row */}
// // // // // // // // // // //             <div className="grid grid-cols-6 gap-4 text-teal-800 font-medium mb-4">
// // // // // // // // // // //               <div>Prediction ID</div>
// // // // // // // // // // //               <div>Start Time</div>
// // // // // // // // // // //               <div>Status</div>
// // // // // // // // // // //               <div>Duration</div>
// // // // // // // // // // //               <div>Entity Count</div>
// // // // // // // // // // //               <div>CSV Path</div>
// // // // // // // // // // //             </div>

// // // // // // // // // // //             {/* Data Rows */}
// // // // // // // // // // //             {predictionsData.map((data) => (
// // // // // // // // // // //               <div key={data.prediction_id} className="grid grid-cols-6 gap-4 text-gray-700 mb-2">
// // // // // // // // // // //                 <div>{data.prediction_id}</div>
// // // // // // // // // // //                 <div>{new Date(data.start_time).toLocaleString()}</div>
// // // // // // // // // // //                 <div>{data.status}</div>
// // // // // // // // // // //                 <div>{data.duration ? `${data.duration.toFixed(2)} sec` : "N/A"}</div>
// // // // // // // // // // //                 <div>{data.entity_count}</div>
// // // // // // // // // // //                 <div>
// // // // // // // // // // //                   {data.predictions_csv_path ? (
// // // // // // // // // // //                     <a
// // // // // // // // // // //                       href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
// // // // // // // // // // //                       target="_blank"
// // // // // // // // // // //                       rel="noopener noreferrer"
// // // // // // // // // // //                       className="text-teal-600 underline"
// // // // // // // // // // //                     >
// // // // // // // // // // //                       Download
// // // // // // // // // // //                     </a>
// // // // // // // // // // //                   ) : (
// // // // // // // // // // //                     "N/A"
// // // // // // // // // // //                   )}
// // // // // // // // // // //                 </div>
// // // // // // // // // // //               </div>
// // // // // // // // // // //             ))}
// // // // // // // // // // //           </div>
// // // // // // // // // // //         </main>
// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* Footer */}
// // // // // // // // // // //       <footer className="bg-gray-800 text-gray-200 py-4 px-6 text-center">
// // // // // // // // // // //         &copy; 2024 Your Company. All Rights Reserved.
// // // // // // // // // // //       </footer>
// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default PredictionsUI;









// // // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // // import { Upload, Clock, AlertCircle } from 'lucide-react';

// // // // // // // // // // interface PredictionMetadata {
// // // // // // // // // //   prediction_id: string;
// // // // // // // // // //   start_time: string;
// // // // // // // // // //   chat_id: string;
// // // // // // // // // //   user_id: string;
// // // // // // // // // //   status: string;
// // // // // // // // // //   duration: number | null;
// // // // // // // // // //   entity_count: number;
// // // // // // // // // //   predictions_csv_path: string | null;
// // // // // // // // // // }

// // // // // // // // // // const PredictionsUI: React.FC = () => {
// // // // // // // // // //   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
// // // // // // // // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // // // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // // // // // // //   const bucket_name = "artifacts1137";

// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     fetchPredictions();
// // // // // // // // // //   }, []);

// // // // // // // // // //   const fetchPredictions = async () => {
// // // // // // // // // //     try {
// // // // // // // // // //       const response = await fetch("http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9938938HHDU", {
// // // // // // // // // //         method: "GET",
// // // // // // // // // //         headers: {
// // // // // // // // // //           "Content-Type": "application/json",
// // // // // // // // // //         },
// // // // // // // // // //       });

// // // // // // // // // //       if (response.ok) {
// // // // // // // // // //         const data = await response.json();
// // // // // // // // // //         setPredictionsData(data.metadata);
// // // // // // // // // //       } else {
// // // // // // // // // //         console.error("Failed to fetch prediction metadata");
// // // // // // // // // //       }
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error while fetching predictions:", error);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // // //     if (event.target.files && event.target.files[0]) {
// // // // // // // // // //       setSelectedFile(event.target.files[0]);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const handlePredict = async () => {
// // // // // // // // // //     if (!selectedFile) {
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     setIsLoading(true);
// // // // // // // // // //     const responsePayload = {
// // // // // // // // // //       file_url: "s3://pa-documents-storage-bucket/uploads/4a87aeba/Test.csv",
// // // // // // // // // //       bucket_name: "artifacts1137",
// // // // // // // // // //     };

// // // // // // // // // //     try {
// // // // // // // // // //       const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
// // // // // // // // // //         method: "POST",
// // // // // // // // // //         headers: {
// // // // // // // // // //           "Content-Type": "application/json",
// // // // // // // // // //         },
// // // // // // // // // //         body: JSON.stringify(responsePayload),
// // // // // // // // // //       });

// // // // // // // // // //       if (response.ok) {
// // // // // // // // // //         const data = await response.json();
// // // // // // // // // //         fetchPredictions(); // Refresh the predictions list
// // // // // // // // // //       } else {
// // // // // // // // // //         const errorText = await response.text();
// // // // // // // // // //         throw new Error(errorText);
// // // // // // // // // //       }
// // // // // // // // // //     } catch (error) {
// // // // // // // // // //       console.error("Error while making prediction:", error);
// // // // // // // // // //     } finally {
// // // // // // // // // //       setIsLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const getStatusColor = (status: string) => {
// // // // // // // // // //     switch (status.toLowerCase()) {
// // // // // // // // // //       case 'completed':
// // // // // // // // // //         return 'text-green-600';
// // // // // // // // // //       case 'failed':
// // // // // // // // // //         return 'text-red-600';
// // // // // // // // // //       case 'running':
// // // // // // // // // //         return 'text-blue-600';
// // // // // // // // // //       default:
// // // // // // // // // //         return 'text-gray-600';
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // // //       {/* Header */}
// // // // // // // // // //       <header className="bg-white border-b">
// // // // // // // // // //         <div className="mx-auto px-4 py-4">
// // // // // // // // // //           <div className="flex justify-between items-center">
// // // // // // // // // //             <h1 className="text-xl font-semibold text-gray-900">Predictions Dashboard</h1>
// // // // // // // // // //             <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg">
// // // // // // // // // //               <AlertCircle className="h-4 w-4" />
// // // // // // // // // //               <span>Trial ends on Dec 19, 2024</span>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </header>

// // // // // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// // // // // // // // // //           {/* Sidebar */}
// // // // // // // // // //           <div className="lg:col-span-1 space-y-6">
// // // // // // // // // //             {/* Quick Prediction Card */}
// // // // // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // // // // //               <div className="flex items-center gap-2 mb-4">
// // // // // // // // // //                 <Upload className="h-5 w-5 text-gray-600" />
// // // // // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
// // // // // // // // // //               </div>
// // // // // // // // // //               <div className="space-y-4">
// // // // // // // // // //                 <input
// // // // // // // // // //                   type="file"
// // // // // // // // // //                   accept=".csv"
// // // // // // // // // //                   onChange={handleFileChange}
// // // // // // // // // //                   className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
// // // // // // // // // //                 />
// // // // // // // // // //                 <button
// // // // // // // // // //                   onClick={handlePredict}
// // // // // // // // // //                   disabled={!selectedFile || isLoading}
// // // // // // // // // //                   className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // // // // //                 >
// // // // // // // // // //                   {isLoading ? 'Processing...' : 'Run Prediction'}
// // // // // // // // // //                 </button>
// // // // // // // // // //               </div>
// // // // // // // // // //             </div>

// // // // // // // // // //             {/* Scheduled Predictions Card */}
// // // // // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // // // // //               <div className="flex items-center gap-2 mb-4">
// // // // // // // // // //                 <Clock className="h-5 w-5 text-gray-600" />
// // // // // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
// // // // // // // // // //               </div>
// // // // // // // // // //               <button
// // // // // // // // // //                 className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // // // // //               >
// // // // // // // // // //                 Configure Schedule
// // // // // // // // // //               </button>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>

// // // // // // // // // //           {/* Main Content */}
// // // // // // // // // //           <div className="lg:col-span-3">
// // // // // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// // // // // // // // // //               <div className="p-6 border-b border-gray-200">
// // // // // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
// // // // // // // // // //               </div>
// // // // // // // // // //               <div className="overflow-x-auto">
// // // // // // // // // //                 <table className="w-full">
// // // // // // // // // //                   <thead className="bg-gray-50">
// // // // // // // // // //                     <tr>
// // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction ID</th>
// // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
// // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
// // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity Count</th>
// // // // // // // // // //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Results</th>
// // // // // // // // // //                     </tr>
// // // // // // // // // //                   </thead>
// // // // // // // // // //                   <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // // // //                     {predictionsData.map((data) => (
// // // // // // // // // //                       <tr key={data.prediction_id} className="hover:bg-gray-50">
// // // // // // // // // //                         <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">{data.prediction_id}</td>
// // // // // // // // // //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(data.start_time).toLocaleString()}</td>
// // // // // // // // // //                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // // // // // // //                           <span className={`${getStatusColor(data.status)}`}>
// // // // // // // // // //                             {data.status}
// // // // // // // // // //                           </span>
// // // // // // // // // //                         </td>
// // // // // // // // // //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.duration ? `${data.duration.toFixed(2)}s` : "−"}</td>
// // // // // // // // // //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.entity_count}</td>
// // // // // // // // // //                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // // // // // // //                           {data.predictions_csv_path ? (
// // // // // // // // // //                             <a
// // // // // // // // // //                               href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
// // // // // // // // // //                               target="_blank"
// // // // // // // // // //                               rel="noopener noreferrer"
// // // // // // // // // //                               className="text-blue-600 hover:text-blue-800 hover:underline"
// // // // // // // // // //                             >
// // // // // // // // // //                               Download CSV
// // // // // // // // // //                             </a>
// // // // // // // // // //                           ) : "−"}
// // // // // // // // // //                         </td>
// // // // // // // // // //                       </tr>
// // // // // // // // // //                     ))}
// // // // // // // // // //                   </tbody>
// // // // // // // // // //                 </table>
// // // // // // // // // //               </div>
// // // // // // // // // //             </div>
// // // // // // // // // //           </div>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default PredictionsUI;






// // // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // // import { Upload, Clock, Monitor } from 'lucide-react';

// // // // // // // // // interface PredictionMetadata {
// // // // // // // // //   prediction_id: string;
// // // // // // // // //   start_time: string;
// // // // // // // // //   chat_id: string;
// // // // // // // // //   user_id: string;
// // // // // // // // //   status: string;
// // // // // // // // //   duration: number | null;
// // // // // // // // //   entity_count: number;
// // // // // // // // //   predictions_csv_path: string | null;
// // // // // // // // // }

// // // // // // // // // const PredictionsUI: React.FC = () => {
// // // // // // // // //   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
// // // // // // // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // // // // // //   const bucket_name = "artifacts1137";

// // // // // // // // //   useEffect(() => {
// // // // // // // // //     fetchPredictions();
// // // // // // // // //   }, []);

// // // // // // // // //   const fetchPredictions = async () => {
// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch("http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9938938HHDU", {
// // // // // // // // //         method: "GET",
// // // // // // // // //         headers: {
// // // // // // // // //           "Content-Type": "application/json",
// // // // // // // // //         },
// // // // // // // // //       });

// // // // // // // // //       if (response.ok) {
// // // // // // // // //         const data = await response.json();
// // // // // // // // //         setPredictionsData(data.metadata);
// // // // // // // // //       } else {
// // // // // // // // //         console.error("Failed to fetch prediction metadata");
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error while fetching predictions:", error);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // // //     if (event.target.files && event.target.files[0]) {
// // // // // // // // //       setSelectedFile(event.target.files[0]);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const handlePredict = async () => {
// // // // // // // // //     if (!selectedFile) {
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     setIsLoading(true);
// // // // // // // // //     const responsePayload = {
// // // // // // // // //       file_url: "s3://pa-documents-storage-bucket/uploads/4a87aeba/Test.csv",
// // // // // // // // //       bucket_name: "artifacts1137",
// // // // // // // // //     };

// // // // // // // // //     try {
// // // // // // // // //       const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
// // // // // // // // //         method: "POST",
// // // // // // // // //         headers: {
// // // // // // // // //           "Content-Type": "application/json",
// // // // // // // // //         },
// // // // // // // // //         body: JSON.stringify(responsePayload),
// // // // // // // // //       });

// // // // // // // // //       if (response.ok) {
// // // // // // // // //         const data = await response.json();
// // // // // // // // //         fetchPredictions(); // Refresh the predictions list
// // // // // // // // //       } else {
// // // // // // // // //         const errorText = await response.text();
// // // // // // // // //         throw new Error(errorText);
// // // // // // // // //       }
// // // // // // // // //     } catch (error) {
// // // // // // // // //       console.error("Error while making prediction:", error);
// // // // // // // // //     } finally {
// // // // // // // // //       setIsLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const getStatusColor = (status: string) => {
// // // // // // // // //     switch (status.toLowerCase()) {
// // // // // // // // //       case 'completed':
// // // // // // // // //         return 'text-green-600';
// // // // // // // // //       case 'failed':
// // // // // // // // //         return 'text-red-600';
// // // // // // // // //       case 'running':
// // // // // // // // //         return 'text-blue-600';
// // // // // // // // //       default:
// // // // // // // // //         return 'text-gray-600';
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   return (
// // // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // // //       {/* Header */}
// // // // // // // // //       <header className="bg-white border-b">
// // // // // // // // //         <div className="mx-auto px-4 py-4">
// // // // // // // // //           <div className="flex justify-between items-center">
// // // // // // // // //             <h1 className="text-xl font-semibold text-gray-900">Predictions Dashboard</h1>
// // // // // // // // //             <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg">
// // // // // // // // //               <Monitor className="h-4 w-4" />
// // // // // // // // //               <span>Trial ends on Dec 19, 2024</span>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </header>

// // // // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// // // // // // // // //           {/* Sidebar */}
// // // // // // // // //           <div className="lg:col-span-1 space-y-6">
// // // // // // // // //             {/* Quick Prediction Card */}
// // // // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // // // //               <div className="flex items-center gap-2 mb-4">
// // // // // // // // //                 <Upload className="h-5 w-5 text-gray-600" />
// // // // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
// // // // // // // // //               </div>
// // // // // // // // //               <div className="space-y-4">
// // // // // // // // //                 <input
// // // // // // // // //                   type="file"
// // // // // // // // //                   accept=".csv"
// // // // // // // // //                   onChange={handleFileChange}
// // // // // // // // //                   className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
// // // // // // // // //                 />
// // // // // // // // //                 <button
// // // // // // // // //                   onClick={handlePredict}
// // // // // // // // //                   disabled={!selectedFile || isLoading}
// // // // // // // // //                   className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // // // //                 >
// // // // // // // // //                   {isLoading ? 'Processing...' : 'Run Prediction'}
// // // // // // // // //                 </button>
// // // // // // // // //               </div>
// // // // // // // // //             </div>

// // // // // // // // //             {/* Scheduled Predictions Card */}
// // // // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // // // //               <div className="flex items-center gap-2 mb-4">
// // // // // // // // //                 <Clock className="h-5 w-5 text-gray-600" />
// // // // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
// // // // // // // // //               </div>
// // // // // // // // //               <button
// // // // // // // // //                 className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // // // //               >
// // // // // // // // //                 Configure Schedule
// // // // // // // // //               </button>
// // // // // // // // //             </div>
// // // // // // // // //           </div>

// // // // // // // // //           {/* Main Content */}
// // // // // // // // //           <div className="lg:col-span-3">
// // // // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// // // // // // // // //               <div className="p-6 border-b border-gray-200">
// // // // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
// // // // // // // // //               </div>
// // // // // // // // //               <div className="overflow-x-auto">
// // // // // // // // //                 {predictionsData.length === 0 ? (
// // // // // // // // //                   <div className="p-8 text-center bg-gray-100">
// // // // // // // // //                     <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // // // //                     <p className="text-lg text-gray-600">Dashboard will only be available after you train your model</p>
// // // // // // // // //                   </div>
// // // // // // // // //                 ) : (
// // // // // // // // //                   <table className="w-full">
// // // // // // // // //                     <thead className="bg-gray-50">
// // // // // // // // //                       <tr>
// // // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction ID</th>
// // // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
// // // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
// // // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
// // // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entity Count</th>
// // // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Results</th>
// // // // // // // // //                       </tr>
// // // // // // // // //                     </thead>
// // // // // // // // //                     <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // // //                       {predictionsData.map((data) => (
// // // // // // // // //                         <tr key={data.prediction_id} className="hover:bg-gray-50">
// // // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">{data.prediction_id}</td>
// // // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(data.start_time).toLocaleString()}</td>
// // // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // // // // // //                             <span className={`${getStatusColor(data.status)}`}>
// // // // // // // // //                               {data.status}
// // // // // // // // //                             </span>
// // // // // // // // //                           </td>
// // // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.duration ? `${data.duration.toFixed(2)}s` : "−"}</td>
// // // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.entity_count}</td>
// // // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // // // // // //                             {data.predictions_csv_path ? (
// // // // // // // // //                               <a
// // // // // // // // //                                 href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
// // // // // // // // //                                 target="_blank"
// // // // // // // // //                                 rel="noopener noreferrer"
// // // // // // // // //                                 className="text-blue-600 hover:text-blue-800 hover:underline"
// // // // // // // // //                               >
// // // // // // // // //                                 Download CSV
// // // // // // // // //                               </a>
// // // // // // // // //                             ) : "−"}
// // // // // // // // //                           </td>
// // // // // // // // //                         </tr>
// // // // // // // // //                       ))}
// // // // // // // // //                     </tbody>
// // // // // // // // //                   </table>
// // // // // // // // //                 )}
// // // // // // // // //               </div>
// // // // // // // // //             </div>
// // // // // // // // //           </div>
// // // // // // // // //         </div>
// // // // // // // // //       </div>
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default PredictionsUI;



// // // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // // import { Upload, Clock, Monitor, X } from 'lucide-react';

// // // // // // // // interface PredictionMetadata {
// // // // // // // //   prediction_id: string;
// // // // // // // //   start_time: string;
// // // // // // // //   chat_id: string;
// // // // // // // //   user_id: string;
// // // // // // // //   status: string;
// // // // // // // //   duration: number | null;
// // // // // // // //   entity_count: number;
// // // // // // // //   predictions_csv_path: string | null;
// // // // // // // // }

// // // // // // // // interface PredictionFileInfo {
// // // // // // // //   id: number;
// // // // // // // //   name: string;
// // // // // // // //   file_url: string;
// // // // // // // //   schema: Array<{ column_name: string; data_type: string }>;
// // // // // // // //   file_size_mb: number;
// // // // // // // //   has_date_column: boolean;
// // // // // // // //   date_columns: string[];
// // // // // // // //   chat_id: string;
// // // // // // // //   prediction_queries: {
// // // // // // // //     sampling_query: string;
// // // // // // // //     feature_query: string;
// // // // // // // //   };
// // // // // // // //   prediction_results: {
// // // // // // // //     sampling_results: any[];
// // // // // // // //     feature_results: any[];
// // // // // // // //   };
// // // // // // // // }

// // // // // // // // const PredictionsUI: React.FC = () => {
// // // // // // // //   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
// // // // // // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // // // // //   // Controls the entire “wizard” modal
// // // // // // // //   const [showPredictionWizard, setShowPredictionWizard] = useState(false);

// // // // // // // //   // Which step of the wizard we’re on (1 = Upload CSV, 2 = Review Queries)
// // // // // // // //   const [wizardStep, setWizardStep] = useState<number>(1);

// // // // // // // //   // After uploading, we store the backend’s response here (queries, schema, etc.)
// // // // // // // //   const [predictionFileInfo, setPredictionFileInfo] = useState<PredictionFileInfo | null>(null);

// // // // // // // //   // S3 bucket name for linking CSV results
// // // // // // // //   const bucket_name = "artifacts1137";

// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchPredictions();
// // // // // // // //   }, []);

// // // // // // // //   const fetchPredictions = async () => {
// // // // // // // //     try {
// // // // // // // //       // Fetch existing prediction history
// // // // // // // //       const response = await fetch(
// // // // // // // //         "http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9938938HHDU",
// // // // // // // //         {
// // // // // // // //           method: "GET",
// // // // // // // //           headers: {
// // // // // // // //             "Content-Type": "application/json",
// // // // // // // //           },
// // // // // // // //         }
// // // // // // // //       );

// // // // // // // //       if (response.ok) {
// // // // // // // //         const data = await response.json();
// // // // // // // //         setPredictionsData(data.metadata);
// // // // // // // //       } else {
// // // // // // // //         console.error("Failed to fetch prediction metadata");
// // // // // // // //       }
// // // // // // // //     } catch (error: unknown) {
// // // // // // // //       console.error("Error while fetching predictions:", error);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   /**
// // // // // // // //    * Handle file selection in the file input.
// // // // // // // //    */
// // // // // // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // // //     if (event.target.files && event.target.files[0]) {
// // // // // // // //       setSelectedFile(event.target.files[0]);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   /**
// // // // // // // //    * Step 1: Upload CSV & generate queries (calls your backend at /PredictionFile/predict/).
// // // // // // // //    */
// // // // // // // //   const handleQuickPrediction = async () => {
// // // // // // // //     if (!selectedFile) {
// // // // // // // //       alert("Please select a CSV file to upload.");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setIsLoading(true);
// // // // // // // //     const formData = new FormData();
// // // // // // // //     formData.append("file", selectedFile);
// // // // // // // //     formData.append("user_id", 9'); // Hardcoded user_id; adjust as needed
// // // // // // // //     formData.append("chat_id", `pred_${Date.now()}`); // Unique chat_id for the prediction run

// // // // // // // //     try {
// // // // // // // //       const response = await fetch("http://127.0.0.1:8000/api/predict/", {
// // // // // // // //         method: "POST",
// // // // // // // //         body: formData,
// // // // // // // //       });

// // // // // // // //       if (response.ok) {
// // // // // // // //         const data = await response.json();
// // // // // // // //         // Store the first uploaded file info (contains queries, schema, etc.)
// // // // // // // //         if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // // // // // //           setPredictionFileInfo(data.uploaded_files[0]);
// // // // // // // //         }
// // // // // // // //         // We remain on wizardStep=1, but "Review Query" button is now enabled
// // // // // // // //       } else {
// // // // // // // //         const errorText = await response.text();
// // // // // // // //         throw new Error(errorText);
// // // // // // // //       }
// // // // // // // //     } catch (error: unknown) {
// // // // // // // //       console.error("Error while making prediction:", error);
// // // // // // // //       if (error instanceof Error) {
// // // // // // // //         alert(`Prediction failed: ${error.message}`);
// // // // // // // //       } else {
// // // // // // // //         alert("Prediction failed: An unknown error occurred.");
// // // // // // // //       }
// // // // // // // //     } finally {
// // // // // // // //       setIsLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   /**
// // // // // // // //    * Step 2: Final “Predict on new data” after user reviews queries.
// // // // // // // //    * Calls your backend at /api/prediction/ to actually run the final predictions.
// // // // // // // //    */
// // // // // // // //   const handlePredictOnNewData = async () => {
// // // // // // // //     if (!predictionFileInfo) {
// // // // // // // //       alert("Please upload a file and review queries before predicting.");
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     setIsLoading(true);
// // // // // // // //     try {
// // // // // // // //       const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
// // // // // // // //         method: "POST",
// // // // // // // //         headers: {
// // // // // // // //           "Content-Type": "application/json",
// // // // // // // //         },
// // // // // // // //         body: JSON.stringify({
// // // // // // // //           chat_id: predictionFileInfo.chat_id,
// // // // // // // //           file_id: predictionFileInfo.id,
// // // // // // // //           queries: predictionFileInfo.prediction_queries,
// // // // // // // //         }),
// // // // // // // //       });

// // // // // // // //       if (response.ok) {
// // // // // // // //         await response.json();
// // // // // // // //         alert("Prediction completed successfully!");
// // // // // // // //         // Refresh the predictions table to show new entry
// // // // // // // //         fetchPredictions();
// // // // // // // //       } else {
// // // // // // // //         const errorText = await response.text();
// // // // // // // //         throw new Error(errorText);
// // // // // // // //       }
// // // // // // // //     } catch (error: unknown) {
// // // // // // // //       console.error("Error while running prediction:", error);
// // // // // // // //       // You can optionally show an alert here if you want
// // // // // // // //     } finally {
// // // // // // // //       setIsLoading(false);

// // // // // // // //       // Close wizard and reset
// // // // // // // //       setShowPredictionWizard(false);
// // // // // // // //       setWizardStep(1);
// // // // // // // //       setSelectedFile(null);
// // // // // // // //       setPredictionFileInfo(null);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   /**
// // // // // // // //    * Assign color classes based on the status.
// // // // // // // //    */
// // // // // // // //   const getStatusColor = (status: string) => {
// // // // // // // //     switch (status.toLowerCase()) {
// // // // // // // //       case "completed":
// // // // // // // //         return "text-green-600";
// // // // // // // //       case "failed":
// // // // // // // //         return "text-red-600";
// // // // // // // //       case "running":
// // // // // // // //         return "text-blue-600";
// // // // // // // //       default:
// // // // // // // //         return "text-gray-600";
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   return (
// // // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // // //       {/* Header */}
// // // // // // // //       <header className="bg-white border-b">
// // // // // // // //         <div className="mx-auto px-4 py-4">
// // // // // // // //           <div className="flex justify-between items-center">
// // // // // // // //             <h1 className="text-xl font-semibold text-gray-900">Predictions Dashboard</h1>
// // // // // // // //             <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg">
// // // // // // // //               <Monitor className="h-4 w-4" />
// // // // // // // //               <span>Trial ends on Dec 19, 2024</span>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>
// // // // // // // //       </header>

// // // // // // // //       {/* Main Container */}
// // // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// // // // // // // //           {/* Sidebar */}
// // // // // // // //           <div className="lg:col-span-1 space-y-6">
// // // // // // // //             {/* Quick Prediction Card */}
// // // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // // //               <div className="flex items-center gap-2 mb-4">
// // // // // // // //                 <Upload className="h-5 w-5 text-gray-600" />
// // // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
// // // // // // // //               </div>
// // // // // // // //               <p className="text-sm text-gray-600 mb-4">
// // // // // // // //                 Upload CSVs and use your model for a one-time prediction on new data.
// // // // // // // //               </p>
// // // // // // // //               <button
// // // // // // // //                 onClick={() => {
// // // // // // // //                   setShowPredictionWizard(true);
// // // // // // // //                   setWizardStep(1); // Start wizard from step 1
// // // // // // // //                   setSelectedFile(null);
// // // // // // // //                   setPredictionFileInfo(null);
// // // // // // // //                 }}
// // // // // // // //                 className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
// // // // // // // //               >
// // // // // // // //                 One-time predict from CSV
// // // // // // // //               </button>
// // // // // // // //             </div>

// // // // // // // //             {/* Scheduled Predictions Card */}
// // // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // // //               <div className="flex items-center gap-2 mb-4">
// // // // // // // //                 <Clock className="h-5 w-5 text-gray-600" />
// // // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
// // // // // // // //               </div>
// // // // // // // //               <button
// // // // // // // //                 className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // // //               >
// // // // // // // //                 Configure Schedule
// // // // // // // //               </button>
// // // // // // // //             </div>
// // // // // // // //           </div>

// // // // // // // //           {/* Main Content (Prediction History) */}
// // // // // // // //           <div className="lg:col-span-3">
// // // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// // // // // // // //               <div className="p-6 border-b border-gray-200">
// // // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
// // // // // // // //               </div>
// // // // // // // //               <div className="overflow-x-auto">
// // // // // // // //                 {predictionsData.length === 0 ? (
// // // // // // // //                   <div className="p-8 text-center bg-gray-100">
// // // // // // // //                     <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // // //                     <p className="text-lg text-gray-600">
// // // // // // // //                       Dashboard will only be available after you train your model
// // // // // // // //                     </p>
// // // // // // // //                   </div>
// // // // // // // //                 ) : (
// // // // // // // //                   <table className="w-full">
// // // // // // // //                     <thead className="bg-gray-50">
// // // // // // // //                       <tr>
// // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // // //                           Prediction ID
// // // // // // // //                         </th>
// // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // // //                           Start Time
// // // // // // // //                         </th>
// // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // // //                           Status
// // // // // // // //                         </th>
// // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // // //                           Duration
// // // // // // // //                         </th>
// // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // // //                           Entity Count
// // // // // // // //                         </th>
// // // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // // //                           Results
// // // // // // // //                         </th>
// // // // // // // //                       </tr>
// // // // // // // //                     </thead>
// // // // // // // //                     <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // //                       {predictionsData.map((data) => (
// // // // // // // //                         <tr key={data.prediction_id} className="hover:bg-gray-50">
// // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
// // // // // // // //                             {data.prediction_id}
// // // // // // // //                           </td>
// // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // // // // //                             {new Date(data.start_time).toLocaleString()}
// // // // // // // //                           </td>
// // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // // // // //                             <span className={`${getStatusColor(data.status)}`}>
// // // // // // // //                               {data.status}
// // // // // // // //                             </span>
// // // // // // // //                           </td>
// // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // // // // //                             {data.duration ? `${data.duration.toFixed(2)}s` : "−"}
// // // // // // // //                           </td>
// // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // // // // //                             {data.entity_count}
// // // // // // // //                           </td>
// // // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // // // // //                             {data.predictions_csv_path ? (
// // // // // // // //                               <a
// // // // // // // //                                 href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
// // // // // // // //                                 target="_blank"
// // // // // // // //                                 rel="noopener noreferrer"
// // // // // // // //                                 className="text-blue-600 hover:text-blue-800 hover:underline"
// // // // // // // //                               >
// // // // // // // //                                 Download CSV
// // // // // // // //                               </a>
// // // // // // // //                             ) : (
// // // // // // // //                               "−"
// // // // // // // //                             )}
// // // // // // // //                           </td>
// // // // // // // //                         </tr>
// // // // // // // //                       ))}
// // // // // // // //                     </tbody>
// // // // // // // //                   </table>
// // // // // // // //                 )}
// // // // // // // //               </div>
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         </div>

// // // // // // // //         {/* ============== 
// // // // // // // //             SINGLE MODAL 
// // // // // // // //             ============== */}
// // // // // // // //         {showPredictionWizard && (
// // // // // // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // // // //             {/* Make it wide: max-w-4xl or even max-w-5xl */}
// // // // // // // //             <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
// // // // // // // //               {/* Modal Header */}
// // // // // // // //               <div className="flex justify-between items-center mb-4">
// // // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">
// // // // // // // //                   Select Data to Predict On
// // // // // // // //                 </h2>
// // // // // // // //                 <button
// // // // // // // //                   onClick={() => {
// // // // // // // //                     setShowPredictionWizard(false);
// // // // // // // //                     setWizardStep(1);
// // // // // // // //                     setSelectedFile(null);
// // // // // // // //                     setPredictionFileInfo(null);
// // // // // // // //                   }}
// // // // // // // //                   className="text-gray-500 hover:text-gray-700"
// // // // // // // //                 >
// // // // // // // //                   <X className="h-5 w-5" />
// // // // // // // //                 </button>
// // // // // // // //               </div>

// // // // // // // //               {/* STEP 1: Upload CSV */}
// // // // // // // //               {wizardStep === 1 && (
// // // // // // // //                 <div className="space-y-6">
// // // // // // // //                   <div className="space-y-2">
// // // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // // //                       Map new tables to the tables that were used for training. Make sure that
// // // // // // // //                       the schemas match between the training tables and the new tables. You can
// // // // // // // //                       edit the schema of the new table in the next step.
// // // // // // // //                     </p>
// // // // // // // //                   </div>

// // // // // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // // // // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // // // // // // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // // // // // // //                     </div>
// // // // // // // //                     <p className="text-sm text-gray-600 mb-2">Select a table</p>

// // // // // // // //                     {/* File Input */}
// // // // // // // //                     <input
// // // // // // // //                       type="file"
// // // // // // // //                       accept=".csv"
// // // // // // // //                       onChange={handleFileChange}
// // // // // // // //                       className="block w-full text-sm text-gray-500
// // // // // // // //                         file:mr-4 file:py-2 file:px-4
// // // // // // // //                         file:rounded-full file:border-0
// // // // // // // //                         file:text-sm file:font-semibold
// // // // // // // //                         file:bg-blue-600 file:text-white
// // // // // // // //                         hover:file:bg-blue-700
// // // // // // // //                       "
// // // // // // // //                       id="fileInput"
// // // // // // // //                     />
// // // // // // // //                     <label
// // // // // // // //                       htmlFor="fileInput"
// // // // // // // //                       className="block w-full text-center text-sm text-gray-500 mt-2"
// // // // // // // //                     >
// // // // // // // //                       {selectedFile ? selectedFile.name : "No file chosen"}
// // // // // // // //                     </label>

// // // // // // // //                     {/* Buttons */}
// // // // // // // //                     <div className="flex items-center gap-3 mt-4">
// // // // // // // //                       <button
// // // // // // // //                         onClick={handleQuickPrediction}
// // // // // // // //                         disabled={!selectedFile || isLoading}
// // // // // // // //                         className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
// // // // // // // //                           text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // // //                       >
// // // // // // // //                         {isLoading ? "Uploading..." : "Upload CSV"}
// // // // // // // //                       </button>

// // // // // // // //                       {/* “Review Query” is disabled until backend returns the file info */}
// // // // // // // //                       <button
// // // // // // // //                         onClick={() => setWizardStep(2)}
// // // // // // // //                         disabled={!predictionFileInfo || isLoading}
// // // // // // // //                         className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4
// // // // // // // //                           rounded-lg transition-colors
// // // // // // // //                           ${!predictionFileInfo ? "opacity-50 cursor-not-allowed" : ""}`}
// // // // // // // //                       >
// // // // // // // //                         Review Query
// // // // // // // //                       </button>
// // // // // // // //                     </div>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               )}

// // // // // // // //               {/* STEP 2: Review Queries (Only if we have `predictionFileInfo`) */}
// // // // // // // //               {wizardStep === 2 && predictionFileInfo && (
// // // // // // // //                 <div className="space-y-6">
// // // // // // // //                   <div className="space-y-2">
// // // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // // //                       Review the queries that will pull in new data for prediction. These queries
// // // // // // // //                       were generated together with the notebook and are based on the original
// // // // // // // //                       predictive question.
// // // // // // // //                     </p>
// // // // // // // //                   </div>

// // // // // // // //                   {/* (1) Replace Tables */}
// // // // // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // // // // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // // // // // // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // // // // // // //                     </div>
// // // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // // //                       Map new tables to the tables that were used for training. Make sure the
// // // // // // // //                       schemas match. You can edit the schema in the next step.
// // // // // // // //                     </p>
// // // // // // // //                     <div className="mt-2">
// // // // // // // //                       <p className="text-sm text-gray-600">
// // // // // // // //                         Training table: my_files.Unstructured_Daily_Product_Demand_Data
// // // // // // // //                       </p>
// // // // // // // //                       <p className="text-sm text-gray-600">
// // // // // // // //                         New table: {predictionFileInfo.name} (Uploaded CSV)
// // // // // // // //                       </p>
// // // // // // // //                     </div>
// // // // // // // //                   </div>

// // // // // // // //                   {/* (2) Review Query */}
// // // // // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // // // // //                       <span className="text-sm font-medium text-gray-700">2</span>
// // // // // // // //                       <span className="text-sm text-gray-700">Review query</span>
// // // // // // // //                     </div>

// // // // // // // //                     {/* Sampling Query */}
// // // // // // // //                     <div className="mb-4">
// // // // // // // //                       <h3 className="text-sm font-medium text-gray-900 mb-2">
// // // // // // // //                         Entities - Which entities do you want to predict on?
// // // // // // // //                       </h3>
// // // // // // // //                       <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
// // // // // // // //                         {predictionFileInfo.prediction_queries.sampling_query}
// // // // // // // //                       </pre>
// // // // // // // //                     </div>

// // // // // // // //                     {/* Feature Query */}
// // // // // // // //                     <div>
// // // // // // // //                       <h3 className="text-sm font-medium text-gray-900 mb-2">
// // // // // // // //                         Attributes - What features should be included?
// // // // // // // //                       </h3>
// // // // // // // //                       <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
// // // // // // // //                         {predictionFileInfo.prediction_queries.feature_query}
// // // // // // // //                       </pre>
// // // // // // // //                     </div>
// // // // // // // //                   </div>

// // // // // // // //                   {/* Step 2 Buttons */}
// // // // // // // //                   <div className="flex justify-end gap-4 mt-6">
// // // // // // // //                     <button
// // // // // // // //                       onClick={() => setWizardStep(1)}
// // // // // // // //                       className="border border-gray-300 hover:bg-gray-50
// // // // // // // //                         text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // // //                     >
// // // // // // // //                       Back
// // // // // // // //                     </button>
// // // // // // // //                     <button
// // // // // // // //                       onClick={handlePredictOnNewData}
// // // // // // // //                       disabled={isLoading}
// // // // // // // //                       className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
// // // // // // // //                         text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // // //                     >
// // // // // // // //                       {isLoading ? "Predicting..." : "Predict on New Data"}
// // // // // // // //                     </button>
// // // // // // // //                   </div>
// // // // // // // //                 </div>
// // // // // // // //               )}
// // // // // // // //             </div>
// // // // // // // //           </div>
// // // // // // // //         )}
// // // // // // // //       </div>
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default PredictionsUI;





// // // // // // // import React, { useState, useEffect } from 'react';
// // // // // // // import { Upload, Clock, Monitor, X } from 'lucide-react';
// // // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook';// <-- Import your notebook component here

// // // // // // // interface PredictionMetadata {
// // // // // // //   prediction_id: string;
// // // // // // //   start_time: string;
// // // // // // //   chat_id: string;
// // // // // // //   user_id: string;
// // // // // // //   status: string;
// // // // // // //   duration: number | null;
// // // // // // //   entity_count: number;
// // // // // // //   predictions_csv_path: string | null;
// // // // // // // }

// // // // // // // interface PredictionFileInfo {
// // // // // // //   id: number;
// // // // // // //   name: string;
// // // // // // //   file_url: string;
// // // // // // //   schema: Array<{ column_name: string; data_type: string }>;
// // // // // // //   file_size_mb: number;
// // // // // // //   has_date_column: boolean;
// // // // // // //   date_columns: string[];
// // // // // // //   chat_id: string;
// // // // // // //   prediction_queries: {
// // // // // // //     sampling_query: string;
// // // // // // //     feature_query: string;
// // // // // // //   };
// // // // // // //   prediction_results: {
// // // // // // //     sampling_results: any[];
// // // // // // //     feature_results: any[];
// // // // // // //   };
// // // // // // // }

// // // // // // // const PredictionsUI: React.FC = () => {
// // // // // // //   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
// // // // // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // // // //   // Controls the entire “wizard” modal
// // // // // // //   const [showPredictionWizard, setShowPredictionWizard] = useState(false);

// // // // // // //   // Which step of the wizard we’re on (1 = Upload CSV, 2 = Review Queries)
// // // // // // //   const [wizardStep, setWizardStep] = useState<number>(1);

// // // // // // //   // After uploading, we store the backend’s response here (queries, schema, etc.)
// // // // // // //   const [predictionFileInfo, setPredictionFileInfo] = useState<PredictionFileInfo | null>(null);

// // // // // // //   // S3 bucket name for linking CSV results
// // // // // // //   const bucket_name = "artifacts1137";

// // // // // // //   useEffect(() => {
// // // // // // //     fetchPredictions();
// // // // // // //   }, []);

// // // // // // //   const fetchPredictions = async () => {
// // // // // // //     try {
// // // // // // //       // Fetch existing prediction history
// // // // // // //       const response = await fetch(
// // // // // // //         "http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9938938HHDU",
// // // // // // //         {
// // // // // // //           method: "GET",
// // // // // // //           headers: {
// // // // // // //             "Content-Type": "application/json",
// // // // // // //           },
// // // // // // //         }
// // // // // // //       );

// // // // // // //       if (response.ok) {
// // // // // // //         const data = await response.json();
// // // // // // //         setPredictionsData(data.metadata);
// // // // // // //       } else {
// // // // // // //         console.error("Failed to fetch prediction metadata");
// // // // // // //       }
// // // // // // //     } catch (error: unknown) {
// // // // // // //       console.error("Error while fetching predictions:", error);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   /**
// // // // // // //    * Handle file selection in the file input.
// // // // // // //    */
// // // // // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // // //     if (event.target.files && event.target.files[0]) {
// // // // // // //       setSelectedFile(event.target.files[0]);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   /**
// // // // // // //    * Step 1: Upload CSV & generate queries (calls your backend at /api/predict/).
// // // // // // //    */
// // // // // // //   const handleQuickPrediction = async () => {
// // // // // // //     if (!selectedFile) {
// // // // // // //       alert("Please select a CSV file to upload.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setIsLoading(true);
// // // // // // //     const formData = new FormData();
// // // // // // //     formData.append("file", selectedFile);
// // // // // // //     // Use your actual user_id here
// // // // // // //     formData.append("user_id", "9");
// // // // // // //     formData.append("chat_id", `pred_${Date.now()}`); // Unique chat_id

// // // // // // //     try {
// // // // // // //       const response = await fetch("http://127.0.0.1:8000/api/predict/", {
// // // // // // //         method: "POST",
// // // // // // //         body: formData,
// // // // // // //       });

// // // // // // //       if (response.ok) {
// // // // // // //         const data = await response.json();
// // // // // // //         // Store the first uploaded file info
// // // // // // //         if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // // // // //           setPredictionFileInfo(data.uploaded_files[0]);
// // // // // // //         }
// // // // // // //         // "Review Query" button is now enabled
// // // // // // //       } else {
// // // // // // //         const errorText = await response.text();
// // // // // // //         throw new Error(errorText);
// // // // // // //       }
// // // // // // //     } catch (error: unknown) {
// // // // // // //       console.error("Error while making prediction:", error);
// // // // // // //       if (error instanceof Error) {
// // // // // // //         alert(`Prediction failed: ${error.message}`);
// // // // // // //       } else {
// // // // // // //         alert("Prediction failed: An unknown error occurred.");
// // // // // // //       }
// // // // // // //     } finally {
// // // // // // //       setIsLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   /**
// // // // // // //    * Step 2: Final “Predict on new data” after user reviews queries.
// // // // // // //    * Calls your backend at /api/prediction/ to actually run the final predictions.
// // // // // // //    */
// // // // // // //   const handlePredictOnNewData = async () => {
// // // // // // //     if (!predictionFileInfo) {
// // // // // // //       alert("Please upload a file and review queries before predicting.");
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     setIsLoading(true);
// // // // // // //     try {
// // // // // // //       const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
// // // // // // //         method: "POST",
// // // // // // //         headers: {
// // // // // // //           "Content-Type": "application/json",
// // // // // // //         },
// // // // // // //         body: JSON.stringify({
// // // // // // //           chat_id: predictionFileInfo.chat_id,
// // // // // // //           file_id: predictionFileInfo.id,
// // // // // // //           queries: predictionFileInfo.prediction_queries,
// // // // // // //         }),
// // // // // // //       });

// // // // // // //       if (response.ok) {
// // // // // // //         await response.json();
// // // // // // //         alert("Prediction completed successfully!");
// // // // // // //         // Refresh the predictions table
// // // // // // //         fetchPredictions();
// // // // // // //       } else {
// // // // // // //         const errorText = await response.text();
// // // // // // //         throw new Error(errorText);
// // // // // // //       }
// // // // // // //     } catch (error: unknown) {
// // // // // // //       console.error("Error while running prediction:", error);
// // // // // // //     } finally {
// // // // // // //       setIsLoading(false);

// // // // // // //       // Close wizard and reset
// // // // // // //       setShowPredictionWizard(false);
// // // // // // //       setWizardStep(1);
// // // // // // //       setSelectedFile(null);
// // // // // // //       setPredictionFileInfo(null);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   /**
// // // // // // //    * Assign color classes based on the status.
// // // // // // //    */
// // // // // // //   const getStatusColor = (status: string) => {
// // // // // // //     switch (status.toLowerCase()) {
// // // // // // //       case "completed":
// // // // // // //         return "text-green-600";
// // // // // // //       case "failed":
// // // // // // //         return "text-red-600";
// // // // // // //       case "running":
// // // // // // //         return "text-blue-600";
// // // // // // //       default:
// // // // // // //         return "text-gray-600";
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Helper to create "cells" for the notebook
// // // // // // //   const buildNotebookCells = () => {
// // // // // // //     if (!predictionFileInfo) return [];
// // // // // // //     return [
// // // // // // //       {
// // // // // // //         cell_type: 'code',
// // // // // // //         source: predictionFileInfo.prediction_queries.sampling_query,
// // // // // // //         outputs: []
// // // // // // //       },
// // // // // // //       {
// // // // // // //         cell_type: 'code',
// // // // // // //         source: predictionFileInfo.prediction_queries.feature_query,
// // // // // // //         outputs: []
// // // // // // //       }
// // // // // // //     ];
// // // // // // //   };

// // // // // // //   return (
// // // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // // //       {/* Header */}
// // // // // // //       <header className="bg-white border-b">
// // // // // // //         <div className="mx-auto px-4 py-4">
// // // // // // //           <div className="flex justify-between items-center">
// // // // // // //             <h1 className="text-xl font-semibold text-gray-900">Predictions Dashboard</h1>
// // // // // // //             <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg">
// // // // // // //               <Monitor className="h-4 w-4" />
// // // // // // //               <span>Trial ends on Dec 19, 2024</span>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>
// // // // // // //       </header>

// // // // // // //       {/* Main Container */}
// // // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // // //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// // // // // // //           {/* Sidebar */}
// // // // // // //           <div className="lg:col-span-1 space-y-6">
// // // // // // //             {/* Quick Prediction Card */}
// // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // //               <div className="flex items-center gap-2 mb-4">
// // // // // // //                 <Upload className="h-5 w-5 text-gray-600" />
// // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
// // // // // // //               </div>
// // // // // // //               <p className="text-sm text-gray-600 mb-4">
// // // // // // //                 Upload CSVs and use your model for a one-time prediction on new data.
// // // // // // //               </p>
// // // // // // //               <button
// // // // // // //                 onClick={() => {
// // // // // // //                   setShowPredictionWizard(true);
// // // // // // //                   setWizardStep(1);
// // // // // // //                   setSelectedFile(null);
// // // // // // //                   setPredictionFileInfo(null);
// // // // // // //                 }}
// // // // // // //                 className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
// // // // // // //               >
// // // // // // //                 One-time predict from CSV
// // // // // // //               </button>
// // // // // // //             </div>

// // // // // // //             {/* Scheduled Predictions Card */}
// // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // // //               <div className="flex items-center gap-2 mb-4">
// // // // // // //                 <Clock className="h-5 w-5 text-gray-600" />
// // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
// // // // // // //               </div>
// // // // // // //               <button
// // // // // // //                 className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // //               >
// // // // // // //                 Configure Schedule
// // // // // // //               </button>
// // // // // // //             </div>
// // // // // // //           </div>

// // // // // // //           {/* Main Content (Prediction History) */}
// // // // // // //           <div className="lg:col-span-3">
// // // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// // // // // // //               <div className="p-6 border-b border-gray-200">
// // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
// // // // // // //               </div>
// // // // // // //               <div className="overflow-x-auto">
// // // // // // //                 {predictionsData.length === 0 ? (
// // // // // // //                   <div className="p-8 text-center bg-gray-100">
// // // // // // //                     <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // // //                     <p className="text-lg text-gray-600">
// // // // // // //                       Dashboard will only be available after you train your model
// // // // // // //                     </p>
// // // // // // //                   </div>
// // // // // // //                 ) : (
// // // // // // //                   <table className="w-full">
// // // // // // //                     <thead className="bg-gray-50">
// // // // // // //                       <tr>
// // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // //                           Prediction ID
// // // // // // //                         </th>
// // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // //                           Start Time
// // // // // // //                         </th>
// // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // //                           Status
// // // // // // //                         </th>
// // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // //                           Duration
// // // // // // //                         </th>
// // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // //                           Entity Count
// // // // // // //                         </th>
// // // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // // //                           Results
// // // // // // //                         </th>
// // // // // // //                       </tr>
// // // // // // //                     </thead>
// // // // // // //                     <tbody className="bg-white divide-y divide-gray-200">
// // // // // // //                       {predictionsData.map((data) => (
// // // // // // //                         <tr key={data.prediction_id} className="hover:bg-gray-50">
// // // // // // //                           <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
// // // // // // //                             {data.prediction_id}
// // // // // // //                           </td>
// // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // // // //                             {new Date(data.start_time).toLocaleString()}
// // // // // // //                           </td>
// // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // // // //                             <span className={`${getStatusColor(data.status)}`}>
// // // // // // //                               {data.status}
// // // // // // //                             </span>
// // // // // // //                           </td>
// // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // // // //                             {data.duration ? `${data.duration.toFixed(2)}s` : "−"}
// // // // // // //                           </td>
// // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // // // //                             {data.entity_count}
// // // // // // //                           </td>
// // // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // // // //                             {data.predictions_csv_path ? (
// // // // // // //                               <a
// // // // // // //                                 href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
// // // // // // //                                 target="_blank"
// // // // // // //                                 rel="noopener noreferrer"
// // // // // // //                                 className="text-blue-600 hover:text-blue-800 hover:underline"
// // // // // // //                               >
// // // // // // //                                 Download CSV
// // // // // // //                               </a>
// // // // // // //                             ) : (
// // // // // // //                               "−"
// // // // // // //                             )}
// // // // // // //                           </td>
// // // // // // //                         </tr>
// // // // // // //                       ))}
// // // // // // //                     </tbody>
// // // // // // //                   </table>
// // // // // // //                 )}
// // // // // // //               </div>
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         </div>

// // // // // // //         {/* SINGLE MODAL */}
// // // // // // //         {showPredictionWizard && (
// // // // // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // // //             <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
// // // // // // //               {/* Modal Header */}
// // // // // // //               <div className="flex justify-between items-center mb-4">
// // // // // // //                 <h2 className="text-lg font-semibold text-gray-900">
// // // // // // //                   Select Data to Predict On
// // // // // // //                 </h2>
// // // // // // //                 <button
// // // // // // //                   onClick={() => {
// // // // // // //                     setShowPredictionWizard(false);
// // // // // // //                     setWizardStep(1);
// // // // // // //                     setSelectedFile(null);
// // // // // // //                     setPredictionFileInfo(null);
// // // // // // //                   }}
// // // // // // //                   className="text-gray-500 hover:text-gray-700"
// // // // // // //                 >
// // // // // // //                   <X className="h-5 w-5" />
// // // // // // //                 </button>
// // // // // // //               </div>

// // // // // // //               {/* STEP 1: Upload CSV */}
// // // // // // //               {wizardStep === 1 && (
// // // // // // //                 <div className="space-y-6">
// // // // // // //                   <div className="space-y-2">
// // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // //                       Map new tables to the tables that were used for training. Make sure that
// // // // // // //                       the schemas match between the training tables and the new tables. You can
// // // // // // //                       edit the schema of the new table in the next step.
// // // // // // //                     </p>
// // // // // // //                   </div>

// // // // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // // // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // // // // // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // // // // // //                     </div>
// // // // // // //                     <p className="text-sm text-gray-600 mb-2">Select a table</p>

// // // // // // //                     {/* File Input */}
// // // // // // //                     <input
// // // // // // //                       type="file"
// // // // // // //                       accept=".csv"
// // // // // // //                       onChange={handleFileChange}
// // // // // // //                       className="block w-full text-sm text-gray-500
// // // // // // //                         file:mr-4 file:py-2 file:px-4
// // // // // // //                         file:rounded-full file:border-0
// // // // // // //                         file:text-sm file:font-semibold
// // // // // // //                         file:bg-blue-600 file:text-white
// // // // // // //                         hover:file:bg-blue-700
// // // // // // //                       "
// // // // // // //                       id="fileInput"
// // // // // // //                     />
// // // // // // //                     <label
// // // // // // //                       htmlFor="fileInput"
// // // // // // //                       className="block w-full text-center text-sm text-gray-500 mt-2"
// // // // // // //                     >
// // // // // // //                       {selectedFile ? selectedFile.name : "No file chosen"}
// // // // // // //                     </label>

// // // // // // //                     {/* Buttons */}
// // // // // // //                     <div className="flex items-center gap-3 mt-4">
// // // // // // //                       <button
// // // // // // //                         onClick={handleQuickPrediction}
// // // // // // //                         disabled={!selectedFile || isLoading}
// // // // // // //                         className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
// // // // // // //                           text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // //                       >
// // // // // // //                         {isLoading ? "Uploading..." : "Upload CSV"}
// // // // // // //                       </button>

// // // // // // //                       {/* “Review Query” is disabled until backend returns the file info */}
// // // // // // //                       <button
// // // // // // //                         onClick={() => setWizardStep(2)}
// // // // // // //                         disabled={!predictionFileInfo || isLoading}
// // // // // // //                         className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4
// // // // // // //                           rounded-lg transition-colors
// // // // // // //                           ${!predictionFileInfo ? "opacity-50 cursor-not-allowed" : ""}`}
// // // // // // //                       >
// // // // // // //                         Review Query
// // // // // // //                       </button>
// // // // // // //                     </div>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               )}

// // // // // // //               {/* STEP 2: Review Queries (Only if we have `predictionFileInfo`) */}
// // // // // // //               {wizardStep === 2 && predictionFileInfo && (
// // // // // // //                 <div className="space-y-6">
// // // // // // //                   <div className="space-y-2">
// // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // //                       Review the queries that will pull in new data for prediction. These queries
// // // // // // //                       were generated together with the notebook and are based on the original
// // // // // // //                       predictive question.
// // // // // // //                     </p>
// // // // // // //                   </div>

// // // // // // //                   {/* (1) Replace Tables */}
// // // // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // // // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // // // // // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // // // // // //                     </div>
// // // // // // //                     <p className="text-sm text-gray-600">
// // // // // // //                       Map new tables to the tables that were used for training. Make sure the
// // // // // // //                       schemas match. You can edit the schema in the next step.
// // // // // // //                     </p>
// // // // // // //                     <div className="mt-2">
// // // // // // //                       <p className="text-sm text-gray-600">
// // // // // // //                         Training table: my_files.Unstructured_Daily_Product_Demand_Data
// // // // // // //                       </p>
// // // // // // //                       <p className="text-sm text-gray-600">
// // // // // // //                         New table: {predictionFileInfo.name} (Uploaded CSV)
// // // // // // //                       </p>
// // // // // // //                     </div>
// // // // // // //                   </div>

// // // // // // //                   {/* (2) Review Query as Notebook */}
// // // // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // // // //                       <span className="text-sm font-medium text-gray-700">2</span>
// // // // // // //                       <span className="text-sm text-gray-700">Review query</span>
// // // // // // //                     </div>

// // // // // // //                     {/* Instead of <pre>, we show the SQLNotebook */}
// // // // // // //                     <SQLNotebook
// // // // // // //                       activeTab="prediction_notebook"
// // // // // // //                       notebookContent={{
// // // // // // //                         file_url: predictionFileInfo.file_url,
// // // // // // //                         entity_column: '',
// // // // // // //                         target_column: '',
// // // // // // //                         features: [],
// // // // // // //                         user_id: '9',
// // // // // // //                         chat_id: predictionFileInfo.chat_id,
// // // // // // //                         isTrained: false,
// // // // // // //                         handleTrainModel: () => {},
// // // // // // //                         cells: buildNotebookCells(),
// // // // // // //                       }}
// // // // // // //                     />
// // // // // // //                   </div>

// // // // // // //                   {/* Step 2 Buttons */}
// // // // // // //                   <div className="flex justify-end gap-4 mt-6">
// // // // // // //                     <button
// // // // // // //                       onClick={() => setWizardStep(1)}
// // // // // // //                       className="border border-gray-300 hover:bg-gray-50
// // // // // // //                         text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // //                     >
// // // // // // //                       Back
// // // // // // //                     </button>
// // // // // // //                     <button
// // // // // // //                       onClick={handlePredictOnNewData}
// // // // // // //                       disabled={isLoading}
// // // // // // //                       className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
// // // // // // //                         text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // // //                     >
// // // // // // //                       {isLoading ? "Predicting..." : "Predict on New Data"}
// // // // // // //                     </button>
// // // // // // //                   </div>
// // // // // // //                 </div>
// // // // // // //               )}
// // // // // // //             </div>
// // // // // // //           </div>
// // // // // // //         )}
// // // // // // //       </div>
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default PredictionsUI;




// // // // // // import React, { useState, useEffect } from 'react';
// // // // // // import { Upload, Clock, Monitor, X } from 'lucide-react';
// // // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook'; // <-- your notebook component

// // // // // // interface PredictionMetadata {
// // // // // //   prediction_id: string;
// // // // // //   start_time: string;
// // // // // //   chat_id: string;
// // // // // //   user_id: string;
// // // // // //   status: string;
// // // // // //   duration: number | null;
// // // // // //   entity_count: number;
// // // // // //   predictions_csv_path: string | null;
// // // // // // }

// // // // // // interface PredictionFileInfo {
// // // // // //   id: number;
// // // // // //   name: string;
// // // // // //   file_url: string;
// // // // // //   schema: Array<{ column_name: string; data_type: string }>;
// // // // // //   file_size_mb: number;
// // // // // //   has_date_column: boolean;
// // // // // //   date_columns: string[];
// // // // // //   chat_id: string;
// // // // // //   prediction_queries: {
// // // // // //     sampling_query: string;
// // // // // //     feature_query: string;
// // // // // //   };
// // // // // //   prediction_results: {
// // // // // //     sampling_results: any[];
// // // // // //     feature_results: any[];
// // // // // //   };
// // // // // // }

// // // // // // const PredictionsUI: React.FC = () => {
// // // // // //   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
// // // // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // // //   // Controls the entire “wizard” modal
// // // // // //   const [showPredictionWizard, setShowPredictionWizard] = useState(false);

// // // // // //   // Which step of the wizard we’re on (1 = Upload CSV, 2 = Review Queries)
// // // // // //   const [wizardStep, setWizardStep] = useState<number>(1);

// // // // // //   // After uploading, we store the backend’s response here (queries, schema, etc.)
// // // // // //   const [predictionFileInfo, setPredictionFileInfo] = useState<PredictionFileInfo | null>(null);

// // // // // //   // S3 bucket name for linking CSV results
// // // // // //   const bucket_name = "artifacts1137";

// // // // // //   useEffect(() => {
// // // // // //     fetchPredictions();
// // // // // //   }, []);

// // // // // //   const fetchPredictions = async () => {
// // // // // //     try {
// // // // // //       const response = await fetch(
// // // // // //         "http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9938938HHDU",
// // // // // //         {
// // // // // //           method: "GET",
// // // // // //           headers: {
// // // // // //             "Content-Type": "application/json",
// // // // // //           },
// // // // // //         }
// // // // // //       );

// // // // // //       if (response.ok) {
// // // // // //         const data = await response.json();
// // // // // //         setPredictionsData(data.metadata);
// // // // // //       } else {
// // // // // //         console.error("Failed to fetch prediction metadata");
// // // // // //       }
// // // // // //     } catch (error: unknown) {
// // // // // //       console.error("Error while fetching predictions:", error);
// // // // // //     }
// // // // // //   };

// // // // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // // //     if (event.target.files && event.target.files[0]) {
// // // // // //       setSelectedFile(event.target.files[0]);
// // // // // //     }
// // // // // //   };

// // // // // //   /**
// // // // // //    * Step 1: Upload CSV & generate queries (calls your backend at /api/predict/).
// // // // // //    */
// // // // // //   const handleQuickPrediction = async () => {
// // // // // //     if (!selectedFile) {
// // // // // //       alert("Please select a CSV file to upload.");
// // // // // //       return;
// // // // // //     }

// // // // // //     setIsLoading(true);
// // // // // //     const formData = new FormData();
// // // // // //     formData.append("file", selectedFile);
// // // // // //     formData.append("user_id", "9"); // Hardcoded user_id; adjust as needed
// // // // // //     formData.append("chat_id", `pred_${Date.now()}`);

// // // // // //     try {
// // // // // //       const response = await fetch("http://127.0.0.1:8000/api/predict/", {
// // // // // //         method: "POST",
// // // // // //         body: formData,
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         const data = await response.json();
// // // // // //         if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // // // //           setPredictionFileInfo(data.uploaded_files[0]);
// // // // // //         }
// // // // // //       } else {
// // // // // //         const errorText = await response.text();
// // // // // //         throw new Error(errorText);
// // // // // //       }
// // // // // //     } catch (error: unknown) {
// // // // // //       console.error("Error while making prediction:", error);
// // // // // //       if (error instanceof Error) {
// // // // // //         alert(`Prediction failed: ${error.message}`);
// // // // // //       } else {
// // // // // //         alert("Prediction failed: An unknown error occurred.");
// // // // // //       }
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   /**
// // // // // //    * Step 2: Final “Predict on new data” after user reviews queries.
// // // // // //    * Calls your backend at /api/prediction/ to actually run the final predictions.
// // // // // //    */
// // // // // //   const handlePredictOnNewData = async () => {
// // // // // //     if (!predictionFileInfo) {
// // // // // //       alert("Please upload a file and review queries before predicting.");
// // // // // //       return;
// // // // // //     }

// // // // // //     setIsLoading(true);
// // // // // //     try {
// // // // // //       const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
// // // // // //         method: "POST",
// // // // // //         headers: {
// // // // // //           "Content-Type": "application/json",
// // // // // //         },
// // // // // //         body: JSON.stringify({
// // // // // //           chat_id: predictionFileInfo.chat_id,
// // // // // //           file_id: predictionFileInfo.id,
// // // // // //           queries: predictionFileInfo.prediction_queries,
// // // // // //         }),
// // // // // //       });

// // // // // //       if (response.ok) {
// // // // // //         await response.json();
// // // // // //         alert("Prediction completed successfully!");
// // // // // //         fetchPredictions();
// // // // // //       } else {
// // // // // //         const errorText = await response.text();
// // // // // //         throw new Error(errorText);
// // // // // //       }
// // // // // //     } catch (error: unknown) {
// // // // // //       console.error("Error while running prediction:", error);
// // // // // //     } finally {
// // // // // //       setIsLoading(false);
// // // // // //       setShowPredictionWizard(false);
// // // // // //       setWizardStep(1);
// // // // // //       setSelectedFile(null);
// // // // // //       setPredictionFileInfo(null);
// // // // // //     }
// // // // // //   };

// // // // // //   const getStatusColor = (status: string) => {
// // // // // //     switch (status.toLowerCase()) {
// // // // // //       case "completed":
// // // // // //         return "text-green-600";
// // // // // //       case "failed":
// // // // // //         return "text-red-600";
// // // // // //       case "running":
// // // // // //         return "text-blue-600";
// // // // // //       default:
// // // // // //         return "text-gray-600";
// // // // // //     }
// // // // // //   };

// // // // // //   // Build "cells" for the notebook
// // // // // //   const buildNotebookCells = () => {
// // // // // //     if (!predictionFileInfo) return [];
// // // // // //     return [
// // // // // //       {
// // // // // //         cell_type: 'code',
// // // // // //         source: predictionFileInfo.prediction_queries.sampling_query,
// // // // // //         outputs: []
// // // // // //       },
// // // // // //       {
// // // // // //         cell_type: 'code',
// // // // // //         source: predictionFileInfo.prediction_queries.feature_query,
// // // // // //         outputs: []
// // // // // //       }
// // // // // //     ];
// // // // // //   };

// // // // // //   return (
// // // // // //     <div className="min-h-screen bg-gray-50">
// // // // // //       {/* Header */}
// // // // // //       <header className="bg-white border-b">
// // // // // //         <div className="mx-auto px-4 py-4">
// // // // // //           <div className="flex justify-between items-center">
// // // // // //             <h1 className="text-xl font-semibold text-gray-900">Predictions Dashboard</h1>
// // // // // //             <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg">
// // // // // //               <Monitor className="h-4 w-4" />
// // // // // //               <span>Trial ends on Dec 19, 2024</span>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       {/* Main Container */}
// // // // // //       <div className="container mx-auto px-4 py-8">
// // // // // //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// // // // // //           {/* Sidebar */}
// // // // // //           <div className="lg:col-span-1 space-y-6">
// // // // // //             {/* Quick Prediction Card */}
// // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // //               <div className="flex items-center gap-2 mb-4">
// // // // // //                 <Upload className="h-5 w-5 text-gray-600" />
// // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
// // // // // //               </div>
// // // // // //               <p className="text-sm text-gray-600 mb-4">
// // // // // //                 Upload CSVs and use your model for a one-time prediction on new data.
// // // // // //               </p>
// // // // // //               <button
// // // // // //                 onClick={() => {
// // // // // //                   setShowPredictionWizard(true);
// // // // // //                   setWizardStep(1);
// // // // // //                   setSelectedFile(null);
// // // // // //                   setPredictionFileInfo(null);
// // // // // //                 }}
// // // // // //                 className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
// // // // // //               >
// // // // // //                 One-time predict from CSV
// // // // // //               </button>
// // // // // //             </div>

// // // // // //             {/* Scheduled Predictions Card */}
// // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // // //               <div className="flex items-center gap-2 mb-4">
// // // // // //                 <Clock className="h-5 w-5 text-gray-600" />
// // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
// // // // // //               </div>
// // // // // //               <button
// // // // // //                 className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // //               >
// // // // // //                 Configure Schedule
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           {/* Main Content (Prediction History) */}
// // // // // //           <div className="lg:col-span-3">
// // // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// // // // // //               <div className="p-6 border-b border-gray-200">
// // // // // //                 <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
// // // // // //               </div>
// // // // // //               <div className="overflow-x-auto">
// // // // // //                 {predictionsData.length === 0 ? (
// // // // // //                   <div className="p-8 text-center bg-gray-100">
// // // // // //                     <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
// // // // // //                     <p className="text-lg text-gray-600">
// // // // // //                       Dashboard will only be available after you train your model
// // // // // //                     </p>
// // // // // //                   </div>
// // // // // //                 ) : (
// // // // // //                   <table className="w-full">
// // // // // //                     <thead className="bg-gray-50">
// // // // // //                       <tr>
// // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // //                           Prediction ID
// // // // // //                         </th>
// // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // //                           Start Time
// // // // // //                         </th>
// // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // //                           Status
// // // // // //                         </th>
// // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // //                           Duration
// // // // // //                         </th>
// // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // //                           Entity Count
// // // // // //                         </th>
// // // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // // //                           Results
// // // // // //                         </th>
// // // // // //                       </tr>
// // // // // //                     </thead>
// // // // // //                     <tbody className="bg-white divide-y divide-gray-200">
// // // // // //                       {predictionsData.map((data) => (
// // // // // //                         <tr key={data.prediction_id} className="hover:bg-gray-50">
// // // // // //                           <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
// // // // // //                             {data.prediction_id}
// // // // // //                           </td>
// // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // // //                             {new Date(data.start_time).toLocaleString()}
// // // // // //                           </td>
// // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // // //                             <span className={`${getStatusColor(data.status)}`}>
// // // // // //                               {data.status}
// // // // // //                             </span>
// // // // // //                           </td>
// // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // // //                             {data.duration ? `${data.duration.toFixed(2)}s` : "−"}
// // // // // //                           </td>
// // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // // //                             {data.entity_count}
// // // // // //                           </td>
// // // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // // //                             {data.predictions_csv_path ? (
// // // // // //                               <a
// // // // // //                                 href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
// // // // // //                                 target="_blank"
// // // // // //                                 rel="noopener noreferrer"
// // // // // //                                 className="text-blue-600 hover:text-blue-800 hover:underline"
// // // // // //                               >
// // // // // //                                 Download CSV
// // // // // //                               </a>
// // // // // //                             ) : (
// // // // // //                               "−"
// // // // // //                             )}
// // // // // //                           </td>
// // // // // //                         </tr>
// // // // // //                       ))}
// // // // // //                     </tbody>
// // // // // //                   </table>
// // // // // //                 )}
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>

// // // // // //         {/* SINGLE MODAL */}
// // // // // //         {showPredictionWizard && (
// // // // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // //             {/* 
// // // // // //               Make it wide (e.g., max-w-5xl or max-w-6xl), 
// // // // // //               limit height, and enable scrolling 
// // // // // //             */}
// // // // // //             <div
// // // // // //               className="
// // // // // //                 bg-white rounded-lg shadow-lg
// // // // // //                 w-full max-w-5xl 
// // // // // //                 max-h-[90vh]
// // // // // //                 overflow-y-auto
// // // // // //                 p-6 
// // // // // //                 relative
// // // // // //               "
// // // // // //             >
// // // // // //               {/* Modal Header */}
// // // // // //               <div className="flex justify-between items-center mb-4">
// // // // // //                 <h2 className="text-lg font-semibold text-gray-900">
// // // // // //                   Select Data to Predict On
// // // // // //                 </h2>
// // // // // //                 <button
// // // // // //                   onClick={() => {
// // // // // //                     setShowPredictionWizard(false);
// // // // // //                     setWizardStep(1);
// // // // // //                     setSelectedFile(null);
// // // // // //                     setPredictionFileInfo(null);
// // // // // //                   }}
// // // // // //                   className="text-gray-500 hover:text-gray-700"
// // // // // //                 >
// // // // // //                   <X className="h-5 w-5" />
// // // // // //                 </button>
// // // // // //               </div>

// // // // // //               {/* STEP 1: Upload CSV */}
// // // // // //               {wizardStep === 1 && (
// // // // // //                 <div className="space-y-6">
// // // // // //                   <div className="space-y-2">
// // // // // //                     <p className="text-sm text-gray-600">
// // // // // //                       Map new tables to the tables that were used for training. Make sure that
// // // // // //                       the schemas match between the training tables and the new tables. You can
// // // // // //                       edit the schema of the new table in the next step.
// // // // // //                     </p>
// // // // // //                   </div>

// // // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // // // // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // // // // //                     </div>
// // // // // //                     <p className="text-sm text-gray-600 mb-2">Select a table</p>

// // // // // //                     {/* File Input */}
// // // // // //                     <input
// // // // // //                       type="file"
// // // // // //                       accept=".csv"
// // // // // //                       onChange={handleFileChange}
// // // // // //                       className="block w-full text-sm text-gray-500
// // // // // //                         file:mr-4 file:py-2 file:px-4
// // // // // //                         file:rounded-full file:border-0
// // // // // //                         file:text-sm file:font-semibold
// // // // // //                         file:bg-blue-600 file:text-white
// // // // // //                         hover:file:bg-blue-700
// // // // // //                       "
// // // // // //                       id="fileInput"
// // // // // //                     />
// // // // // //                     <label
// // // // // //                       htmlFor="fileInput"
// // // // // //                       className="block w-full text-center text-sm text-gray-500 mt-2"
// // // // // //                     >
// // // // // //                       {selectedFile ? selectedFile.name : "No file chosen"}
// // // // // //                     </label>

// // // // // //                     {/* Buttons */}
// // // // // //                     <div className="flex items-center gap-3 mt-4">
// // // // // //                       <button
// // // // // //                         onClick={handleQuickPrediction}
// // // // // //                         disabled={!selectedFile || isLoading}
// // // // // //                         className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
// // // // // //                           text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // //                       >
// // // // // //                         {isLoading ? "Uploading..." : "Upload CSV"}
// // // // // //                       </button>

// // // // // //                       {/* “Review Query” is disabled until backend returns the file info */}
// // // // // //                       <button
// // // // // //                         onClick={() => setWizardStep(2)}
// // // // // //                         disabled={!predictionFileInfo || isLoading}
// // // // // //                         className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4
// // // // // //                           rounded-lg transition-colors
// // // // // //                           ${!predictionFileInfo ? "opacity-50 cursor-not-allowed" : ""}`}
// // // // // //                       >
// // // // // //                         Review Query
// // // // // //                       </button>
// // // // // //                     </div>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               )}

// // // // // //               {/* STEP 2: Review Queries (Only if we have `predictionFileInfo`) */}
// // // // // //               {wizardStep === 2 && predictionFileInfo && (
// // // // // //                 <div className="space-y-6">
// // // // // //                   <div className="space-y-2">
// // // // // //                     <p className="text-sm text-gray-600">
// // // // // //                       Review the queries that will pull in new data for prediction. These queries
// // // // // //                       were generated together with the notebook and are based on the original
// // // // // //                       predictive question.
// // // // // //                     </p>
// // // // // //                   </div>

// // // // // //                   {/* (1) Replace Tables */}
// // // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // // // // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // // // // //                     </div>
// // // // // //                     <p className="text-sm text-gray-600">
// // // // // //                       Map new tables to the tables that were used for training. Make sure the
// // // // // //                       schemas match. You can edit the schema in the next step.
// // // // // //                     </p>
// // // // // //                     <div className="mt-2">
// // // // // //                       <p className="text-sm text-gray-600">
// // // // // //                         Training table: my_files.Unstructured_Daily_Product_Demand_Data
// // // // // //                       </p>
// // // // // //                       <p className="text-sm text-gray-600">
// // // // // //                         New table: {predictionFileInfo.name} (Uploaded CSV)
// // // // // //                       </p>
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   {/* (2) Review Query as Notebook */}
// // // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // // //                       <span className="text-sm font-medium text-gray-700">2</span>
// // // // // //                       <span className="text-sm text-gray-700">Review query</span>
// // // // // //                     </div>

// // // // // //                     {/* Notebook Shell for the 2 queries */}
// // // // // //                     <SQLNotebook
// // // // // //                       activeTab="prediction_notebook"
// // // // // //                       notebookContent={{
// // // // // //                         file_url: predictionFileInfo.file_url,
// // // // // //                         entity_column: '',
// // // // // //                         target_column: '',
// // // // // //                         features: [],
// // // // // //                         user_id: '9',
// // // // // //                         chat_id: predictionFileInfo.chat_id,
// // // // // //                         isTrained: false,
// // // // // //                         handleTrainModel: () => {},
// // // // // //                         cells: buildNotebookCells(),
// // // // // //                       }}
// // // // // //                     />
// // // // // //                   </div>

// // // // // //                   {/* Step 2 Buttons */}
// // // // // //                   <div className="flex justify-end gap-4 mt-6">
// // // // // //                     <button
// // // // // //                       onClick={() => setWizardStep(1)}
// // // // // //                       className="border border-gray-300 hover:bg-gray-50
// // // // // //                         text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // //                     >
// // // // // //                       Back
// // // // // //                     </button>
// // // // // //                     <button
// // // // // //                       onClick={handlePredictOnNewData}
// // // // // //                       disabled={isLoading}
// // // // // //                       className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
// // // // // //                         text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // // // //                     >
// // // // // //                       {isLoading ? "Predicting..." : "Predict on New Data"}
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </div>
// // // // // //               )}
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default PredictionsUI;






// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { Upload, Clock, Monitor, X } from 'lucide-react';
// // // // // import SQLNotebook from '../NotebookUI/Notebook/Notebook'; // <-- your notebook component

// // // // // interface PredictionMetadata {
// // // // //   prediction_id: string;
// // // // //   start_time: string;
// // // // //   chat_id: string;
// // // // //   user_id: string;
// // // // //   status: string;
// // // // //   duration: number | null;
// // // // //   entity_count: number;
// // // // //   predictions_csv_path: string | null;
// // // // // }

// // // // // interface PredictionFileInfo {
// // // // //   id: number;
// // // // //   name: string;
// // // // //   file_url: string;
// // // // //   schema: Array<{ column_name: string; data_type: string }>;
// // // // //   file_size_mb: number;
// // // // //   has_date_column: boolean;
// // // // //   date_columns: string[];
// // // // //   chat_id: string;
// // // // //   prediction_queries: {
// // // // //     sampling_query: string;
// // // // //     feature_query: string;
// // // // //   };
// // // // //   prediction_results: {
// // // // //     sampling_results: any[];
// // // // //     feature_results: any[];
// // // // //   };
// // // // // }

// // // // // const PredictionsUI: React.FC = () => {
// // // // //   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
// // // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // // //   const [isLoading, setIsLoading] = useState(false);

// // // // //   // Controls the entire “wizard” modal
// // // // //   const [showPredictionWizard, setShowPredictionWizard] = useState(false);

// // // // //   // Which step of the wizard we’re on (1 = Upload CSV, 2 = Review Queries)
// // // // //   const [wizardStep, setWizardStep] = useState<number>(1);

// // // // //   // After uploading, we store the backend’s response here (queries, schema, etc.)
// // // // //   const [predictionFileInfo, setPredictionFileInfo] = useState<PredictionFileInfo | null>(null);

// // // // //   // S3 bucket name for linking CSV results
// // // // //   const bucket_name = "artifacts1137";

// // // // //   useEffect(() => {
// // // // //     fetchPredictions();
// // // // //   }, []);

// // // // //   const fetchPredictions = async () => {
// // // // //     try {
// // // // //       const response = await fetch(
// // // // //         "http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9938938HHDU",
// // // // //         {
// // // // //           method: "GET",
// // // // //           headers: {
// // // // //             "Content-Type": "application/json",
// // // // //           },
// // // // //         }
// // // // //       );

// // // // //       if (response.ok) {
// // // // //         const data = await response.json();
// // // // //         setPredictionsData(data.metadata);
// // // // //       } else {
// // // // //         console.error("Failed to fetch prediction metadata");
// // // // //       }
// // // // //     } catch (error: unknown) {
// // // // //       console.error("Error while fetching predictions:", error);
// // // // //     }
// // // // //   };

// // // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     if (event.target.files && event.target.files[0]) {
// // // // //       setSelectedFile(event.target.files[0]);
// // // // //     }
// // // // //   };

// // // // //   /**
// // // // //    * Step 1: Upload CSV & generate queries (calls your backend at /api/predict/).
// // // // //    */
// // // // //   const handleQuickPrediction = async () => {
// // // // //     if (!selectedFile) {
// // // // //       alert("Please select a CSV file to upload.");
// // // // //       return;
// // // // //     }

// // // // //     setIsLoading(true);
// // // // //     const formData = new FormData();
// // // // //     formData.append("file", selectedFile);
// // // // //     formData.append("user_id", "9"); // Hardcoded user_id; adjust as needed
// // // // //     formData.append("chat_id", `pred_${Date.now()}`);

// // // // //     try {
// // // // //       const response = await fetch("http://127.0.0.1:8000/api/predict/", {
// // // // //         method: "POST",
// // // // //         body: formData,
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         const data = await response.json();
// // // // //         if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // // //           setPredictionFileInfo(data.uploaded_files[0]);
// // // // //         }
// // // // //       } else {
// // // // //         const errorText = await response.text();
// // // // //         throw new Error(errorText);
// // // // //       }
// // // // //     } catch (error: unknown) {
// // // // //       console.error("Error while making prediction:", error);
// // // // //       if (error instanceof Error) {
// // // // //         alert(`Prediction failed: ${error.message}`);
// // // // //       } else {
// // // // //         alert("Prediction failed: An unknown error occurred.");
// // // // //       }
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //     }
// // // // //   };

// // // // //   /**
// // // // //    * Step 2: Final “Predict on new data” after user reviews queries.
// // // // //    * Calls your backend at /api/prediction/ to actually run the final predictions.
// // // // //    */
// // // // //   const handlePredictOnNewData = async () => {
// // // // //     if (!predictionFileInfo) {
// // // // //       alert("Please upload a file and review queries before predicting.");
// // // // //       return;
// // // // //     }

// // // // //     setIsLoading(true);
// // // // //     try {
// // // // //       const response = await fetch("http://127.0.0.1:8000/api/prediction/", {
// // // // //         method: "POST",
// // // // //         headers: {
// // // // //           "Content-Type": "application/json",
// // // // //         },
// // // // //         body: JSON.stringify({
// // // // //           chat_id: predictionFileInfo.chat_id,
// // // // //           file_id: predictionFileInfo.id,
// // // // //           queries: predictionFileInfo.prediction_queries,
// // // // //         }),
// // // // //       });

// // // // //       if (response.ok) {
// // // // //         await response.json();
// // // // //         alert("Prediction completed successfully!");
// // // // //         fetchPredictions();
// // // // //       } else {
// // // // //         const errorText = await response.text();
// // // // //         throw new Error(errorText);
// // // // //       }
// // // // //     } catch (error: unknown) {
// // // // //       console.error("Error while running prediction:", error);
// // // // //     } finally {
// // // // //       setIsLoading(false);
// // // // //       setShowPredictionWizard(false);
// // // // //       setWizardStep(1);
// // // // //       setSelectedFile(null);
// // // // //       setPredictionFileInfo(null);
// // // // //     }
// // // // //   };

// // // // //   const getStatusColor = (status: string) => {
// // // // //     switch (status.toLowerCase()) {
// // // // //       case "completed":
// // // // //         return "text-green-600";
// // // // //       case "failed":
// // // // //         return "text-red-600";
// // // // //       case "running":
// // // // //         return "text-blue-600";
// // // // //       default:
// // // // //         return "text-gray-600";
// // // // //     }
// // // // //   };

// // // // //   // Build "cells" for the notebook
// // // // //   const buildNotebookCells = () => {
// // // // //     if (!predictionFileInfo) return [];
// // // // //     return [
// // // // //       {
// // // // //         cell_type: 'code',
// // // // //         source: predictionFileInfo.prediction_queries.sampling_query,
// // // // //         outputs: []
// // // // //       },
// // // // //       {
// // // // //         cell_type: 'code',
// // // // //         source: predictionFileInfo.prediction_queries.feature_query,
// // // // //         outputs: []
// // // // //       }
// // // // //     ];
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50">
// // // // //       {/* Header */}
// // // // //       <header className="bg-white border-b">
// // // // //         <div className="mx-auto px-4 py-4">
// // // // //           <div className="flex justify-between items-center">
// // // // //             <h1 className="text-xl font-semibold text-gray-900">Predictions Dashboard</h1>
// // // // //             <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg">
// // // // //               <Monitor className="h-4 w-4" />
// // // // //               <span>Trial ends on Dec 19, 2024</span>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       {/* Main Container */}
// // // // //       {/* CHANGED: replaced 'container' with 'mx-auto max-w-screen-xl px-4 py-8' */}
// // // // //       <div className="mx-auto max-w-screen-xl px-4 py-8">
// // // // //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// // // // //           {/* Sidebar */}
// // // // //           <div className="lg:col-span-1 space-y-6">
// // // // //             {/* Quick Prediction Card */}
// // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // //               <div className="flex items-center gap-2 mb-4">
// // // // //                 <Upload className="h-5 w-5 text-gray-600" />
// // // // //                 <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
// // // // //               </div>
// // // // //               <p className="text-sm text-gray-600 mb-4">
// // // // //                 Upload CSVs and use your model for a one-time prediction on new data.
// // // // //               </p>
// // // // //               <button
// // // // //                 onClick={() => {
// // // // //                   setShowPredictionWizard(true);
// // // // //                   setWizardStep(1);
// // // // //                   setSelectedFile(null);
// // // // //                   setPredictionFileInfo(null);
// // // // //                 }}
// // // // //                 className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
// // // // //               >
// // // // //                 One-time predict from CSV
// // // // //               </button>
// // // // //             </div>

// // // // //             {/* Scheduled Predictions Card */}
// // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // // //               <div className="flex items-center gap-2 mb-4">
// // // // //                 <Clock className="h-5 w-5 text-gray-600" />
// // // // //                 <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
// // // // //               </div>
// // // // //               <button
// // // // //                 className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // // //               >
// // // // //                 Configure Schedule
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Main Content (Prediction History) */}
// // // // //           <div className="lg:col-span-3">
// // // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// // // // //               <div className="p-6 border-b border-gray-200">
// // // // //                 <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
// // // // //               </div>
// // // // //               <div className="overflow-x-auto">
// // // // //                 {predictionsData.length === 0 ? (
// // // // //                   <div className="p-8 text-center bg-gray-100">
// // // // //                     <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
// // // // //                     <p className="text-lg text-gray-600">
// // // // //                       Dashboard will only be available after you train your model
// // // // //                     </p>
// // // // //                   </div>
// // // // //                 ) : (
// // // // //                   <table className="w-full">
// // // // //                     <thead className="bg-gray-50">
// // // // //                       <tr>
// // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // //                           Prediction ID
// // // // //                         </th>
// // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // //                           Start Time
// // // // //                         </th>
// // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // //                           Status
// // // // //                         </th>
// // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // //                           Duration
// // // // //                         </th>
// // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // //                           Entity Count
// // // // //                         </th>
// // // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // // //                           Results
// // // // //                         </th>
// // // // //                       </tr>
// // // // //                     </thead>
// // // // //                     <tbody className="bg-white divide-y divide-gray-200">
// // // // //                       {predictionsData.map((data) => (
// // // // //                         <tr key={data.prediction_id} className="hover:bg-gray-50">
// // // // //                           <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
// // // // //                             {data.prediction_id}
// // // // //                           </td>
// // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // //                             {new Date(data.start_time).toLocaleString()}
// // // // //                           </td>
// // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // //                             <span className={`${getStatusColor(data.status)}`}>
// // // // //                               {data.status}
// // // // //                             </span>
// // // // //                           </td>
// // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // //                             {data.duration ? `${data.duration.toFixed(2)}s` : "−"}
// // // // //                           </td>
// // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // // //                             {data.entity_count}
// // // // //                           </td>
// // // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // // //                             {data.predictions_csv_path ? (
// // // // //                               <a
// // // // //                                 href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
// // // // //                                 target="_blank"
// // // // //                                 rel="noopener noreferrer"
// // // // //                                 className="text-blue-600 hover:text-blue-800 hover:underline"
// // // // //                               >
// // // // //                                 Download CSV
// // // // //                               </a>
// // // // //                             ) : (
// // // // //                               "−"
// // // // //                             )}
// // // // //                           </td>
// // // // //                         </tr>
// // // // //                       ))}
// // // // //                     </tbody>
// // // // //                   </table>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* SINGLE MODAL */}
// // // // //         {showPredictionWizard && (
// // // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // //             {/*
// // // // //               Make it wide (e.g., max-w-5xl or max-w-6xl),
// // // // //               limit height, and enable scrolling
// // // // //             */}
// // // // //             {/* CHANGED: replaced 'max-w-5xl' with 'max-w-7xl' */}
// // // // //             <div
// // // // //               className="
// // // // //                 bg-white rounded-lg shadow-lg
// // // // //                 w-full max-w-7xl
// // // // //                 max-h-[90vh]
// // // // //                 overflow-y-auto
// // // // //                 p-6
// // // // //                 relative
// // // // //               "
// // // // //             >
// // // // //               {/* Modal Header */}
// // // // //               <div className="flex justify-between items-center mb-4">
// // // // //                 <h2 className="text-lg font-semibold text-gray-900">
// // // // //                   Select Data to Predict On
// // // // //                 </h2>
// // // // //                 <button
// // // // //                   onClick={() => {
// // // // //                     setShowPredictionWizard(false);
// // // // //                     setWizardStep(1);
// // // // //                     setSelectedFile(null);
// // // // //                     setPredictionFileInfo(null);
// // // // //                   }}
// // // // //                   className="text-gray-500 hover:text-gray-700"
// // // // //                 >
// // // // //                   <X className="h-5 w-5" />
// // // // //                 </button>
// // // // //               </div>

// // // // //               {/* STEP 1: Upload CSV */}
// // // // //               {wizardStep === 1 && (
// // // // //                 <div className="space-y-6">
// // // // //                   <div className="space-y-2">
// // // // //                     <p className="text-sm text-gray-600">
// // // // //                       Map new tables to the tables that were used for training. Make sure that
// // // // //                       the schemas match between the training tables and the new tables. You can
// // // // //                       edit the schema of the new table in the next step.
// // // // //                     </p>
// // // // //                   </div>

// // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // // // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // // // //                     </div>
// // // // //                     <p className="text-sm text-gray-600 mb-2">Select a table</p>

// // // // //                     {/* File Input */}
// // // // //                     <input
// // // // //                       type="file"
// // // // //                       accept=".csv"
// // // // //                       onChange={handleFileChange}
// // // // //                       className="block w-full text-sm text-gray-500
// // // // //                         file:mr-4 file:py-2 file:px-4
// // // // //                         file:rounded-full file:border-0
// // // // //                         file:text-sm file:font-semibold
// // // // //                         file:bg-blue-600 file:text-white
// // // // //                         hover:file:bg-blue-700
// // // // //                       "
// // // // //                       id="fileInput"
// // // // //                     />
// // // // //                     <label
// // // // //                       htmlFor="fileInput"
// // // // //                       className="block w-full text-center text-sm text-gray-500 mt-2"
// // // // //                     >
// // // // //                       {selectedFile ? selectedFile.name : "No file chosen"}
// // // // //                     </label>

// // // // //                     {/* Buttons */}
// // // // //                     <div className="flex items-center gap-3 mt-4">
// // // // //                       <button
// // // // //                         onClick={handleQuickPrediction}
// // // // //                         disabled={!selectedFile || isLoading}
// // // // //                         className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
// // // // //                           text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // // //                       >
// // // // //                         {isLoading ? "Uploading..." : "Upload CSV"}
// // // // //                       </button>

// // // // //                       {/* “Review Query” is disabled until backend returns the file info */}
// // // // //                       <button
// // // // //                         onClick={() => setWizardStep(2)}
// // // // //                         disabled={!predictionFileInfo || isLoading}
// // // // //                         className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4
// // // // //                           rounded-lg transition-colors
// // // // //                           ${!predictionFileInfo ? "opacity-50 cursor-not-allowed" : ""}`}
// // // // //                       >
// // // // //                         Review Query
// // // // //                       </button>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}

// // // // //               {/* STEP 2: Review Queries (Only if we have `predictionFileInfo`) */}
// // // // //               {wizardStep === 2 && predictionFileInfo && (
// // // // //                 <div className="space-y-6">
// // // // //                   <div className="space-y-2">
// // // // //                     <p className="text-sm text-gray-600">
// // // // //                       Review the queries that will pull in new data for prediction. These queries
// // // // //                       were generated together with the notebook and are based on the original
// // // // //                       predictive question.
// // // // //                     </p>
// // // // //                   </div>

// // // // //                   {/* (1) Replace Tables */}
// // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // // // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // // // //                     </div>
// // // // //                     <p className="text-sm text-gray-600">
// // // // //                       Map new tables to the tables that were used for training. Make sure the
// // // // //                       schemas match. You can edit the schema in the next step.
// // // // //                     </p>
// // // // //                     <div className="mt-2">
// // // // //                       <p className="text-sm text-gray-600">
// // // // //                         Training table: my_files.Unstructured_Daily_Product_Demand_Data
// // // // //                       </p>
// // // // //                       <p className="text-sm text-gray-600">
// // // // //                         New table: {predictionFileInfo.name} (Uploaded CSV)
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>

// // // // //                   {/* (2) Review Query as Notebook */}
// // // // //                   <div className="border-t border-gray-200 pt-4">
// // // // //                     <div className="flex items-center gap-2 mb-2">
// // // // //                       <span className="text-sm font-medium text-gray-700">2</span>
// // // // //                       <span className="text-sm text-gray-700">Review query</span>
// // // // //                     </div>

// // // // //                     {/* Notebook Shell for the 2 queries */}
// // // // //                     <SQLNotebook
// // // // //                       activeTab="prediction_notebook"
// // // // //                       notebookContent={{
// // // // //                         file_url: predictionFileInfo.file_url,
// // // // //                         entity_column: '',
// // // // //                         target_column: '',
// // // // //                         features: [],
// // // // //                         user_id: '9',
// // // // //                         chat_id: predictionFileInfo.chat_id,
// // // // //                         isTrained: false,
// // // // //                         handleTrainModel: () => {},
// // // // //                         cells: buildNotebookCells(),
// // // // //                       }}
// // // // //                     />
// // // // //                   </div>

// // // // //                   {/* Step 2 Buttons */}
// // // // //                   <div className="flex justify-end gap-4 mt-6">
// // // // //                     <button
// // // // //                       onClick={() => setWizardStep(1)}
// // // // //                       className="border border-gray-300 hover:bg-gray-50
// // // // //                         text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // // //                     >
// // // // //                       Back
// // // // //                     </button>
// // // // //                     <button
// // // // //                       onClick={handlePredictOnNewData}
// // // // //                       disabled={isLoading}
// // // // //                       className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
// // // // //                         text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // // //                     >
// // // // //                       {isLoading ? "Predicting..." : "Predict on New Data"}
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PredictionsUI;





// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { Upload, Clock, Monitor, X } from 'lucide-react';
// // // // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook'; // Adjust path as needed

// // // // interface PredictionMetadata {
// // // //   prediction_id: string;
// // // //   start_time: string;
// // // //   chat_id: string;
// // // //   user_id: string;
// // // //   status: string;
// // // //   duration: number | null;
// // // //   entity_count: number;
// // // //   predictions_csv_path: string | null;
// // // // }

// // // // interface PredictionFileInfo {
// // // //   id: number;
// // // //   name: string;
// // // //   file_url: string;
// // // //   schema: Array<{ column_name: string; data_type: string }>;
// // // //   file_size_mb: number;
// // // //   has_date_column: boolean;
// // // //   date_columns: string[];
// // // //   chat_id: string;
// // // //   prediction_queries: {
// // // //     sampling_query: string;
// // // //     feature_query: string;
// // // //   };
// // // //   prediction_results: {
// // // //     sampling_results: any[];
// // // //     feature_results: any[];
// // // //   };
// // // // }

// // // // const PredictionsUI: React.FC = () => {
// // // //   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
// // // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // // //   const [isLoading, setIsLoading] = useState(false);
// // // //   const [showPredictionWizard, setShowPredictionWizard] = useState(false);
// // // //   const [wizardStep, setWizardStep] = useState<number>(1);
// // // //   const [predictionFileInfo, setPredictionFileInfo] = useState<PredictionFileInfo | null>(null);
// // // //   const notebookRef = useRef<SQLNotebookRef>(null);
// // // //   const bucket_name = "pa-documents-storage-bucket";
// // // //   const authToken = "d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b"; // Replace with dynamic token retrieval

// // // //   useEffect(() => {
// // // //     fetchPredictions();
// // // //   }, []);

// // // //   const fetchPredictions = async () => {
// // // //     try {
// // // //       const response = await fetch(
// // // //         "http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9938938HHDU",
// // // //         {
// // // //           method: "GET",
// // // //           headers: {
// // // //             "Content-Type": "application/json",
// // // //             "Authorization": `Token ${authToken}`,
// // // //           },
// // // //         }
// // // //       );

// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         setPredictionsData(data.metadata);
// // // //       } else {
// // // //         console.error("Failed to fetch prediction metadata");
// // // //       }
// // // //     } catch (error: unknown) {
// // // //       console.error("Error while fetching predictions:", error);
// // // //     }
// // // //   };

// // // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // //     if (event.target.files && event.target.files[0]) {
// // // //       setSelectedFile(event.target.files[0]);
// // // //     }
// // // //   };

// // // //   const handleQuickPrediction = async () => {
// // // //     if (!selectedFile) {
// // // //       alert("Please select a CSV file to upload.");
// // // //       return;
// // // //     }

// // // //     setIsLoading(true);
// // // //     const formData = new FormData();
// // // //     formData.append("file", selectedFile);
// // // //     formData.append("user_id", "9");
// // // //     formData.append("chat_id", `pred_${Date.now()}`);

// // // //     try {
// // // //       const response = await fetch("http://127.0.0.1:8000/api/predict/", {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Authorization": `Token ${authToken}`,
// // // //         },
// // // //         body: formData,
// // // //       });

// // // //       if (response.ok) {
// // // //         const data = await response.json();
// // // //         if (data.uploaded_files && data.uploaded_files.length > 0) {
// // // //           setPredictionFileInfo(data.uploaded_files[0]);
// // // //         }
// // // //       } else {
// // // //         const errorText = await response.text();
// // // //         throw new Error(errorText);
// // // //       }
// // // //     } catch (error: unknown) {
// // // //       console.error("Error while making prediction:", error);
// // // //       alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //     }
// // // //   };

// // // //   const handlePredictOnNewData = async () => {
// // // //     if (!predictionFileInfo || !notebookRef.current) {
// // // //       alert("Please upload a file and review queries before predicting.");
// // // //       return;
// // // //     }

// // // //     setIsLoading(true);

// // // //     try {
// // // //       // Run all notebook cells
// // // //       const cellResults = await notebookRef.current.runAllCellsAndGetResults();

// // // //       // Save results to S3 and update PredictionFileInfo
// // // //       const saveResultsResponse = await fetch("http://127.0.0.1:8000/api/save_prediction_results/", {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //           "Authorization": `Token ${authToken}`,
// // // //         },
// // // //         body: JSON.stringify({
// // // //           user_id: "9",
// // // //           chat_id: predictionFileInfo.chat_id,
// // // //           file_id: predictionFileInfo.id,
// // // //           cells: cellResults,
// // // //         }),
// // // //       });

// // // //       if (!saveResultsResponse.ok) {
// // // //         const errorText = await saveResultsResponse.text();
// // // //         throw new Error(errorText);
// // // //       }

// // // //       const saveResultsData = await saveResultsResponse.json();
// // // //       console.log("Prediction results saved:", saveResultsData);

// // // //       alert("Prediction completed successfully!");
// // // //       fetchPredictions();
// // // //     } catch (error: unknown) {
// // // //       console.error("Error while running prediction:", error);
// // // //       alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
// // // //     } finally {
// // // //       setIsLoading(false);
// // // //       setShowPredictionWizard(false);
// // // //       setWizardStep(1);
// // // //       setSelectedFile(null);
// // // //       setPredictionFileInfo(null);
// // // //     }
// // // //   };

// // // //   const getStatusColor = (status: string) => {
// // // //     switch (status.toLowerCase()) {
// // // //       case "completed": return "text-green-600";
// // // //       case "failed": return "text-red-600";
// // // //       case "running": return "text-blue-600";
// // // //       default: return "text-gray-600";
// // // //     }
// // // //   };

// // // //   const buildNotebookCells = () => {
// // // //     if (!predictionFileInfo) return [];
// // // //     return [
// // // //       {
// // // //         cell_type: 'code',
// // // //         source: predictionFileInfo.prediction_queries.sampling_query,
// // // //         outputs: []
// // // //       },
// // // //       {
// // // //         cell_type: 'code',
// // // //         source: predictionFileInfo.prediction_queries.feature_query,
// // // //         outputs: []
// // // //       }
// // // //     ];
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50">
// // // //       <header className="bg-white border-b">
// // // //         <div className="mx-auto px-4 py-4">
// // // //           <div className="flex justify-between items-center">
// // // //             <h1 className="text-xl font-semibold text-gray-900">Predictions Dashboard</h1>
// // // //             <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg">
// // // //               <Monitor className="h-4 w-4" />
// // // //               <span>Trial ends on Dec 19, 2024</span>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       <div className="mx-auto max-w-screen-xl px-4 py-8">
// // // //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
// // // //           <div className="lg:col-span-1 space-y-6">
// // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // //               <div className="flex items-center gap-2 mb-4">
// // // //                 <Upload className="h-5 w-5 text-gray-600" />
// // // //                 <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
// // // //               </div>
// // // //               <p className="text-sm text-gray-600 mb-4">
// // // //                 Upload CSVs and use your model for a one-time prediction on new data.
// // // //               </p>
// // // //               <button
// // // //                 onClick={() => {
// // // //                   setShowPredictionWizard(true);
// // // //                   setWizardStep(1);
// // // //                   setSelectedFile(null);
// // // //                   setPredictionFileInfo(null);
// // // //                 }}
// // // //                 className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
// // // //               >
// // // //                 One-time predict from CSV
// // // //               </button>
// // // //             </div>

// // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
// // // //               <div className="flex items-center gap-2 mb-4">
// // // //                 <Clock className="h-5 w-5 text-gray-600" />
// // // //                 <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
// // // //               </div>
// // // //               <button
// // // //                 className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // //               >
// // // //                 Configure Schedule
// // // //               </button>
// // // //             </div>
// // // //           </div>

// // // //           <div className="lg:col-span-3">
// // // //             <div className="bg-white rounded-lg shadow-sm border border-gray-200">
// // // //               <div className="p-6 border-b border-gray-200">
// // // //                 <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
// // // //               </div>
// // // //               <div className="overflow-x-auto">
// // // //                 {predictionsData.length === 0 ? (
// // // //                   <div className="p-8 text-center bg-gray-100">
// // // //                     <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
// // // //                     <p className="text-lg text-gray-600">
// // // //                       Dashboard will only be available after you train your model
// // // //                     </p>
// // // //                   </div>
// // // //                 ) : (
// // // //                   <table className="w-full">
// // // //                     <thead className="bg-gray-50">
// // // //                       <tr>
// // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // //                           Prediction ID
// // // //                         </th>
// // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // //                           Start Time
// // // //                         </th>
// // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // //                           Status
// // // //                         </th>
// // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // //                           Duration
// // // //                         </th>
// // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // //                           Entity Count
// // // //                         </th>
// // // //                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// // // //                           Results
// // // //                         </th>
// // // //                       </tr>
// // // //                     </thead>
// // // //                     <tbody className="bg-white divide-y divide-gray-200">
// // // //                       {predictionsData.map((data) => (
// // // //                         <tr key={data.prediction_id} className="hover:bg-gray-50">
// // // //                           <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">
// // // //                             {data.prediction_id}
// // // //                           </td>
// // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // //                             {new Date(data.start_time).toLocaleString()}
// // // //                           </td>
// // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // //                             <span className={`${getStatusColor(data.status)}`}>
// // // //                               {data.status}
// // // //                             </span>
// // // //                           </td>
// // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // //                             {data.duration ? `${data.duration.toFixed(2)}s` : "−"}
// // // //                           </td>
// // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
// // // //                             {data.entity_count}
// // // //                           </td>
// // // //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // //                             {data.predictions_csv_path ? (
// // // //                               <a
// // // //                                 href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
// // // //                                 target="_blank"
// // // //                                 rel="noopener noreferrer"
// // // //                                 className="text-blue-600 hover:text-blue-800 hover:underline"
// // // //                               >
// // // //                                 Download CSV
// // // //                               </a>
// // // //                             ) : (
// // // //                               "−"
// // // //                             )}
// // // //                           </td>
// // // //                         </tr>
// // // //                       ))}
// // // //                     </tbody>
// // // //                   </table>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>

// // // //         {showPredictionWizard && (
// // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //             <div
// // // //               className="
// // // //                 bg-white rounded-lg shadow-lg
// // // //                 w-full max-w-7xl
// // // //                 max-h-[90vh]
// // // //                 overflow-y-auto
// // // //                 p-6
// // // //                 relative
// // // //               "
// // // //             >
// // // //               <div className="flex justify-between items-center mb-4">
// // // //                 <h2 className="text-lg font-semibold text-gray-900">
// // // //                   Select Data to Predict On
// // // //                 </h2>
// // // //                 <button
// // // //                   onClick={() => {
// // // //                     setShowPredictionWizard(false);
// // // //                     setWizardStep(1);
// // // //                     setSelectedFile(null);
// // // //                     setPredictionFileInfo(null);
// // // //                   }}
// // // //                   className="text-gray-500 hover:text-gray-700"
// // // //                 >
// // // //                   <X className="h-5 w-5" />
// // // //                 </button>
// // // //               </div>

// // // //               {wizardStep === 1 && (
// // // //                 <div className="space-y-6">
// // // //                   <div className="space-y-2">
// // // //                     <p className="text-sm text-gray-600">
// // // //                       Map new tables to the tables that were used for training. Make sure that
// // // //                       the schemas match between the training tables and the new tables. You can
// // // //                       edit the schema of the new table in the next step.
// // // //                     </p>
// // // //                   </div>

// // // //                   <div className="border-t border-gray-200 pt-4">
// // // //                     <div className="flex items-center gap-2 mb-2">
// // // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // // //                     </div>
// // // //                     <p className="text-sm text-gray-600 mb-2">Select a table</p>

// // // //                     <input
// // // //                       type="file"
// // // //                       accept=".csv"
// // // //                       onChange={handleFileChange}
// // // //                       className="block w-full text-sm text-gray-500
// // // //                         file:mr-4 file:py-2 file:px-4
// // // //                         file:rounded-full file:border-0
// // // //                         file:text-sm file:font-semibold
// // // //                         file:bg-blue-600 file:text-white
// // // //                         hover:file:bg-blue-700
// // // //                       "
// // // //                       id="fileInput"
// // // //                     />
// // // //                     <label
// // // //                       htmlFor="fileInput"
// // // //                       className="block w-full text-center text-sm text-gray-500 mt-2"
// // // //                     >
// // // //                       {selectedFile ? selectedFile.name : "No file chosen"}
// // // //                     </label>

// // // //                     <div className="flex items-center gap-3 mt-4">
// // // //                       <button
// // // //                         onClick={handleQuickPrediction}
// // // //                         disabled={!selectedFile || isLoading}
// // // //                         className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
// // // //                           text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // //                       >
// // // //                         {isLoading ? "Uploading..." : "Upload CSV"}
// // // //                       </button>

// // // //                       <button
// // // //                         onClick={() => setWizardStep(2)}
// // // //                         disabled={!predictionFileInfo || isLoading}
// // // //                         className={`bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4
// // // //                           rounded-lg transition-colors
// // // //                           ${!predictionFileInfo ? "opacity-50 cursor-not-allowed" : ""}`}
// // // //                       >
// // // //                         Review Query
// // // //                       </button>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               )}

// // // //               {wizardStep === 2 && predictionFileInfo && (
// // // //                 <div className="space-y-6">
// // // //                   <div className="space-y-2">
// // // //                     <p className="text-sm text-gray-600">
// // // //                       Review the queries that will pull in new data for prediction. These queries
// // // //                       were generated together with the notebook and are based on the original
// // // //                       predictive question.
// // // //                     </p>
// // // //                   </div>

// // // //                   <div className="border-t border-gray-200 pt-4">
// // // //                     <div className="flex items-center gap-2 mb-2">
// // // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // // //                     </div>
// // // //                     <p className="text-sm text-gray-600">
// // // //                       Map new tables to the tables that were used for training. Make sure the
// // // //                       schemas match. You can edit the schema in the next step.
// // // //                     </p>
// // // //                     <div className="mt-2">
// // // //                       <p className="text-sm text-gray-600">
// // // //                         Training table: my_files.Unstructured_Daily_Product_Demand_Data
// // // //                       </p>
// // // //                       <p className="text-sm text-gray-600">
// // // //                         New table: {predictionFileInfo.name} (Uploaded CSV)
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="border-t border-gray-200 pt-4">
// // // //                     <div className="flex items-center gap-2 mb-2">
// // // //                       <span className="text-sm font-medium text-gray-700">2</span>
// // // //                       <span className="text-sm text-gray-700">Review query</span>
// // // //                     </div>

// // // //                     <SQLNotebook
// // // //                       ref={notebookRef}
// // // //                       activeTab="prediction_notebook"
// // // //                       notebookContent={{
// // // //                         file_url: predictionFileInfo.file_url,
// // // //                         entity_column: '',
// // // //                         target_column: '',
// // // //                         features: [],
// // // //                         user_id: '9',
// // // //                         chat_id: predictionFileInfo.chat_id,
// // // //                         token: authToken,
// // // //                         isTrained: false,
// // // //                         handleTrainModel: () => {},
// // // //                         cells: buildNotebookCells(),
// // // //                       }}
// // // //                     />
// // // //                   </div>

// // // //                   <div className="flex justify-end gap-4 mt-6">
// // // //                     <button
// // // //                       onClick={() => setWizardStep(1)}
// // // //                       className="border border-gray-300 hover:bg-gray-50
// // // //                         text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors"
// // // //                     >
// // // //                       Back
// // // //                     </button>
// // // //                     <button
// // // //                       onClick={handlePredictOnNewData}
// // // //                       disabled={isLoading}
// // // //                       className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300
// // // //                         text-white font-medium py-2 px-4 rounded-lg transition-colors"
// // // //                     >
// // // //                       {isLoading ? "Predicting..." : "Predict on New Data"}
// // // //                     </button>
// // // //                   </div>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PredictionsUI;




// // // import React, { useState, useEffect, useRef } from 'react';
// // // import { Upload, Clock, Monitor, X } from 'lucide-react';
// // // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook'; // Adjust path as needed

// // // interface PredictionMetadata {
// // //   prediction_id: string;
// // //   start_time: string;
// // //   chat_id: string;
// // //   user_id: string;
// // //   status: string;
// // //   duration: number | null;
// // //   entity_count: number;
// // //   predictions_csv_path: string | null;
// // // }

// // // interface PredictionFileInfo {
// // //   id: number;
// // //   name: string;
// // //   file_url: string;
// // //   schema: Array<{ column_name: string; data_type: string }>;
// // //   file_size_mb: number;
// // //   has_date_column: boolean;
// // //   date_columns: string[];
// // //   chat_id: string;
// // //   prediction_queries: {
// // //     sampling_query: string;
// // //     feature_query: string;
// // //   };
// // //   prediction_results: {
// // //     sampling_results: any[];
// // //     feature_results: any[];
// // //   };
// // // }

// // // const PredictionsUI: React.FC = () => {
// // //   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
// // //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const [showPredictionWizard, setShowPredictionWizard] = useState(false);
// // //   const [wizardStep, setWizardStep] = useState<number>(1);
// // //   const [predictionFileInfo, setPredictionFileInfo] = useState<PredictionFileInfo | null>(null);

// // //   // For running all notebook cells
// // //   const notebookRef = useRef<SQLNotebookRef>(null);

// // //   // This is your S3 bucket name
// // //   const bucket_name = "pa-documents-storage-bucket";

// // //   // Hard-coded auth token for now; replace with your real logic
// // //   const authToken = "d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b";

// // //   useEffect(() => {
// // //     fetchPredictions();
// // //   }, []);

// // //   const fetchPredictions = async () => {
// // //     try {
// // //       const response = await fetch(
// // //         "http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=9938938HHDU",
// // //         {
// // //           method: "GET",
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             Authorization: `Token ${authToken}`,
// // //           },
// // //         }
// // //       );

// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         setPredictionsData(data.metadata);
// // //       } else {
// // //         console.error("Failed to fetch prediction metadata");
// // //       }
// // //     } catch (error: unknown) {
// // //       console.error("Error while fetching predictions:", error);
// // //     }
// // //   };

// // //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// // //     if (event.target.files && event.target.files[0]) {
// // //       setSelectedFile(event.target.files[0]);
// // //     }
// // //   };

// // //   /**
// // //    * Step 1: Upload CSV & generate queries (calls your backend at /api/predict/).
// // //    */
// // //   const handleQuickPrediction = async () => {
// // //     if (!selectedFile) {
// // //       alert("Please select a CSV file to upload.");
// // //       return;
// // //     }

// // //     setIsLoading(true);
// // //     const formData = new FormData();
// // //     formData.append("file", selectedFile);
// // //     formData.append("user_id", "9");
// // //     formData.append("chat_id", `pred_${Date.now()}`);

// // //     try {
// // //       const response = await fetch("http://127.0.0.1:8000/api/predict/", {
// // //         method: "POST",
// // //         headers: {
// // //           Authorization: `Token ${authToken}`,
// // //         },
// // //         body: formData,
// // //       });

// // //       if (response.ok) {
// // //         const data = await response.json();
// // //         if (data.uploaded_files && data.uploaded_files.length > 0) {
// // //           setPredictionFileInfo(data.uploaded_files[0]);
// // //         }
// // //       } else {
// // //         const errorText = await response.text();
// // //         throw new Error(errorText);
// // //       }
// // //     } catch (error: unknown) {
// // //       console.error("Error while making prediction:", error);
// // //       alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   /**
// // //    * Step 2: Run queries in the notebook, save results to S3, finalize predictions, etc.
// // //    */
// // //   const handlePredictOnNewData = async () => {
// // //     if (!predictionFileInfo || !notebookRef.current) {
// // //       alert("Please upload a file and review queries before predicting.");
// // //       return;
// // //     }

// // //     setIsLoading(true);

// // //     try {
// // //       // Run all notebook cells
// // //       const cellResults = await notebookRef.current.runAllCellsAndGetResults();

// // //       // Save results to S3 and update PredictionFileInfo (your custom endpoint)
// // //       const saveResultsResponse = await fetch("http://127.0.0.1:8000/api/save_prediction_results/", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Token ${authToken}`,
// // //         },
// // //         body: JSON.stringify({
// // //           user_id: "9",
// // //           chat_id: predictionFileInfo.chat_id,
// // //           file_id: predictionFileInfo.id,
// // //           cells: cellResults,
// // //         }),
// // //       });

// // //       if (!saveResultsResponse.ok) {
// // //         const errorText = await saveResultsResponse.text();
// // //         throw new Error(errorText);
// // //       }

// // //       const saveResultsData = await saveResultsResponse.json();
// // //       console.log("Prediction results saved:", saveResultsData);

// // //       alert("Prediction completed successfully!");
// // //       fetchPredictions();
// // //     } catch (error: unknown) {
// // //       console.error("Error while running prediction:", error);
// // //       alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
// // //     } finally {
// // //       setIsLoading(false);
// // //       setShowPredictionWizard(false);
// // //       setWizardStep(1);
// // //       setSelectedFile(null);
// // //       setPredictionFileInfo(null);
// // //     }
// // //   };

// // //   /**
// // //    * Utility for coloring the status text in the Prediction History table.
// // //    */
// // //   const getStatusColor = (status: string) => {
// // //     switch (status.toLowerCase()) {
// // //       case "completed":
// // //         return "text-green-600";
// // //       case "failed":
// // //         return "text-red-600";
// // //       case "running":
// // //         return "text-blue-600";
// // //       default:
// // //         return "text-gray-600";
// // //     }
// // //   };

// // //   /**
// // //    * Build the "cells" array for our SQLNotebook.
// // //    */
// // //   const buildNotebookCells = () => {
// // //     if (!predictionFileInfo) return [];
// // //     return [
// // //       {
// // //         cell_type: "code",
// // //         source: predictionFileInfo.prediction_queries.sampling_query,
// // //         outputs: [],
// // //       },
// // //       {
// // //         cell_type: "code",
// // //         source: predictionFileInfo.prediction_queries.feature_query,
// // //         outputs: [],
// // //       },
// // //     ];
// // //   };

// // //   /**
// // //    * We'll use `isUploaded` to control the "Upload CSV" button text and disabled state.
// // //    * If we have a `predictionFileInfo`, that means the upload is done.
// // //    */
// // //   const isUploaded = !!predictionFileInfo;

// // //   return (
// // //     <div className="min-h-screen bg-gray-50">
// // //       {/* HEADER with brand color #5B3557 */}
// // //       <header className="bg-[#5B3557]">
// // //         <div className="mx-auto px-8 py-6">
// // //           <div className="flex justify-between items-center">
// // //             <h1 className="text-2xl font-semibold text-white">Predictions Dashboard</h1>
// // //             {/* Keep the trial info as-is, or style it differently if you wish */}
// // //             {/* <div className="flex items-center gap-2 bg-amber-50 text-amber-800 px-4 py-2 rounded-lg">
// // //               <Monitor className="h-4 w-4" />
// // //               <span>Trial ends on Dec 19, 2024</span>
// // //             </div> */}
// // //           </div>
// // //         </div>
// // //       </header>

// // //       {/* MAIN CONTENT */}
// // //       <div className="mx-auto max-w-screen-xl px-8 py-10 space-y-10">
// // //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// // //           {/* LEFT SIDEBAR */}
// // //           <div className="lg:col-span-1 space-y-8">
// // //             {/* Quick Prediction Card */}
// // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
// // //               <div className="flex items-center gap-2">
// // //                 <Upload className="h-5 w-5 text-gray-600" />
// // //                 <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
// // //               </div>
// // //               <p className="text-sm text-gray-600">
// // //                 Upload CSVs and use your model for a one-time prediction on new data.
// // //               </p>
// // //               <button
// // //                 onClick={() => {
// // //                   setShowPredictionWizard(true);
// // //                   setWizardStep(1);
// // //                   setSelectedFile(null);
// // //                   setPredictionFileInfo(null);
// // //                 }}
// // //                 className="
// // //                   w-full
// // //                   bg-[#5B3557] hover:bg-[#4A2C48]
// // //                   text-white font-medium
// // //                   py-2 px-4
// // //                   rounded-lg
// // //                   transition-colors
// // //                   flex items-center justify-center
// // //                 "
// // //               >
// // //                 One-time predict from CSV
// // //               </button>
// // //             </div>

// // //             {/* Scheduled Predictions Card */}
// // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
// // //               <div className="flex items-center gap-2">
// // //                 <Clock className="h-5 w-5 text-gray-600" />
// // //                 <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
// // //               </div>
// // //               <button
// // //                 className="
// // //                   w-full
// // //                   border border-gray-300
// // //                   hover:bg-gray-50
// // //                   text-gray-700 font-medium
// // //                   py-2 px-4
// // //                   rounded-lg
// // //                   transition-colors
// // //                 "
// // //               >
// // //                 Configure Schedule
// // //               </button>
// // //             </div>
// // //           </div>

// // //           {/* RIGHT CONTENT: Prediction History */}
// // //           <div className="lg:col-span-3">
// // //             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
// // //               <div className="p-6 border-b border-gray-200">
// // //                 <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
// // //               </div>
// // //               <div className="overflow-x-auto">
// // //                 {predictionsData.length === 0 ? (
// // //                   <div className="p-8 text-center bg-gray-100">
// // //                     <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
// // //                     <p className="text-lg text-gray-600">
// // //                       Dashboard will only be available after you train your model
// // //                     </p>
// // //                   </div>
// // //                 ) : (
// // //                   <table className="w-full text-sm">
// // //                     <thead className="bg-gray-50 text-xs uppercase text-gray-500">
// // //                       <tr>
// // //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Prediction ID</th>
// // //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Start Time</th>
// // //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Status</th>
// // //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Duration</th>
// // //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Entity Count</th>
// // //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Results</th>
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody className="bg-white divide-y divide-gray-200">
// // //                       {predictionsData.map((data) => (
// // //                         <tr key={data.prediction_id} className="hover:bg-gray-50">
// // //                           <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-900">
// // //                             {data.prediction_id}
// // //                           </td>
// // //                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
// // //                             {new Date(data.start_time).toLocaleString()}
// // //                           </td>
// // //                           <td className="px-6 py-4 whitespace-nowrap">
// // //                             <span className={`${getStatusColor(data.status)}`}>
// // //                               {data.status}
// // //                             </span>
// // //                           </td>
// // //                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
// // //                             {data.duration ? `${data.duration.toFixed(2)}s` : "−"}
// // //                           </td>
// // //                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
// // //                             {data.entity_count}
// // //                           </td>
// // //                           <td className="px-6 py-4 whitespace-nowrap">
// // //                             {data.predictions_csv_path ? (
// // //                               <a
// // //                                 href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
// // //                                 target="_blank"
// // //                                 rel="noopener noreferrer"
// // //                                 className="text-blue-600 hover:text-blue-800 hover:underline"
// // //                               >
// // //                                 Download CSV
// // //                               </a>
// // //                             ) : (
// // //                               "−"
// // //                             )}
// // //                           </td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* PREDICTION WIZARD MODAL */}
// // //         {showPredictionWizard && (
// // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //             <div
// // //               className="
// // //                 bg-white rounded-xl shadow-2xl
// // //                 w-full max-w-7xl
// // //                 max-h-[90vh]
// // //                 overflow-y-auto
// // //                 p-8
// // //                 relative
// // //               "
// // //             >
// // //               {/* Modal Header */}
// // //               <div className="flex justify-between items-center mb-6">
// // //                 <h2 className="text-xl font-semibold text-gray-900">
// // //                   Select Data to Predict On
// // //                 </h2>
// // //                 <button
// // //                   onClick={() => {
// // //                     setShowPredictionWizard(false);
// // //                     setWizardStep(1);
// // //                     setSelectedFile(null);
// // //                     setPredictionFileInfo(null);
// // //                   }}
// // //                   className="text-gray-500 hover:text-gray-700"
// // //                 >
// // //                   <X className="h-5 w-5" />
// // //                 </button>
// // //               </div>

// // //               {/* STEP 1: Upload CSV */}
// // //               {wizardStep === 1 && (
// // //                 <div className="space-y-8">
// // //                   <div className="space-y-2">
// // //                     <p className="text-sm text-gray-600">
// // //                       Map new tables to the tables that were used for training. Make sure that
// // //                       the schemas match between the training tables and the new tables. You can
// // //                       edit the schema of the new table in the next step.
// // //                     </p>
// // //                   </div>

// // //                   <div className="border-t border-gray-200 pt-4 space-y-4">
// // //                     <div className="flex items-center gap-2">
// // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // //                     </div>
// // //                     <p className="text-sm text-gray-600">Select a table</p>

// // //                     {/* File Input */}
// // //                     <input
// // //                       type="file"
// // //                       accept=".csv"
// // //                       onChange={handleFileChange}
// // //                       className="
// // //                         block w-full text-sm text-gray-500
// // //                         file:mr-4 file:py-2 file:px-4
// // //                         file:rounded-full file:border-0
// // //                         file:text-sm file:font-semibold
// // //                         file:bg-[#5B3557] file:text-white
// // //                         hover:file:bg-[#4A2C48]
// // //                       "
// // //                       id="fileInput"
// // //                     />
// // //                     <label
// // //                       htmlFor="fileInput"
// // //                       className="block w-full text-center text-sm text-gray-500 mt-2"
// // //                     >
// // //                       {selectedFile ? selectedFile.name : "No file chosen"}
// // //                     </label>

// // //                     <div className="flex items-center gap-4 mt-4">
// // //                       {/* "Upload CSV" => "Uploading..." => "Uploaded" logic */}
// // //                       <button
// // //                         onClick={handleQuickPrediction}
// // //                         disabled={isUploaded || !selectedFile || isLoading}
// // //                         className={`
// // //                           ${
// // //                             isUploaded
// // //                               ? "bg-green-600 cursor-not-allowed"
// // //                               : "bg-[#5B3557] hover:bg-[#4A2C48]"
// // //                           }
// // //                           disabled:bg-gray-300
// // //                           text-white font-medium
// // //                           py-2 px-4
// // //                           rounded-lg
// // //                           transition-colors
// // //                         `}
// // //                       >
// // //                         {isUploaded
// // //                           ? "Uploaded"
// // //                           : isLoading
// // //                           ? "Uploading..."
// // //                           : "Upload CSV"}
// // //                       </button>

// // //                       {/* “Review Query” is disabled until `predictionFileInfo` is set (upload done) */}
// // //                       <button
// // //                         onClick={() => setWizardStep(2)}
// // //                         disabled={!predictionFileInfo || isLoading}
// // //                         className="
// // //                           bg-[#5B3557] hover:bg-[#4A2C48]
// // //                           disabled:bg-gray-300 disabled:cursor-not-allowed
// // //                           text-white font-medium
// // //                           py-2 px-4
// // //                           rounded-lg
// // //                           transition-colors
// // //                         "
// // //                       >
// // //                         Review Query
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               )}

// // //               {/* STEP 2: Review Queries */}
// // //               {wizardStep === 2 && predictionFileInfo && (
// // //                 <div className="space-y-8">
// // //                   <div className="space-y-2">
// // //                     <p className="text-sm text-gray-600">
// // //                       Review the queries that will pull in new data for prediction. These queries
// // //                       were generated together with the notebook and are based on the original
// // //                       predictive question.
// // //                     </p>
// // //                   </div>

// // //                   {/* Step 2: Replace Tables */}
// // //                   <div className="border-t border-gray-200 pt-4 space-y-2">
// // //                     <div className="flex items-center gap-2">
// // //                       <span className="text-sm font-medium text-gray-700">1</span>
// // //                       <span className="text-sm text-gray-700">Replace tables</span>
// // //                     </div>
// // //                     <p className="text-sm text-gray-600">
// // //                       Map new tables to the tables that were used for training. Make sure the
// // //                       schemas match. You can edit the schema in the next step.
// // //                     </p>
// // //                     <div className="mt-2 text-sm text-gray-600 space-y-1">
// // //                       <p>Training table: my_files.Unstructured_Daily_Product_Demand_Data</p>
// // //                       <p>New table: {predictionFileInfo.name} (Uploaded CSV)</p>
// // //                     </div>
// // //                   </div>

// // //                   {/* Step 2: Review Query as Notebook */}
// // //                   <div className="border-t border-gray-200 pt-4 space-y-2">
// // //                     <div className="flex items-center gap-2">
// // //                       <span className="text-sm font-medium text-gray-700">2</span>
// // //                       <span className="text-sm text-gray-700">Review query</span>
// // //                     </div>

// // //                     <SQLNotebook
// // //                       ref={notebookRef}
// // //                       activeTab="prediction_notebook"
// // //                       notebookContent={{
// // //                         file_url: predictionFileInfo.file_url,
// // //                         entity_column: "",
// // //                         target_column: "",
// // //                         features: [],
// // //                         user_id: "9",
// // //                         chat_id: predictionFileInfo.chat_id,
// // //                         isTrained: false,
// // //                         handleTrainModel: () => {},
// // //                         cells: buildNotebookCells(),
// // //                       }}
// // //                     />
// // //                   </div>

// // //                   {/* Step 2 Buttons */}
// // //                   <div className="flex justify-end gap-4 mt-6">
// // //                     <button
// // //                       onClick={() => setWizardStep(1)}
// // //                       className="
// // //                         border border-gray-300
// // //                         hover:bg-gray-50
// // //                         text-gray-700 font-medium
// // //                         py-2 px-4
// // //                         rounded-lg
// // //                         transition-colors
// // //                       "
// // //                     >
// // //                       Back
// // //                     </button>
// // //                     <button
// // //                       onClick={handlePredictOnNewData}
// // //                       disabled={isLoading}
// // //                       className="
// // //                         bg-[#5B3557] hover:bg-[#4A2C48]
// // //                         disabled:bg-gray-300
// // //                         text-white font-medium
// // //                         py-2 px-4
// // //                         rounded-lg
// // //                         transition-colors
// // //                       "
// // //                     >
// // //                       {isLoading ? "Predicting..." : "Predict on New Data"}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PredictionsUI;





// // import React, { useState, useEffect, useRef } from 'react';
// // import { Upload, Clock, Monitor, X } from 'lucide-react';
// // import SQLNotebook, { SQLNotebookRef } from '../NotebookUI/Notebook/Notebook'; // Adjust path as needed

// // // ~~~--- Types ---~~~
// // interface PredictionMetadata {
// //   prediction_id: string;
// //   start_time: string;
// //   chat_id: string;
// //   user_id: string;
// //   status: string;
// //   duration: number | null;
// //   entity_count: number;
// //   predictions_csv_path: string | null;
// // }

// // interface PredictionFileInfo {
// //   id: number;
// //   name: string;
// //   file_url: string;
// //   schema: Array<{ column_name: string; data_type: string }>;
// //   file_size_mb: number;
// //   has_date_column: boolean;
// //   date_columns: string[];
// //   chat_id: string;
// //   prediction_queries: {
// //     sampling_query: string;
// //     feature_query: string;
// //   };
// //   prediction_results: {
// //     sampling_results: any[];
// //     feature_results: any[];
// //   };
// // }

// // // ~~~--- Props for PredictionsUI ---~~~
// // interface PredictionsUIProps {
// //   user_id: string;  // dynamically passed from parent
// //   chat_id: string;  // dynamically passed from parent
// // }

// // const PredictionsUI: React.FC<PredictionsUIProps> = ({ user_id, chat_id }) => {
// //   console.log("[PredictionsUI] Received user_id:", user_id, "and chat_id:", chat_id);

// //   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
// //   const [selectedFile, setSelectedFile] = useState<File | null>(null);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [showPredictionWizard, setShowPredictionWizard] = useState(false);
// //   const [wizardStep, setWizardStep] = useState<number>(1);
// //   const [predictionFileInfo, setPredictionFileInfo] = useState<PredictionFileInfo | null>(null);

// //   // For running all notebook cells
// //   const notebookRef = useRef<SQLNotebookRef>(null);

// //   // This is your S3 bucket name
// //   const bucket_name = "pa-documents-storage-bucket";

// //   // Hard-coded auth token for now; replace with your real logic
// //   const authToken = "d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b";

// //   // ~~~--- Fetch existing predictions metadata ---~~~
// //   useEffect(() => {
// //     fetchPredictions();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [user_id, chat_id]);

// //   const fetchPredictions = async () => {
// //     console.log("[fetchPredictions] user_id:", user_id, "chat_id:", chat_id);

// //     try {
// //       const response = await fetch(
// //         `http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=${user_id}&chat_id=${chat_id}`,
// //         {
// //           method: "GET",
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Token ${authToken}`,
// //           },
// //         }
// //       );

// //       if (response.ok) {
// //         const data = await response.json();
// //         setPredictionsData(data.metadata);
// //         console.log("[fetchPredictions] Data fetched:", data.metadata);
// //       } else {
// //         console.error("Failed to fetch prediction metadata");
// //       }
// //     } catch (error: unknown) {
// //       console.error("Error while fetching predictions:", error);
// //     }
// //   };

// //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     if (event.target.files && event.target.files[0]) {
// //       setSelectedFile(event.target.files[0]);
// //       console.log("[handleFileChange] Selected file:", event.target.files[0].name);
// //     }
// //   };

// //   /**
// //    * Step 1: Upload CSV & generate queries (calls your backend at /api/predict/).
// //    */
// //   const handleQuickPrediction = async () => {
// //     console.log("[handleQuickPrediction] user_id:", user_id, "chat_id:", chat_id);

// //     if (!selectedFile) {
// //       alert("Please select a CSV file to upload.");
// //       return;
// //     }

// //     setIsLoading(true);
// //     const formData = new FormData();
// //     formData.append("file", selectedFile);
// //     formData.append("user_id", user_id);
// //     formData.append("chat_id", chat_id);

// //     try {
// //       const response = await fetch("http://127.0.0.1:8000/api/predict/", {
// //         method: "POST",
// //         headers: {
// //           Authorization: `Token ${authToken}`,
// //         },
// //         body: formData,
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         console.log("[handleQuickPrediction] /api/predict/ response:", data);

// //         if (data.uploaded_files && data.uploaded_files.length > 0) {
// //           setPredictionFileInfo(data.uploaded_files[0]);
// //         }
// //       } else {
// //         const errorText = await response.text();
// //         throw new Error(errorText);
// //       }
// //     } catch (error: unknown) {
// //       console.error("Error while making prediction:", error);
// //       alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   /**
// //    * Step 2: Run queries in the notebook, save results to S3, finalize predictions, etc.
// //    */
// //   const handlePredictOnNewData = async () => {
// //     console.log("[handlePredictOnNewData] user_id:", user_id, "chat_id:", chat_id);

// //     if (!predictionFileInfo || !notebookRef.current) {
// //       alert("Please upload a file and review queries before predicting.");
// //       return;
// //     }

// //     setIsLoading(true);

// //     try {
// //       // Run all notebook cells
// //       const cellResults = await notebookRef.current.runAllCellsAndGetResults();
// //       console.log("[handlePredictOnNewData] cellResults:", cellResults);

// //       // Save results to S3 and update PredictionFileInfo (your custom endpoint)
// //       const saveResultsResponse = await fetch("http://127.0.0.1:8000/api/save_prediction_results/", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Token ${authToken}`,
// //         },
// //         body: JSON.stringify({
// //           user_id,
// //           chat_id,
// //           file_id: predictionFileInfo.id,
// //           cells: cellResults,
// //         }),
// //       });

// //       if (!saveResultsResponse.ok) {
// //         const errorText = await saveResultsResponse.text();
// //         throw new Error(errorText);
// //       }

// //       const saveResultsData = await saveResultsResponse.json();
// //       console.log("Prediction results saved:", saveResultsData);

// //       alert("Prediction completed successfully!");
// //       fetchPredictions();
// //     } catch (error: unknown) {
// //       console.error("Error while running prediction:", error);
// //       alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
// //     } finally {
// //       setIsLoading(false);
// //       setShowPredictionWizard(false);
// //       setWizardStep(1);
// //       setSelectedFile(null);
// //       setPredictionFileInfo(null);
// //     }
// //   };

// //   /**
// //    * Utility for coloring the status text in the Prediction History table.
// //    */
// //   const getStatusColor = (status: string) => {
// //     switch (status.toLowerCase()) {
// //       case "completed":
// //         return "text-green-600";
// //       case "failed":
// //         return "text-red-600";
// //       case "running":
// //         return "text-blue-600";
// //       default:
// //         return "text-gray-600";
// //     }
// //   };

// //   /**
// //    * Build the "cells" array for our SQLNotebook.
// //    */
// //   const buildNotebookCells = () => {
// //     if (!predictionFileInfo) return [];
// //     return [
// //       {
// //         cell_type: "code",
// //         source: predictionFileInfo.prediction_queries.sampling_query,
// //         outputs: [],
// //       },
// //       {
// //         cell_type: "code",
// //         source: predictionFileInfo.prediction_queries.feature_query,
// //         outputs: [],
// //       },
// //     ];
// //   };

// //   /**
// //    * We'll use `isUploaded` to control the "Upload CSV" button text and disabled state.
// //    * If we have a `predictionFileInfo`, that means the upload is done.
// //    */
// //   const isUploaded = !!predictionFileInfo;

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* HEADER with brand color #5B3557 */}
// //       <header className="bg-[#5B3557]">
// //         <div className="mx-auto px-8 py-6">
// //           <div className="flex justify-between items-center">
// //             <h1 className="text-2xl font-semibold text-white">Predictions Dashboard</h1>
// //             {/* Example debug print */}
// //             <span className="text-sm text-white">
// //               (User: {user_id}, Chat: {chat_id})
// //             </span>
// //           </div>
// //         </div>
// //       </header>

// //       {/* MAIN CONTENT */}
// //       <div className="mx-auto max-w-screen-xl px-8 py-10 space-y-10">
// //         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
// //           {/* LEFT SIDEBAR */}
// //           <div className="lg:col-span-1 space-y-8">
// //             {/* Quick Prediction Card */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
// //               <div className="flex items-center gap-2">
// //                 <Upload className="h-5 w-5 text-gray-600" />
// //                 <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
// //               </div>
// //               <p className="text-sm text-gray-600">
// //                 Upload CSVs and use your model for a one-time prediction on new data.
// //               </p>
// //               <button
// //                 onClick={() => {
// //                   setShowPredictionWizard(true);
// //                   setWizardStep(1);
// //                   setSelectedFile(null);
// //                   setPredictionFileInfo(null);
// //                   console.log("[Quick Prediction] Open wizard. user_id:", user_id, "chat_id:", chat_id);
// //                 }}
// //                 className="
// //                   w-full
// //                   bg-[#5B3557] hover:bg-[#4A2C48]
// //                   text-white font-medium
// //                   py-2 px-4
// //                   rounded-lg
// //                   transition-colors
// //                   flex items-center justify-center
// //                 "
// //               >
// //                 One-time predict from CSV
// //               </button>
// //             </div>

// //             {/* Scheduled Predictions Card */}
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
// //               <div className="flex items-center gap-2">
// //                 <Clock className="h-5 w-5 text-gray-600" />
// //                 <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
// //               </div>
// //               <button
// //                 className="
// //                   w-full
// //                   border border-gray-300
// //                   hover:bg-gray-50
// //                   text-gray-700 font-medium
// //                   py-2 px-4
// //                   rounded-lg
// //                   transition-colors
// //                 "
// //               >
// //                 Configure Schedule
// //               </button>
// //             </div>
// //           </div>

// //           {/* RIGHT CONTENT: Prediction History */}
// //           <div className="lg:col-span-3">
// //             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
// //               <div className="p-6 border-b border-gray-200">
// //                 <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
// //               </div>
// //               <div className="overflow-x-auto">
// //                 {predictionsData.length === 0 ? (
// //                   <div className="p-8 text-center bg-gray-100">
// //                     <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
// //                     <p className="text-lg text-gray-600">
// //                       Dashboard will only be available after you train your model
// //                     </p>
// //                   </div>
// //                 ) : (
// //                   <table className="w-full text-sm">
// //                     <thead className="bg-gray-50 text-xs uppercase text-gray-500">
// //                       <tr>
// //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Prediction ID</th>
// //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Start Time</th>
// //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Status</th>
// //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Duration</th>
// //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Entity Count</th>
// //                         <th className="px-6 py-3 text-left font-medium tracking-wider">Results</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="bg-white divide-y divide-gray-200">
// //                       {predictionsData.map((data) => (
// //                         <tr key={data.prediction_id} className="hover:bg-gray-50">
// //                           <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-900">
// //                             {data.prediction_id}
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
// //                             {new Date(data.start_time).toLocaleString()}
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <span className={`${getStatusColor(data.status)}`}>
// //                               {data.status}
// //                             </span>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
// //                             {data.duration ? `${data.duration.toFixed(2)}s` : "−"}
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
// //                             {data.entity_count}
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             {data.predictions_csv_path ? (
// //                               <a
// //                                 href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
// //                                 target="_blank"
// //                                 rel="noopener noreferrer"
// //                                 className="text-blue-600 hover:text-blue-800 hover:underline"
// //                               >
// //                                 Download CSV
// //                               </a>
// //                             ) : (
// //                               "−"
// //                             )}
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* PREDICTION WIZARD MODAL */}
// //         {showPredictionWizard && (
// //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //             <div
// //               className="
// //                 bg-white rounded-xl shadow-2xl
// //                 w-full max-w-7xl
// //                 max-h-[90vh]
// //                 overflow-y-auto
// //                 p-8
// //                 relative
// //               "
// //             >
// //               {/* Modal Header */}
// //               <div className="flex justify-between items-center mb-6">
// //                 <h2 className="text-xl font-semibold text-gray-900">
// //                   Select Data to Predict On
// //                 </h2>
// //                 <button
// //                   onClick={() => {
// //                     setShowPredictionWizard(false);
// //                     setWizardStep(1);
// //                     setSelectedFile(null);
// //                     setPredictionFileInfo(null);
// //                     console.log("[Wizard] closed. user_id:", user_id, "chat_id:", chat_id);
// //                   }}
// //                   className="text-gray-500 hover:text-gray-700"
// //                 >
// //                   <X className="h-5 w-5" />
// //                 </button>
// //               </div>

// //               {/* STEP 1: Upload CSV */}
// //               {wizardStep === 1 && (
// //                 <div className="space-y-8">
// //                   <div className="space-y-2">
// //                     <p className="text-sm text-gray-600">
// //                       Map new tables to the tables that were used for training. Make sure that
// //                       the schemas match between the training tables and the new tables. You can
// //                       edit the schema of the new table in the next step.
// //                     </p>
// //                   </div>

// //                   <div className="border-t border-gray-200 pt-4 space-y-4">
// //                     <div className="flex items-center gap-2">
// //                       <span className="text-sm font-medium text-gray-700">1</span>
// //                       <span className="text-sm text-gray-700">Replace tables</span>
// //                     </div>
// //                     <p className="text-sm text-gray-600">Select a table</p>

// //                     {/* File Input */}
// //                     <input
// //                       type="file"
// //                       accept=".csv"
// //                       onChange={handleFileChange}
// //                       className="
// //                         block w-full text-sm text-gray-500
// //                         file:mr-4 file:py-2 file:px-4
// //                         file:rounded-full file:border-0
// //                         file:text-sm file:font-semibold
// //                         file:bg-[#5B3557] file:text-white
// //                         hover:file:bg-[#4A2C48]
// //                       "
// //                       id="fileInput"
// //                     />
// //                     <label
// //                       htmlFor="fileInput"
// //                       className="block w-full text-center text-sm text-gray-500 mt-2"
// //                     >
// //                       {selectedFile ? selectedFile.name : "No file chosen"}
// //                     </label>

// //                     <div className="flex items-center gap-4 mt-4">
// //                       {/* "Upload CSV" => "Uploading..." => "Uploaded" logic */}
// //                       <button
// //                         onClick={handleQuickPrediction}
// //                         disabled={isUploaded || !selectedFile || isLoading}
// //                         className={`
// //                           ${
// //                             isUploaded
// //                               ? "bg-green-600 cursor-not-allowed"
// //                               : "bg-[#5B3557] hover:bg-[#4A2C48]"
// //                           }
// //                           disabled:bg-gray-300
// //                           text-white font-medium
// //                           py-2 px-4
// //                           rounded-lg
// //                           transition-colors
// //                         `}
// //                       >
// //                         {isUploaded
// //                           ? "Uploaded"
// //                           : isLoading
// //                           ? "Uploading..."
// //                           : "Upload CSV"}
// //                       </button>

// //                       {/* “Review Query” is disabled until `predictionFileInfo` is set (upload done) */}
// //                       <button
// //                         onClick={() => {
// //                           console.log("[Wizard Step 1] Going to step 2. user_id:", user_id, "chat_id:", chat_id);
// //                           setWizardStep(2);
// //                         }}
// //                         disabled={!predictionFileInfo || isLoading}
// //                         className="
// //                           bg-[#5B3557] hover:bg-[#4A2C48]
// //                           disabled:bg-gray-300 disabled:cursor-not-allowed
// //                           text-white font-medium
// //                           py-2 px-4
// //                           rounded-lg
// //                           transition-colors
// //                         "
// //                       >
// //                         Review Query
// //                       </button>
// //                     </div>
// //                   </div>
// //                 </div>
// //               )}

// //               {/* STEP 2: Review Queries */}
// //               {wizardStep === 2 && predictionFileInfo && (
// //                 <div className="space-y-8">
// //                   <div className="space-y-2">
// //                     <p className="text-sm text-gray-600">
// //                       Review the queries that will pull in new data for prediction. These queries
// //                       were generated together with the notebook and are based on the original
// //                       predictive question.
// //                     </p>
// //                   </div>

// //                   {/* Step 2: Replace Tables */}
// //                   <div className="border-t border-gray-200 pt-4 space-y-2">
// //                     <div className="flex items-center gap-2">
// //                       <span className="text-sm font-medium text-gray-700">1</span>
// //                       <span className="text-sm text-gray-700">Replace tables</span>
// //                     </div>
// //                     <p className="text-sm text-gray-600">
// //                       Map new tables to the tables that were used for training. Make sure the
// //                       schemas match. You can edit the schema in the next step.
// //                     </p>
// //                     <div className="mt-2 text-sm text-gray-600 space-y-1">
// //                       <p>Training table: my_files.Unstructured_Daily_Product_Demand_Data</p>
// //                       <p>New table: {predictionFileInfo.name} (Uploaded CSV)</p>
// //                     </div>
// //                   </div>

// //                   {/* Step 2: Review Query as Notebook */}
// //                   <div className="border-t border-gray-200 pt-4 space-y-2">
// //                     <div className="flex items-center gap-2">
// //                       <span className="text-sm font-medium text-gray-700">2</span>
// //                       <span className="text-sm text-gray-700">Review query</span>
// //                     </div>

// //                     <SQLNotebook
// //                       ref={notebookRef}
// //                       activeTab="prediction_notebook"
// //                       notebookContent={{
// //                         file_url: predictionFileInfo.file_url,
// //                         entity_column: "",
// //                         target_column: "",
// //                         features: [],
// //                         user_id, // dynamic user
// //                         chat_id: predictionFileInfo.chat_id, // from the server response
// //                         isTrained: false,
// //                         handleTrainModel: () => {},
// //                         cells: buildNotebookCells(),
// //                       }}
// //                     />
// //                   </div>

// //                   {/* Step 2 Buttons */}
// //                   <div className="flex justify-end gap-4 mt-6">
// //                     <button
// //                       onClick={() => {
// //                         console.log("[Wizard Step 2] Back to step 1. user_id:", user_id, "chat_id:", chat_id);
// //                         setWizardStep(1);
// //                       }}
// //                       className="
// //                         border border-gray-300
// //                         hover:bg-gray-50
// //                         text-gray-700 font-medium
// //                         py-2 px-4
// //                         rounded-lg
// //                         transition-colors
// //                       "
// //                     >
// //                       Back
// //                     </button>
// //                     <button
// //                       onClick={handlePredictOnNewData}
// //                       disabled={isLoading}
// //                       className="
// //                         bg-[#5B3557] hover:bg-[#4A2C48]
// //                         disabled:bg-gray-300
// //                         text-white font-medium
// //                         py-2 px-4
// //                         rounded-lg
// //                         transition-colors
// //                       "
// //                     >
// //                       {isLoading ? "Predicting..." : "Predict on New Data"}
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default PredictionsUI;






// import React, { useState, useEffect, useRef } from "react";
// import Papa from "papaparse"; // For parsing CSV
// import readXlsxFile from "read-excel-file"; // For parsing Excel (safer alternative to xlsx)
// import { Upload, Clock, Monitor, X } from "lucide-react";
// import SQLNotebook, { SQLNotebookRef } from "../NotebookUI/Notebook/Notebook";

// // ~~~--- Types ---~~~
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

// interface PredictionFileInfo {
//   id: number;
//   name: string;
//   file_url: string;
//   schema: Array<{ column_name: string; data_type: string }>;
//   file_size_mb: number;
//   has_date_column: boolean;
//   date_columns: string[];
//   chat_id: string;
//   prediction_queries: {
//     sampling_query: string;
//     feature_query: string;
//   };
//   prediction_results: {
//     sampling_results: any[];
//     feature_results: any[];
//   };
// }

// interface PredictiveSettingsData {
//   target_column: string;         // must NOT appear in CSV if not "Null"
//   entity_column: string;         // must appear if not "Null"
//   time_column: string;           // we ignore it
//   predictive_question: string;
//   time_frame: string;
//   time_frequency: string;
//   machine_learning_type: string;
//   features: string[];            // must appear if not empty
// }

// interface PredictionsUIProps {
//   user_id: string;
//   chat_id: string;
// }

// const PredictionsUI: React.FC<PredictionsUIProps> = ({ user_id, chat_id }) => {
//   console.log("[PredictionsUI] user_id:", user_id, "chat_id:", chat_id);

//   const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);  // The file we ultimately upload
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPredictionWizard, setShowPredictionWizard] = useState(false);
//   const [wizardStep, setWizardStep] = useState<number>(1);
//   const [predictionFileInfo, setPredictionFileInfo] = useState<PredictionFileInfo | null>(null);

//   const notebookRef = useRef<SQLNotebookRef>(null);

//   // Hard-coded auth token
//   const authToken = "d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b";
//   const bucket_name = "pa-documents-storage-bucket";

//   // States for dynamic column validation
//   const [requiredColumns, setRequiredColumns] = useState<string[]>([]); // entity + features
//   const [disallowedTarget, setDisallowedTarget] = useState<string>(""); // target if not "Null"
//   const [columnsMatch, setColumnsMatch] = useState<boolean>(true);
//   const [mismatchError, setMismatchError] = useState<string>("");

//   // 1) On mount or user/chat changes, fetch existing predictions
//   useEffect(() => {
//     fetchPredictions();
//   }, [user_id, chat_id]);

//   const fetchPredictions = async () => {
//     console.log("[fetchPredictions] Start. user_id:", user_id, "chat_id:", chat_id);
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=${user_id}&chat_id=${chat_id}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Token ${authToken}`,
//           },
//         }
//       );
//       if (!response.ok) {
//         console.error("[fetchPredictions] Failed to fetch prediction metadata");
//         return;
//       }
//       const data = await response.json();
//       setPredictionsData(data.metadata);
//       console.log("[fetchPredictions] Received metadata:", data.metadata);
//     } catch (error) {
//       console.error("[fetchPredictions] Error:", error);
//     }
//   };

//   // 2) When wizard is opened, fetch PredictiveSettings
//   useEffect(() => {
//     if (!showPredictionWizard) return;

//     const fetchPredictiveSettings = async () => {
//       console.log("[fetchPredictiveSettings] Start. user_id:", user_id, "chat_id:", chat_id);
//       try {
//         const url = `http://127.0.0.1:8000/api/predictive-settings/${user_id}/${chat_id}`;
//         const resp = await fetch(url);
//         if (!resp.ok) {
//           throw new Error(`[fetchPredictiveSettings] Failed: ${resp.statusText}`);
//         }
//         const data: PredictiveSettingsData = await resp.json();
//         console.log("[fetchPredictiveSettings] Data:", data);

//         // Build required columns ignoring time_column & ignoring "Null"
//         const reqCols: string[] = [];
//         if (data.entity_column && data.entity_column !== "Null") {
//           reqCols.push(data.entity_column);
//         }
//         if (Array.isArray(data.features)) {
//           data.features.forEach((f) => {
//             if (f && f !== "Null") {
//               reqCols.push(f);
//             }
//           });
//         }

//         // If target_column != "Null", user must NOT have it in CSV
//         let disTarget = "";
//         if (data.target_column && data.target_column !== "Null") {
//           disTarget = data.target_column;
//         }

//         // Normalize them
//         const normalizedRequired = reqCols.map((c) => normalizeColumnName(c));
//         const normalizedTarget = disTarget ? normalizeColumnName(disTarget) : "";

//         setRequiredColumns(normalizedRequired);
//         setDisallowedTarget(normalizedTarget);
//         setColumnsMatch(true);
//         setMismatchError("");
//         console.log("[fetchPredictiveSettings] requiredColumns:", normalizedRequired);
//         console.log("[fetchPredictiveSettings] disallowedTarget:", normalizedTarget);
//       } catch (err) {
//         console.error("[fetchPredictiveSettings] Error:", err);
//         setColumnsMatch(false);
//         setMismatchError(String(err));
//       }
//     };

//     fetchPredictiveSettings();
//   }, [showPredictionWizard, user_id, chat_id]);

//   // Helper: normalize column names
//   const normalizeColumnName = (col: string) => {
//     let normalized = col.trim().toLowerCase().replace(/\s+/g, "_");
//     normalized = normalized.replace(/[^a-z0-9_]/g, "");
//     if (normalized && /^[0-9]/.test(normalized)) {
//       normalized = "_" + normalized;
//     }
//     return normalized;
//   };

//   // Compare CSV/XLSX columns to requiredColumns + ensure target not present
//   const validateColumns = (fileColumns: string[]) => {
//     console.log("[validateColumns] File columns:", fileColumns);
//     console.log("[validateColumns] requiredColumns:", requiredColumns);
//     console.log("[validateColumns] disallowedTarget:", disallowedTarget);

//     if (!requiredColumns.length) {
//       setColumnsMatch(false);
//       setMismatchError("No required columns loaded from PredictiveSettings. Please wait or re-check logs.");
//       return;
//     }

//     const fileSet = new Set(fileColumns);
//     const requiredSet = new Set(requiredColumns);

//     // 1) Check if file includes all required columns
//     const missing: string[] = [];
//     for (const needed of requiredSet) {
//       if (!fileSet.has(needed)) {
//         missing.push(needed);
//       }
//     }
//     if (missing.length > 0) {
//       setColumnsMatch(false);
//       setMismatchError(
//         `Missing required column(s): ${missing.join(", ")}.\n` +
//         `Please ensure your file includes all required columns.`
//       );
//       return;
//     }

//     // 2) If we have a disallowed target, ensure it's not in the file
//     if (disallowedTarget && fileSet.has(disallowedTarget)) {
//       setColumnsMatch(false);
//       setMismatchError(
//         `Your file contains the target column "${disallowedTarget}", which must NOT be present.\n` +
//         `Please remove it from the file.`
//       );
//       return;
//     }

//     // 3) Extra columns are allowed, so we won't fail on them
//     const extra = [...fileSet].filter((c) => !requiredSet.has(c) && c !== disallowedTarget);
//     if (extra.length) {
//       console.log("[validateColumns] File has extra columns:", extra);
//     }

//     // If we get here, columns pass
//     setColumnsMatch(true);
//     setMismatchError("");
//     console.log("[validateColumns] File columns pass validation!");
//   };

//   // 4) User picks a file => handle CSV vs. XLSX
//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];
//       console.log("[handleFileChange] Chosen file:", file.name);
//       setSelectedFile(null);
//       setColumnsMatch(true);
//       setMismatchError("");

//       const fileName = file.name.toLowerCase();
//       if (fileName.endsWith(".csv")) {
//         // ~~~ CSV ~~~
//         parseCsvFile(file);
//       } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
//         // ~~~ XLSX/XLS ~~~
//         await parseXlsxFile(file);
//       } else {
//         // Not CSV, XLSX, or XLS => fail
//         setColumnsMatch(false);
//         setMismatchError("Unsupported file type. Please upload a .csv, .xlsx, or .xls file.");
//       }
//     }
//   };

//   // 4a) Parse CSV with Papa
//   const parseCsvFile = (file: File) => {
//     console.log("[parseCsvFile] Start. file:", file.name);
//     Papa.parse(file, {
//       preview: 1,      // Read only the header row
//       header: true,
//       skipEmptyLines: true,
//       transformHeader: (colName) => normalizeColumnName(colName),
//       complete: (results) => {
//         if (results.meta && results.meta.fields) {
//           const fileColumns = results.meta.fields;
//           console.log("[parseCsvFile] CSV columns:", fileColumns);
//           validateColumns(fileColumns);
//           // If valid, setSelectedFile => can be used for upload
//           if (columnsMatch) {
//             setSelectedFile(file);
//           }
//         } else {
//           setColumnsMatch(false);
//           setMismatchError("Unable to parse CSV header row. Please ensure there's a valid header row.");
//         }
//       },
//       error: (err) => {
//         console.error("[parseCsvFile] Papa parse error:", err);
//         setColumnsMatch(false);
//         setMismatchError("Error parsing CSV. Check console for details.");
//       }
//     });
//   };

//   // 4b) Parse XLSX/XLS with read-excel-file => extract headers for validation
//   const parseXlsxFile = async (file: File) => {
//     console.log("[parseXlsxFile] Start. file:", file.name);
//     try {
//       const rows = await readXlsxFile(file);
//       const headers = rows[0].map((col: any) => normalizeColumnName(String(col)));
//       console.log("[parseXlsxFile] XLSX/XLS headers:", headers);

//       // Validate columns
//       validateColumns(headers);
//       if (!columnsMatch) {
//         console.log("[parseXlsxFile] Columns do NOT match => returning");
//         return;
//       }

//       // Convert rows to CSV (optional, depending on your needs)
//       const csvData = rows.map(row => row.join(',')).join('\n');
//       const csvBlob = new Blob([csvData], { type: "text/csv" });
//       const newFile = new File([csvBlob], file.name.replace(/\.xlsx?|\.xls$/, ".csv"), {
//         type: "text/csv",
//       });
//       console.log("[parseXlsxFile] Created new CSV File object =>", newFile.name);

//       setSelectedFile(newFile);
//     } catch (err) {
//       console.error("[parseXlsxFile] Error:", err);
//       setColumnsMatch(false);
//       setMismatchError(`Error parsing XLSX/XLS: ${String(err)}`);
//     }
//   };

//   // Step 1: Upload CSV & generate queries
//   const handleQuickPrediction = async () => {
//     console.log("[handleQuickPrediction] Start. user_id:", user_id, "chat_id:", chat_id);
//     if (!selectedFile) {
//       alert("Please select a CSV/XLSX/XLS file first and pass validation.");
//       return;
//     }
//     if (!columnsMatch) {
//       alert("File schema doesn't match the required columns. Cannot upload.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       formData.append("user_id", user_id);
//       formData.append("chat_id", chat_id);

//       const response = await fetch("http://127.0.0.1:8000/api/predict/", {
//         method: "POST",
//         headers: {
//           Authorization: `Token ${authToken}`,
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText);
//       }
//       const data = await response.json();
//       console.log("[handleQuickPrediction] /api/predict/ response:", data);

//       if (data.uploaded_files && data.uploaded_files.length > 0) {
//         setPredictionFileInfo(data.uploaded_files[0]);
//       }
//     } catch (error: unknown) {
//       console.error("[handleQuickPrediction] Error:", error);
//       alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Step 2: Predict on new data
//   const handlePredictOnNewData = async () => {
//     console.log("[handlePredictOnNewData] Start. user_id:", user_id, "chat_id:", chat_id);
//     if (!predictionFileInfo || !notebookRef.current) {
//       alert("Please upload a file and review queries before predicting.");
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const cellResults = await notebookRef.current.runAllCellsAndGetResults();
//       console.log("[handlePredictOnNewData] cellResults:", cellResults);

//       const saveResp = await fetch("http://127.0.0.1:8000/api/save_prediction_results/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Token ${authToken}`,
//         },
//         body: JSON.stringify({
//           user_id,
//           chat_id,
//           file_id: predictionFileInfo.id,
//           cells: cellResults,
//         }),
//       });
//       if (!saveResp.ok) {
//         const errText = await saveResp.text();
//         throw new Error(errText);
//       }
//       const saveData = await saveResp.json();
//       console.log("[handlePredictOnNewData] Prediction results saved:", saveData);

//       alert("Prediction completed successfully!");
//       fetchPredictions();
//     } catch (error) {
//       console.error("[handlePredictOnNewData] Error:", error);
//       alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
//     } finally {
//       setIsLoading(false);
//       setShowPredictionWizard(false);
//       setWizardStep(1);
//       setSelectedFile(null);
//       setPredictionFileInfo(null);
//     }
//   };

//   // Build cells for the notebook
//   const buildNotebookCells = () => {
//     if (!predictionFileInfo) return [];
//     return [
//       {
//         cell_type: "code",
//         source: predictionFileInfo.prediction_queries.sampling_query,
//         outputs: [],
//       },
//       {
//         cell_type: "code",
//         source: predictionFileInfo.prediction_queries.feature_query,
//         outputs: [],
//       },
//     ];
//   };

//   // Color for status
//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "completed": return "text-green-600";
//       case "failed": return "text-red-600";
//       case "running": return "text-blue-600";
//       default: return "text-gray-600";
//     }
//   };

//   const isUploaded = !!predictionFileInfo;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* HEADER */}
//       <header className="bg-[#5B3557]">
//         <div className="mx-auto px-8 py-6">
//           <div className="flex justify-between items-center">
//             <h1 className="text-2xl font-semibold text-white">Predictions Dashboard</h1>
//             <span className="text-sm text-white">
//               (User: {user_id}, Chat: {chat_id})
//             </span>
//           </div>
//         </div>
//       </header>

//       {/* MAIN CONTENT */}
//       <div className="mx-auto max-w-screen-xl px-8 py-10 space-y-10">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* LEFT SIDEBAR */}
//           <div className="lg:col-span-1 space-y-8">
//             {/* Quick Prediction Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
//               <div className="flex items-center gap-2">
//                 <Upload className="h-5 w-5 text-gray-600" />
//                 <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
//               </div>
//               <p className="text-sm text-gray-600">
//                 Upload CSV, and use your model for a one-time prediction on new data.
//               </p>
//               <button
//                 onClick={() => {
//                   setShowPredictionWizard(true);
//                   setWizardStep(1);
//                   setSelectedFile(null);
//                   setPredictionFileInfo(null);
//                   setColumnsMatch(true);
//                   setMismatchError("");
//                   console.log("[Quick Prediction] Wizard opened. user_id:", user_id, "chat_id:", chat_id);
//                 }}
//                 className="
//                   w-full
//                   bg-[#5B3557] hover:bg-[#4A2C48]
//                   text-white font-medium
//                   py-2 px-4
//                   rounded-lg
//                   transition-colors
//                 "
//               >
//                 One-time predict from csv
//               </button>
//             </div>

//             {/* Scheduled Predictions Card */}
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
//               <div className="flex items-center gap-2">
//                 <Clock className="h-5 w-5 text-gray-600" />
//                 <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
//               </div>
//               <button
//                 className="
//                   w-full
//                   border border-gray-300
//                   hover:bg-gray-50
//                   text-gray-700 font-medium
//                   py-2 px-4
//                   rounded-lg
//                   transition-colors
//                 "
//               >
//                 Configure Schedule
//               </button>
//             </div>
//           </div>

//           {/* RIGHT CONTENT: Prediction History */}
//           <div className="lg:col-span-3">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200">
//               <div className="p-6 border-b border-gray-200">
//                 <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
//               </div>
//               <div className="overflow-x-auto">
//                 {predictionsData.length === 0 ? (
//                   <div className="p-8 text-center bg-gray-100">
//                     <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
//                     <p className="text-lg text-gray-600">
//                       Dashboard will only be available after you train your model
//                     </p>
//                   </div>
//                 ) : (
//                   <table className="w-full text-sm">
//                     <thead className="bg-gray-50 text-xs uppercase text-gray-500">
//                       <tr>
//                         <th className="px-6 py-3 text-left font-medium tracking-wider">Prediction ID</th>
//                         <th className="px-6 py-3 text-left font-medium tracking-wider">Start Time</th>
//                         <th className="px-6 py-3 text-left font-medium tracking-wider">Status</th>
//                         <th className="px-6 py-3 text-left font-medium tracking-wider">Duration</th>
//                         <th className="px-6 py-3 text-left font-medium tracking-wider">Entity Count</th>
//                         <th className="px-6 py-3 text-left font-medium tracking-wider">Results</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {predictionsData.map((data) => (
//                         <tr key={data.prediction_id} className="hover:bg-gray-50">
//                           <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-900">
//                             {data.prediction_id}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                             {new Date(data.start_time).toLocaleString()}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             <span className={getStatusColor(data.status)}>
//                               {data.status}
//                             </span>
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                             {data.duration ? `${data.duration.toFixed(2)}s` : "−"}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap text-gray-500">
//                             {data.entity_count}
//                           </td>
//                           <td className="px-6 py-4 whitespace-nowrap">
//                             {data.predictions_csv_path ? (
//                               <a
//                                 href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="text-blue-600 hover:text-blue-800 hover:underline"
//                               >
//                                 Download CSV
//                               </a>
//                             ) : (
//                               "−"
//                             )}
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* PREDICTION WIZARD MODAL */}
//         {showPredictionWizard && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div
//               className="
//                 bg-white rounded-xl shadow-2xl
//                 w-full max-w-7xl
//                 max-h-[90vh]
//                 overflow-y-auto
//                 p-8
//                 relative
//               "
//             >
//               {/* Modal Header */}
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   Select Data to Predict 
//                 </h2>
//                 <button
//                   onClick={() => {
//                     setShowPredictionWizard(false);
//                     setWizardStep(1);
//                     setSelectedFile(null);
//                     setPredictionFileInfo(null);
//                     setColumnsMatch(true);
//                     setMismatchError("");
//                     console.log("[Wizard] closed. user_id:", user_id, "chat_id:", chat_id);
//                   }}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <X className="h-5 w-5" />
//                 </button>
//               </div>

//               {/* STEP 1: Upload CSV, XLSX, or XLS */}
//               {wizardStep === 1 && (
//                 <div className="space-y-8">
//                   <div className="space-y-2">
//                     <p className="text-sm text-gray-600">
//                       <strong>Note:</strong> Your CSV must contain the 
//                       <span className="text-purple-800 font-medium"> entity & feature columns </span>
//                       from the trained model, and must <em>not</em> include the target column.
//                       <br />
//                       Time column is optional, and extra columns are allowed.
//                     </p>
//                     {requiredColumns.length > 0 && (
//                       <p className="text-sm text-gray-500">
//                         <strong>Required columns:</strong> {requiredColumns.join(", ")}
//                         {disallowedTarget && (
//                           <>
//                             <br />
//                             <strong>Disallowed column:</strong> {disallowedTarget}
//                           </>
//                         )}
//                       </p>
//                     )}
//                   </div>

//                   <div className="border-t border-gray-200 pt-4 space-y-4">

//                     <p className="text-sm text-gray-600">Upload your CSV Below</p>

//                     {/* File Input */}
//                     <input
//                       type="file"
//                       accept=".csv,.xlsx,.xls"
//                       onChange={handleFileChange}
//                       className="
//                         block w-full text-sm text-gray-500
//                         file:mr-4 file:py-2 file:px-4
//                         file:rounded-full file:border-0
//                         file:text-sm file:font-semibold
//                         file:bg-[#5B3557] file:text-white
//                         hover:file:bg-[#4A2C48]
//                       "
//                       id="fileInput"
//                     />
//                     <label
//                       htmlFor="fileInput"
//                       className="block w-full text-center text-sm text-gray-500 mt-2"
//                     >
//                       {selectedFile ? selectedFile.name : "No file chosen"}
//                     </label>

//                     {/* Show mismatch error if any */}
//                     {mismatchError && (
//                       <div className="text-red-600 text-sm mt-2 whitespace-pre-line">
//                         {mismatchError}
//                       </div>
//                     )}

//                     <div className="flex items-center gap-4 mt-4">
//                       {/* "Upload File" => "Uploading..." => "Uploaded" logic */}
//                       <button
//                         onClick={handleQuickPrediction}
//                         disabled={!selectedFile || isLoading || !columnsMatch || isUploaded}
//                         className={`
//                           ${
//                             isUploaded
//                               ? "bg-green-600 cursor-not-allowed"
//                               : "bg-[#5B3557] hover:bg-[#4A2C48]"
//                           }
//                           disabled:bg-gray-300
//                           text-white font-medium
//                           py-2 px-4
//                           rounded-lg
//                           transition-colors
//                         `}
//                       >
//                         {isUploaded
//                           ? "Uploaded"
//                           : isLoading
//                           ? "Uploading..."
//                           : "Upload File"}
//                       </button>

//                       {/* “Review Query” is disabled until `predictionFileInfo` is set (upload done) */}
//                       <button
//                         onClick={() => setWizardStep(2)}
//                         disabled={!predictionFileInfo || isLoading}
//                         className="
//                           bg-[#5B3557] hover:bg-[#4A2C48]
//                           disabled:bg-gray-300 disabled:cursor-not-allowed
//                           text-white font-medium
//                           py-2 px-4
//                           rounded-lg
//                           transition-colors
//                         "
//                       >
//                         Review Query
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* STEP 2: Review Queries */}
//               {wizardStep === 2 && predictionFileInfo && (
//                 <div className="space-y-8">
//                   <div className="space-y-2">
//                     <p className="text-sm text-gray-600">
//                       Review the queries that will pull in new data for prediction...
//                     </p>
//                   </div>

//                   {/* Step 2: Replace Tables */}
//                   <div className="border-t border-gray-200 pt-4 space-y-2">
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm font-medium text-gray-700">1</span>
//                       <span className="text-sm text-gray-700">Replace tables</span>
//                     </div>
//                     <p className="text-sm text-gray-600">
//                       The new dataset must have entity & features columns, and not the target column.
//                     </p>
//                     <div className="mt-2 text-sm text-gray-600 space-y-1">
//                       <p>New table: {predictionFileInfo.name}</p>
//                     </div>
//                   </div>

//                   {/* Step 2: Review Query as Notebook */}
//                   <div className="border-t border-gray-200 pt-4 space-y-2">
//                     <div className="flex items-center gap-2">
//                       <span className="text-sm font-medium text-gray-700">2</span>
//                       <span className="text-sm text-gray-700">Review query</span>
//                     </div>

//                     <SQLNotebook
//                       ref={notebookRef}
//                       activeTab="prediction_notebook"
//                       notebookContent={{
//                         file_url: predictionFileInfo.file_url,
//                         entity_column: "",
//                         target_column: "",
//                         features: [],
//                         user_id,
//                         chat_id: predictionFileInfo.chat_id,
//                         isTrained: false,
//                         handleTrainModel: () => {},
//                         cells: buildNotebookCells(),
//                       }}
//                     />
//                   </div>

//                   {/* Step 2 Buttons */}
//                   <div className="flex justify-end gap-4 mt-6">
//                     <button
//                       onClick={() => setWizardStep(1)}
//                       className="
//                         border border-gray-300
//                         hover:bg-gray-50
//                         text-gray-700 font-medium
//                         py-2 px-4
//                         rounded-lg
//                         transition-colors
//                       "
//                     >
//                       Back
//                     </button>
//                     <button
//                       onClick={handlePredictOnNewData}
//                       disabled={isLoading}
//                       className="
//                         bg-[#5B3557] hover:bg-[#4A2C48]
//                         disabled:bg-gray-300
//                         text-white font-medium
//                         py-2 px-4
//                         rounded-lg
//                         transition-colors
//                       "
//                     >
//                       {isLoading ? "Predicting..." : "Predict on New Data"}
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PredictionsUI;




import React, { useState, useEffect, useRef } from "react";
import Papa from "papaparse"; // For parsing CSV
import readXlsxFile from "read-excel-file"; // For parsing Excel (safer alternative to xlsx)
import { Upload, Clock, Monitor, X } from "lucide-react";
import SQLNotebook, { SQLNotebookRef } from "../NotebookUI/Notebook/Notebook";

// ~~~--- Types ---~~~
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

interface PredictionFileInfo {
  id: number;
  name: string;
  file_url: string;
  schema: Array<{ column_name: string; data_type: string }>;
  file_size_mb: number;
  has_date_column: boolean;
  date_columns: string[];
  chat_id: string;
  prediction_queries: {
    sampling_query: string;
    feature_query: string;
  };
  prediction_results: {
    sampling_results: any[];
    feature_results: any[];
  };
}

interface PredictiveSettingsData {
  target_column: string;         // must NOT appear in CSV if not "Null"
  entity_column: string;         // must appear if not "Null"
  time_column: string;           // we ignore it
  predictive_question: string;
  time_frame: string;
  time_frequency: string;
  machine_learning_type: string;
  features: string[];            // must appear if not empty
}

interface PredictionsUIProps {
  user_id: string;
  chat_id: string;
}

const PredictionsUI: React.FC<PredictionsUIProps> = ({ user_id, chat_id }) => {
  console.log("[PredictionsUI] user_id:", user_id, "chat_id:", chat_id);

  const [predictionsData, setPredictionsData] = useState<PredictionMetadata[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);  // The file we ultimately upload
  const [isLoading, setIsLoading] = useState(false);
  const [showPredictionWizard, setShowPredictionWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [predictionFileInfo, setPredictionFileInfo] = useState<PredictionFileInfo | null>(null);

  const notebookRef = useRef<SQLNotebookRef>(null);

  // Hard-coded auth token
  const authToken = "d36e47f0e5c0a356d35a7d6d407aab93f6b0d36b";
  const bucket_name = "pa-documents-storage-bucket";

  // States for dynamic column validation
  const [requiredColumns, setRequiredColumns] = useState<string[]>([]); // entity + features
  const [disallowedTarget, setDisallowedTarget] = useState<string>(""); // target if not "Null"
  const [columnsMatch, setColumnsMatch] = useState<boolean>(true);
  const [mismatchError, setMismatchError] = useState<string>("");

  // 1) On mount or user/chat changes, fetch existing predictions
  useEffect(() => {
    fetchPredictions();
  }, [user_id, chat_id]);

  const fetchPredictions = async () => {
    console.log("[fetchPredictions] Start. user_id:", user_id, "chat_id:", chat_id);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/get_prediction_metadata/?user_id=${user_id}&chat_id=${chat_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${authToken}`,
          },
        }
      );
      if (!response.ok) {
        console.error("[fetchPredictions] Failed to fetch prediction metadata");
        return;
      }
      const data = await response.json();
      setPredictionsData(data.metadata);
      console.log("[fetchPredictions] Received metadata:", data.metadata);
    } catch (error) {
      console.error("[fetchPredictions] Error:", error);
    }
  };

  // 2) When wizard is opened, fetch PredictiveSettings
  useEffect(() => {
    if (!showPredictionWizard) return;

    const fetchPredictiveSettings = async () => {
      console.log("[fetchPredictiveSettings] Start. user_id:", user_id, "chat_id:", chat_id);
      try {
        const url = `http://127.0.0.1:8000/api/predictive-settings/${user_id}/${chat_id}`;
        const resp = await fetch(url);
        if (!resp.ok) {
          throw new Error(`[fetchPredictiveSettings] Failed: ${resp.statusText}`);
        }
        const data: PredictiveSettingsData = await resp.json();
        console.log("[fetchPredictiveSettings] Data:", data);

        // Build required columns ignoring time_column & ignoring "Null"
        const reqCols: string[] = [];
        if (data.entity_column && data.entity_column !== "Null") {
          reqCols.push(data.entity_column);
        }
        if (Array.isArray(data.features)) {
          data.features.forEach((f) => {
            if (f && f !== "Null") {
              reqCols.push(f);
            }
          });
        }

        // If target_column != "Null", user must NOT have it in CSV
        let disTarget = "";
        if (data.target_column && data.target_column !== "Null") {
          disTarget = data.target_column;
        }

        // Normalize them
        const normalizedRequired = reqCols.map((c) => normalizeColumnName(c));
        const normalizedTarget = disTarget ? normalizeColumnName(disTarget) : "";

        setRequiredColumns(normalizedRequired);
        setDisallowedTarget(normalizedTarget);
        setColumnsMatch(true);
        setMismatchError("");
        console.log("[fetchPredictiveSettings] requiredColumns:", normalizedRequired);
        console.log("[fetchPredictiveSettings] disallowedTarget:", normalizedTarget);
      } catch (err) {
        console.error("[fetchPredictiveSettings] Error:", err);
        setColumnsMatch(false);
        setMismatchError(String(err));
      }
    };

    fetchPredictiveSettings();
  }, [showPredictionWizard, user_id, chat_id]);

  // Helper: normalize column names
  const normalizeColumnName = (col: string) => {
    let normalized = col.trim().toLowerCase().replace(/\s+/g, "_");
    normalized = normalized.replace(/[^a-z0-9_]/g, "");
    if (normalized && /^[0-9]/.test(normalized)) {
      normalized = "_" + normalized;
    }
    return normalized;
  };

  // Compare CSV/XLSX columns to requiredColumns + ensure target not present
  const validateColumns = (fileColumns: string[]) => {
    console.log("[validateColumns] File columns:", fileColumns);
    console.log("[validateColumns] requiredColumns:", requiredColumns);
    console.log("[validateColumns] disallowedTarget:", disallowedTarget);

    if (!requiredColumns.length) {
      setColumnsMatch(false);
      setMismatchError("No required columns loaded from PredictiveSettings. Please wait or re-check logs.");
      return;
    }

    const fileSet = new Set(fileColumns);
    const requiredSet = new Set(requiredColumns);

    // 1) Check if file includes all required columns
    const missing: string[] = [];
    for (const needed of requiredSet) {
      if (!fileSet.has(needed)) {
        missing.push(needed);
      }
    }
    if (missing.length > 0) {
      setColumnsMatch(false);
      setMismatchError(
        `Missing required column(s): ${missing.join(", ")}. ` +
        `Please ensure your file includes all required columns.`
      );
      return;
    }

    // 2) If we have a disallowed target, ensure it's not in the file
    if (disallowedTarget && fileSet.has(disallowedTarget)) {
      setColumnsMatch(false);
      setMismatchError(
        `Your file contains the target column "${disallowedTarget}", which must NOT be present. ` +
        `Please remove it from the file.`
      );
      return;
    }

    // 3) Extra columns are allowed, so we won't fail on them
    const extra = [...fileSet].filter((c) => !requiredSet.has(c) && c !== disallowedTarget);
    if (extra.length) {
      console.log("[validateColumns] File has extra columns:", extra);
    }

    // If we get here, columns pass
    setColumnsMatch(true);
    setMismatchError("");
    console.log("[validateColumns] File columns pass validation!");
  };

  // 4) User picks a file => handle CSV vs. XLSX
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log("[handleFileChange] Chosen file:", file.name);
      setSelectedFile(null);
      setColumnsMatch(true);
      setMismatchError("");

      const fileName = file.name.toLowerCase();
      if (fileName.endsWith(".csv")) {
        // ~~~ CSV ~~~
        parseCsvFile(file);
      } else if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
        // ~~~ XLSX/XLS ~~~
        await parseXlsxFile(file);
      } else {
        // Not CSV, XLSX, or XLS => fail
        setColumnsMatch(false);
        setMismatchError("Unsupported file type. Please upload a .csv, .xlsx, or .xls file.");
      }
    }
  };

  // 4a) Parse CSV with Papa
  const parseCsvFile = (file: File) => {
    console.log("[parseCsvFile] Start. file:", file.name);
    Papa.parse(file, {
      preview: 1,      // Read only the header row
      header: true,
      skipEmptyLines: true,
      transformHeader: (colName) => normalizeColumnName(colName),
      complete: (results) => {
        if (results.meta && results.meta.fields) {
          const fileColumns = results.meta.fields;
          console.log("[parseCsvFile] CSV columns:", fileColumns);
          validateColumns(fileColumns);
          // If valid, setSelectedFile => can be used for upload
          if (columnsMatch) {
            setSelectedFile(file);
          }
        } else {
          setColumnsMatch(false);
          setMismatchError("Unable to parse CSV header row. Please ensure there's a valid header row.");
        }
      },
      error: (err) => {
        console.error("[parseCsvFile] Papa parse error:", err);
        setColumnsMatch(false);
        setMismatchError("Error parsing CSV. Check console for details.");
      }
    });
  };

  // 4b) Parse XLSX/XLS with read-excel-file => extract headers for validation
  // const parseXlsxFile = async (file: File) => {
  //   console.log("[parseXlsxFile] Start. file:", file.name);
  //   try {
  //     const rows = await readXlsxFile(file);
  //     const headers = rows[0].map((col: any) => normalizeColumnName(String(col)));
  //     console.log("[parseXlsxFile] XLSX/XLS headers:", headers);

  //     // Validate columns
  //     validateColumns(headers);
  //     if (!columnsMatch) {
  //       console.log("[parseXlsxFile] Columns do NOT match => returning");
  //       return;
  //     }

  //     // Convert rows to CSV (optional, depending on your needs)
  //     const csvData = rows.map(row => row.join(',')).join('\n');
  //     const csvBlob = new Blob([csvData], { type: "text/csv" });
  //     const newFile = new File([csvBlob], file.name.replace(/\.xlsx?|\.xls$/, ".csv"), {
  //       type: "text/csv",
  //     });
  //     console.log("[parseXlsxFile] Created new CSV File object =>", newFile.name);

  //     setSelectedFile(newFile);
  //   } catch (err) {
  //     console.error("[parseXlsxFile] Error:", err);
  //     setColumnsMatch(false);
  //     setMismatchError(`Error parsing XLSX/XLS: ${String(err)}`);
  //   }
  // };


  // 4b) Parse XLSX/XLS with read-excel-file => extract headers for validation
const parseXlsxFile = async (file: File) => {
  console.log("[parseXlsxFile] Start. file:", file.name);
  try {
    // 1) Read entire XLSX
    const rows = await readXlsxFile(file);

    // 2) First row is headers => validate columns
    const headers = rows[0].map((col: any) => normalizeColumnName(String(col)));
    console.log("[parseXlsxFile] XLSX/XLS headers:", headers);
    validateColumns(headers);

    if (!columnsMatch) {
      console.log("[parseXlsxFile] Columns do NOT match => returning");
      return;
    }

    // 3) Convert Date objects to "YYYY-MM-DD HH:mm:ss"
    //    This preserves local date/time without "Fri Feb 05 2010..." strings
    const transformedRows = rows.map((row, rowIndex) =>
      row.map((cell) => {
        if (cell instanceof Date) {
          return formatDate(cell); // see helper below
        }
        return cell;
      })
    );

    // 4) Build CSV from transformed rows
    const csvData = transformedRows
      .map((row) => row.join(",")) // convert each row to a single CSV line
      .join("\n");

    // 5) Turn CSV text into a File object so we can upload
    const csvBlob = new Blob([csvData], { type: "text/csv" });
    const newFile = new File([csvBlob], file.name.replace(/\.xlsx?|\.xls$/, ".csv"), {
      type: "text/csv",
    });
    console.log("[parseXlsxFile] Created new CSV File object =>", newFile.name);

    // 6) Set for upload
    setSelectedFile(newFile);

  } catch (err) {
    console.error("[parseXlsxFile] Error:", err);
    setColumnsMatch(false);
    setMismatchError(`Error parsing XLSX/XLS: ${String(err)}`);
  }
};

// Helper to format JS Date as "YYYY-MM-DD HH:mm:ss"
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

  // Step 1: Upload CSV & generate queries
  const handleQuickPrediction = async () => {
    console.log("[handleQuickPrediction] Start. user_id:", user_id, "chat_id:", chat_id);
    if (!selectedFile) {
      alert("Please select a CSV/XLSX/XLS file first and pass validation.");
      return;
    }
    if (!columnsMatch) {
      alert("File schema doesn't match the required columns. Cannot upload.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("user_id", user_id);
      formData.append("chat_id", chat_id);

      const response = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: {
          Authorization: `Token ${authToken}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      console.log("[handleQuickPrediction] /api/predict/ response:", data);

      if (data.uploaded_files && data.uploaded_files.length > 0) {
        setPredictionFileInfo(data.uploaded_files[0]);
      }
    } catch (error: unknown) {
      console.error("[handleQuickPrediction] Error:", error);
      alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Step 2: Predict on new data
  const handlePredictOnNewData = async () => {
    console.log("[handlePredictOnNewData] Start. user_id:", user_id, "chat_id:", chat_id);
    if (!predictionFileInfo || !notebookRef.current) {
      alert("Please upload a file and review queries before predicting.");
      return;
    }

    setIsLoading(true);
    try {
      const cellResults = await notebookRef.current.runAllCellsAndGetResults();
      console.log("[handlePredictOnNewData] cellResults:", cellResults);

      const saveResp = await fetch("http://127.0.0.1:8000/api/save_prediction_results/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
        body: JSON.stringify({
          user_id,
          chat_id,
          file_id: predictionFileInfo.id,
          cells: cellResults,
        }),
      });
      if (!saveResp.ok) {
        const errText = await saveResp.text();
        throw new Error(errText);
      }
      const saveData = await saveResp.json();
      console.log("[handlePredictOnNewData] Prediction results saved:", saveData);

      alert("Prediction completed successfully!");
      fetchPredictions();
    } catch (error) {
      console.error("[handlePredictOnNewData] Error:", error);
      alert(`Prediction failed: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsLoading(false);
      setShowPredictionWizard(false);
      setWizardStep(1);
      setSelectedFile(null);
      setPredictionFileInfo(null);
    }
  };

  // Build cells for the notebook
  const buildNotebookCells = () => {
    if (!predictionFileInfo) return [];
    return [
      {
        cell_type: "code",
        source: predictionFileInfo.prediction_queries.sampling_query,
        outputs: [],
      },
      {
        cell_type: "code",
        source: predictionFileInfo.prediction_queries.feature_query,
        outputs: [],
      },
    ];
  };

  // Color for status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed": return "text-green-600";
      case "failed": return "text-red-600";
      case "running": return "text-blue-600";
      default: return "text-gray-600";
    }
  };

  const isUploaded = !!predictionFileInfo;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-[#5B3557]">
        <div className="mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-white">Predictions Dashboard</h1>
            <span className="text-sm text-white">
              (User: {user_id}, Chat: {chat_id})
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <div className="mx-auto max-w-screen-xl px-8 py-10 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* LEFT SIDEBAR */}
          <div className="lg:col-span-1 space-y-8">
            {/* Quick Prediction Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Quick Prediction</h2>
              </div>
              <p className="text-sm text-gray-600">
                Upload CSV, and use your model for a one-time prediction on new data.
              </p>
              <button
                onClick={() => {
                  setShowPredictionWizard(true);
                  setWizardStep(1);
                  setSelectedFile(null);
                  setPredictionFileInfo(null);
                  setColumnsMatch(true);
                  setMismatchError("");
                  console.log("[Quick Prediction] Wizard opened. user_id:", user_id, "chat_id:", chat_id);
                }}
                className="
                  w-full
                  bg-[#5B3557] hover:bg-[#4A2C48]
                  text-white font-medium
                  py-2 px-4
                  rounded-lg
                  transition-colors
                "
              >
                One-time predict from csv
              </button>
            </div>

            {/* Scheduled Predictions Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Scheduled Predictions</h2>
              </div>
              <button
                className="
                  w-full
                  border border-gray-300
                  hover:bg-gray-50
                  text-gray-700 font-medium
                  py-2 px-4
                  rounded-lg
                  transition-colors
                "
              >
                Configure Schedule
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT: Prediction History */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Prediction History</h2>
              </div>
              <div className="overflow-x-auto">
                {predictionsData.length === 0 ? (
                  <div className="p-8 text-center bg-gray-100">
                    <Monitor className="mx-auto mb-4 text-gray-400" size={48} />
                    <p className="text-lg text-gray-600">
                      Dashboard will only be available after you train your model
                    </p>
                  </div>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Prediction ID</th>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Start Time</th>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Duration</th>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Entity Count</th>
                        <th className="px-6 py-3 text-left font-medium tracking-wider">Results</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {predictionsData.map((data) => (
                        <tr key={data.prediction_id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap font-mono text-gray-900">
                            {data.prediction_id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {new Date(data.start_time).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={getStatusColor(data.status)}>
                              {data.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {data.duration ? `${data.duration.toFixed(2)}s` : "−"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                            {data.entity_count}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {data.predictions_csv_path ? (
                              <a
                                href={`https://s3.amazonaws.com/${bucket_name}/${data.predictions_csv_path}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                Download CSV
                              </a>
                            ) : (
                              "−"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* PREDICTION WIZARD MODAL */}
        {showPredictionWizard && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              className="
                bg-white rounded-xl shadow-2xl
                w-full max-w-7xl
                max-h-[90vh]
                overflow-y-auto
                p-8
                relative
              "
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Select Data to Predict 
                </h2>
                <button
                  onClick={() => {
                    setShowPredictionWizard(false);
                    setWizardStep(1);
                    setSelectedFile(null);
                    setPredictionFileInfo(null);
                    setColumnsMatch(true);
                    setMismatchError("");
                    console.log("[Wizard] closed. user_id:", user_id, "chat_id:", chat_id);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* STEP 1: Upload CSV */}
              {wizardStep === 1 && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong className="text-purple-800 font-medium">Important:</strong> Your CSV must include the 
                      <span className="text-purple-800 font-medium"> entity & feature columns </span>
                      from the trained model, but <em>exclude</em> the target column.
                      <br />
                      Time column is optional, and extra columns are allowed.
                    </p>
                    {requiredColumns.length > 0 && (
                      <p className="text-sm text-gray-500">
                        <strong className="text-purple-800 font-medium">Required:</strong> {requiredColumns.join(", ")}
                        {disallowedTarget && (
                          <>
                            <br />
                            <strong className="text-red-600 font-medium">Excluded:</strong> {disallowedTarget}
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-4">
                    <p className="text-sm text-gray-600">Upload your CSV Below</p>

                    {/* File Input */}
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileChange}
                      className="
                        block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-[#5B3557] file:text-white
                        hover:file:bg-[#4A2C48]
                      "
                      id="fileInput"
                    />
                    <label
                      htmlFor="fileInput"
                      className="block w-full text-center text-sm text-gray-500 mt-2"
                    >
                      {selectedFile ? selectedFile.name : "No file chosen"}
                    </label>

                    {/* Show mismatch error if any, styled to match your screenshots */}
                    {mismatchError && (
                      <div className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-sm text-gray-700 rounded-r">
                        {mismatchError}
                      </div>
                    )}

                    <div className="flex items-center gap-4 mt-4">
                      {/* "Upload File" => "Uploading..." => "Uploaded" logic */}
                      <button
                        onClick={handleQuickPrediction}
                        disabled={!selectedFile || isLoading || !columnsMatch || isUploaded}
                        className={`
                          ${
                            isUploaded
                              ? "bg-green-600 cursor-not-allowed"
                              : "bg-[#5B3557] hover:bg-[#4A2C48]"
                          }
                          disabled:bg-gray-300
                          text-white font-medium
                          py-2 px-4
                          rounded-lg
                          transition-colors
                        `}
                      >
                        {isUploaded
                          ? "Uploaded"
                          : isLoading
                          ? "Uploading..."
                          : "Upload File"}
                      </button>

                      {/* “Review Query” is disabled until `predictionFileInfo` is set (upload done) */}
                      <button
                        onClick={() => setWizardStep(2)}
                        disabled={!predictionFileInfo || isLoading}
                        className="
                          bg-[#5B3557] hover:bg-[#4A2C48]
                          disabled:bg-gray-300 disabled:cursor-not-allowed
                          text-white font-medium
                          py-2 px-4
                          rounded-lg
                          transition-colors
                        "
                      >
                        Review Query
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Review Queries */}
              {wizardStep === 2 && predictionFileInfo && (
                <div className="space-y-8">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      Review the queries that will pull in new data for prediction...
                    </p>
                  </div>

                  {/* Step 2: Replace Tables */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">1</span>
                      <span className="text-sm text-gray-700">Replace tables</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      The new dataset must have entity & features columns, and not the target column.
                    </p>
                    <div className="mt-2 text-sm text-gray-600 space-y-1">
                      <p>New table: {predictionFileInfo.name}</p>
                    </div>
                  </div>

                  {/* Step 2: Review Query as Notebook */}
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">2</span>
                      <span className="text-sm text-gray-700">Review query</span>
                    </div>

                    <SQLNotebook
                      ref={notebookRef}
                      activeTab="prediction_notebook"
                      notebookContent={{
                        file_url: predictionFileInfo.file_url,
                        entity_column: "",
                        target_column: "",
                        features: [],
                        user_id,
                        chat_id: predictionFileInfo.chat_id,
                        isTrained: false,
                        handleTrainModel: () => {},
                        cells: buildNotebookCells(),
                      }}
                    />
                  </div>

                  {/* Step 2 Buttons */}
                  <div className="flex justify-end gap-4 mt-6">
                    <button
                      onClick={() => setWizardStep(1)}
                      className="
                        border border-gray-300
                        hover:bg-gray-50
                        text-gray-700 font-medium
                        py-2 px-4
                        rounded-lg
                        transition-colors
                      "
                    >
                      Back
                    </button>
                    <button
                      onClick={handlePredictOnNewData}
                      disabled={isLoading}
                      className="
                        bg-[#5B3557] hover:bg-[#4A2C48]
                        disabled:bg-gray-300
                        text-white font-medium
                        py-2 px-4
                        rounded-lg
                        transition-colors
                      "
                    >
                      {isLoading ? "Predicting..." : "Predict on New Data"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionsUI;