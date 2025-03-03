// // ExtendedFeatureAnalysis.tsx
// import React, { useState } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";
// import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react";

// interface FeatureAnalysisType {
//   top_features: Record<string, number> | null;
//   shap_importance: Record<string, number> | null;
//   attribute_columns: string[] | null;
//   feature_importance: Record<string, number> | null;
// }

// interface ExtendedFeatureAnalysisProps {
//   featureAnalysis: FeatureAnalysisType | null;
// }

// const ExtendedFeatureAnalysis: React.FC<ExtendedFeatureAnalysisProps> = ({ featureAnalysis }) => {
//   const [activeTab, setActiveTab] = useState<"importance" | "top" | "shap">("importance");
//   const [searchQuery, setSearchQuery] = useState("");
//   const [importanceThreshold, setImportanceThreshold] = useState<number>(0);

//   if (!featureAnalysis) {
//     return (
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
//         <h1 className="text-2xl font-semibold text-gray-700 text-center">
//           Extended Feature Analysis
//         </h1>
//         <p className="text-sm text-gray-500 text-center mt-1">
//           No feature analysis data available.
//         </p>
//       </div>
//     );
//   }

//   // Data for "Model Importance"
//   const modelImportanceData =
//     featureAnalysis.feature_importance
//       ? Object.entries(featureAnalysis.feature_importance)
//           .filter(
//             ([feature, importance]) =>
//               feature.toLowerCase().includes(searchQuery.toLowerCase()) &&
//               importance >= importanceThreshold
//           )
//           .map(([feature, importance]) => ({ feature, importance }))
//           .sort((a, b) => b.importance - a.importance)
//       : [];

//   // Data for "Top Features"
//   const topFeaturesData =
//     featureAnalysis.top_features
//       ? Object.entries(featureAnalysis.top_features)
//           .map(([feature, importance]) => ({ feature, importance }))
//           .sort((a, b) => b.importance - a.importance)
//       : [];

//   // Data for "SHAP Importance"
//   const shapImportanceData =
//     featureAnalysis.shap_importance
//       ? Object.entries(featureAnalysis.shap_importance)
//           .map(([feature, importance]) => ({ feature, importance }))
//           .sort((a, b) => b.importance - a.importance)
//       : [];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
//       <div className="max-w-4xl w-full mb-6">
//         <h1 className="text-2xl font-semibold text-gray-700 text-center">
//           Extended Feature Analysis
//         </h1>
//         <p className="text-sm text-gray-500 text-center mt-1">
//           Detailed insights into feature importance.
//         </p>
//       </div>
//       <div className="max-w-4xl w-full flex space-x-4 mb-6">
//         <button
//           onClick={() => setActiveTab("importance")}
//           className={`px-4 py-2 text-sm font-medium rounded ${
//             activeTab === "importance"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//           }`}
//         >
//           Model Importance
//         </button>
//         <button
//           onClick={() => setActiveTab("top")}
//           className={`px-4 py-2 text-sm font-medium rounded ${
//             activeTab === "top"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//           }`}
//         >
//           Top Features
//         </button>
//         <button
//           onClick={() => setActiveTab("shap")}
//           className={`px-4 py-2 text-sm font-medium rounded ${
//             activeTab === "shap"
//               ? "bg-blue-500 text-white"
//               : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//           }`}
//         >
//           SHAP Importance
//         </button>
//       </div>

