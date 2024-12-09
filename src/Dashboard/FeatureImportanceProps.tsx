import React, { useEffect, useState } from "react";

interface FeatureImportanceProps {
  [key: string]: number;
}

const FeatureImportance: React.FC = () => {
  const [featureImportance, setFeatureImportance] = useState<FeatureImportanceProps | null>(null);

  useEffect(() => {
    // Fetch the feature importance data from the API
    fetch("http://127.0.0.1:8000/model/modelget/4")
      .then((response) => response.json())
      .then((data) => {
        setFeatureImportance(data.feature_importance);
      })
      .catch((error) => console.error("Error fetching feature importance:", error));
  }, []);

  if (!featureImportance) {
    return <div className="text-center mt-8">Loading feature importance...</div>;
  }

  // Sort the features by importance descending
  const sortedFeatures = Object.entries(featureImportance).sort((a, b) => b[1] - a[1]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">Attribute Columns & Features Importance</h2>
      <div className="border rounded-lg shadow-sm p-4 bg-white">
        <div className="mb-4">
          <p className="text-lg font-medium">
            Top contributing columns to the model predictions.
          </p>
          <button className="text-blue-500 underline text-sm mt-1">
            Explain
          </button>
        </div>
        <div className="space-y-4">
          {sortedFeatures.map(([feature, importance], index) => (
            <div key={feature} className="flex items-center space-x-4">
              <span className="text-gray-600">{feature}</span>
              <div className="flex-1 bg-blue-200 rounded-full h-4">
                <div
                  className="bg-blue-500 h-4 rounded-full text-center text-xs text-white"
                  style={{ width: `${importance * 100}%` }}
                >
                  {`${(importance * 100).toFixed(1)}%`}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-gray-500 text-sm">
          Total {Object.keys(featureImportance).length} columns
        </div>
      </div>
    </div>
  );
};

export default FeatureImportance;

