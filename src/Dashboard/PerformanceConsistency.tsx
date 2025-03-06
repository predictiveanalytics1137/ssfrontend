// // // // // // import React, { useEffect, useState } from "react";

// // // // // // interface Metrics {
// // // // // //   mae: number;
// // // // // //   rmse: number;
// // // // // //   r2_score: number;
// // // // // // }

// // // // // // interface ModelMetrics {
// // // // // //   testing: Metrics;
// // // // // //   training: Metrics;
// // // // // //   assessment: string;
// // // // // // }

// // // // // // const PerformanceConsistency: React.FC = () => {
// // // // // //   const [metrics, setMetrics] = useState<ModelMetrics | null>(null);

// // // // // //   useEffect(() => {
// // // // // //     // Fetch data from the API
// // // // // //     fetch(" http://98.70.25.52/model/modelget/4")
// // // // // //       .then((response) => response.json())
// // // // // //       .then((data) => {
// // // // // //         setMetrics(data.model_metrics);
// // // // // //       })
// // // // // //       .catch((error) => console.error("Error fetching metrics:", error));
// // // // // //   }, []);

// // // // // //   if (!metrics) {
// // // // // //     return <div className="text-center mt-8">Loading metrics...</div>;
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="p-6 bg-gray-100 min-h-screen">
// // // // // //       <h2 className="text-xl font-semibold mb-4">Performance Consistency (Overfit)</h2>
// // // // // //       <div className="border rounded-lg shadow-sm p-4 bg-white">
// // // // // //         <div className="mb-4">
// // // // // //           <p className="text-lg font-medium">
// // // // // //             Compare model results on train and test sets to ensure stability.
// // // // // //           </p>
// // // // // //           <button className="text-blue-500 underline text-sm mt-1">
// // // // // //             Explain
// // // // // //           </button>
// // // // // //         </div>
// // // // // //         <div className="grid grid-cols-2 gap-6">
// // // // // //           <div className="border p-4 rounded-lg bg-gray-50">
// // // // // //             <h3 className="text-md font-medium mb-2">Train & Validation Set R²</h3>
// // // // // //             <div className="bg-blue-200 rounded-full h-6">
// // // // // //               <div
// // // // // //                 className="bg-blue-500 h-6 rounded-full text-center text-white text-sm"
// // // // // //                 style={{ width: `${metrics.training.r2_score * 100}%` }}
// // // // // //               >
// // // // // //                 {(metrics.training.r2_score * 100).toFixed(1)}%
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //           <div className="border p-4 rounded-lg bg-gray-50">
// // // // // //             <h3 className="text-md font-medium mb-2">Test Set R²</h3>
// // // // // //             <div className="bg-blue-200 rounded-full h-6">
// // // // // //               <div
// // // // // //                 className="bg-blue-500 h-6 rounded-full text-center text-white text-sm"
// // // // // //                 style={{ width: `${metrics.testing.r2_score * 100}%` }}
// // // // // //               >
// // // // // //                 {(metrics.testing.r2_score * 100).toFixed(1)}%
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //         <div className="mt-4 p-4 border-l-4 border-yellow-400 bg-yellow-50">
// // // // // //           <p className="text-yellow-800 text-sm font-medium">
// // // // // //             <strong>Warning:</strong> Your model shows better results on training data than on test data.
// // // // // //           </p>
// // // // // //           <p className="text-yellow-800 text-sm mt-1">
// // // // // //             This suggests a potential case of overfitting, where the model is well-tuned to the known training data
// // // // // //             but struggles to predict on unfamiliar test data.
// // // // // //           </p>
// // // // // //           <button className="text-blue-500 underline text-sm mt-1">How to fix this</button>
// // // // // //         </div>
// // // // // //         <div className="mt-4 p-4 border-l-4 border-blue-400 bg-blue-50">
// // // // // //           <p className="text-blue-800 text-sm">
// // // // // //             <strong>Why is this interesting?</strong> Performance consistency between train and test is an important
// // // // // //             indicator that the model can predict accurately on data it has not previously encountered. If the training
// // // // // //             set yields significantly better results than the test set, it is similar to memorizing specific answers
// // // // // //             without studying the material.
// // // // // //           </p>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default PerformanceConsistency;




// // // // // // PerformanceConsistency.tsx
// // // // // import React from "react";

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
// // // // //   attribute_columns: string[];
// // // // //   feature_importance: Record<string, number>;
// // // // //   core_statistics: Record<string, any>;
// // // // //   attribute_statistics: Record<string, any>;
// // // // //   predictions: {
// // // // //     actual: number[];
// // // // //     predicted: number[];
// // // // //   };
// // // // //   user_id: string;
// // // // //   chat_id: string;
// // // // // }

// // // // // interface PerformanceConsistencyProps {
// // // // //   modelData: MetricsData;
// // // // // }

// // // // // const PerformanceConsistency: React.FC<PerformanceConsistencyProps> = ({ modelData }) => {
// // // // //   if (!modelData || !modelData.model_metrics) {
// // // // //     return <div className="text-center mt-8">No metrics data available</div>;
// // // // //   }

// // // // //   const metrics = modelData.model_metrics;
// // // // //   const trainingR2 = metrics.training.r2_score;
// // // // //   const testingR2 = metrics.testing.r2_score;

// // // // //   return (
// // // // //     <div className="p-6 bg-gray-100 min-h-screen">
// // // // //       <h2 className="text-xl font-semibold mb-4">Performance Consistency (Overfit)</h2>
// // // // //       <div className="border rounded-lg shadow-sm p-4 bg-white">
// // // // //         <div className="mb-4">
// // // // //           <p className="text-lg font-medium">
// // // // //             Compare model results on train and test sets to ensure stability.
// // // // //           </p>
// // // // //           <button className="text-blue-500 underline text-sm mt-1">
// // // // //             Explain
// // // // //           </button>
// // // // //         </div>
// // // // //         <div className="grid grid-cols-2 gap-6">
// // // // //           <div className="border p-4 rounded-lg bg-gray-50">
// // // // //             <h3 className="text-md font-medium mb-2">Train & Validation Set R²</h3>
// // // // //             <div className="bg-blue-200 rounded-full h-6">
// // // // //               <div
// // // // //                 className="bg-blue-500 h-6 rounded-full text-center text-white text-sm"
// // // // //                 style={{ width: `${trainingR2 * 100}%` }}
// // // // //               >
// // // // //                 {(trainingR2 * 100).toFixed(1)}%
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="border p-4 rounded-lg bg-gray-50">
// // // // //             <h3 className="text-md font-medium mb-2">Test Set R²</h3>
// // // // //             <div className="bg-blue-200 rounded-full h-6">
// // // // //               <div
// // // // //                 className="bg-blue-500 h-6 rounded-full text-center text-white text-sm"
// // // // //                 style={{ width: `${testingR2 * 100}%` }}
// // // // //               >
// // // // //                 {(testingR2 * 100).toFixed(1)}%
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //         <div className="mt-4 p-4 border-l-4 border-yellow-400 bg-yellow-50">
// // // // //           <p className="text-yellow-800 text-sm font-medium">
// // // // //             <strong>Warning:</strong> Your model shows better results on training data than on test data.
// // // // //           </p>
// // // // //           <p className="text-yellow-800 text-sm mt-1">
// // // // //             This suggests a potential case of overfitting...
// // // // //           </p>
// // // // //           <button className="text-blue-500 underline text-sm mt-1">How to fix this</button>
// // // // //         </div>
// // // // //         <div className="mt-4 p-4 border-l-4 border-blue-400 bg-blue-50">
// // // // //           <p className="text-blue-800 text-sm">
// // // // //             <strong>Why is this interesting?</strong> Performance consistency between train and test is important...
// // // // //           </p>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default PerformanceConsistency;



// // // // import React, { useState } from 'react';
// // // // import { Info, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

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
// // // // }

// // // // interface PerformanceConsistencyProps {
// // // //   modelData: MetricsData;
// // // // }

// // // // const PerformanceConsistency: React.FC<PerformanceConsistencyProps> = ({ modelData }) => {
// // // //   const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');

// // // //   if (!modelData || !modelData.model_metrics) {
// // // //     return (
// // // //       <div className="flex items-center justify-center min-h-screen bg-gray-100">
// // // //         <div className="text-center bg-white p-6 rounded-lg shadow-lg">
// // // //           <Info className="mx-auto mb-4 text-teal-500" size={48} />
// // // //           <h2 className="text-lg font-medium text-gray-700 mb-2">No Metrics Data Available</h2>
// // // //           <p className="text-sm text-gray-500">Please upload or generate model metrics to view performance consistency.</p>
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const metrics = modelData.model_metrics;
// // // //   const trainingR2 = metrics.training.r2_score;
// // // //   const testingR2 = metrics.testing.r2_score;

// // // //   const r2BarStyle = (score: number) => {
// // // //     if (score < 0.5) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
// // // //     if (score < 0.7) return 'bg-gradient-to-r from-blue-400 to-blue-500';
// // // //     return 'bg-gradient-to-r from-green-400 to-green-500';
// // // //   };

// // // //   const renderR2Indicator = (score: number, label: string) => (
// // // //     <div className="bg-white rounded-md shadow-md p-4 flex flex-col">
// // // //       <h3 className="text-sm font-semibold text-gray-600 mb-1">{label}</h3>
// // // //       <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
// // // //         <div
// // // //           className={`${r2BarStyle(score)} h-full transition-all`}
// // // //           style={{ width: `${score * 100}%` }}
// // // //         />
// // // //       </div>
// // // //       <p className="text-xs text-gray-500 mt-2">
// // // //         r² score: <span className="font-medium text-gray-700">{(score * 100).toFixed(1)}%</span>
// // // //       </p>
// // // //     </div>
// // // //   );

// // // //   const renderWarning = () => (
// // // //     <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md flex items-start gap-3 shadow-sm">
// // // //       <AlertTriangle className="text-yellow-500 flex-shrink-0" size={20} />
// // // //       <div>
// // // //         <h4 className="text-sm font-semibold text-yellow-700">Potential Overfitting Detected</h4>
// // // //         <p className="text-xs text-gray-600">
// // // //           The model shows significant differences between training and testing performance.
// // // //         </p>
// // // //         <button
// // // //           className="text-teal-500 text-xs mt-2 underline hover:text-teal-600"
// // // //           onClick={() => alert('Learn more about mitigating overfitting.')}
// // // //         >
// // // //           Learn How to Mitigate
// // // //         </button>
// // // //       </div>
// // // //     </div>
// // // //   );

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
// // // //       <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
// // // //         {/* Tabs */}
// // // //         <div className="px-6 py-4 bg-gradient-to-r from-teal-50 to-blue-50 border-b border-gray-200 flex justify-between items-center">
// // // //           <h2 className="text-lg font-medium text-gray-700">Model Performance</h2>
// // // //           <div className="flex gap-2">
// // // //             <button
// // // //               onClick={() => setActiveTab('overview')}
// // // //               className={`px-4 py-1.5 text-xs rounded-full transition ${
// // // //                 activeTab === 'overview'
// // // //                   ? 'bg-teal-500 text-white'
// // // //                   : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
// // // //               }`}
// // // //             >
// // // //               Overview
// // // //             </button>
// // // //             <button
// // // //               onClick={() => setActiveTab('details')}
// // // //               className={`px-4 py-1.5 text-xs rounded-full transition ${
// // // //                 activeTab === 'details'
// // // //                   ? 'bg-teal-500 text-white'
// // // //                   : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
// // // //               }`}
// // // //             >
// // // //               Details
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         {/* Overview Tab */}
// // // //         {activeTab === 'overview' && (
// // // //           <div className="p-6 space-y-6">
// // // //             <div className="grid md:grid-cols-2 gap-6">
// // // //               {renderR2Indicator(trainingR2, 'Training Set r²')}
// // // //               {renderR2Indicator(testingR2, 'Testing Set r²')}
// // // //             </div>
// // // //             {trainingR2 - testingR2 > 0.1 && renderWarning()}
// // // //             <div className="bg-teal-50 p-4 rounded-md text-xs text-gray-600">
// // // //               <p>
// // // //                 <strong>Why This Matters:</strong> Consistent performance across training and test
// // // //                 sets indicates a robust model that generalizes well to unseen data.
// // // //               </p>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Details Tab */}
// // // //         {activeTab === 'details' && (
// // // //           <div className="p-6 space-y-4 text-sm text-gray-700">
// // // //             <div className="bg-gray-50 p-4 rounded-md">
// // // //               <h3 className="font-semibold text-gray-600 mb-2">Full Metrics</h3>
// // // //               <div className="grid grid-cols-2 gap-3 text-xs">
// // // //                 <p>
// // // //                   <span className="font-medium text-gray-700">Training RMSE:</span>{' '}
// // // //                   {metrics.training.rmse.toFixed(4)}
// // // //                 </p>
// // // //                 <p>
// // // //                   <span className="font-medium text-gray-700">Test RMSE:</span>{' '}
// // // //                   {metrics.testing.rmse.toFixed(4)}
// // // //                 </p>
// // // //                 <p>
// // // //                   <span className="font-medium text-gray-700">Training MAE:</span>{' '}
// // // //                   {metrics.training.mae.toFixed(4)}
// // // //                 </p>
// // // //                 <p>
// // // //                   <span className="font-medium text-gray-700">Test MAE:</span>{' '}
// // // //                   {metrics.testing.mae.toFixed(4)}
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //             <div className="bg-gray-50 p-4 rounded-md">
// // // //               <h3 className="font-semibold text-gray-600 mb-2">Model Assessment</h3>
// // // //               <p>{metrics.assessment}</p>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default PerformanceConsistency;




// // // import React, { useState } from "react";
// // // import { AlertTriangle, TrendingUp, TrendingDown, Info } from "lucide-react";

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

// // // interface PerformanceConsistencyProps {
// // //   modelMetrics: ModelMetrics;
// // //   headings: {
// // //     main: string;
// // //     description: string;
// // //   };
// // //   labels: {
// // //     training: string;
// // //     testing: string;
// // //   };
// // //   warnings: {
// // //     condition: boolean;
// // //     message: string;
// // //   };
// // // }

// // // const PerformanceConsistency: React.FC<PerformanceConsistencyProps> = ({
// // //   modelMetrics,
// // //   headings,
// // //   labels,
// // //   warnings,
// // // }) => {
// // //   const [activeTab, setActiveTab] = useState<"overview" | "details">("overview");

// // //   const trainingR2 = modelMetrics.training.r2_score;
// // //   const testingR2 = modelMetrics.testing.r2_score;

// // //   const renderR2Indicator = (score: number, label: string) => (
// // //     <div className="bg-gray-50 rounded-md p-4 shadow">
// // //       <h3 className="text-sm font-semibold text-gray-700 mb-2">{label}</h3>
// // //       <div className="w-full bg-gray-200 h-3 rounded-full">
// // //         <div
// // //           className={`h-full rounded-full ${
// // //             score >= 0.7
// // //               ? "bg-green-500"
// // //               : score >= 0.5
// // //               ? "bg-blue-400"
// // //               : "bg-yellow-500"
// // //           }`}
// // //           style={{ width: `${score * 100}%` }}
// // //         />
// // //       </div>
// // //       <p className="text-xs mt-2 text-gray-600">
// // //         R² Score: <span className="font-medium">{(score * 100).toFixed(2)}%</span>
// // //       </p>
// // //     </div>
// // //   );

// // //   const renderWarning = () => (
// // //     <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md flex items-start gap-3">
// // //       <AlertTriangle className="text-yellow-500" size={20} />
// // //       <div>
// // //         <h4 className="text-sm font-semibold text-yellow-700">Warning</h4>
// // //         <p className="text-xs text-gray-600">{warnings.message}</p>
// // //       </div>
// // //     </div>
// // //   );

// // //   return (
// // //     <div className="p-6 bg-white rounded-lg shadow-md">
// // //       {/* Header */}
// // //       <div className="mb-6">
// // //         <h2 className="text-xl font-semibold text-gray-800">{headings.main}</h2>
// // //         <p className="text-sm text-gray-500 mt-1">{headings.description}</p>
// // //       </div>

// // //       {/* Tabs */}
// // //       <div className="flex space-x-4 mb-4">
// // //         <button
// // //           onClick={() => setActiveTab("overview")}
// // //           className={`px-4 py-2 text-sm font-medium rounded ${
// // //             activeTab === "overview"
// // //               ? "bg-blue-500 text-white"
// // //               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// // //           }`}
// // //         >
// // //           Overview
// // //         </button>
// // //         <button
// // //           onClick={() => setActiveTab("details")}
// // //           className={`px-4 py-2 text-sm font-medium rounded ${
// // //             activeTab === "details"
// // //               ? "bg-blue-500 text-white"
// // //               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// // //           }`}
// // //         >
// // //           Details
// // //         </button>
// // //       </div>

// // //       {/* Overview Tab */}
// // //       {activeTab === "overview" && (
// // //         <div className="space-y-4">
// // //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //             {renderR2Indicator(trainingR2, labels.training)}
// // //             {renderR2Indicator(testingR2, labels.testing)}
// // //           </div>
// // //           {warnings.condition && renderWarning()}
// // //         </div>
// // //       )}

// // //       {/* Details Tab */}
// // //       {activeTab === "details" && (
// // //         <div className="space-y-4 text-gray-700 text-sm">
// // //           <div className="bg-gray-50 p-4 rounded-md shadow">
// // //             <h3 className="font-semibold mb-2">Model Metrics</h3>
// // //             <div className="grid grid-cols-2 gap-2">
// // //               <p>Training RMSE: {modelMetrics.training.rmse.toFixed(4)}</p>
// // //               <p>Testing RMSE: {modelMetrics.testing.rmse.toFixed(4)}</p>
// // //               <p>Training MAE: {modelMetrics.training.mae.toFixed(4)}</p>
// // //               <p>Testing MAE: {modelMetrics.testing.mae.toFixed(4)}</p>
// // //             </div>
// // //           </div>
// // //           <div className="bg-gray-50 p-4 rounded-md shadow">
// // //             <h3 className="font-semibold mb-2">Model Assessment</h3>
// // //             <p>{modelMetrics.assessment}</p>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default PerformanceConsistency;



// // import React, { useState } from "react";
// // import { AlertTriangle } from "lucide-react";

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

// // interface PerformanceConsistencyProps {
// //   modelMetrics: ModelMetrics;
// //   headings: {
// //     main: string;
// //     description: string;
// //   };
// //   labels: {
// //     training: string;
// //     testing: string;
// //   };
// //   warnings: {
// //     condition: boolean;
// //     message: string;
// //   };
// // }

// // const PerformanceConsistency: React.FC<PerformanceConsistencyProps> = ({
// //   modelMetrics,
// //   headings,
// //   labels,
// //   warnings,
// // }) => {
// //   const [activeTab, setActiveTab] = useState<"overview" | "details">("overview");

// //   const trainingR2 = modelMetrics.training.r2_score;
// //   const testingR2 = modelMetrics.testing.r2_score;

// //   const renderR2Indicator = (score: number, label: string) => (
// //     <div className="bg-gray-50 rounded-md p-4 shadow">
// //       <h3 className="text-sm font-semibold text-gray-700 mb-2">{label}</h3>
// //       <div className="w-full bg-gray-200 h-3 rounded-full">
// //         <div
// //           className={`h-full rounded-full ${
// //             score >= 0.7
// //               ? "bg-green-500"
// //               : score >= 0.5
// //               ? "bg-blue-400"
// //               : "bg-yellow-500"
// //           }`}
// //           style={{ width: `${score * 100}%` }}
// //         />
// //       </div>
// //       <p className="text-xs mt-2 text-gray-600">
// //         R² Score: <span className="font-medium">{(score * 100).toFixed(2)}%</span>
// //       </p>
// //     </div>
// //   );

// //   const renderWarning = () => (
// //     <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md flex items-start gap-3">
// //       <AlertTriangle className="text-yellow-500" size={20} />
// //       <div>
// //         <h4 className="text-sm font-semibold text-yellow-700">Model Assessment</h4>
// //         <p className="text-xs text-gray-600">{warnings.message}</p>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <div className="p-6 bg-white rounded-lg shadow-md">
// //       {/* Header */}
// //       <div className="mb-6">
// //         <h2 className="text-xl font-semibold text-gray-800">{headings.main}</h2>
// //         <p className="text-sm text-gray-500 mt-1">{headings.description}</p>
// //       </div>

// //       {/* Tabs */}
// //       <div className="flex space-x-4 mb-4">
// //         <button
// //           onClick={() => setActiveTab("overview")}
// //           className={`px-4 py-2 text-sm font-medium rounded ${
// //             activeTab === "overview"
// //               ? "bg-blue-500 text-white"
// //               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //           }`}
// //         >
// //           Overview
// //         </button>
// //         <button
// //           onClick={() => setActiveTab("details")}
// //           className={`px-4 py-2 text-sm font-medium rounded ${
// //             activeTab === "details"
// //               ? "bg-blue-500 text-white"
// //               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
// //           }`}
// //         >
// //           Details
// //         </button>
// //       </div>

// //       {/* Overview Tab */}
// //       {activeTab === "overview" && (
// //         <div className="space-y-4">
// //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //             {renderR2Indicator(trainingR2, labels.training)}
// //             {renderR2Indicator(testingR2, labels.testing)}
// //           </div>
// //           {warnings.condition && renderWarning()}
// //         </div>
// //       )}

// //       {/* Details Tab */}
// //       {activeTab === "details" && (
// //         <div className="space-y-4 text-gray-700 text-sm">
// //           <div className="bg-gray-50 p-4 rounded-md shadow">
// //             <h3 className="font-semibold mb-2">Model Metrics</h3>
// //             <div className="grid grid-cols-2 gap-2">
// //               <p>Training RMSE: {modelMetrics.training.rmse.toFixed(4)}</p>
// //               <p>Testing RMSE: {modelMetrics.testing.rmse.toFixed(4)}</p>
// //               <p>Training MAE: {modelMetrics.training.mae.toFixed(4)}</p>
// //               <p>Testing MAE: {modelMetrics.testing.mae.toFixed(4)}</p>
// //             </div>
// //           </div>
// //           <div className="bg-gray-50 p-4 rounded-md shadow">
// //             <h3 className="font-semibold mb-2">Model Assessment</h3>
// //             <p>{modelMetrics.assessment}</p>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PerformanceConsistency;




// import React, { useState, useMemo } from "react";
// import { AlertTriangle, Info, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

// interface Metrics {
//   mae: number;
//   rmse: number;
//   r2_score: number;
// }

// interface ModelMetrics {
//   validation: Metrics;
//   assessment: string;
// }

// interface PerformanceConsistencyProps {
//   modelMetrics: ModelMetrics;
//   headings: {
//     main: string;
//     description: string;
//   };
//   labels: {
//     validation: string;
//   };
//   warnings: {
//     condition: boolean;
//     message: string;
//   };
// }

// const PerformanceConsistency: React.FC<PerformanceConsistencyProps> = ({
//   modelMetrics,
//   headings,
//   labels,
//   warnings,
// }) => {
//   const [activeTab, setActiveTab] = useState<"overview" | "details">("overview");
//   const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
//   const [showInfo, setShowInfo] = useState<{
//     [key: string]: boolean;
//   }>({});

//   // Memoize metrics for performance, with fallback for invalid values
//   const validationR2 = useMemo(() => {
//     const r2 = modelMetrics.validation.r2_score || 0;
//     return r2 >= -1 && r2 <= 1 ? r2 : 0; // Ensure R² is within valid range (-1 to 1)
//   }, [modelMetrics.validation.r2_score]);

//   const validationMAE = useMemo(() => {
//     const mae = modelMetrics.validation.mae || 0;
//     return mae >= 0 ? mae.toFixed(4) : "0.0000";
//   }, [modelMetrics.validation.mae]);

//   const validationRMSE = useMemo(() => {
//     const rmse = modelMetrics.validation.rmse || 0;
//     return rmse >= 0 ? rmse.toFixed(4) : "0.0000";
//   }, [modelMetrics.validation.rmse]);

//   // Dynamic info content based on ML output, with combined beginner and expert explanations
//   const getInfoContent = (key: string) => {
//     const r2Percentage = (validationR2 * 100).toFixed(2);
//     const assessment = modelMetrics.assessment || "Not Assessed";
//     switch (key) {
//       case "overview":
//         return (
//           <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
//             <p className="flex items-start gap-1">
//               <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
//               <strong>Overview:</strong> This section shows how well your model predicts
//               values using the R² score ({r2Percentage}%), which measures how much of the
//               actual data’s variation the model explains. A value close to 100% (or 1.0)
//               indicates excellent predictions, but your model’s {r2Percentage}% (negative)
//               suggests poor performance, worse than guessing the average. This is a useful
//               indicator for assessing model accuracy—lower (or negative) values signal
//               potential underfitting or data issues, prompting adjustments like adding
//               features, tuning the model, or improving data quality.
//             </p>
//           </div>
//         );
//       case "details":
//         return (
//           <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
//             <p className="flex items-start gap-1">
//               <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
//               <strong>Details:</strong> These metrics provide insight into your model’s
//               accuracy:
//             </p>
//             <ul className="list-disc pl-4 mt-1 text-xs">
//               <li className="flex items-start gap-1">
//                 <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
//                 <strong>MAE ({validationMAE}):</strong> The average absolute difference
//                 between predicted and actual values, indicating prediction error. Your
//                 {validationMAE} means predictions are off by {validationMAE} units on
//                 average—lower values are better, suggesting higher accuracy. This helps
//                 identify overall prediction quality and guides model improvements.
//               </li>
//               <li className="flex items-start gap-1">
//                 <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
//                 <strong>RMSE ({validationRMSE}):</strong> Emphasizes larger errors,
//                 providing a measure of prediction accuracy. Your {validationRMSE} suggests
//                 significant deviations in some predictions—lower values are preferable,
//                 and this metric is useful for detecting outliers or major errors in the
//                 model.
//               </li>
//               <li className="flex items-start gap-1">
//                 <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
//                 <strong>R² Score ({validationR2.toFixed(2)}):</strong> Measures how well
//                 predictions explain actual values. Your -{Math.abs(Number(validationR2.toFixed(2)))}
//                 indicates poor fit, worse than predicting the average, signaling potential
//                 underfitting or data issues that require attention, such as adding
//                 features or addressing data quality.
//               </li>
//             </ul>
//           </div>
//         );
//       case "warning":
//         return (
//           <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
//             <p className="flex items-start gap-1">
//               <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
//               <strong>Model Warning:</strong> The assessment “{warnings.message}” (e.g.,
//               “Underfitting”) indicates your model is too simple to capture the data’s
//               complexity, leading to poor predictions (R² = {validationR2.toFixed(2)}).
//               Your MAE is {validationMAE} and RMSE is {validationRMSE}, highlighting
//               significant errors. This suggests you may need to add more features, tune
//               the model, improve data quality, or use techniques like regularization to
//               enhance performance.
//             </p>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   const renderR2Indicator = () => (
//     <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
//       <div className="flex justify-between items-center mb-3">
//         <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1">
//           {labels.validation} R² Score
//           <Info
//             className="text-gray-400 w-3 h-3 cursor-pointer"
//             onClick={() => setShowInfo((prev) => ({ ...prev, overview: !prev.overview }))}
//           />
//         </h3>
//       </div>
//       {showInfo.overview && getInfoContent("overview")}
//       <div className="w-full bg-gray-200 h-2 rounded-full">
//         <div
//           className={`h-full rounded-full ${
//             validationR2 >= 0.7
//               ? "bg-green-500"
//               : validationR2 >= 0.5
//               ? "bg-blue-400"
//               : "bg-yellow-500"
//           }`}
//           style={{ width: `${Math.max(validationR2 * 100, 0)}%` }}
//         />
//       </div>
//       <p className="text-xs mt-2 text-gray-600">
//         Value: <span className="font-medium">{(validationR2 * 100).toFixed(2)}%</span>
//       </p>
//     </div>
//   );

//   const renderWarning = () => (
//     <div className="p-4 bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 mb-6 flex items-start gap-2 animate-pulse-slow">
//       <AlertTriangle className="text-yellow-500 w-4 h-4 mt-0.5" />
//       <div>
//         <h4 className="text-xs font-medium text-yellow-700 mb-1">Model Alert</h4>
//         <p className="text-xs text-gray-600">{warnings.message}</p>
//         <Info
//           className="text-gray-400 w-3 h-3 cursor-pointer mt-1"
//           onClick={() => setShowInfo((prev) => ({ ...prev, warning: !prev.warning }))}
//         />
//         {showInfo.warning && getInfoContent("warning")}
//       </div>
//     </div>
//   );

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
//       {/* Header */}
//       <div className="mb-10">
//         <h2 className="text-sm font-semibold text-gray-800">{headings.main}</h2>
//         <p className="text-xs text-gray-500 mt-1">{headings.description}</p>
//       </div>

//       {/* Tabs */}
//       <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
//         <button
//           onClick={() => setActiveTab("overview")}
//           className={`px-3 py-2 text-xs font-medium rounded-md ${
//             activeTab === "overview"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//           } transition-colors duration-200`}
//         >
//           Overview
//         </button>
//         <button
//           onClick={() => setActiveTab("details")}
//           className={`px-3 py-2 text-xs font-medium rounded-md ${
//             activeTab === "details"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//           } transition-colors duration-200`}
//         >
//           Details
//         </button>
//       </div>

//       {/* Content */}
//       {activeTab === "overview" && (
//         <div className="space-y-8">
//           {renderR2Indicator()}
//           {warnings.condition && renderWarning()}
//         </div>
//       )}

//       {activeTab === "details" && (
//         <div className="space-y-8">
//           <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
//             <div
//               className="cursor-pointer flex justify-between items-center border-b border-gray-200 pb-3 mb-4"
//               onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
//             >
//               <h3 className="text-sm font-medium text-gray-800">Model Metrics</h3>
//               {isDetailsExpanded ? (
//                 <ChevronUp className="text-gray-500 w-4 h-4" />
//               ) : (
//                 <ChevronDown className="text-gray-500 w-4 h-4" />
//               )}
//             </div>
//             {isDetailsExpanded && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-gray-700 animate-fade-in">
//                 <p className="flex items-center gap-1">
//                   <HelpCircle className="text-gray-400 w-3 h-3" />
//                   MAE: {validationMAE}
//                 </p>
//                 <p className="flex items-center gap-1">
//                   <HelpCircle className="text-gray-400 w-3 h-3" />
//                   RMSE: {validationRMSE}
//                 </p>
//                 <p className="flex items-center gap-1">
//                   <HelpCircle className="text-gray-400 w-3 h-3" />
//                   R² Score: {validationR2.toFixed(4)}
//                 </p>
//               </div>
//             )}
//           </div>
//           <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
//             <h3 className="text-sm font-medium text-gray-800 mb-2">Model Assessment</h3>
//             <p className="text-xs text-gray-600">{modelMetrics.assessment}</p>
//             <Info
//               className="text-gray-400 w-3 h-3 cursor-pointer mt-1"
//               onClick={() => setShowInfo((prev) => ({ ...prev, details: !prev.details }))}
//             />
//             {showInfo.details && getInfoContent("details")}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // Ensure the style is properly defined as a string outside the JSX
// const styles = `
//   @media (max-width: 480px) {
//     .grid-cols-3 {
//       grid-template-columns: 1fr;
//     }
//     .grid-cols-2 {
//       grid-template-columns: 1fr;
//     }
//     .text-sm {
//       font-size: 0.7rem;
//     }
//     .text-xs {
//       font-size: 0.6rem;
//     }
//     .p-4, .p-6 {
//       padding: 0.6rem;
//     }
//     .mb-10, .mb-8 {
//       margin-bottom: 1rem;
//     }
//     .space-y-8, .space-x-4 {
//       gap: 0.6rem;
//     }
//     .flex-col {
//       flex-direction: column;
//     }
//   }
//   @media (min-width: 481px) and (max-width: 768px) {
//     .grid-cols-3 {
//       grid-template-columns: repeat(2, 1fr);
//     }
//     .grid-cols-2 {
//       grid-template-columns: 1fr 1fr;
//     }
//     .text-sm {
//       font-size: 0.75rem;
//     }
//     .text-xs {
//       font-size: 0.65rem;
//     }
//     .p-4, .p-6 {
//       padding: 0.75rem;
//     }
//     .mb-10, .mb-8 {
//       margin-bottom: 1.25rem;
//     }
//     .space-y-8, .space-x-4 {
//       gap: 0.75rem;
//     }
//   }
//   @media (min-width: 769px) and (max-width: 1024px) {
//     .grid-cols-3 {
//       grid-template-columns: repeat(3, 1fr);
//     }
//     .max-w-5xl {
//       max-width: 90%;
//     }
//   }
//   @media (min-width: 1025px) {
//     .max-w-5xl {
//       max-width: 100%;
//     }
//   }
//   .hover:shadow-md {
//     transition: box-shadow 0.3s ease;
//   }
//   .transition-colors {
//     transition: background-color 0.3s ease, color 0.3s ease;
//   }
//   .animate-pulse-slow {
//     animation: pulse 2s infinite ease-in-out;
//   }
//   .animate-fade-in {
//     animation: fadeIn 1s ease-in;
//   }
//   @keyframes pulse {
//     0% { transform: scale(1); }
//     50% { transform: scale(1.02); }
//     100% { transform: scale(1); }
//   }
//   @keyframes fadeIn {
//     from { opacity: 0; }
//     to { opacity: 1; }
//   }
// `;

// export default PerformanceConsistency;





import React, { useState, useMemo } from "react";
import { AlertTriangle, Info, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

interface Metrics {
  mae?: number; // Optional to handle missing values
  rmse?: number;
  r2_score?: number;
}

interface ModelMetrics {
  validation?: Metrics; // Optional to handle missing validation
  assessment?: string; // Optional to handle missing assessment
}

interface PerformanceConsistencyProps {
  modelMetrics: ModelMetrics;
  headings: {
    main: string;
    description: string;
  };
  labels: {
    validation: string;
  };
  warnings: {
    condition: boolean;
    message?: string; // Optional to handle missing message
  };
}

const PerformanceConsistency: React.FC<PerformanceConsistencyProps> = ({
  modelMetrics,
  headings,
  labels,
  warnings,
}) => {
  const [activeTab, setActiveTab] = useState<"overview" | "details">("overview");
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [showInfo, setShowInfo] = useState<{
    [key: string]: boolean;
  }>({});

  // Memoize metrics for performance, with comprehensive fallbacks
  const validationR2 = useMemo(() => {
    const r2 = modelMetrics.validation?.r2_score || 0;
    // Cap R² between -1 and 1, handle NaN or invalid numbers
    return isNaN(r2) || r2 < -1 || r2 > 1 ? 0 : Math.max(Math.min(r2, 1), -1);
  }, [modelMetrics.validation?.r2_score]);

  const validationMAE = useMemo(() => {
    const mae = modelMetrics.validation?.mae || 0;
    // Ensure non-negative, handle NaN or invalid numbers
    return mae >= 0 && !isNaN(mae) ? mae.toFixed(4) : "0.0000";
  }, [modelMetrics.validation?.mae]);

  const validationRMSE = useMemo(() => {
    const rmse = modelMetrics.validation?.rmse || 0;
    // Ensure non-negative, handle NaN or invalid numbers
    return rmse >= 0 && !isNaN(rmse) ? rmse.toFixed(4) : "0.0000";
  }, [modelMetrics.validation?.rmse]);

  // Dynamic info content based on ML output, with combined explanations for all outcomes
  const getInfoContent = (key: string) => {
    const r2Percentage = (validationR2 * 100).toFixed(2);
    const assessment = modelMetrics.assessment || "Not Assessed";
    const isUnderfitting = assessment?.toLowerCase() === "underfitting";
    const maeFormatted = Number(validationMAE).toLocaleString();
    const rmseFormatted = Number(validationRMSE).toLocaleString();

    switch (key) {
      case "overview":
        return (
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
            <p className="flex items-start gap-1">
              <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
              <strong>Overview:</strong> This section shows how well your model predicts
              values using the R² score ({r2Percentage}%), which measures how much of the
              actual data’s variation the model explains. A value close to 100% (or 1.0)
              indicates excellent predictions, but your model’s {r2Percentage}% (negative
              or low) suggests poor performance, possibly worse than guessing the average.
              This could indicate issues like underfitting, overfitting, or data
              limitations, depending on the assessment (“{assessment}”). Use this to
              assess model accuracy and identify areas for improvement, such as adding
              features, tuning parameters, or enhancing data quality.
            </p>
          </div>
        );
      case "details":
        return (
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
            <p className="flex items-start gap-1">
              <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
              <strong>Details:</strong> These metrics provide insight into your model’s
              accuracy:
            </p>
            <ul className="list-disc pl-4 mt-1 text-xs">
              <li className="flex items-start gap-1">
                <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
                <strong>MAE ({maeFormatted}):</strong> The average absolute difference
                between predicted and actual values, indicating prediction error. A value
                of {maeFormatted} means predictions are off by {maeFormatted} units on
                average—lower values suggest higher accuracy. This helps identify overall
                prediction quality and guides model improvements.
              </li>
              <li className="flex items-start gap-1">
                <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
                <strong>RMSE ({rmseFormatted}):</strong> Emphasizes larger errors,
                providing a measure of prediction accuracy. Your {rmseFormatted} suggests
                significant deviations in some predictions—lower values are preferable,
                and this metric is useful for detecting outliers or major errors in the
                model.
              </li>
              <li className="flex items-start gap-1">
                <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
                <strong>R² Score ({validationR2.toFixed(2)}):</strong> Measures how well
                predictions explain actual values. Your {validationR2.toFixed(2)} (e.g.,
                negative or low) indicates poor fit, suggesting the model may struggle
                with the data’s complexity or require adjustments like more features,
                better data, or tuning.
              </li>
            </ul>
          </div>
        );
      case "warning":
        return (
          <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
            <p className="flex items-start gap-1">
              <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
              <strong>Model Warning:</strong> The assessment “{assessment || 'Not Assessed'}”
              indicates potential issues with your model. For example, “Underfitting” means
              the model is too simple to capture the data’s complexity, leading to poor
              predictions (R² = {validationR2.toFixed(2)}, MAE = {maeFormatted}, RMSE =
              {rmseFormatted}). This suggests you may need to add more features, tune the
              model, improve data quality, or use techniques like regularization. If the
              assessment is missing or unclear, verify your data and model configuration.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const renderR2Indicator = () => (
    <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xs font-medium text-gray-700 flex items-center gap-1">
          {labels.validation} R² Score
          <Info
            className="text-gray-400 w-3 h-3 cursor-pointer"
            onClick={() => setShowInfo((prev) => ({ ...prev, overview: !prev.overview }))}
          />
        </h3>
      </div>
      {showInfo.overview && getInfoContent("overview")}
      <div className="w-full bg-gray-200 h-2 rounded-full">
        <div
          className={`h-full rounded-full ${
            validationR2 >= 0.7
              ? "bg-green-500"
              : validationR2 >= 0.5
              ? "bg-blue-400"
              : "bg-yellow-500"
          }`}
          style={{ width: `${Math.max(Math.min(validationR2 * 100, 100), 0)}%` }} // Cap at 100%, ensure non-negative
        />
      </div>
      <p className="text-xs mt-2 text-gray-600">
        Value: <span className="font-medium">{(validationR2 * 100).toFixed(2)}%</span>
      </p>
    </div>
  );

  const renderWarning = () => (
    <div className="p-4 bg-yellow-50 rounded-lg shadow-sm border border-yellow-200 mb-6 flex items-start gap-2 animate-pulse-slow">
      <AlertTriangle className="text-yellow-500 w-4 h-4 mt-0.5" />
      <div>
        <h4 className="text-xs font-medium text-yellow-700 mb-1">Model Alert</h4>
        <p className="text-xs text-gray-600">
          {warnings.message || "No specific assessment provided."}
        </p>
        <Info
          className="text-gray-400 w-3 h-3 cursor-pointer mt-1"
          onClick={() => setShowInfo((prev) => ({ ...prev, warning: !prev.warning }))}
        />
        {showInfo.warning && getInfoContent("warning")}
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-sm font-semibold text-gray-800">{headings.main}</h2>
        <p className="text-xs text-gray-500 mt-1">{headings.description}</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-3 py-2 text-xs font-medium rounded-md ${
            activeTab === "overview"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition-colors duration-200`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab("details")}
          className={`px-3 py-2 text-xs font-medium rounded-md ${
            activeTab === "details"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          } transition-colors duration-200`}
        >
          Details
        </button>
      </div>

      {/* Content */}
      {activeTab === "overview" && (
        <div className="space-y-8">
          {renderR2Indicator()}
          {warnings.condition && renderWarning()}
        </div>
      )}

      {activeTab === "details" && (
        <div className="space-y-8">
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <div
              className="cursor-pointer flex justify-between items-center border-b border-gray-200 pb-3 mb-4"
              onClick={() => setIsDetailsExpanded(!isDetailsExpanded)}
            >
              <h3 className="text-sm font-medium text-gray-800">Model Metrics</h3>
              {isDetailsExpanded ? (
                <ChevronUp className="text-gray-500 w-4 h-4" />
              ) : (
                <ChevronDown className="text-gray-500 w-4 h-4" />
              )}
            </div>
            {isDetailsExpanded && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs text-gray-700 animate-fade-in">
                <p className="flex items-center gap-1">
                  <HelpCircle className="text-gray-400 w-3 h-3" />
                  MAE: {validationMAE}
                </p>
                <p className="flex items-center gap-1">
                  <HelpCircle className="text-gray-400 w-3 h-3" />
                  RMSE: {validationRMSE}
                </p>
                <p className="flex items-center gap-1">
                  <HelpCircle className="text-gray-400 w-3 h-3" />
                  R² Score: {validationR2.toFixed(4)}
                </p>
              </div>
            )}
          </div>
          <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-sm font-medium text-gray-800 mb-2">Model Assessment</h3>
            <p className="text-xs text-gray-600">
              {modelMetrics.assessment || "No assessment provided."}
            </p>
            <Info
              className="text-gray-400 w-3 h-3 cursor-pointer mt-1"
              onClick={() => setShowInfo((prev) => ({ ...prev, details: !prev.details }))}
            />
            {showInfo.details && getInfoContent("details")}
          </div>
        </div>
      )}
    </div>
  );
};

// Ensure the style is properly defined as a string outside the JSX
const styles = `
  @media (max-width: 480px) {
    .grid-cols-3 {
      grid-template-columns: 1fr;
    }
    .grid-cols-2 {
      grid-template-columns: 1fr;
    }
    .text-sm {
      font-size: 0.7rem;
    }
    .text-xs {
      font-size: 0.6rem;
    }
    .p-4, .p-6 {
      padding: 0.6rem;
    }
    .mb-10, .mb-8 {
      margin-bottom: 1rem;
    }
    .space-y-8, .space-x-4 {
      gap: 0.6rem;
    }
    .flex-col {
      flex-direction: column;
    }
  }
  @media (min-width: 481px) and (max-width: 768px) {
    .grid-cols-3 {
      grid-template-columns: repeat(2, 1fr);
    }
    .grid-cols-2 {
      grid-template-columns: 1fr 1fr;
    }
    .text-sm {
      font-size: 0.75rem;
    }
    .text-xs {
      font-size: 0.65rem;
    }
    .p-4, .p-6 {
      padding: 0.75rem;
    }
    .mb-10, .mb-8 {
      margin-bottom: 1.25rem;
    }
    .space-y-8, .space-x-4 {
      gap: 0.75rem;
    }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .grid-cols-3 {
      grid-template-columns: repeat(3, 1fr);
    }
    .max-w-5xl {
      max-width: 90%;
    }
  }
  @media (min-width: 1025px) {
    .max-w-5xl {
      max-width: 100%;
    }
  }
  .hover:shadow-md {
    transition: box-shadow 0.3s ease;
  }
  .transition-colors {
    transition: background-color 0.3s ease, color 0.3s ease;
  }
  .animate-pulse-slow {
    animation: pulse 2s infinite ease-in-out;
  }
  .animate-fade-in {
    animation: fadeIn 1s ease-in;
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export default PerformanceConsistency;