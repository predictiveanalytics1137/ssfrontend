

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

// Define the type for the metrics data expected.
interface MetricsData {
  // Remove or rename if you don’t actually have `feature_importance`
  // feature_importance?: Record<string, number> | null;

  // The real data is nested inside `feature_analysis`:
  feature_analysis?: {
    feature_importance?: Record<string, number>;
  };
}

interface FeatureImportanceProps {
  modelData: MetricsData;
  config?: {
    importanceThreshold?: number;
    highThreshold?: number; // Threshold for showing "TrendingUp"
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
    config.importanceThreshold ?? 0.0
  );

  // Instead of `modelData.feature_importance`,
  // we grab from `modelData.feature_analysis.feature_importance`:
  const featureImportance =
    modelData.feature_analysis?.feature_importance || {};

  // Filter based on search + threshold
  const filteredData = Object.entries(featureImportance)
    .filter(
      ([feature, importance]) =>
        feature.toLowerCase().includes(searchQuery.toLowerCase()) &&
        importance >= importanceThreshold
    )
    .map(([feature, importance]) => ({
      feature: feature || "N/A",
      importance: importance != null ? importance : 0,
      isHigh: importance > (config.highThreshold ?? 0.5),
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
          Discover the key features driving your model&apos;s predictions.
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
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-start p-3 bg-white shadow-sm border border-gray-200 rounded-md hover:shadow-md transition"
              >
                <h3 className="text-sm font-medium text-gray-700">
                  {item.feature || "N/A"}
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
        ) : (
          <div className="text-center py-6">
            <p className="text-sm text-gray-600">No features available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureImportanceDashboard;