//       {activeTab === "importance" && (
//         <>
//           <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
//               <input
//                 type="text"
//                 placeholder="Search features..."
//                 className="w-full py-1.5 pl-9 pr-3 rounded-md shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-sm"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <div className="flex items-center gap-2">
//               <Filter size={16} className="text-gray-400" />
//               <input
//                 type="range"
//                 min={0}
//                 max={1}
//                 step={0.01}
//                 className="w-36"
//                 value={importanceThreshold}
//                 onChange={(e) => setImportanceThreshold(Number(e.target.value))}
//               />
//               <span className="text-xs text-gray-500">
//                 Min Importance: {importanceThreshold.toFixed(2)}
//               </span>
//             </div>
//           </div>
//           <div className="max-w-4xl w-full bg-white shadow-sm rounded-md p-4">
//             {modelImportanceData.length > 0 ? (
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={modelImportanceData}>
//                   <XAxis
//                     dataKey="feature"
//                     tick={{ fontSize: 12, fontWeight: 500, fill: "#4B5563" }}
//                     axisLine={false}
//                     tickLine={false}
//                   />
//                   <YAxis
//                     tick={{ fontSize: 12, fontWeight: 500, fill: "#4B5563" }}
//                     axisLine={false}
//                     tickLine={false}
//                   />
//                   <CartesianGrid strokeDasharray="2 2" stroke="#E2E8F0" />
//                   <Tooltip
//                     cursor={{ fill: "rgba(79, 209, 197, 0.1)" }}
//                     contentStyle={{
//                       backgroundColor: "white",
//                       border: "1px solid #CBD5E1",
//                       fontSize: "12px",
//                       color: "#475569",
//                       padding: "8px 12px",
//                     }}
//                     formatter={(value: number) => value.toFixed(4)}
//                   />
//                   <Bar dataKey="importance" fill="#38B2AC" />
//                 </BarChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="text-center py-12">
//                 <div className="text-red-400 mb-4">
//                   <TrendingDown size={32} />
//                 </div>
//                 <p className="text-sm font-medium text-gray-600">
//                   No features match your filters
//                 </p>
//                 <p className="text-xs text-gray-400">
//                   Try adjusting your search or threshold filters.
//                 </p>
//               </div>
//             )}
//           </div>
//         </>
//       )}
//       {activeTab === "top" && (
//         <div className="max-w-4xl w-full bg-white shadow-sm rounded-md p-4">
//           {topFeaturesData.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full text-sm text-gray-600">
//                 <thead className="bg-gray-100">
//                   <tr>
//                     <th className="px-4 py-2">Feature</th>
//                     <th className="px-4 py-2">Importance</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {topFeaturesData.map((item, idx) => (
//                     <tr key={idx} className="border-b">
//                       <td className="px-4 py-2">{item.feature}</td>
//                       <td className="px-4 py-2">{item.importance.toFixed(4)}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center py-12">
//               <div className="text-red-400 mb-4">
//                 <TrendingDown size={32} />
//               </div>
//               <p className="text-sm font-medium text-gray-600">
//                 No Top Features available
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//       {activeTab === "shap" && (
//         <div className="max-w-4xl w-full bg-white shadow-sm rounded-md p-4">
//           {shapImportanceData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={shapImportanceData}>
//                 <XAxis
//                   dataKey="feature"
//                   tick={{ fontSize: 12, fontWeight: 500, fill: "#4B5563" }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <YAxis
//                   tick={{ fontSize: 12, fontWeight: 500, fill: "#4B5563" }}
//                   axisLine={false}
//                   tickLine={false}
//                 />
//                 <CartesianGrid strokeDasharray="2 2" stroke="#E2E8F0" />
//                 <Tooltip
//                   cursor={{ fill: "rgba(79, 209, 197, 0.1)" }}
//                   contentStyle={{
//                     backgroundColor: "white",
//                     border: "1px solid #CBD5E1",
//                     fontSize: "12px",
//                     color: "#475569",
//                     padding: "8px 12px",
//                   }}
//                   formatter={(value: number) => value.toFixed(4)}
//                 />
//                 <Bar dataKey="importance" fill="#FBBF24" />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <div className="text-center py-12">
//               <div className="text-red-400 mb-4">
//                 <TrendingDown size={32} />
//               </div>
//               <p className="text-sm font-medium text-gray-600">
//                 No SHAP data available
//               </p>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExtendedFeatureAnalysis;




import React, { useState, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Info, Search, Filter, TrendingDown, HelpCircle } from "lucide-react";

interface FeatureAnalysisType {
  top_features?: Record<string, number> | null; // Optional, but not used
  shap_importance?: Record<string, number> | null;
  attribute_columns?: string[] | null; // Optional, but not used
  feature_importance?: Record<string, number> | null; // Optional, but not used
}

interface ExtendedFeatureAnalysisProps {
  featureAnalysis: FeatureAnalysisType | null;
}

const ExtendedFeatureAnalysis: React.FC<ExtendedFeatureAnalysisProps> = ({ featureAnalysis }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [importanceThreshold, setImportanceThreshold] = useState<number>(0);
  const [showInfo, setShowInfo] = useState<boolean>(false); // State for info panel

  // Memoize SHAP importance data for performance, with fallbacks for all outcomes
  const shapImportanceData = useMemo(() => {
    if (!featureAnalysis?.shap_importance) return [];
    return Object.entries(featureAnalysis.shap_importance)
      .filter(
        ([feature, importance]) =>
          feature.toLowerCase().includes(searchQuery.toLowerCase()) && importance >= importanceThreshold
      )
      .map(([feature, importance]) => ({
        feature,
        importance: Math.max(importance, 0), // Ensure non-negative importance
      }))
      .sort((a, b) => b.importance - a.importance);
  }, [featureAnalysis?.shap_importance, searchQuery, importanceThreshold]);

  // Dynamic info content based on ML output, handling all possible outcomes
  const getInfoContent = () => {
    const totalFeatures = shapImportanceData.length;
    const topFeature = shapImportanceData[0] || { feature: "N/A", importance: 0 };
    return (
      <div className="text-xs text-gray-600 p-3 bg-gray-50 rounded-md border border-gray-200 shadow-sm">
        <p className="flex items-start gap-1">
          <HelpCircle className="text-gray-400 w-3 h-3 mt-0.5" />
          <strong>SHAP Importance:</strong> This chart shows the SHAP (SHapley Additive exPlanations)
          importance of features in your model, indicating their impact on predictions. SHAP values
          measure how much each feature contributes to the model’s output, with higher values
          (e.g., {topFeature.importance.toFixed(4)} for {topFeature.feature}) showing greater
          influence. If no data is available or filtered out (e.g., due to zero importance or
          search/threshold settings), it may indicate missing features, data issues, or overly
          restrictive filters. Beginners can use this to identify key drivers of predictions,
          while experts can analyze feature interactions or model behavior for optimization.
        </p>
        <p className="mt-1 text-xs text-gray-600">
          Use the search and threshold filters to explore features dynamically. If the chart is
          empty, adjust your filters or check if the model has SHAP data. For large or missing
          values, ensure your data and model configuration are correct.
        </p>
      </div>
    );
  };

  if (!featureAnalysis) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-800 mb-4">Feature Analysis</h3>
        <p className="text-xs text-gray-600">No feature analysis data available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-gray-800">Feature Analysis</h3>
          <Info
            className="text-gray-400 w-3 h-3 cursor-pointer"
            onClick={() => setShowInfo(!showInfo)}
          />
        </div>
        {showInfo && getInfoContent()}
        <p className="text-xs text-gray-500 mt-2">
          Detailed insights into SHAP feature importance for your model.
        </p>
      </div>

      <div className="max-w-5xl w-full flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative flex-1 w-full md:w-auto">
          <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search features..."
            className="w-full py-1.5 pl-9 pr-3 rounded-md shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-400 text-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={16} className="text-gray-400" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            className="w-full md:w-48"
            value={importanceThreshold}
            onChange={(e) => setImportanceThreshold(Number(e.target.value))}
          />
          <span className="text-xs text-gray-500">
            Min Importance: {importanceThreshold.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="max-w-5xl w-full bg-white rounded-lg shadow-md border border-gray-200 p-6">
        {shapImportanceData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={shapImportanceData}>
              <CartesianGrid strokeDasharray="2 2" stroke="#E2E8F0" />
              <XAxis
                dataKey="feature"
                tick={{ fontSize: 10, fontWeight: 500, fill: "#4B5563" }}
                axisLine={false}
                tickLine={false}
                angle={-45} // Rotate labels for readability
                textAnchor="end" // Align rotated text
                height={70} // Increase height to accommodate rotated labels
              />
              <YAxis
                tick={{ fontSize: 10, fontWeight: 500, fill: "#4B5563" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: "rgba(79, 209, 197, 0.1)" }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #CBD5E1",
                  fontSize: "10px",
                  color: "#475569",
                  padding: "6px 10px",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => value.toFixed(4)}
                labelFormatter={(label) => `Feature: ${label}`}
              />
              <Bar dataKey="importance" fill="#FBBF24" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center py-12">
            <div className="text-yellow-500 mb-4">
              <TrendingDown size={32} />
            </div>
            <p className="text-sm font-medium text-gray-600">
              No SHAP data matches your filters
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your search or threshold filters, or check if SHAP data exists.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtendedFeatureAnalysis;