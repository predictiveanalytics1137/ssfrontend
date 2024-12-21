// // // import React, { useEffect, useState } from "react";

// // // interface FeatureImportanceProps {
// // //   [key: string]: number;
// // // }

// // // const FeatureImportance: React.FC = () => {
// // //   const [featureImportance, setFeatureImportance] = useState<FeatureImportanceProps | null>(null);

// // //   useEffect(() => {
// // //     // Fetch the feature importance data from the API
// // //     fetch("http://127.0.0.1:8000/model/modelget/4")
// // //       .then((response) => response.json())
// // //       .then((data) => {
// // //         setFeatureImportance(data.feature_importance);
// // //       })
// // //       .catch((error) => console.error("Error fetching feature importance:", error));
// // //   }, []);

// // //   if (!featureImportance) {
// // //     return <div className="text-center mt-8">Loading feature importance...</div>;
// // //   }

// // //   // Sort the features by importance descending
// // //   const sortedFeatures = Object.entries(featureImportance).sort((a, b) => b[1] - a[1]);

// // //   return (
// // //     <div className="p-6 bg-gray-100 min-h-screen">
// // //       <h2 className="text-xl font-semibold mb-4">Attribute Columns & Features Importance</h2>
// // //       <div className="border rounded-lg shadow-sm p-4 bg-white">
// // //         <div className="mb-4">
// // //           <p className="text-lg font-medium">
// // //             Top contributing columns to the model predictions.
// // //           </p>
// // //           <button className="text-blue-500 underline text-sm mt-1">
// // //             Explain
// // //           </button>
// // //         </div>
// // //         <div className="space-y-4">
// // //           {sortedFeatures.map(([feature, importance], index) => (
// // //             <div key={feature} className="flex items-center space-x-4">
// // //               <span className="text-gray-600">{feature}</span>
// // //               <div className="flex-1 bg-blue-200 rounded-full h-4">
// // //                 <div
// // //                   className="bg-blue-500 h-4 rounded-full text-center text-xs text-white"
// // //                   style={{ width: `${importance * 100}%` }}
// // //                 >
// // //                   {`${(importance * 100).toFixed(1)}%`}
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //         <div className="mt-4 text-gray-500 text-sm">
// // //           Total {Object.keys(featureImportance).length} columns
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default FeatureImportance;




// // // FeatureImportanceProps.jsx
// // import React from "react";

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

// // interface FeatureImportanceProps {
// //   modelData: MetricsData;
// // }

// // const FeatureImportanceProps: React.FC<FeatureImportanceProps> = ({ modelData }) => {
// //   const fi = modelData.feature_importance;
// //   if (!fi || Object.keys(fi).length === 0) {
// //     return <div>No feature importance data available</div>;
// //   }

// //   return (
// //     <div>
// //       <h3 className="text-lg font-semibold mb-2">Feature Importance</h3>
// //       <ul className="list-disc pl-5">
// //         {Object.entries(fi).map(([feature, importance]) => (
// //           <li key={feature}>
// //             {feature}: {importance.toFixed(4)}
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // };

// // export default FeatureImportanceProps;





// import React, { useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
// import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react";

// interface MetricsData {
//   feature_importance: Record<string, number>;
// }

// interface FeatureImportanceProps {
//   modelData: MetricsData;
// }

// const FeatureImportanceDashboard: React.FC<FeatureImportanceProps> = ({ modelData }) => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [importanceThreshold, setImportanceThreshold] = useState<number>(0.0);

//   const featureImportance = modelData.feature_importance;

//   const filteredData = Object.entries(featureImportance)
//     .filter(([feature, importance]) =>
//       feature.toLowerCase().includes(searchQuery.toLowerCase()) && importance >= importanceThreshold
//     )
//     .map(([feature, importance]) => ({
//       feature,
//       importance,
//     }))
//     .sort((a, b) => b.importance - a.importance);

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
//       {/* Header Section */}
//       <div className="max-w-4xl w-full mb-6">
//         <h1 className="text-2xl font-semibold text-gray-700 text-center">Feature Importance Dashboard</h1>
//         <p className="text-sm text-gray-500 text-center mt-1">
//           Discover the key features driving your model's predictions.
//         </p>
//       </div>

//       {/* Filters Section */}
//       <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-4 mb-6">
//         <div className="relative flex-1">
//           <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//           <input
//             type="text"
//             placeholder="Search features..."
//             className="w-full py-1.5 pl-9 pr-3 rounded-md shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <div className="flex items-center gap-2">
//           <Filter size={16} className="text-gray-400" />
//           <input
//             type="range"
//             min={0}
//             max={1}
//             step={0.01}
//             className="w-36"
//             value={importanceThreshold}
//             onChange={(e) => setImportanceThreshold(Number(e.target.value))}
//           />
//           <span className="text-xs text-gray-500">Min Importance: {importanceThreshold.toFixed(2)}</span>
//         </div>
//       </div>

//       {/* Chart Section */}
//       <div className="max-w-4xl w-full bg-white shadow-sm rounded-md p-4">
//         {filteredData.length > 0 ? (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={filteredData}>
//               <XAxis
//                 dataKey="feature"
//                 tick={{ fontSize: 12, fontWeight: 500, fill: "#4B5563" }}
//                 axisLine={false}
//                 tickLine={false}
//               />
//               <YAxis
//                 type="number"
//                 domain={[0, "dataMax"]}
//                 tick={{ fontSize: 12, fontWeight: 500, fill: "#4B5563" }}
//                 axisLine={false}
//                 tickLine={false}
//               />
//               <CartesianGrid strokeDasharray="2 2" stroke="#E2E8F0" />
//               <Tooltip
//                 cursor={{ fill: "rgba(79, 209, 197, 0.1)" }}
//                 contentStyle={{
//                   backgroundColor: "white",
//                   border: "1px solid #CBD5E1",
//                   fontSize: "12px",
//                   color: "#475569",
//                   padding: "8px 12px",
//                 }}
//                 formatter={(value: number) => value.toFixed(4)}
//               />
//               <Bar dataKey="importance" fill="#38B2AC" />
//             </BarChart>
//           </ResponsiveContainer>
//         ) : (
//           <div className="text-center py-12">
//             <TrendingDown className="text-red-400 mb-4" size={32} />
//             <p className="text-sm font-medium text-gray-600">No features match your filters</p>
//             <p className="text-xs text-gray-400">Try adjusting your search or threshold filters.</p>
//           </div>
//         )}
//       </div>

//       {/* Feature List */}
//       <div className="max-w-4xl w-full mt-6">
//         <h2 className="text-xl font-semibold text-gray-700 mb-3">Feature List</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//           {filteredData.map((item, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-start p-3 bg-white shadow-sm border border-gray-200 rounded-md hover:shadow-md transition"
//             >
//               <h3 className="text-sm font-medium text-gray-700">{item.feature}</h3>
//               <p className="text-xs text-gray-500 mt-1">
//                 Importance:{" "}
//                 <span
//                   className={`font-semibold ${
//                     item.importance > 0.5 ? "text-teal-500" : "text-yellow-500"
//                   }`}
//                 >
//                   {item.importance.toFixed(4)}
//                 </span>
//               </p>
//               {item.importance > 0.5 ? (
//                 <TrendingUp className="text-teal-500 mt-2" size={16} />
//               ) : (
//                 <TrendingDown className="text-yellow-500 mt-2" size={16} />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FeatureImportanceDashboard;





import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react";

interface MetricsData {
  feature_importance: Record<string, number>;
}

interface FeatureImportanceProps {
  modelData: MetricsData;
  config?: {
    importanceThreshold?: number;
    highThreshold?: number; // Threshold for TrendingUp
  };
}

const FeatureImportanceDashboard: React.FC<FeatureImportanceProps> = ({
  modelData,
  config = {
    importanceThreshold: 0.0,
    highThreshold: 0.5,
  },
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [importanceThreshold, setImportanceThreshold] = useState<number>(
    config.importanceThreshold || 0.0
  );

  const featureImportance = modelData.feature_importance;

  const filteredData = Object.entries(featureImportance)
    .filter(
      ([feature, importance]) =>
        feature.toLowerCase().includes(searchQuery.toLowerCase()) &&
        importance >= importanceThreshold
    )
    .map(([feature, importance]) => ({
      feature,
      importance,
      isHigh: importance > (config.highThreshold || 0.5),
    }))
    .sort((a, b) => b.importance - a.importance);

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      {/* Header Section */}
      <div className="max-w-4xl w-full mb-6">
        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Feature Importance Dashboard
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Discover the key features driving your model's predictions.
        </p>
      </div>

      {/* Filters Section */}
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search features..."
            className="w-full py-1.5 pl-9 pr-3 rounded-md shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            className="w-36"
            value={importanceThreshold}
            onChange={(e) => setImportanceThreshold(Number(e.target.value))}
          />
          <span className="text-xs text-gray-500">
            Min Importance: {importanceThreshold.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Chart Section */}
      <div className="max-w-4xl w-full bg-white shadow-sm rounded-md p-4">
        {filteredData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={filteredData}>
              <XAxis
                dataKey="feature"
                tick={{ fontSize: 12, fontWeight: 500, fill: "#4B5563" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                type="number"
                domain={[0, "dataMax"]}
                tick={{ fontSize: 12, fontWeight: 500, fill: "#4B5563" }}
                axisLine={false}
                tickLine={false}
              />
              <CartesianGrid strokeDasharray="2 2" stroke="#E2E8F0" />
              <Tooltip
                cursor={{ fill: "rgba(79, 209, 197, 0.1)" }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #CBD5E1",
                  fontSize: "12px",
                  color: "#475569",
                  padding: "8px 12px",
                }}
                formatter={(value: number) => value.toFixed(4)}
              />
              <Bar dataKey="importance" fill="#38B2AC" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12">
            <TrendingDown className="text-red-400 mb-4" size={32} />
            <p className="text-sm font-medium text-gray-600">
              No features match your filters
            </p>
            <p className="text-xs text-gray-400">
              Try adjusting your search or threshold filters.
            </p>
          </div>
        )}
      </div>

      {/* Feature List */}
      <div className="max-w-4xl w-full mt-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Feature List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-3 bg-white shadow-sm border border-gray-200 rounded-md hover:shadow-md transition"
            >
              <h3 className="text-sm font-medium text-gray-700">
                {item.feature}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Importance:{" "}
                <span
                  className={`font-semibold ${
                    item.isHigh ? "text-teal-500" : "text-yellow-500"
                  }`}
                >
                  {item.importance.toFixed(4)}
                </span>
              </p>
              {item.isHigh ? (
                <TrendingUp className="text-teal-500 mt-2" size={16} />
              ) : (
                <TrendingDown className="text-yellow-500 mt-2" size={16} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureImportanceDashboard;
