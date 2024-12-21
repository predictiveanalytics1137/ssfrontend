// // import React, { useEffect, useState } from "react";
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   CartesianGrid,
// //   Legend,
// //   ResponsiveContainer,
// // } from "recharts";

// // interface PredictionData {
// //   actual: number[];
// //   predicted: number[];
// // }

// // const ModelEvaluation: React.FC = () => {
// //   const [data, setData] = useState<PredictionData | null>(null);
// //   const [bias, setBias] = useState<number | null>(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);

// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         const response = await fetch("http://127.0.0.1:8000/model/modelget/4");
// //         if (!response.ok) {
// //           throw new Error(`Error fetching data: ${response.statusText}`);
// //         }
// //         const result = await response.json();

// //         const actual = result.predictions.actual || [];
// //         const predicted = result.predictions.predicted || [];

// //         if (!actual.length || !predicted.length) {
// //           throw new Error("Actual or predicted data is missing from the API.");
// //         }

// //         // Calculate bias
// //         const totalActual = actual.reduce((acc: any, val: any) => acc + val, 0);
// //         const totalPredicted = predicted.reduce((acc: any, val: any) => acc + val, 0);
// //         const biasValue = ((totalPredicted - totalActual) / totalActual) * 100;

// //         setData({ actual, predicted });
// //         setBias(biasValue);
// //         setLoading(false);
// //       } catch (err) {
// //         setError(err instanceof Error ? err.message : "Unknown error occurred");
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   if (loading) {
// //     return <div className="text-center mt-6">Loading...</div>;
// //   }

// //   if (error) {
// //     return (
// //       <div className="text-center text-red-500 mt-6">
// //         Error: {error}
// //       </div>
// //     );
// //   }

// //   if (!data) {
// //     return <div className="text-center mt-6">No data available</div>;
// //   }

// //   const chartData = data.actual.map((value, index) => ({
// //     index: index + 1,
// //     actual: value,
// //     predicted: data.predicted[index],
// //   }));

// //   const totalActual = data.actual.reduce((acc, val) => acc + val, 0).toFixed(1);
// //   const totalPredicted = data.predicted.reduce((acc, val) => acc + val, 0).toFixed(1);

// //   return (
// //     <div className="p-6 bg-gray-50 min-h-screen">
// //       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
// //         <h2 className="text-2xl font-bold mb-4">How Good Is The Model?</h2>

// //         <div className="flex justify-between items-center mb-6">
// //           <div>
// //             <p className="text-gray-600">
// //               Total Actual: <span className="font-semibold text-gray-800">{totalActual}</span>
// //             </p>
// //             <p className="text-gray-600">
// //               Total Predicted: <span className="font-semibold text-gray-800">{totalPredicted}</span>
// //             </p>
// //           </div>
// //           <div className="text-center">
// //             <p className="text-xl font-semibold">
// //               Bias:{" "}
// //               <span
// //                 className={`${
// //                   bias && bias < 0 ? "text-red-500" : "text-green-500"
// //                 }`}
// //               >
// //                 {bias?.toFixed(1)}%
// //               </span>
// //             </p>
// //             <p className="text-gray-500 text-sm">
// //               (Negative bias means underprediction)
// //             </p>
// //           </div>
// //         </div>

// //         <ResponsiveContainer width="100%" height={300}>
// //           <LineChart data={chartData}>
// //             <CartesianGrid strokeDasharray="3 3" />
// //             <XAxis dataKey="index" label={{ value: "Index", position: "insideBottom", offset: -5 }} />
// //             <YAxis label={{ value: "Values", angle: -90, position: "insideLeft" }} />
// //             <Tooltip />
// //             <Legend />
// //             <Line type="monotone" dataKey="actual" stroke="#8884d8" name="Actual Values" />
// //             <Line type="monotone" dataKey="predicted" stroke="#82ca9d" name="Predicted Values" />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ModelEvaluation;





// // import React from "react";
// // import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
// // import { Sparkles, TrendingUp, TrendingDown } from 'lucide-react';

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
// //   attribute_columns: string[];
// //   feature_importance: Record<string, number>;
// //   core_statistics: Record<string, any>;
// //   attribute_statistics: Record<string, any>;
// //   predictions: {
// //     actual: number[];
// //     predicted: number[];
// //   };
// //   user_id: string;
// //   chat_id: string;
// // }

// // interface ModelEvaluationProps {
// //   modelData: MetricsData;
// // }

// // const ModelEvaluation: React.FC<ModelEvaluationProps> = ({ modelData }) => {
// //   const { predictions, model_metrics } = modelData;
// //   const actual = predictions.actual;
// //   const predicted = predictions.predicted;

// //   if (!actual || !predicted) {
// //     return (
// //       <div className="flex items-center justify-center min-h-screen bg-gray-50">
// //         <div className="text-center p-6 bg-white rounded-xl shadow-md">
// //           <Sparkles className="mx-auto mb-3 text-blue-300" size={36} />
// //           <h2 className="text-xl font-medium text-gray-700 mb-1">No Predictions Available</h2>
// //           <p className="text-sm text-gray-500">Please check your data source</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const chartData = actual.map((value: number, index: number) => ({
// //     index: index + 1,
// //     actual: value,
// //     predicted: predicted[index],
// //   }));

// //   const totalActual = actual.reduce((acc, val) => acc + val, 0).toFixed(1);
// //   const totalPredicted = predicted.reduce((acc, val) => acc + val, 0).toFixed(1);
// //   const biasValue = ((Number(totalPredicted) - Number(totalActual)) / Number(totalActual)) * 100;

// //   return (
// //     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
// //       <div className="max-w-5xl mx-auto">
// //         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
// //           {/* Soft Header */}
// //           <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-5">
// //             <div className="flex items-center justify-between">
// //               <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">Model Performance</h2>
// //               <Sparkles className="text-blue-300" size={28} />
// //             </div>
// //             <p className="text-sm text-gray-600 mt-1">Insights into your machine learning model</p>
// //           </div>

// //           {/* Metrics Grid */}
// //           <div className="grid md:grid-cols-3 gap-4 p-5">
// //             {/* Bias Metrics */}
// //             <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
// //               <div className="flex items-center justify-between mb-3">
// //                 <h3 className="text-sm font-medium text-gray-600">Model Bias</h3>
// //                 {biasValue < 0 ? <TrendingDown className="text-red-300" /> : <TrendingUp className="text-green-300" />}
// //               </div>
// //               <div className="text-center">
// //                 <p className={`text-2xl font-semibold ${biasValue < 0 ? "text-red-400" : "text-green-400"}`}>
// //                   {biasValue.toFixed(1)}%
// //                 </p>
// //                 <p className="text-xs text-gray-500 mt-1">
// //                   {biasValue < 0 ? "Underprediction" : "Overprediction"}
// //                 </p>
// //               </div>
// //             </div>

// //             {/* Total Values */}
// //             <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
// //               <h3 className="text-sm font-medium text-gray-600 mb-3">Totals</h3>
// //               <div className="space-y-1">
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-500">Total Actual:</span>
// //                   <span className="font-medium text-blue-500">{totalActual}</span>
// //                 </div>
// //                 <div className="flex justify-between text-sm">
// //                   <span className="text-gray-500">Total Predicted:</span>
// //                   <span className="font-medium text-green-500">{totalPredicted}</span>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Model Assessment */}
// //             <div className="bg-gray-100 rounded-lg p-4 shadow-sm">
// //               <h3 className="text-sm font-medium text-gray-600 mb-3">Assessment</h3>
// //               <p className="text-xs text-gray-600 italic">
// //                 {model_metrics?.assessment || "No assessment available"}
// //               </p>
// //             </div>
// //           </div>

// //           {/* Chart Section */}
// //           <div className="p-5 bg-gray-50">
// //             <div className="bg-white rounded-xl shadow-md p-3">
// //               <ResponsiveContainer width="100%" height={300}>
// //                 <LineChart data={chartData}>
// //                   <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
// //                   <XAxis 
// //                     dataKey="index" 
// //                     tick={{fill: '#9ca3af', fontSize: 12}} 
// //                     axisLine={{stroke: '#f3f4f6'}}
// //                   />
// //                   <YAxis 
// //                     tick={{fill: '#9ca3af', fontSize: 12}} 
// //                     axisLine={{stroke: '#f3f4f6'}}
// //                   />
// //                   <Tooltip 
// //                     contentStyle={{
// //                       backgroundColor: 'white', 
// //                       border: '1px solid #f3f4f6', 
// //                       borderRadius: '8px',
// //                       fontSize: '12px'
// //                     }} 
// //                   />
// //                   <Legend 
// //                     iconType="circle" 
// //                     wrapperStyle={{fontSize: '12px', paddingTop: '10px'}} 
// //                   />
// //                   <Line 
// //                     type="monotone" 
// //                     dataKey="actual" 
// //                     stroke="#3b82f6" 
// //                     name="Actual Values" 
// //                     strokeWidth={2}
// //                     dot={{r: 4}}
// //                   />
// //                   <Line 
// //                     type="monotone" 
// //                     dataKey="predicted" 
// //                     stroke="#10b981" 
// //                     name="Predicted Values" 
// //                     strokeWidth={2}
// //                     dot={{r: 4}}
// //                   />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ModelEvaluation;




// import React from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";

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

// interface ModelEvaluationProps {
//   modelData: MetricsData;
// }

// const ModelEvaluation: React.FC<ModelEvaluationProps> = ({ modelData }) => {
//   const { predictions, model_metrics } = modelData;
//   const actual = predictions.actual;
//   const predicted = predictions.predicted;

//   if (!actual || !predicted) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-50">
//         <div className="text-center p-6 bg-white rounded-xl shadow-md">
//           <Sparkles className="mx-auto mb-3 text-blue-300" size={36} />
//           <h2 className="text-xl font-medium text-gray-700 mb-1">
//             No Predictions Available
//           </h2>
//           <p className="text-sm text-gray-500">Please check your data source</p>
//         </div>
//       </div>
//     );
//   }

//   const chartData = actual.map((value: number, index: number) => ({
//     index: index + 1,
//     actual: value,
//     predicted: predicted[index],
//   }));

//   const totalActual = actual.reduce((acc, val) => acc + val, 0).toFixed(1);
//   const totalPredicted = predicted.reduce((acc, val) => acc + val, 0).toFixed(1);
//   const biasValue = ((Number(totalPredicted) - Number(totalActual)) / Number(totalActual)) * 100;

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-5xl mx-auto">
//         <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-5">
//             <div className="flex items-center justify-between">
//               <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
//                 Model Performance
//               </h2>
//               <Sparkles className="text-blue-400" size={28} />
//             </div>
//             <p className="text-sm text-gray-600 mt-1">
//               Insights into your machine learning model
//             </p>
//           </div>

//           {/* Metrics Grid */}
//           <div className="grid md:grid-cols-3 gap-4 p-5">
//             {/* Bias Metrics */}
//             <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
//               <div className="flex items-center justify-between mb-3">
//                 <h3 className="text-sm font-medium text-gray-600">Model Bias</h3>
//                 {biasValue < 0 ? (
//                   <TrendingDown className="text-red-400" />
//                 ) : (
//                   <TrendingUp className="text-green-400" />
//                 )}
//               </div>
//               <div className="text-center">
//                 <p
//                   className={`text-2xl font-semibold ${
//                     biasValue < 0 ? "text-red-500" : "text-green-500"
//                   }`}
//                 >
//                   {biasValue.toFixed(1)}%
//                 </p>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {biasValue < 0 ? "Underprediction" : "Overprediction"}
//                 </p>
//               </div>
//             </div>

//             {/* Total Values */}
//             <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
//               <h3 className="text-sm font-medium text-gray-600 mb-3">Totals</h3>
//               <div className="space-y-1">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">Total Actual:</span>
//                   <span className="font-medium text-blue-500">{totalActual}</span>
//                 </div>
//                 <div className="flex justify-between text-sm">
//                   <span className="text-gray-500">Total Predicted:</span>
//                   <span className="font-medium text-green-500">{totalPredicted}</span>
//                 </div>
//               </div>
//             </div>

//             {/* Model Assessment */}
//             <div className="bg-gray-50 rounded-lg p-4 shadow-sm border border-gray-200">
//               <h3 className="text-sm font-medium text-gray-600 mb-3">Assessment</h3>
//               <p className="text-xs text-gray-600 italic">
//                 {model_metrics?.assessment || "No assessment available"}
//               </p>
//             </div>
//           </div>

//           {/* Chart Section */}
//           <div className="p-5 bg-gray-50">
//             <div className="bg-white rounded-xl shadow-md p-4">
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={chartData}>
//                   <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
//                   <XAxis
//                     dataKey="index"
//                     tick={{ fill: "#94A3B8", fontSize: 12 }}
//                     axisLine={{ stroke: "#E5E7EB" }}
//                   />
//                   <YAxis
//                     tick={{ fill: "#94A3B8", fontSize: 12 }}
//                     axisLine={{ stroke: "#E5E7EB" }}
//                   />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "white",
//                       border: "1px solid #E5E7EB",
//                       borderRadius: "8px",
//                       fontSize: "12px",
//                     }}
//                   />
//                   <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }} />
//                   <Line
//                     type="monotone"
//                     dataKey="actual"
//                     stroke="#4F46E5"
//                     name="Actual Values"
//                     strokeWidth={2}
//                     dot={{ r: 4, fill: "#93C5FD" }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="predicted"
//                     stroke="#34D399"
//                     name="Predicted Values"
//                     strokeWidth={2}
//                     dot={{ r: 4, fill: "#6EE7B7" }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ModelEvaluation;




import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";

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
  predictions: {
    actual: number[];
    predicted: number[];
  };
}

