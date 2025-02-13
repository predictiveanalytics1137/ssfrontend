// ExtendedFeatureAnalysis.tsx
import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Search, Filter, TrendingUp, TrendingDown } from "lucide-react";

interface FeatureAnalysisType {
  top_features: Record<string, number> | null;
  shap_importance: Record<string, number> | null;
  attribute_columns: string[] | null;
  feature_importance: Record<string, number> | null;
}

interface ExtendedFeatureAnalysisProps {
  featureAnalysis: FeatureAnalysisType | null;
}

const ExtendedFeatureAnalysis: React.FC<ExtendedFeatureAnalysisProps> = ({ featureAnalysis }) => {
  const [activeTab, setActiveTab] = useState<"importance" | "top" | "shap">("importance");
  const [searchQuery, setSearchQuery] = useState("");
  const [importanceThreshold, setImportanceThreshold] = useState<number>(0);

  if (!featureAnalysis) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Extended Feature Analysis
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          No feature analysis data available.
        </p>
      </div>
    );
  }

  // Data for "Model Importance"
  const modelImportanceData =
    featureAnalysis.feature_importance
      ? Object.entries(featureAnalysis.feature_importance)
          .filter(
            ([feature, importance]) =>
              feature.toLowerCase().includes(searchQuery.toLowerCase()) &&
              importance >= importanceThreshold
          )
          .map(([feature, importance]) => ({ feature, importance }))
          .sort((a, b) => b.importance - a.importance)
      : [];

  // Data for "Top Features"
  const topFeaturesData =
    featureAnalysis.top_features
      ? Object.entries(featureAnalysis.top_features)
          .map(([feature, importance]) => ({ feature, importance }))
          .sort((a, b) => b.importance - a.importance)
      : [];

  // Data for "SHAP Importance"
  const shapImportanceData =
    featureAnalysis.shap_importance
      ? Object.entries(featureAnalysis.shap_importance)
          .map(([feature, importance]) => ({ feature, importance }))
          .sort((a, b) => b.importance - a.importance)
      : [];

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="max-w-4xl w-full mb-6">
        <h1 className="text-2xl font-semibold text-gray-700 text-center">
          Extended Feature Analysis
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Detailed insights into feature importance.
        </p>
      </div>
      <div className="max-w-4xl w-full flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab("importance")}
          className={`px-4 py-2 text-sm font-medium rounded ${
            activeTab === "importance"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Model Importance
        </button>
        <button
          onClick={() => setActiveTab("top")}
          className={`px-4 py-2 text-sm font-medium rounded ${
            activeTab === "top"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Top Features
        </button>
        <button
          onClick={() => setActiveTab("shap")}
          className={`px-4 py-2 text-sm font-medium rounded ${
            activeTab === "shap"
              ? "bg-blue-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          SHAP Importance
        </button>
      </div>

      {activeTab === "importance" && (
        <>
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
          <div className="max-w-4xl w-full bg-white shadow-sm rounded-md p-4">
            {modelImportanceData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={modelImportanceData}>
                  <XAxis
                    dataKey="feature"
                    tick={{ fontSize: 12, fontWeight: 500, fill: "#4B5563" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
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
                <div className="text-red-400 mb-4">
                  <TrendingDown size={32} />
                </div>
                <p className="text-sm font-medium text-gray-600">
                  No features match your filters
                </p>
                <p className="text-xs text-gray-400">
                  Try adjusting your search or threshold filters.
                </p>
              </div>
            )}
          </div>
        </>
      )}
      {activeTab === "top" && (
        <div className="max-w-4xl w-full bg-white shadow-sm rounded-md p-4">
          {topFeaturesData.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-600">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2">Feature</th>
                    <th className="px-4 py-2">Importance</th>
                  </tr>
                </thead>
                <tbody>
                  {topFeaturesData.map((item, idx) => (
                    <tr key={idx} className="border-b">
                      <td className="px-4 py-2">{item.feature}</td>
                      <td className="px-4 py-2">{item.importance.toFixed(4)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-red-400 mb-4">
                <TrendingDown size={32} />
              </div>
              <p className="text-sm font-medium text-gray-600">
                No Top Features available
              </p>
            </div>
          )}
        </div>
      )}
      {activeTab === "shap" && (
        <div className="max-w-4xl w-full bg-white shadow-sm rounded-md p-4">
          {shapImportanceData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={shapImportanceData}>
                <XAxis
                  dataKey="feature"
                  tick={{ fontSize: 12, fontWeight: 500, fill: "#4B5563" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
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
                <Bar dataKey="importance" fill="#FBBF24" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12">
              <div className="text-red-400 mb-4">
                <TrendingDown size={32} />
              </div>
              <p className="text-sm font-medium text-gray-600">
                No SHAP data available
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExtendedFeatureAnalysis;
