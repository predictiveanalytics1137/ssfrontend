// // import React, { useEffect, useState } from "react";

// // interface Metrics {
// //   mae: number;
// //   rmse: number;
// //   r2_score: number;
// // }

// // interface ModelMetrics {
// //   testing: Metrics;
// //   training: Metrics;
// //   assessment: string;
// // }

// // const PerformanceConsistency: React.FC = () => {
// //   const [metrics, setMetrics] = useState<ModelMetrics | null>(null);

// //   useEffect(() => {
// //     // Fetch data from the API
// //     fetch("http://127.0.0.1:8000/model/modelget/4")
// //       .then((response) => response.json())
// //       .then((data) => {
// //         setMetrics(data.model_metrics);
// //       })
// //       .catch((error) => console.error("Error fetching metrics:", error));
// //   }, []);

// //   if (!metrics) {
// //     return <div className="text-center mt-8">Loading metrics...</div>;
// //   }

// //   return (
// //     <div className="p-6 bg-gray-100 min-h-screen">
// //       <h2 className="text-xl font-semibold mb-4">Performance Consistency (Overfit)</h2>
// //       <div className="border rounded-lg shadow-sm p-4 bg-white">
// //         <div className="mb-4">
// //           <p className="text-lg font-medium">
// //             Compare model results on train and test sets to ensure stability.
// //           </p>
// //           <button className="text-blue-500 underline text-sm mt-1">
// //             Explain
// //           </button>
// //         </div>
// //         <div className="grid grid-cols-2 gap-6">
// //           <div className="border p-4 rounded-lg bg-gray-50">
// //             <h3 className="text-md font-medium mb-2">Train & Validation Set R²</h3>
// //             <div className="bg-blue-200 rounded-full h-6">
// //               <div
// //                 className="bg-blue-500 h-6 rounded-full text-center text-white text-sm"
// //                 style={{ width: `${metrics.training.r2_score * 100}%` }}
// //               >
// //                 {(metrics.training.r2_score * 100).toFixed(1)}%
// //               </div>
// //             </div>
// //           </div>
// //           <div className="border p-4 rounded-lg bg-gray-50">
// //             <h3 className="text-md font-medium mb-2">Test Set R²</h3>
// //             <div className="bg-blue-200 rounded-full h-6">
// //               <div
// //                 className="bg-blue-500 h-6 rounded-full text-center text-white text-sm"
// //                 style={{ width: `${metrics.testing.r2_score * 100}%` }}
// //               >
// //                 {(metrics.testing.r2_score * 100).toFixed(1)}%
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //         <div className="mt-4 p-4 border-l-4 border-yellow-400 bg-yellow-50">
// //           <p className="text-yellow-800 text-sm font-medium">
// //             <strong>Warning:</strong> Your model shows better results on training data than on test data.
// //           </p>
// //           <p className="text-yellow-800 text-sm mt-1">
// //             This suggests a potential case of overfitting, where the model is well-tuned to the known training data
// //             but struggles to predict on unfamiliar test data.
// //           </p>
// //           <button className="text-blue-500 underline text-sm mt-1">How to fix this</button>
// //         </div>
// //         <div className="mt-4 p-4 border-l-4 border-blue-400 bg-blue-50">
// //           <p className="text-blue-800 text-sm">
// //             <strong>Why is this interesting?</strong> Performance consistency between train and test is an important
// //             indicator that the model can predict accurately on data it has not previously encountered. If the training
// //             set yields significantly better results than the test set, it is similar to memorizing specific answers
// //             without studying the material.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default PerformanceConsistency;




// // PerformanceConsistency.tsx
// import React from "react";

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
//   attribute_columns: string[];
//   feature_importance: Record<string, number>;
//   core_statistics: Record<string, any>;
//   attribute_statistics: Record<string, any>;
//   predictions: {
//     actual: number[];
//     predicted: number[];
//   };
//   user_id: string;
//   chat_id: string;
// }

// interface PerformanceConsistencyProps {
//   modelData: MetricsData;
// }

// const PerformanceConsistency: React.FC<PerformanceConsistencyProps> = ({ modelData }) => {
//   if (!modelData || !modelData.model_metrics) {
//     return <div className="text-center mt-8">No metrics data available</div>;
//   }

//   const metrics = modelData.model_metrics;
//   const trainingR2 = metrics.training.r2_score;
//   const testingR2 = metrics.testing.r2_score;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h2 className="text-xl font-semibold mb-4">Performance Consistency (Overfit)</h2>
//       <div className="border rounded-lg shadow-sm p-4 bg-white">
//         <div className="mb-4">
//           <p className="text-lg font-medium">
//             Compare model results on train and test sets to ensure stability.
//           </p>
//           <button className="text-blue-500 underline text-sm mt-1">
//             Explain
//           </button>
//         </div>
//         <div className="grid grid-cols-2 gap-6">
//           <div className="border p-4 rounded-lg bg-gray-50">
//             <h3 className="text-md font-medium mb-2">Train & Validation Set R²</h3>
//             <div className="bg-blue-200 rounded-full h-6">
//               <div
//                 className="bg-blue-500 h-6 rounded-full text-center text-white text-sm"
//                 style={{ width: `${trainingR2 * 100}%` }}
//               >
//                 {(trainingR2 * 100).toFixed(1)}%
//               </div>
//             </div>
//           </div>
//           <div className="border p-4 rounded-lg bg-gray-50">
//             <h3 className="text-md font-medium mb-2">Test Set R²</h3>
//             <div className="bg-blue-200 rounded-full h-6">
//               <div
//                 className="bg-blue-500 h-6 rounded-full text-center text-white text-sm"
//                 style={{ width: `${testingR2 * 100}%` }}
//               >
//                 {(testingR2 * 100).toFixed(1)}%
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-4 p-4 border-l-4 border-yellow-400 bg-yellow-50">
//           <p className="text-yellow-800 text-sm font-medium">
//             <strong>Warning:</strong> Your model shows better results on training data than on test data.
//           </p>
//           <p className="text-yellow-800 text-sm mt-1">
//             This suggests a potential case of overfitting...
//           </p>
//           <button className="text-blue-500 underline text-sm mt-1">How to fix this</button>
//         </div>
//         <div className="mt-4 p-4 border-l-4 border-blue-400 bg-blue-50">
//           <p className="text-blue-800 text-sm">
//             <strong>Why is this interesting?</strong> Performance consistency between train and test is important...
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PerformanceConsistency;



import React, { useState } from 'react';
import { Info, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

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
}

interface PerformanceConsistencyProps {
  modelData: MetricsData;
}

const PerformanceConsistency: React.FC<PerformanceConsistencyProps> = ({ modelData }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');

  if (!modelData || !modelData.model_metrics) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center bg-white p-6 rounded-lg shadow-lg">
          <Info className="mx-auto mb-4 text-teal-500" size={48} />
          <h2 className="text-lg font-medium text-gray-700 mb-2">No Metrics Data Available</h2>
          <p className="text-sm text-gray-500">Please upload or generate model metrics to view performance consistency.</p>
        </div>
      </div>
    );
  }

  const metrics = modelData.model_metrics;
  const trainingR2 = metrics.training.r2_score;
  const testingR2 = metrics.testing.r2_score;

  const r2BarStyle = (score: number) => {
    if (score < 0.5) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
    if (score < 0.7) return 'bg-gradient-to-r from-blue-400 to-blue-500';
    return 'bg-gradient-to-r from-green-400 to-green-500';
  };

  const renderR2Indicator = (score: number, label: string) => (
    <div className="bg-white rounded-md shadow-md p-4 flex flex-col">
      <h3 className="text-sm font-semibold text-gray-600 mb-1">{label}</h3>
      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
        <div
          className={`${r2BarStyle(score)} h-full transition-all`}
          style={{ width: `${score * 100}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">
        r² score: <span className="font-medium text-gray-700">{(score * 100).toFixed(1)}%</span>
      </p>
    </div>
  );

  const renderWarning = () => (
    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md flex items-start gap-3 shadow-sm">
      <AlertTriangle className="text-yellow-500 flex-shrink-0" size={20} />
      <div>
        <h4 className="text-sm font-semibold text-yellow-700">Potential Overfitting Detected</h4>
        <p className="text-xs text-gray-600">
          The model shows significant differences between training and testing performance.
        </p>
        <button
          className="text-teal-500 text-xs mt-2 underline hover:text-teal-600"
          onClick={() => alert('Learn more about mitigating overfitting.')}
        >
          Learn How to Mitigate
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Tabs */}
        <div className="px-6 py-4 bg-gradient-to-r from-teal-50 to-blue-50 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-700">Model Performance</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-1.5 text-xs rounded-full transition ${
                activeTab === 'overview'
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-1.5 text-xs rounded-full transition ${
                activeTab === 'details'
                  ? 'bg-teal-500 text-white'
                  : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Details
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {renderR2Indicator(trainingR2, 'Training Set r²')}
              {renderR2Indicator(testingR2, 'Testing Set r²')}
            </div>
            {trainingR2 - testingR2 > 0.1 && renderWarning()}
            <div className="bg-teal-50 p-4 rounded-md text-xs text-gray-600">
              <p>
                <strong>Why This Matters:</strong> Consistent performance across training and test
                sets indicates a robust model that generalizes well to unseen data.
              </p>
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="p-6 space-y-4 text-sm text-gray-700">
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold text-gray-600 mb-2">Full Metrics</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <p>
                  <span className="font-medium text-gray-700">Training RMSE:</span>{' '}
                  {metrics.training.rmse.toFixed(4)}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Test RMSE:</span>{' '}
                  {metrics.testing.rmse.toFixed(4)}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Training MAE:</span>{' '}
                  {metrics.training.mae.toFixed(4)}
                </p>
                <p>
                  <span className="font-medium text-gray-700">Test MAE:</span>{' '}
                  {metrics.testing.mae.toFixed(4)}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="font-semibold text-gray-600 mb-2">Model Assessment</h3>
              <p>{metrics.assessment}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceConsistency;