interface ModelEvaluationProps {
  modelData: MetricsData;
}

const ModelEvaluation: React.FC<ModelEvaluationProps> = ({ modelData }) => {
  const { predictions, model_metrics } = modelData;

  const actual = predictions?.actual;
  const predicted = predictions?.predicted;

  const [showActual, setShowActual] = useState(true);
  const [showPredicted, setShowPredicted] = useState(true);

  if (!actual || !predicted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-6 bg-white rounded-xl shadow-md">
          <Sparkles className="mx-auto mb-3 text-blue-300" size={36} />
          <h2 className="text-lg font-medium text-gray-700 mb-1">
            No Predictions Available
          </h2>
          <p className="text-xs text-gray-500">Please check your data source</p>
        </div>
      </div>
    );
  }

  const chartData = actual.map((value: number, index: number) => ({
    index: index + 1,
    actual: value,
    predicted: predicted[index],
  }));

  const totalActual = actual.reduce((acc, val) => acc + val, 0).toFixed(1);
  const totalPredicted = predicted.reduce((acc, val) => acc + val, 0).toFixed(1);
  const biasValue = ((Number(totalPredicted) - Number(totalActual)) / Number(totalActual)) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="p-5 bg-gradient-to-r from-blue-100 to-purple-100 shadow-md">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Model Performance
          </h2>
          <Sparkles className="text-blue-400" size={24} />
        </div>
      </div>

      {/* Metrics Section */}
      <div className="p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Bias */}
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-semibold text-gray-600">Model Bias</h3>
            {biasValue < 0 ? (
              <TrendingDown className="text-red-500" size={16} />
            ) : (
              <TrendingUp className="text-green-500" size={16} />
            )}
          </div>
          <p
            className={`text-xl font-bold ${
              biasValue < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            {biasValue.toFixed(1)}%
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {biasValue < 0 ? "Underprediction" : "Overprediction"}
          </p>
        </div>

        {/* Totals */}
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xs font-semibold text-gray-600 mb-2">Totals</h3>
          <div className="space-y-1">
            <p className="text-xs flex justify-between">
              <span className="text-gray-500">Total Actual:</span>
              <span className="font-semibold text-blue-500">{totalActual}</span>
            </p>
            <p className="text-xs flex justify-between">
              <span className="text-gray-500">Total Predicted:</span>
              <span className="font-semibold text-green-500">{totalPredicted}</span>
            </p>
          </div>
        </div>

        {/* Assessment */}
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xs font-semibold text-gray-600 mb-2">Assessment</h3>
          <p className="text-xs text-gray-500 italic">
            {model_metrics?.assessment || "No assessment available"}
          </p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex justify-center space-x-4 mb-4">
          <label className="flex items-center space-x-2 text-xs">
            <input
              type="checkbox"
              checked={showActual}
              onChange={() => setShowActual(!showActual)}
              className="form-checkbox text-blue-500"
            />
            <span>Show Actual</span>
          </label>
          <label className="flex items-center space-x-2 text-xs">
            <input
              type="checkbox"
              checked={showPredicted}
              onChange={() => setShowPredicted(!showPredicted)}
              className="form-checkbox text-green-500"
            />
            <span>Show Predicted</span>
          </label>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis
                dataKey="index"
                tick={{ fill: "#4B5563", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
              />
              <YAxis tick={{ fill: "#4B5563", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              {showActual && (
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#93C5FD" }}
                  name="Actual"
                />
              )}
              {showPredicted && (
                <Line
                  type="monotone"
                  dataKey="predicted"
                  stroke="#34D399"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#6EE7B7" }}
                  name="Predicted"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ModelEvaluation;
